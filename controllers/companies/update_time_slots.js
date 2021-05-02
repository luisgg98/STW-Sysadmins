function update_time_slots(company) {
    // Sacar duracion de los servicios
    // Para cada día de la semana sacar las franjas horarias
    // Monday
    //Sacar hora y minutos de inicio y pasar to\do a minutos
    let open_1 = company.schedule.monday.open_1
    let close_1 = company.schedule.monday.close_1
    // La compañia solo tiene un horario
    // Sacar horas y minutos, vienen en formato hh:mm
    open_1 = open_1.split(":")
    // Hora de apertura
    let open_1_hora = open_1[0]
    // Pasar a minutos
    open_1_hora = parseInt(open_1_hora,10) * 60
    let open_1_minutes = parseInt(open_1[1],10)
    // Sacar horario de cierre
    close_1 = close_1.split(":")
    let close_1_hora = parseInt(close_1[0], 10)*60
    let close_1_minutes = parseInt(close_1[1],10)
    close_1 = close_1_hora + close_1_minutes
    let x = company.service_duration; //minutes interval
    let times = []; // time array
    let tt = open_1_hora + open_1_minutes; // start time
    let ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    let i = 0
    for (i;tt<close_1; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    if (company.schedule.monday.open_2) {
        // La compañia tiene doble horario
        let open_2 = company.schedule.monday.open_2
        let close_2 = company.schedule.monday.close_2
        // La compañia solo tiene un horario
        // Sacar horas y minutos, vienen en formato hh:mm
        open_2 = open_2.split(":")
        // Hora de apertura
        let open_2_hora = open_2[0]
        // Pasar a minutos
        open_2_hora = parseInt(open_2_hora,10) * 60
        let open_2_minutes = parseInt(open_2[1],10)
        // Sacar horario de cierre
        close_2 = close_2.split(":")
        let close_2_hora = parseInt(close_2[0], 10)*60
        let close_2_minutes = parseInt(close_2[1],10)
        close_2 = close_2_hora + close_2_minutes
        let x = company.service_duration; //minutes interval
        let tt = open_2_hora + open_2_minutes; // start time
        let ap = ['AM', 'PM']; // AM-PM
        // loop to increment the time and push results in array
        for (i;tt<close_2; i++) {
            let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            let mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
    }
    /////////////////////////////
    // Tuesday
    //Sacar hora y minutos de inicio y pasar to\do a minutos
    open_1 = company.schedule.tuesday.open_1
    close_1 = company.schedule.tuesday.close_1
    // La compañia solo tiene un horario
    // Sacar horas y minutos, vienen en formato hh:mm
    open_1 = open_1.split(":")
    // Hora de apertura
    open_1_hora = open_1[0]
    // Pasar a minutos
    open_1_hora = parseInt(open_1_hora,10) * 60
    open_1_minutes = parseInt(open_1[1],10)
    // Sacar horario de cierre
    close_1 = close_1.split(":")
    close_1_hora = parseInt(close_1[0], 10)*60
    close_1_minutes = parseInt(close_1[1],10)
    close_1 = close_1_hora + close_1_minutes
    x = company.service_duration; //minutes interval
    tt = open_1_hora + open_1_minutes; // start time
    ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (i;tt<close_1; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    if (company.schedule.tuesday.open_2) {
        // La compañia tiene doble horario
        let open_2 = company.schedule.tuesday.open_2
        let close_2 = company.schedule.tuesday.close_2
        // La compañia solo tiene un horario
        // Sacar horas y minutos, vienen en formato hh:mm
        open_2 = open_2.split(":")
        // Hora de apertura
        let open_2_hora = open_2[0]
        // Pasar a minutos
        open_2_hora = parseInt(open_2_hora, 10) * 60
        let open_2_minutes = parseInt(open_2[1], 10)
        // Sacar horario de cierre
        close_2 = close_2.split(":")
        let close_2_hora = parseInt(close_2[0], 10) * 60
        let close_2_minutes = parseInt(close_2[1], 10)
        close_2 = close_2_hora + close_2_minutes
        let x = company.service_duration; //minutes interval
        let tt = open_2_hora + open_2_minutes; // start time
        let ap = ['AM', 'PM']; // AM-PM
        // loop to increment the time and push results in array
        for (i; tt < close_2; i++) {
            let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            let mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
    }
    // Wednesday
    //Sacar hora y minutos de inicio y pasar to\do a minutos
    open_1 = company.schedule.wednesday.open_1
    close_1 = company.schedule.wednesday.close_1
    // La compañia solo tiene un horario
    // Sacar horas y minutos, vienen en formato hh:mm
    open_1 = open_1.split(":")
    // Hora de apertura
    open_1_hora = open_1[0]
    // Pasar a minutos
    open_1_hora = parseInt(open_1_hora,10) * 60
    open_1_minutes = parseInt(open_1[1],10)
    // Sacar horario de cierre
    close_1 = close_1.split(":")
    close_1_hora = parseInt(close_1[0], 10)*60
    close_1_minutes = parseInt(close_1[1],10)
    close_1 = close_1_hora + close_1_minutes
    x = company.service_duration; //minutes interval
    tt = open_1_hora + open_1_minutes; // start time
    ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (i;tt<close_1; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    if (company.schedule.wednesday.open_2) {
        // La compañia tiene doble horario
        let open_2 = company.schedule.wednesday.open_2
        let close_2 = company.schedule.wednesday.close_2
        // La compañia solo tiene un horario
        // Sacar horas y minutos, vienen en formato hh:mm
        open_2 = open_2.split(":")
        // Hora de apertura
        let open_2_hora = open_2[0]
        // Pasar a minutos
        open_2_hora = parseInt(open_2_hora, 10) * 60
        let open_2_minutes = parseInt(open_2[1], 10)
        // Sacar horario de cierre
        close_2 = close_2.split(":")
        let close_2_hora = parseInt(close_2[0], 10) * 60
        let close_2_minutes = parseInt(close_2[1], 10)
        close_2 = close_2_hora + close_2_minutes
        let x = company.service_duration; //minutes interval
        let tt = open_2_hora + open_2_minutes; // start time
        let ap = ['AM', 'PM']; // AM-PM
        // loop to increment the time and push results in array
        for (i; tt < close_2; i++) {
            let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            let mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
    }
    // Thursday
    //Sacar hora y minutos de inicio y pasar to\do a minutos
    open_1 = company.schedule.thursday.open_1
    close_1 = company.schedule.thursday.close_1
    // La compañia solo tiene un horario
    // Sacar horas y minutos, vienen en formato hh:mm
    open_1 = open_1.split(":")
    // Hora de apertura
    open_1_hora = open_1[0]
    // Pasar a minutos
    open_1_hora = parseInt(open_1_hora,10) * 60
    open_1_minutes = parseInt(open_1[1],10)
    // Sacar horario de cierre
    close_1 = close_1.split(":")
    close_1_hora = parseInt(close_1[0], 10)*60
    close_1_minutes = parseInt(close_1[1],10)
    close_1 = close_1_hora + close_1_minutes
    x = company.service_duration; //minutes interval
    tt = open_1_hora + open_1_minutes; // start time
    ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (i;tt<close_1; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    if (company.schedule.thursday.open_2) {
        // La compañia tiene doble horario
        let open_2 = company.schedule.thursday.open_2
        let close_2 = company.schedule.thursday.close_2
        // La compañia solo tiene un horario
        // Sacar horas y minutos, vienen en formato hh:mm
        open_2 = open_2.split(":")
        // Hora de apertura
        let open_2_hora = open_2[0]
        // Pasar a minutos
        open_2_hora = parseInt(open_2_hora, 10) * 60
        let open_2_minutes = parseInt(open_2[1], 10)
        // Sacar horario de cierre
        close_2 = close_2.split(":")
        let close_2_hora = parseInt(close_2[0], 10) * 60
        let close_2_minutes = parseInt(close_2[1], 10)
        close_2 = close_2_hora + close_2_minutes
        let x = company.service_duration; //minutes interval
        let tt = open_2_hora + open_2_minutes; // start time
        let ap = ['AM', 'PM']; // AM-PM
        // loop to increment the time and push results in array
        for (i; tt < close_2; i++) {
            let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            let mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
    }
    // Friday
    //Sacar hora y minutos de inicio y pasar to\do a minutos
    open_1 = company.schedule.friday.open_1
    close_1 = company.schedule.friday.close_1
    // La compañia solo tiene un horario
    // Sacar horas y minutos, vienen en formato hh:mm
    open_1 = open_1.split(":")
    // Hora de apertura
    open_1_hora = open_1[0]
    // Pasar a minutos
    open_1_hora = parseInt(open_1_hora,10) * 60
    open_1_minutes = parseInt(open_1[1],10)
    // Sacar horario de cierre
    close_1 = close_1.split(":")
    close_1_hora = parseInt(close_1[0], 10)*60
    close_1_minutes = parseInt(close_1[1],10)
    close_1 = close_1_hora + close_1_minutes
    x = company.service_duration; //minutes interval
    tt = open_1_hora + open_1_minutes; // start time
    ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (i;tt<close_1; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    if (company.schedule.friday.open_2) {
        // La compañia tiene doble horario
        let open_2 = company.schedule.friday.open_2
        let close_2 = company.schedule.friday.close_2
        // La compañia solo tiene un horario
        // Sacar horas y minutos, vienen en formato hh:mm
        open_2 = open_2.split(":")
        // Hora de apertura
        let open_2_hora = open_2[0]
        // Pasar a minutos
        open_2_hora = parseInt(open_2_hora, 10) * 60
        let open_2_minutes = parseInt(open_2[1], 10)
        // Sacar horario de cierre
        close_2 = close_2.split(":")
        let close_2_hora = parseInt(close_2[0], 10) * 60
        let close_2_minutes = parseInt(close_2[1], 10)
        close_2 = close_2_hora + close_2_minutes
        let x = company.service_duration; //minutes interval
        let tt = open_2_hora + open_2_minutes; // start time
        let ap = ['AM', 'PM']; // AM-PM
        // loop to increment the time and push results in array
        for (i; tt < close_2; i++) {
            let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            let mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
    }
    // Saturday
    //Sacar hora y minutos de inicio y pasar to\do a minutos
    open_1 = company.schedule.saturday.open_1
    close_1 = company.schedule.saturday.close_1
    // La compañia solo tiene un horario
    // Sacar horas y minutos, vienen en formato hh:mm
    open_1 = open_1.split(":")
    // Hora de apertura
    open_1_hora = open_1[0]
    // Pasar a minutos
    open_1_hora = parseInt(open_1_hora,10) * 60
    open_1_minutes = parseInt(open_1[1],10)
    // Sacar horario de cierre
    close_1 = close_1.split(":")
    close_1_hora = parseInt(close_1[0], 10)*60
    close_1_minutes = parseInt(close_1[1],10)
    close_1 = close_1_hora + close_1_minutes
    x = company.service_duration; //minutes interval
    tt = open_1_hora + open_1_minutes; // start time
    ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (i;tt<close_1; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    if (company.schedule.saturday.open_2) {
        // La compañia tiene doble horario
        let open_2 = company.schedule.saturday.open_2
        let close_2 = company.schedule.saturday.close_2
        // La compañia solo tiene un horario
        // Sacar horas y minutos, vienen en formato hh:mm
        open_2 = open_2.split(":")
        // Hora de apertura
        let open_2_hora = open_2[0]
        // Pasar a minutos
        open_2_hora = parseInt(open_2_hora, 10) * 60
        let open_2_minutes = parseInt(open_2[1], 10)
        // Sacar horario de cierre
        close_2 = close_2.split(":")
        let close_2_hora = parseInt(close_2[0], 10) * 60
        let close_2_minutes = parseInt(close_2[1], 10)
        close_2 = close_2_hora + close_2_minutes
        let x = company.service_duration; //minutes interval
        let tt = open_2_hora + open_2_minutes; // start time
        let ap = ['AM', 'PM']; // AM-PM
        // loop to increment the time and push results in array
        for (i; tt < close_2; i++) {
            let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            let mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
    }
    // Sunday
    //Sacar hora y minutos de inicio y pasar to\do a minutos
    open_1 = company.schedule.sunday.open_1
    close_1 = company.schedule.sunday.close_1
    // La compañia solo tiene un horario
    // Sacar horas y minutos, vienen en formato hh:mm
    open_1 = open_1.split(":")
    // Hora de apertura
    open_1_hora = open_1[0]
    // Pasar a minutos
    open_1_hora = parseInt(open_1_hora,10) * 60
    open_1_minutes = parseInt(open_1[1],10)
    // Sacar horario de cierre
    close_1 = close_1.split(":")
    close_1_hora = parseInt(close_1[0], 10)*60
    close_1_minutes = parseInt(close_1[1],10)
    close_1 = close_1_hora + close_1_minutes
    x = company.service_duration; //minutes interval
    tt = open_1_hora + open_1_minutes; // start time
    ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (i;tt<close_1; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    if (company.schedule.sunday.open_2) {
        // La compañia tiene doble horario
        let open_2 = company.schedule.sunday.open_2
        let close_2 = company.schedule.sunday.close_2
        // La compañia solo tiene un horario
        // Sacar horas y minutos, vienen en formato hh:mm
        open_2 = open_2.split(":")
        // Hora de apertura
        let open_2_hora = open_2[0]
        // Pasar a minutos
        open_2_hora = parseInt(open_2_hora, 10) * 60
        let open_2_minutes = parseInt(open_2[1], 10)
        // Sacar horario de cierre
        close_2 = close_2.split(":")
        let close_2_hora = parseInt(close_2[0], 10) * 60
        let close_2_minutes = parseInt(close_2[1], 10)
        close_2 = close_2_hora + close_2_minutes
        let x = company.service_duration; //minutes interval
        let tt = open_2_hora + open_2_minutes; // start time
        let ap = ['AM', 'PM']; // AM-PM
        // loop to increment the time and push results in array
        for (i; tt < close_2; i++) {
            let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            let mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
    }
    return times
}

module.exports = { update_time_slots };