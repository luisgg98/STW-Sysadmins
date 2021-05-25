const nodemailer = require('nodemailer');
const password = 'Zitation4aplicacion4stw123';
const QRCode = require('qrcode');
const url_login = 'https://zitation.herokuapp.com/login';
const zitation_email = 'zitationunizarstw@gmail.com';
//            expires: 1621963296907
/**
 *
 * @param mailOptions
 */
async function sendMail(mailOptions) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: zitation_email,
            clientId: '389192230566-9sdamu7n7nidq8bta9aodm4f6s59agrj.apps.googleusercontent.com',
            clientSecret: '72ZfEvP7s72PWeDHdWnwsNgu',
            refreshToken: '1//031xPoqaROKczCgYIARAAGAMSNwF-L9Ir36xpeb4FxQSGGdz5xn0yJtgvhXo896TXOvBl41r9EzJN3TijcBCl9OZFCNMtOvNWk9c',
            accessToken: 'ya29.a0AfH6SMBtdZowCmfKAEQB801UiAA0Qdx_Jk9OtuSEgxMvOqO0n8I3ABKG87gFyRbvXbU1iPN_n5GJqaPYKsDdVkpEWK-MMFqytUJkOumCxmeZYYBbsvQiC7V2Xa4dYy1VfPof8yBg7Bot2rnYtnFpzWR49BVe',
        }
    });
    transporter.sendMail(
        mailOptions).then(() => {
        console.log("Succesful")
    }).catch((e) => {
        console.log(e)
    })
}

/**
 *
 * @param user
 * @param booking
 * @param company
 */
module.exports.sendCancellation = async function (user, booking, company) {
    let name = user.first_name + ' ' + user.last_name;
    let date = booking.date + ' a las  ' + booking.time + ' en ' + company.name;
    let place = company.street + ' , ' + company.streetnumber.toString() + ', ' + company.zipcode;
    let mailOptions = {
        from: zitation_email,
        to: user.email,
        subject: 'Cancelacion cita',
        html: `<p>Querido/a ${name}</p>
                    <p>Le informamos que se ha cancelado la reserva de fecha ${date} en ${company.name}</p>
                    <p> Ubicada en ${place} </p>`
    };
    await sendMail(mailOptions);
}
/**
 *
 * @param user
 * @param booking
 * @param company
 */
module.exports.sendReminder = async function (user, booking, company) {

    let name = user.first_name + ' ' + user.last_name;
    let date = booking.date + ' a las  ' + booking.time + ' en ' + company.name;
    let place = company.street + ' , ' + company.streetnumber.toString() + ', ' + company.zipcode;
    let text = 'https://zitation.herokuapp.com/booking/' + booking._id
    let img = await QRCode.toFile(__dirname + '/qr.png', text)
    let mailOptions = {
        from: zitation_email,
        to: user.email,
        subject: 'Recordatorio cita',
        html: `<p>Querido/a ${name}</p>
                    <p>Le recordamos que ha reservado cita el ${date} en ${company.name}</p>
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
    await sendMail(mailOptions);
}

/**
 *
 * @param user
 * @returns {Promise<void>}
 */
module.exports.sendWelcome = async function (user) {
    let name = user.first_name + ' ' + user.last_name;
    let mailOptions = {
        from: zitation_email,
        to: user.email,
        subject: 'Bienvenido/a a Zitation',
        html: `<p>Querido/a ${name}</p>
                    <p>Le damos la bienvenida a Zitation.</p>
                    <p>Ya puede iniciar sesión en <a href=${url_login}>Zitation App</a></p>
                    <p>Comience a reservar ya los servicios que desee.</p>`,
    };
    await sendMail(mailOptions);
}

/**
 *
 * @param company
 * @returns {Promise<void>}
 */
module.exports.sendWelcomeCompany = async function (company) {
    let mailOptions = {
        from: 'zitationunizarstw@gmail.com',
        to: company.email,
        subject: 'Bienvenido/a a Zitation',
        html: `<p>${company.name}</p>
                    <p>Le damos la bienvenida a Zitation.</p>
                    <p>Ya puede registrar sus servicios en <a href=${url_login}>Zitation App</a></p>`,
    };
    await sendMail(mailOptions);
}

/**
 *
 * @param user
 * @param booking
 * @param company
 */
module.exports.sendReminderCompany = async function (user, booking, company) {
    let user_1 = user.first_name + ' ' + user.last_name;
    let date = booking.date + ' a las  ' + booking.time + ' en ' + company.name;
    let mailOptions = {
        from: zitation_email,
        to: company.email,
        subject: 'Recordatorio cita',
        html: `<p>${company.name}</p>
                    <p>${user_1} ha reservado cita el ${date} en ${company.name}</p>`,
    };
    await sendMail(mailOptions);
}

/**
 *
 * @param user
 * @param booking
 * @param company
 * @returns {Promise<void>}
 */
module.exports.sendCancellationCompany = async function (user, booking, company) {
    let user_1 = user.first_name + ' ' + user.last_name;
    let date = booking.date + ' a las  ' + booking.time + ' en ' + company.name;
    let mailOptions = {
        from: zitation_email,
        to: company.email,
        subject: 'Cancelación cita',
        html: `<p>${company.name}</p>
                    <p>${user_1} ha cancelado la reserva el ${date} en ${company.name}</p>`,
    };
    await sendMail(mailOptions);
}