const db = require("./auth-model")

module.exports = {
    validateUserId: function (req, res, next) {
        const {id} = req.params
        db.getById(id)
        .then(user => {
            if(user) {
                req.id = user
                next()
            } else {
                res.status(404).json({message: "Could not find a user with that ID"})
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    validateUser: function(req,res,next) {
        const body = req.body
        const username = req.body.username
        const password = req.body.password

        if(!body) {
            res.status(400).json({error: "Missing user data"})
        } else if(!username) {
            res.status(400).json({error: "Missing required name field"})
        } else if(!password) {
            res.status(400).json({error: "Missing required password field"})
        } else {
            next()
        }
    }
}