const Company = require('../../models/company');
const Opinion = require('../../models/opinions');
const User = require('../../models/user');
const Vote = require('../../models/vote');
const jwt_login_strategy= require('../../config/passport');

/**
 *
 * @param stars
 * @returns {*}
 */
function prepareStars(stars) {
    if(stars > 5){
        stars = 5;
    }
    if(stars < 0){
        stars = 0
    }
    return stars;
}

/**
 *
 * @param opinion_id
 * @param user_id
 * @returns {*}
 */
function findOwner(opinion_id,user_id) {
    return new Promise((resolve, reject) => {
        Opinion.findOne({user_id: user_id,opinion_id: opinion_id},{},
            {}, function (err, doc) {
            if(err){
                reject(false)
            }
            else{
                if(doc){
                    return resolve(true)
                }
                else{
                    return reject(false)
                }
            }

        })
    });


}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let write_opinion = async (req, res, next)=> {
    try{
        const starts = prepareStars(req.body.stars);
        Company.findOne({ nif: req.params.nif},{},{},
            async function (err, company) {
            if(err){
                throw err;
            }
            else{
                if(company){
                    User.findOne({_id:req.body.user_id},{},{},
                         function (err, user) {
                            if(err){
                                throw err;
                            }
                            else{/**    first_name : { type: String, required: true},
                             last_name : { type : String, required: true},*/
                                if(user){
                                    let name_new = (user.first_name + ' ' + user.last_name);
                                    let today_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                                    const opinion = new Opinion({
                                        company_nif: req.params.nif,
                                        comment: req.body.comment,
                                        user_id: req.body.user_id,
                                        stars: starts,
                                        date:today_date,
                                        name: name_new,
                                        votes:0
                                    });
                                    opinion.save().then(()=>{
                                                res.send(opinion)});
                                }
                                else{
                                    res.status(404);
                                    console.log("Error while finding a user to give their opinion");
                                    res.send({error: "Error giving opinion, User not found"});

                                }

                            }
                    })
                }
                else{
                    res.status(404);
                    console.log("Error while finding a company to give their opinion");
                    res.send({error: "Error giving opinion, Company not found"});
                }
            }
        })

    }
    catch (e) {
        res.status(500);
        console.log("Error while creating a commet "+ e);
        res.send({error: "Internal server error"});
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let delete_opinion = async (req, res, next)=> {
    try{
        if(!findOwner(req.params.id, req.result._id)){
            res.status(401)
            res.send({ error: "Wrong User Access denied"})
        } else{
            Vote.deleteMany({opinion_id: req.result._id.toString()},{}
            ,async function (err){
                if(err){throw  err}
                else{
                    await Opinion.deleteOne({ _id: req.params.id })
                    res.status(204).send({ message: "Opinion removed"})
                }})
        }
    }
    catch (e) {
        res.status(500);
        console.log("Error while deleting an Opinion "+ e);
        res.send({error: "Internal server error, could not delete an Opinion"});
    }

}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let vote_opinion = async (req, res, next)=> {
    try{
        Opinion.findOne({ _id: req.params.id },{},{},
            async function (err, opinion) {
                if(err){
                    throw err;
                }
                else{ // opinion_id: {type: String, required: true},
                  //  user_id: {type: String, required: true}
                    if(opinion){
                        Vote.findOne({user_id: req.body.user_id,opinion_id: opinion._id},{},{},
                            async function (err, vote) {
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                else{
                                    if(!vote){
                                        let vote_add = new Vote({user_id: req.body.user_id.toString(), opinion_id: opinion._id.toString()});
                                        await vote_add.save().then( async ()=> {
                                            let new_vote = (opinion.votes + 1);
                                            opinion.votes = new_vote;
                                            await opinion.save()
                                                .then(() => {
                                                    let new_opinion = {
                                                        "comment": opinion.comment,
                                                        "user_id": opinion.user_id,
                                                        "stars": opinion.stars,
                                                        "date":opinion.date,
                                                        "name": opinion.name,
                                                        "votes":opinion.votes,
                                                        "liked": true
                                                    }
                                                    res.send(new_opinion);
                                                });
                                        })
                                    }
                                    else{
                                        res.status(401);
                                        console.log("Error while voting an Opinion, YOU HAVE ALREADY VOTE");
                                        res.send({error: "Error while voting an Opinion,STOP THE COUNT YOU HAVE ALREADY VOTE"});
                                    }
                                }
                        });
                    }
                    else{
                        res.status(404);
                        console.log("Error while voting an Opinion, could find not the Opinion");
                        res.send({error: "Internal server error, could find not the Opinion"});
                    }
                }

        });
    }
    catch (e) {
        res.status(500);
        console.log("Error while voting an Opinion" + e);
        res.send({error: "Internal server error, could not vote an Opinion"});
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let get_opinion = async (req, res, next)=> {
    try{
        Opinion.find({company_nif: req.params.nif},{},{},

            async function (err, opinions){
                if(err){
                    throw err;
                }
                else{
                    if(opinions){
                        let id = req.query.user_id;
                        let votes_user=[]
                        //Try to find if the user has already voted it
                        if(id){
                            votes_user = await Vote.find({user_id:req.query.user_id},{},{});
                        }
                        let new_opinions = []
                        // for each opinion add if it is voted or not
                        for(let i =0; i<opinions.length; i++){
                            let liked = false
                            let opinion_id =opinions[i]._id
                            //Check if exists in the user votes
                            if(votes_user != [] && votes_user!=undefined && votes_user.length>0){
                                let j = 0;
                                while(!liked && (j<votes_user.length)){
                                    let vote_id = votes_user[j].opinion_id;
                                    if( vote_id == opinion_id){
                                        liked = true
                                        //remove the votes_user in order no to check it again
                                        const index = votes_user[j];
                                        votes_user.splice(index, 1);
                                    }
                                    j++;
                                }
                            }
                            console.log(opinions[i])
                            new_opinions[i] = {
                                "comment": opinions[i].comment,
                                "user_id": opinions[i].user_id,
                                "stars": opinions[i].stars,
                                "date":opinions[i].date,
                                "name": opinions[i].name,
                                "votes":opinions[i].votes,
                                "liked": liked
                            }
                        }
                        res.send(new_opinions);
                    }
                    else{
                        res.status(404);
                        res.send({error: "Opinions not found"});
                    }
                }
        })
    }
    catch (e) {
        res.status(500);
        console.log("Error while getting opinions " + e);
        res.send({error: "Internal server error, could get all opinions"});
    }
}

exports.write_opinion = write_opinion
exports.vote_opinion = vote_opinion
exports.delete_opinion= delete_opinion
exports.get_opinion = get_opinion
