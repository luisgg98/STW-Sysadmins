const nodemailer = require('nodemailer');
const zitation_email = 'zitation4aplicacion4stw@gmail.com';
const password = 'Zitation4aplicacion4stw123';
const User = require('../models/user')


/**
 *
 * @param user
 * @param company
 * @param booking
 * @returns {string}
 */
function createReminder(user, company, booking) {
    let text_reminder = 'Querido/a ' + user.first_name + ' ' + user.last_name + '. \n'
    text_reminder = text_reminder + 'Le recordamos que ha reservado el ' + booking.date + ' a las ' + booking.time + '. \n'
    text_reminder = text_reminder + ' en ' + company.name + '.\n';

    text_reminder = text_reminder + 'Ubicada en ' + company.street + ' ' + ', ' + company.streetnumber.toString() + ', ';
    text_reminder = text_reminder + company.zipcode + ' Zaragoza. \n';

    return text_reminder;
}

/**
 *
 * @param user
 * @param company
 * @param booking
 * @returns {string}
 */
function createCancellation(user, company, booking) {
    let text_reminder = 'Querido/a ' + user.first_name + ' ' + user.last_name + '. \n'
    text_reminder = text_reminder + 'Le informamos que se ha cancelado la reserva de fecha ' + booking.date +
        ' a las ' + booking.time + '. \n' + ' en ' + company.name + '.\n';

    text_reminder = text_reminder + 'Ubicada en ' + company.street + ' ' + ', ' + company.streetnumber.toString() + ', ';
    text_reminder = text_reminder + company.zipcode + ' Zaragoza. \n';

    return text_reminder;
}

/**
 *
 * @param user
 * @param booking
 * @param company
 * @param text_reminder
 * @param transporter
 */
function sendMessage(user, booking, company, text_reminder, transporter) {
    let mailOptions = {
        from: zitation_email,
        to: user.email,
        subject: 'Cita en ' + company.name,
        text: text_reminder
    };
    transporter.sendMail(mailOptions);

}

/**
 *
 * @returns {Mail}
 */
function createTransporte() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: zitation_email,
            pass: password
        }
    });
    return transporter;
}

/**
 *
 * @param user
 * @param booking
 * @param company
 */

module.exports.sendReminder = function (user, booking, company) {
    try {
        let transporter = createTransporte();
        let text_reminder = createReminder(user, company, booking);
        sendMessage(user, booking, company, text_reminder, transporter);
    } catch (e) {
        console.log(e + " Error sending a email as a reminder to " + user.email);
    }
};

/**
 *
 * @param user
 * @param booking
 * @param company
 */
module.exports.sendCancellation = function (user, booking, company) {
    try {
        let transporter = createTransporte();
        let text_cancellation = createCancellation(user, company, booking);
        sendMessage(user, booking, company, text_cancellation, transporter);

    } catch (e) {
        console.log(e + " Error sending a cancellation email");
    }

}
