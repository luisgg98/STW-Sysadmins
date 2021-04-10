const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

//It necessary to have previously a private key to cypher
// the JWT token
const pathToKey = path.join(__dirname, '..', 'scripts','id_rsa_priv.pem');
// The main idea is to have randomly created a file which contains
//this necessary keys

const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
    let salt = crypto.randomBytes(32).toString('hex')
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    // In Computer Security our teacher told us something about it
    return {
        salt: salt,
        hash: genHash
    }
}


/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
// User can be a company
function issueJWT(user) {
    // TODO CHECK THE WHAT IS AND ID IN MONGODB
    const _id = user._id;
    // In a day the token will be useless
    const expiresIn = '1d';
    // The payload of the token
    const payload = {
        sub: _id,
        iat: Date.now()
    };
    // Signedtoken, (like the certificates in the Distributed Systems)
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;