const fs = require('fs');
const https = require('https');
const moment = require('moment');
const Excel  = require("exceljs");
const hz = require('../services/healthzone');
const Healthzone = require('../models/healthzone');
const  filePath ="scripts/covid_data.xlsx";
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
 *
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
 *
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
        updateDatabase();
        console.log("End of the updating database process")
    }

}

/**
 * 
 */
function  updateDatabase() {
    let workbook = new Excel.Workbook();
    try {
        workbook.xlsx.readFile(filePath).then(async function () {
            //Get sheet by Name
            let worksheet = workbook.getWorksheet(1);
            let startinit = 15;

            while (!getInit(worksheet.getRow(startinit).getCell(2).value) && startinit < 60) {
                startinit = startinit + 1
            }

            let limit = startinit + 1;

            while (!getFinal(worksheet.getRow(limit).getCell(2).value) && limit < 90) {
                limit = limit + 1
            }

            let index_column = startinit + 1;
            while (index_column < limit) {
                try{
                    let row = worksheet.getRow(index_column);
                    let ZonaSalud = row.getCell(2).value;
                    let newcases = row.getCell(3).value;
                    let percentage = row.getCell(4).value;
                    let percentage_result = getResultPercentage(percentage);
                    let ZBSwithCases = row.getCell(5).value;
                    if(ZonaSalud != null){
                        hz.mapDistrictWithHealthzone(ZonaSalud).then(async function (district) {
                            if(district !=null){
                                await hz.updateCovidHealthzone(district, newcases,percentage_result, ZBSwithCases,updateRadius(newcases));
                            }
                        }).catch((e) =>{
                            if(!e.includes('Not found:')){
                                console.log({ error: "Error updating the data of a district" + e })
                            }
                        });

                    }
                }
                catch (e) {
                    console.log({ error: e })
                }
                index_column = index_column + 1;
            }

        });
    }catch {
        console.log({ error: "Error getting the information HealthZone" })
    }

}

/**
 *
 * @param cases
 */
function updateRadius(cases) {
    return (cases *20);
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

/**
 *
 * @param percentage
 * @returns {number|*}
 */
function getResultPercentage(percentage){
    if(percentage == null){
        return 0;
    }
    else{
        return percentage['result'];
    }

}

module.exports.getCasesFile = getCasesFile;
