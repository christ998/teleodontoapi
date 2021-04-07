const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
    const token = req.header('x-access-token')
    if (!token) return res.status(401).send("Accès refusé, Vous n'avez pas de token")
    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).send("Le token n'est pas valide || Token isn't valid")
    }
}
module.exports = verifyToken