const Company = require('../../models/company');
const Opinion = require('../../models/opinions');
const User = require('../../models/user');
const Vote = require('../../models/vote');

/**
 *
 * @param stars
 * @returns {*}
 */
function prepareStars(stars) {
    if (stars > 5) {
        stars = 5;
    }
    if (stars < 0) {
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
function findOwner(opinion_id, user_id) {
    return new Promise((resolve, reject) => {
        Opinion.findOne({user_id: user_id, opinion_id: opinion_id}, {},
            {}, function (err, doc) {
                if (err) {
                    reject(false)
                } else {
                    if (doc) {
                        return resolve(true)
                    } else {
                        return reject(false)
                    }
                }
            })
    });
}

/**
 *
 * @param message
 * @param e
 */
function sendInternalError(message, e, res) {
    res.status(500).send({error: message});
    console.log(e);
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let write_opinion = async (req, res, next) => {
    try {
        const starts = prepareStars(req.body.stars);
        Company.findOne({nif: req.params.nif}).then((company) => {
            if (company) {
                User.findOne({_id: req.body.user_id}).then((user) => {
                    if (user) {
                        let name_new = (user.first_name + ' ' + user.last_name);
                        let today_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        const opinion = new Opinion({
                            company_nif: req.params.nif,
                            comment: req.body.comment,
                            user_id: req.body.user_id,
                            stars: starts,
                            date: today_date,
                            name: name_new,
                            votes: 0
                        });
                        opinion.save().then(() => {
                            res.status(201).send(opinion)
                        }).catch((e) => {
                            res.status(405).send({error: "Wrong json format, check docs for further info /api-doc"})
                        })
                    } else {
                        res.status(404).send({error: "Error giving opinion, User not found"});
                    }
                }).catch(() => {
                    sendInternalError("Internal server error, User not found", "Error while finding a user to give their opinion", res)
                })
            } else {
                res.status(404).send({error: "Error giving opinion, Company not found"});
            }
        }).catch((e) => {
            sendInternalError("Error giving opinion, Company not found", "Error while finding a company to give their opinion", res);
        })
    } catch (e) {
        sendInternalError("Internal server error", "Error while creating a commet " + e, res)
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let delete_opinion = async (req, res, next) => {
    if (!findOwner(req.params.id, req.result._id)) {
        res.status(401)
        res.send({error: "Wrong User Access denied"})
    } else {
        Vote.deleteMany({opinion_id: req.result._id.toString()}).then(() => {
            Opinion.deleteOne({_id: req.params.id}).then(() => {
                res.status(204).send({message: "Opinion removed"})
            }).catch(() => {
                res.status(404).send({error: "Not found Opinion"});
            })
        }).catch((e) => {
            sendInternalError("Internal server error, could not delete an Opinion", "Error while deleting an Opinion " + e, res);
        })
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let vote_opinion = async (req, res, next) => {
    Opinion.findOne({_id: req.params.id})
        .then((opinion) => {
            if (opinion) {
                Vote.findOne({user_id: req.body.user_id, opinion_id: opinion._id})
                    .then((vote) => {
                        if (!vote) {
                            let vote_add = new Vote({
                                user_id: req.body.user_id.toString(),
                                opinion_id: opinion._id.toString()
                            });
                            vote_add.save().then(async () => {
                                let new_vote = (opinion.votes + 1);
                                opinion.votes = new_vote;
                                await opinion.save()
                                    .then(() => {
                                        let new_opinion = {
                                            "_id": opinion._id,
                                            "comment": opinion.comment,
                                            "user_id": opinion.user_id,
                                            "stars": opinion.stars,
                                            "date": opinion.date,
                                            "name": opinion.name,
                                            "votes": opinion.votes,
                                            "liked": true
                                        }
                                        res.send(new_opinion);
                                    }).catch((e) => {
                                        res.status(405).send({error: "Wrong json format, check docs for further info /api-doc"})
                                    });
                            }).catch((e) => {
                                res.status(405).send({error: "Wrong json format, check docs for further info /api-doc"})
                            });
                        } else {
                            res.status(401).send({error: "Error while voting an Opinion,STOP THE COUNT YOU HAVE ALREADY VOTE"});
                            console.log("Error while voting an Opinion, YOU HAVE ALREADY VOTE");
                        }
                    })
                    .catch((e) => {
                        res.status(404).send({error: "Internal server error, could find not the Opinion"});
                        console.log("Error while voting an Opinion, could find not the Opinion");
                    })
            } else {
                res.status(404).send({error: "Could find not the Opinion"});
            }
        })
        .catch(() => {
            sendInternalError("Internal server error, could find not the Opinion", "Error while voting an Opinion, could find not the Opinion", res);
        })
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let get_opinion = async (req, res, next) => {
    Opinion.find({company_nif: req.params.nif}).then(async (opinions) => {
        if (opinions) {
            let id = req.query.user_id;
            let votes_user = []
            //Try to find if the user has already voted it
            if (id) {
                votes_user = await Vote.find({user_id: req.query.user_id}, {}, {});
            }
            let new_opinions = []
            // for each opinion add if it is voted or not
            for (let i = 0; i < opinions.length; i++) {
                let liked = false
                let opinion_id = opinions[i]._id
                //Check if exists in the user votes
                if (votes_user != [] && votes_user != undefined && votes_user.length > 0) {
                    let j = 0;
                    while (!liked && (j < votes_user.length)) {
                        let vote_id = votes_user[j].opinion_id;
                        if (vote_id == opinion_id) {
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
                    "_id": opinions[i]._id,
                    "comment": opinions[i].comment,
                    "user_id": opinions[i].user_id,
                    "stars": opinions[i].stars,
                    "date": opinions[i].date,
                    "name": opinions[i].name,
                    "votes": opinions[i].votes,
                    "liked": liked
                }
            }
            res.send(new_opinions);
        } else {
            res.status(404).send({error: "Opinions not found"});
        }

    }).catch(() => {
        res.status(500).send({error: "Internal error server"});
    })
}

exports.write_opinion = write_opinion
exports.vote_opinion = vote_opinion
exports.delete_opinion = delete_opinion
exports.get_opinion = get_opinion
