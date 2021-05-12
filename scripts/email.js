const nodemailer = require('nodemailer');
const zitation_email='zitation4aplicacion4stw@gmail.com';
const password ='Zitation4aplicacion4stw123';


/**
 *
 * @param user
 * @param company
 * @param booking
 * @returns {string}
 */
function createMessage(user,company,booking) {
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
 * @param booking
 * @param company
 */

module.exports.sendReminder = function (user, booking, company) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: zitation_email,
                pass: password
            }
        });

        let text_reminder = createMessage(user,company,booking);

        let mailOptions = {
            from: zitation_email,
            to: user.email,
            subject: 'Cita en ' + company.name,
            text: text_reminder
        };
        transporter.sendMail(mailOptions);

    } catch (e) {
        console.log(e + " Error sending a email as a reminder to " + user.email);
    }
};
