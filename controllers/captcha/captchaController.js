/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let getKey = async (req, res)=> {
    try {
        let captchakey = {
            key:'REACT_APP_RECAPTCHA_API_KEY=6Lex_bsaAAAAACKiXxmQjXQChbZJi02Ad1tzYAmB'
        }
        res.status(200).send(captchakey);
    }
    catch (e) {
        res.status(500).send({error : "Internal server error,something was wrong get the key"});
        console.log("ERROR while get the captcha key: " +e);
    }

}

exports.getKey  = getKey