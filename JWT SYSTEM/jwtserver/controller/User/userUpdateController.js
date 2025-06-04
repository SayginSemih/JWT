const db = require("../Database/db.js");
const jwt = require("jsonwebtoken")

function userUpdate(req, res) {
    const { userUserName, userName, userSurname, userMail, userPhone, userID, sessionid } = req.body;
    try {
        db.query("SELECT * FROM users WHERE username = ? AND user_id != ?", [userUserName, userID], (currenterr, current) => {
            if (currenterr) {
                return console.log(currenterr)
            }

            if (current.length > 0) {
                return res.send({ status: 3 })
            } else {
                const newData = {
                    username: userUserName,
                    name: userName,
                    surname: userSurname,
                    email: userMail,
                    phone: userPhone
                }
                db.query("UPDATE users SET ? WHERE user_id = ? AND sessionid = ?", [newData, userID, sessionid], (err, data) => {
                    if (!err) {
                        db.query("SELECT * FROM users WHERE user_id = ?", [userID], (jwterr, jwtdata) => {
                            const data = jwtdata[0]
                            const token = jwt.sign({ data }, 'user_secret_key', { expiresIn: '1h' });
                            return res.json({ status: 1, token: token })
                        })
                    }
                    else {
                        console.log(err)
                        return res.send({ status: 2 })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err)
        return res.send({ status: 2 })
    }
}

module.exports = userUpdate;