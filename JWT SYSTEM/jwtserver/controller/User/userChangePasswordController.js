const db = require("../Database/db.js");
const bcrypt = require('bcrypt');

function userChangePassword(req, res) {
    const { userPassword, userID, sessionid } = req.body
    const saltRounds = 10; // Hash için kullanılacak tuzun tur sayısı
    bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
        db.query("UPDATE users SET passwd = ? WHERE user_id = ? AND sessionid = ?", [hashedPassword, userID, sessionid], (err, data) => {
            if (!err) {
                res.send("1");
            }
            else {
                console.log(err)
                res.send("2");
            }
        })
    });
}

module.exports = userChangePassword;