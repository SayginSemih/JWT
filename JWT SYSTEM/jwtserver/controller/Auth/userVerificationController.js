const db = require("../Database/db.js");
const dotenv = require('dotenv');
dotenv.config();

function userVerification(req, res) {
    const username = req.body.username;
    const approvedcode = req.body.approvedcode;
    console.log(username + " " + approvedcode)

    // REACT TARAFINDAN GELEN UNIQUE CODE VE APPROVED CODE Yİ KULLANICI İLE EŞLEŞTİRİR
    db.query("SELECT * FROM users WHERE username = ? AND approved_code = ?", [username, approvedcode], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                // EŞLEŞME VARSA HESABI DOĞRULAR
                db.query("UPDATE users SET approved = 1 WHERE username = ?", [username], (err2, data2) => {
                    res.send("1")
                })
            }
            else {
                res.send("2");
            }
        }
        else {
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = userVerification;