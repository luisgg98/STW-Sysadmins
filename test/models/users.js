const assert = require('chai').assert;
const User = require('../../models/user');
require('../../config/database')
const newname = 'Rodolfo Mascarpone'

const usersArray = [
    {first_name:'Bad Bunny', last_name :'1',phone:123456789,email:'ho@hol.com',password:'aaa',salt:'salty',category:'Testing'},
    {first_name:'Anuel',last_name :'2',phone:123456789,email:'ho@hol.com',password:'aaa',salt:'salty',category:'Testing'},
    {first_name:'Daddy Yankee', last_name :'3',phone:123456789,email:'ho@hol.com',password:'aaa',salt:'salty',category:'Testing'}];




describe('User model tests',function () {
    let usersID =[]
    before(function (done) {
        let numUserCreated = 0
        usersArray.forEach(function (UserData) {
            let user = new User(UserData);
            user.save(function (error,user) {
                if (error) throw  error;
                usersID.push(user._id);
                numUserCreated++;
                if (numUserCreated == usersArray.length){
                    done();
                }

            })

        })


    })
    after(function (done) {
        let numUserRemoved = 0
        usersArray.forEach(function (UserData) {
            User.findOneAndRemove({name: UserData.name},{},function (err, doc) {
                if (err) throw err;
                numUserRemoved++;
                if (numUserRemoved == (usersArray.length-1)){
                    done();
                }
                
            })
            
        })
        

    })

    it('Should find all users without error',function (done) {
        User.find(function (error, users) {
            assert.isAtLeast(users.length,3)
            done();

        })


    })

    it('Should find a user by name',function (done) {
        User.findOne({name:usersArray[1].name}, function (err,doc) {
            if (err) throw  err;
            assert.isNotNull(doc)
            done();

        })
    })

    it('Should change the name of a user',function (done) {
        User.findOneAndUpdate({first_name:usersArray[0].first_name},{first_name:newname},
            {returnOriginal:false, upsert:true, new:true},
            function (err,doc) {
                if(err){ throw err;}
                assert.isNotNull(doc);
                assert.equal(doc.first_name,newname);
                usersArray[0].first_name = newname;
                done();
            })
    })


    it('Should delete a user by name',function (done) {
        User.findOneAndRemove({name: usersArray[0].name},{},function (err, doc) {
            if (err) throw err;
            assert.isNotNull(doc)
            done();
        })
    })
    
})
