const nodemailer = require('nodemailer');
const zitation_email = 'zitationunizarstw@gmail.com';
const password = 'Zitation4aplicacion4stw123';
const QRCode = require('qrcode');

module.exports.sendCancellation =  function (user, booking, company) {
    try {
        let transporter = nodemailer.createTransport({
            host:  "Gmail",
            auth: {
                user: zitation_email,
                pass: password
            },
            debug: true, // show debug output
            logger: true // log information in console
        });

        let name = user.first_name + ' ' + user.last_name;
        let date = booking.date + ' a las  ' + booking.time + ' en ' + company.name;
        let place = company.street + ' , ' +company.streetnumber.toString() + ', ' + company.zipcode;

        let mailOptions = {
            from: zitation_email,
            to: user.email,
            subject: 'Cancelacion cita',
            html: `<p>Querido/a ${name}</p>
                    <p>Le informamos que se ha cancelado la reserva de fecha ${date} en ${ company.name}</p>
                    <p> Ubicada en ${place} </p>`

        };
        transporter.sendMail(
            mailOptions).then(() => {
            console.log("Succesful")
        }).catch((e) => {
            console.log(e)
        })
    }
    catch(e)
        {console.log(e + " Error sending a email as a reminder to " + user.email);}
    }
// <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
    /**
     *
     * @param user
     * @param booking
     * @param company
     */
    module.exports.sendReminder = async function (user, booking, company) {
        try {
            let transporter = nodemailer.createTransport({
                host:  "Gmail",
                auth: {
                    user: zitation_email,
                    pass: password
                },
                debug: true, // show debug output
                logger: true // log information in console
            });

            let name = user.first_name + ' ' + user.last_name;
            let date = booking.date + ' a las  ' + booking.time + ' en ' + company.name;
            let place = company.street + ' , ' +company.streetnumber.toString() + ', ' + company.zipcode;

            let text = 'https://zitation.herokuapp.com/booking/' + booking._id
            let img = await QRCode.toDataURL(text);
            let mailOptions = {
                from: zitation_email,
                to: user.email,
                subject: 'Recordatorio cita',
                html: `<p>Querido/a ${name}</p>
                    <p>Le recordamos que ha reservado cita ela ${date} en ${ company.name}</p>
                    <p> Ubicada en ${place} </p>
                    <img src=${img}> 
                    <p>En caso de no poder usar el codigo QR</p>
                    <p>Puede acceder a través del enlace</p>
                     <a href=${test}>Zitation App</a> `

            };
            transporter.sendMail(
                mailOptions).then(() => {
                console.log("Succesful")
            }).catch((e) => {
                console.log(e)
            })

        } catch (e) {
            console.log(e + " Error sending a cancellation email");
        }

    }
