const fs = require('fs');
const https = require('https');
const moment = require('moment');
const Excel  = require("exceljs");

//CONSTANT VARIABLES
const filePath = "../covid_data.xlsx";

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
            const file = fs.createWriteStream(filePath);
            let fileInfo = null;

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
}

/**
 *
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
 */
function buildUrl(day,month,year){
    year= year.toString();
    month = formatDate(month);
    day = formatDate(day);
    let url = `https://transparencia.aragon.es/sites/default/files/documents/${year}${month}${day}_casos_confirmados_zbs.xlsx`
    console.log(url);
    return url;
}

/**
 *
 *
 */
async function getCasesFile() {

    let url = "";
    let attempts = 1;
    let correctAccess = false;
    //That means it weekend and the data is not update on weekends
    do {
        let today_date = new Date();
        console.log(today_date)
        let today_day = today_date.getDay();

        if (today_day > 5) {
            let yesterday = moment().subtract((today_day - 5), 'days');
            console.log(yesterday.format());
            today_date = new Date(yesterday.format());
            console.log(today_date);
        }
        console.log(today_date.getMonth())
        url = buildUrl(today_date.getDate(), (today_date.getMonth() + 1), today_date.getFullYear());

        await downloadFile(url, filePath).then(r => {
            console.log('Correct execution');
            correctAccess = true;
        }).catch((error) => {
            console.log(`Caught by try/catch: ${error}`);
            attempts = attempts + 1;
        });
    } while (!correctAccess && attempts<3);

    console.log('Good bye');
    if(correctAccess){
        //Update the information in the mongodb database
        updateDatabase();
    }


}

/**
 * 
 */
function updateDatabase() {
    let workbook = new Excel.Workbook();

    workbook.xlsx.readFile(filePath).then(function () {

        //Get sheet by Name
        let worksheet=workbook.getWorksheet(1);
        let startinit = 15;

        while(worksheet.getRow(startinit).getCell(2).value != 'Zona de salud' && startinit < 300){
            startinit = startinit +1
        }

        let limit = startinit + 1;

        while(worksheet.getRow(limit).getCell(2).value != 'Total casos confirmados' && limit < 400){
            limit = limit +1
        }

        let index_column= startinit + 1;

        while(index_column < limit){
            let row = worksheet.getRow(index_column);
            let ZonaSalud = row.getCell(2).value;
            let newcases = row.getCell(3).value;
            let percentage = row.getCell(4).value;
            let ZBSwithCases = row.getCell(5).value;
            console.log(ZonaSalud + ' ' + newcases +' ' + percentage+ ' ' + ZBSwithCases);
            index_column = index_column +1;
        }

    });
}

module.exports.getCasesFile = getCasesFile;