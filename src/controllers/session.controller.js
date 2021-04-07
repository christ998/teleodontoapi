const {sendResponse} = require('../utils/responseHandler');
const {mysql} = require('../_config/mysql')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
const privateKey = fs.readFileSync('rsa_2048_private_key.pem', {encoding: "utf8"});
const secret = process.env.SECRET;

const sessionCtrl = {}

const decypher = passenc => {
    const rsaPrivateKey = {
        key: privateKey,
        passphrase: '',
        padding: crypto.constants.RSA_PKCS1_PADDING,
    };
    let dec = crypto.privateDecrypt(
        rsaPrivateKey,
        Buffer.from(passenc, 'base64'),
    );
    return dec
}
sessionCtrl.verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send("Vous n'êtes pas connecté")
    } else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.json({auth: false, message: "You failed to authenticate"})
            } else {
                req.userId = decoded.id
                res.send("Token est valide")
                console.log("Todo bien")
                next()
            }
        })
    }
}

sessionCtrl.login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(password)
    mysql.query(
        "SELECT cr.user_id,cr.run, cr.password, user.names, user.user_type_id FROM credentials cr INNER JOIN user on cr.user_id = user.user_id WHERE NOT user.user_type_id =1 AND (cr.run= ? OR cr.run=REPLACE(?,'-',''))",
        [username, username],
        (err, result) => {
            if (err) {
                console.log(err)
                res.send({err: err})
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, resultado) => {
                    if (resultado) {
                        console.log("pass aceptada")
                        const id = result[0].user_id
                        const names = result[0].names
                        req.session.user = result;
                        const token = jwt.sign({id, names}, process.env.SECRET, {expiresIn: 28800})
                        res.json({auth: true, token: token, result: result, message: "tu t'es connecté"})
                    } else {
                        console.log("pass errada")
                        res.send("Contraseña Incorrecta")
                    }
                })
            } else {
                console.log("No resultados")
                res.json({auth: false, message: "No user exists"})
            }
        }
    )
}
sessionCtrl.loginMobile = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const passwordLimpia = password.replace("-","")
    mysql.query(
        "SELECT cr.user_id,cr.run, cr.password FROM credentials cr INNER JOIN user on cr.user_id = user.user_id WHERE user.user_type_id =1 AND (cr.run= ? OR cr.run=REPLACE(?,'-',''))",
        [username, username],
        (err, result) => {
            if (err) {
                console.log(err)
                res.send({err: err})
            }

            if (result.length === 1) {
                bcrypt.compare(passwordLimpia, result[0].password, (err, resultado) => {
                    if (resultado) {
                        const id = result[0].user_id
                        req.session.user = result;
                        const token = jwt.sign({id}, process.env.SECRET, {expiresIn: 28800})
                        res.json({auth: true, token: token, result: result, message: "tu t'es connecté"})
                    } else {
                        res.send("Contraseña Incorrecta")
                    }
                })
            } else if (result.length === 0) {
                res.json({auth: false, message: "No user exists"})
            } else {
                res.send("Más de 1 usuario")
                console.log("Mas de 1 usuario")
            }
        }
    )
}
sessionCtrl.logout = (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    req.session.destroy()
    console.log(req.session)
    res.send("Vous êtes déconnecté || you have logged out")

}

// sessionCtrl.login = async (req, res) => {
//     const { run, passenc } = req.body
//     let pass = passenc;
//     mysql.query(
//         "SELECT u.run, u.names, u.user_id, ut.name as 'rol'" +
//         "FROM user u JOIN credentials c ON u.user_id = c.user_id " +
//         "JOIN user_type ut ON u.user_type_id = ut.user_type_id " +
//         "WHERE c.run = ? AND c.password = ? " ,
//         [run, pass],
//         function (error, result) {
//             if (error) {
//                 sendError(res, "TaskFailed", error)
//                 console.log("Line 37");
//             } else {
//                 if (!result.length) {
//                     sendError(res, "Not Found", {mesage: "Credenciales Incorrectas"}, 200)
//                 } else {
//                     generateJwt(result[0].user_id, result[0].rol, result[0].names, res)
//                     //sendError(res, "Not Found", {mesage: "Credenciales Incorrectas"}, 200)
//                 };
//             };
//         }
//     );
// };

sessionCtrl.refresh = async (req, res) => {
    const {token, refreshToken, names} = req.body
    //decode refresh token contents
    jwt.verify(refreshToken, secret, function (err, decToken) {
        //catch verification error
        if (err) {
            sendError(res, "TaskFailed", err)
            //assert decoded contents match the supplied auth token
        } else if (token !== decToken) {
            sendError(res, "TaskFailed", {message: "Incorrect token decoded"})
        } else {
            //decode and verify auth token
            jwt.verify(token, secret, function (err2, decoded) {
                //catch verification error
                if (err2) {
                    sendError(res, "TaskFailed", err2)
                } else {
                    generateJwt(decoded.id, decoded.role, names, res)
                }
            })
        }
    })
}

sessionCtrl.verify = async (req, res) => {
    const {token} = req.body
    console.log(req.body)
    //decode auth token
    jwt.verify(token, secret, (err, decoded) => {
        //catch verification error
        if (err) {
            sendError(res, "Expired", err, 200)
        } else {
            //return user's role to verify his permission to access the contents
            sendResponse(res, false, "Success", decoded)
        }
    })
}

const generateJwt = async (id, role, names, res) => {
    //generate main Auth token with the user's Id and role
    jwt.sign({
        id: id, role: role
    }, secret, {
        expiresIn: '10m'
    }, function (err, token) {
        //catch error signing auth token 
        if (err) {
            sendError(res, "TaskFailed", err)
        } else {
            //generate refresh token, containing main auth token
            jwt.sign({
                token: token
            }, secret, {
                expiresIn: '30m'
            }, function (err2, refreshToken) {
                //catch error signing refresh token 
                if (err2) {
                    sendError(res, "TaskFailed", err2)
                } else {
                    //return the generated tokens plus the user's full name
                    const results = {
                        token: token,
                        refreshToken: refreshToken,
                        names: names
                    }
                    sendResponse(res, false, "Success", results)
                }
            })
        }
    })
}

const sendError = (res, message, result, status = 500) => {
    sendResponse(res, true, message, result, status)
}

module.exports = sessionCtrl