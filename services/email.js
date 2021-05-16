const nodemailer = require('nodemailer');
const zitation_email = 'zitation4aplicacion4stw@gmail.com';
const password = 'Zitation4aplicacion4stw123';
const QRCode = require('qrcode')
const Email = require('email-templates');

module.exports.sendCancellation = function (user, booking, company) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: zitation_email,
                pass: password,
                clientId: '275023920745-3coq4f07847160cb0hv5lop7cgq8p9u0.apps.googleusercontent.com',
                clientSecret: 'rXbtH9UQqpnB9eumL7FWV2aL'
            }
        });
        const email = new Email({
            views: { root: __dirname },
            //preview: false,
            message: {
                from: zitation_email
            },
            // uncomment below to send emails in development/test env:
            send: true,
            transporter
        });
        const number = company.streetnumber.toString()
        email
            .send({
                template: 'cancellation',
                message: {
                    to: user.email
                },
                locals: {
                    name: user.first_name + ' ' + user.last_name,
                    date: booking.date+' a las  '+booking.time + ' en ' + company.name,
                    place: company.street + ' , ' + number + ', ' + company.zipcode
                }
            })
            .then(console.log)
            .catch(console.error);
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
module.exports.sendReminder = async function (user, booking, company) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: zitation_email,
                pass: password,
                clientId: '275023920745-3coq4f07847160cb0hv5lop7cgq8p9u0.apps.googleusercontent.com',
                clientSecret: 'rXbtH9UQqpnB9eumL7FWV2aL'
            }
        });
        const email = new Email({
            views: { root: __dirname },
            message: {
                from: zitation_email
            },
            //preview: false,
            // uncomment below to send emails in development/test env:
            send: true,
            transporter
        });
        const number = company.streetnumber.toString()
        let text = 'https://zitation.herokuapp.com/booking/' + booking._id
        let img = await QRCode.toDataURL(text);
        email
            .send({
                template: 'reminder',
                message: {
                    to: user.email
                },
                locals: {
                    name: user.first_name + ' ' + user.last_name,
                    date: booking.date + ' a las  ' + booking.time + ' en ' + company.name,
                    place: company.street + ' , ' + number + ', ' + company.zipcode,
                    image: img,
                    linkWeb: text
                }
            })
            .then(console.log)
            .catch(console.error);

    } catch (e) {
        console.log(e + " Error sending a cancellation email");
    }

}
