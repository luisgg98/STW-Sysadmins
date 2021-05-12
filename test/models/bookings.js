const assert = require('chai').assert;
const Booking = require('../../models/booking');
require('../../config/database')

const bookingsArray = [
    {
        user_id: 'aaa',
        service_id: 'aaa',
        company_nif: 'aaa',
        date: '{type: String, required: true}',
        time: '{type: String, required: true}}'
    },
    {
        user_id: 'aaa',
        service_id: 'aaa',
        company_nif: 'aaa',
        date: '{type: String, required: true}',
        time: '{type: String, required: true}}'
    },
    {
        user_id: 'aaa',
        service_id: 'aaa',
        company_nif: 'aaa',
        date: '{type: String, required: true}',
        time: '{type: String, required: true}}'
    }
]

describe('Booking model tests', function(){
    before(function(done){
        let numBookingsCreated = 0
        bookingsArray.forEach(function (BookingData){
            let booking = new Booking(BookingData)
            booking.save(function(error, booking){
                if(error)throw error;
                numBookingsCreated++
                if (numBookingsCreated === bookingsArray.length){
                    done()
                }
            })
        })
    })
    after(function (done){
        let numBookingsRemoved = 0
        bookingsArray.forEach(function (BookingData){
            Booking.findOneAndDelete({user_id: BookingData.user_id}, function(err, doc){
                if (err) throw err
                numBookingsRemoved++
                if (numBookingsRemoved === (bookingsArray.length-1)){
                    done()
                }
            })
        })
    })
    it('Should find all bookings withour error', function(done){
        Booking.count(function (err, count){
            assert.isAtLeast(count,3)
            done()
        })
    })
    it('Should find a booking by date', function (done){
        Booking.findOne({date: bookingsArray[0].date}, function(err, booking){
            if (err) throw err
            assert.isNotNull(booking)
            done()
        })
    })
    it('Should change the date of a booking', function(done){
        Booking.findOneAndUpdate({date: bookingsArray[0].date}, {date: '8'}, {returnOriginal: false, upsert: true, new: true}, function(err, booking){
            if (err) throw err
            assert.isNotNull(booking)
            assert.equal(booking.date, '8')
            bookingsArray[0].date = '8'
            done()
        })
    })
    it('Should delete a booking by date', function(done){
        Booking.findOneAndRemove({date: bookingsArray[0].date}, function(err,booking){
            if (err) throw err
            assert.isNotNull(booking)
            done()
        })
    })
})