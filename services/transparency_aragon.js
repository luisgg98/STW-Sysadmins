const fs = require('fs');
const https = require('https');
const moment = require('moment');
const Excel  = require("exceljs");
const hz = require('./healthzone');

// CONSTANT VARIABLES
const  filePath ="scripts/covid_data.xlsx";

//METHODS
/**
 * Downloads file from remote HTTPS host and puts its contents to the
 * specified location.
 */
async function downloadFile(url, filePath) {
    const proto =  https;
    // A promise is a proxy for a no known value
    // It allows asynchronous code
        return new Promise((resolve, reject) => {
            //Stream between the new file an the request
            const file = fs.createWriteStream(filePath, {flag: 'a+'});
            let fileInfo = null;
            file.on('open', () => {
                const request = proto.get(url, response => {

                    if (response.statusCode !== 200) {
                        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                    }
                    fileInfo = {
                        mime: response.headers['content-type'],
                        size: parseInt(response.headers['content-length'], 10),
                    };
                    // Send data to the file
                    response.pipe(file);
                });
                //Events which can occur once the connections is finished
                // The destination stream is ended by the time it's called
                file.on('finish', () => {
                    console.log('The file has been closed without problems');
                    resolve(fileInfo);
                });
                // In case there is a error with the request it triggers
                request.on('error', err => {
                    console.log('Error while requesting the file');
                    fs.unlink(filePath, () => reject(err));
                });

                // This is here in case any errors occur
                file.on('error', err => {
                    console.log('Error while writing the data in the new file');
                    fs.unlink(filePath, () => reject(err));
                });
                request.end();
            });
        });
}

/**
 * If the day is inferior to 10
 * it adds a 0 and return it as
 * a string
 * @param date
 * @returns {string}
 */
function formatDate(date){
    if(date >= 10){
        return date.toString();
    }
    else{
        return '0'+ date.toString();
    }
}

/**
 *
 * @param day
 * @param month
 * @param year
 * @returns {string}
 */
function buildUrl(day,month,year){
    year= year.toString();
    month = formatDate(month);
    day = formatDate(day);
    let url = `https://transparencia.aragon.es/sites/default/files/documents/${year}${month}${day}_casos_confirmados_zbs.xlsx`
    return url;
}

/**
 *
 * @param month
 * @param year
 * @returns {number}
 */
let getDaysInMonth = function(month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
};
/**
 * Asynchronous method which tries to download the excel file
 * from the council city website.
 *  If it fails downloading the file it tries to download the previous
 *  one. I will try to download the file 30 or 31 times, depending on the
 *  month. If finally it is incapable of downloading anything doesn't do anything else.
 *
 *  Once the file is downloaded is time to update the database
 *
 */
async function getCasesFile() {
    let url = "";
    let attempts = 1;
    let correctAccess = false;
    //That means it weekend and the data is not update on weekends
    let today_date = new Date();
    do {
        let today_day = today_date.getDay();

        if (today_day > 5) {
            let yesterday = moment().subtract((today_day - 5), 'days');
            today_date = new Date(yesterday.format());
        }
        url = buildUrl(today_date.getDate(), (today_date.getMonth() + 1), today_date.getFullYear());

        await downloadFile(url, filePath).then(r => {
            console.log('Correct execution');
            correctAccess = true;
        }).catch((error) => {
            console.log(`Caught by try/catch: ${error}`);
            attempts = attempts + 1;
            // Try to get the previous file
            let yesterday = moment().subtract(attempts, 'days');
            today_date = new Date(yesterday.format());
        });
    } while (!correctAccess && attempts < getDaysInMonth(today_date.getMonth(),today_date.getFullYear()));

    if(correctAccess){
        //Update the information in the mongodb database
        console.log("Updating the database")
        updateDatabase(today_date.toISOString());
        console.log("End of the updating database process")
    }

}

/**
 * Update the previous information about the covid cases of the health zones
 */
function  updateDatabase(date) {
    let workbook = new Excel.Workbook();
    try {
        workbook.xlsx.readFile(filePath).then(async function () {
            //Get sheet by Name
            let worksheet = workbook.getWorksheet(1);
            let startinit = 15;
            // Finding the beginning of the table
            while (!getInit(worksheet.getRow(startinit).getCell(2).value) && startinit < 60) {
                startinit = startinit + 1
            }
            let limit = startinit + 1;
            // Finding the limits of the table
            while (!getFinal(worksheet.getRow(limit).getCell(2).value) && limit < 90) {
                limit = limit + 1
            }
            let index_column = startinit + 1;
            while (index_column < limit) {
                // Tries to read the data in the table
                try{
                    let row = worksheet.getRow(index_column);
                    // Just getting the name and the new cases
                    let ZonaSalud = row.getCell(2).value;
                    if(ZonaSalud != null){
                        let newcases = row.getCell(3).value;
                        // Map the name of the district with a health zone
                        hz.updateCovidHealthzone(ZonaSalud, newcases,updateRadius(newcases),date).then(async function (district) {
                            // A District found
                            console.log(ZonaSalud + " health zone updated" );
                        }).catch((e) =>{
                            if(!e.includes('Not found:')){
                                console.log({ error: "Error updating the data of a district" + e })
                            }
                        });

                    }
                }
                catch (e) {
                    //Something about the reading goes wrong
                    console.log({ error: e })
                }
                index_column = index_column + 1;
            }

        });
    }catch(error) {
        console.log("Error getting the information HealthZone" )
        console.log({error: error})
    }

}

/**
 * Random way to get the value of the radius
 * @param cases
 */
function updateRadius(cases) {
    let radius = (cases * 15);
    if(radius < 50){
        radius = 50;
    }
    if(radius > 500){
        radius = 500;
    }
    return radius;
}

/**
 *
 * @param cell
 * @returns {*}
 */
function getFinal(cell){
    return (cell != null && (cell.includes('Total') || cell.includes('TOTAL')));

}

/**
 *
 * @param cell
 * @returns {*}
 */
function getInit(cell){
    return (cell != null && cell.includes('Zona de salud'));

}

module.exports.getCasesFile = getCasesFile;
