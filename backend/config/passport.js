const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
// TODO MUST BE CHANGED according to our database
const User = require('mongoose').model('user');

// The idea is to have a file where the public key and the private
// key are stored
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
//It reads the keys from the file
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// TODO create the file to generate the key and talk to frontend
const options = {
    //The token must be in the header as an access token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // It will use as a secret the public key
    // It is for verification
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

//We pass the options and what we want to verify
//We have said that the want to verify using the public key and
// check if there is a token in the header
// app.js will pass the global passport object here, and this function will configure it

module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        //Shown on the console the payload of the token
        console.log(jwt_payload);
        // We will assign the `sub` property on the JWT to the database ID of user
        //TODO WHAT IS AN ID IN MONGODB
        User.findOne({_id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });

    }));
}