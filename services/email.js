const nodemailer = require('nodemailer');
const password = 'Zitation4aplicacion4stw123';
const QRCode = require('qrcode');

module.exports.sendCancellation = function (user, booking, company) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'zitationunizarstw@gmail.com',
                clientId: '389192230566-9sdamu7n7nidq8bta9aodm4f6s59agrj.apps.googleusercontent.com',
                clientSecret: '72ZfEvP7s72PWeDHdWnwsNgu',
                refreshToken: '1//03rI-Yo9OTW_ICgYIARAAGAMSNwF-L9IrLmUM-ZFMTByVdNlbvk98NBx8lhSCrTUigPyNzo_L__49RBOOHZg387rupGYVzAG1BPw',
                accessToken: 'ya29.a0AfH6SMBYLzlV8I5oWvZOkaHqTIr_OvhRlaDIhX0S10ftknqLrDUCov-_XfYNZo_eM-TJSr05-Tj3wipDcJitAskZLthYZm5JhKJSzDcZUPaT1Y_fBzBxJrXQfr5WrvJ7LHCtCHbALWWaROg3eV1VVlJsddm0',
                expires: 1621245605911
            },

            debug: true, // show debug output
            logger: true // log information in console
        });

        let name = user.first_name + ' ' + user.last_name;
        let date = booking.date + ' a las  ' + booking.time + ' en ' + company.name;
        let place = company.street + ' , ' + company.streetnumber.toString() + ', ' + company.zipcode;

        let mailOptions = {
            from: 'zitationunizarstw@gmail.com',
            to: user.email,
            subject: 'Cancelacion cita',
            html: `<p>Querido/a ${name}</p>
                    <p>Le informamos que se ha cancelado la reserva de fecha ${date} en ${company.name}</p>
                    <p> Ubicada en ${place} </p>`

        };
        transporter.sendMail(
            mailOptions).then(() => {
            console.log("Succesful")
        }).catch((e) => {
            console.log(e)
        })
    } catch (e) {
        console.log(e + " Error sending a email as a reminder to " + user.email);
    }
}
/**
 *
 * @param user
 * @param booking
 * @param company
 */
module.exports.sendReminder = async function (user, booking, company) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'zitationunizarstw@gmail.com',
                clientId: '389192230566-9sdamu7n7nidq8bta9aodm4f6s59agrj.apps.googleusercontent.com',
                clientSecret: '72ZfEvP7s72PWeDHdWnwsNgu',
                refreshToken: '1//03rI-Yo9OTW_ICgYIARAAGAMSNwF-L9IrLmUM-ZFMTByVdNlbvk98NBx8lhSCrTUigPyNzo_L__49RBOOHZg387rupGYVzAG1BPw',
                accessToken: 'ya29.a0AfH6SMBYLzlV8I5oWvZOkaHqTIr_OvhRlaDIhX0S10ftknqLrDUCov-_XfYNZo_eM-TJSr05-Tj3wipDcJitAskZLthYZm5JhKJSzDcZUPaT1Y_fBzBxJrXQfr5WrvJ7LHCtCHbALWWaROg3eV1VVlJsddm0',
                expires: 1621245605911
            },

            debug: true, // show debug output
            logger: true // log information in console
        });
        let name = user.first_name + ' ' + user.last_name;
        let date = booking.date + ' a las  ' + booking.time + ' en ' + company.name;
        let place = company.street + ' , ' + company.streetnumber.toString() + ', ' + company.zipcode;
        let text = 'https://zitation.herokuapp.com/booking/' + booking._id
        let img = await QRCode.toFile(__dirname + '/qr.png', text)
        let mailOptions = {
            from: 'zitationunizarstw@gmail.com',
            to: user.email,
            subject: 'Recordatorio cita',
            html: `<p>Querido/a ${name}</p>
                    <p>Le recordamos que ha reservado cita ela ${date} en ${company.name}</p>
                    <p> Ubicada en ${place} </p>
                    <img src="cid:qr"/>
                    <p>En caso de no poder usar el codigo QR</p>
                    <p>Puede acceder a través del enlace</p>
                     <a href=${text}>Zitation App</a>`,
            attachments: [{
                filename: 'qr.png',
                path: __dirname + '/qr.png',
                cid: 'qr' //my mistake was putting "cid:logo@cid" here!
            }]
        };
        transporter.sendMail(
            mailOptions).then(() => {
            console.log("Succesful")
        }).catch((e) => {
            console.log(e)
        });
    } catch (e) {
        console.log(e + " Error sending a cancellation email");
    }
}
