const db = require("../Database/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

function loginUser(req, res) {
    const userMailOrPhone = req.body.userMailOrPhone
    const userPasswd = req.body.userPasswd

    // KULLANICININ MAİLİ VEYA TELEFON NUMARASI EŞLEŞİYOR MU DİYE KONTROL EDER
    db.query("SELECT * FROM users WHERE email = ? OR phone = ?", [userMailOrPhone, userMailOrPhone], (err, response) => {
        // EŞLEŞME VARSA BURASI ÇALIŞIR
        try {
            if (err) return console.log(err)
            if (response.length > 0) {
                // KULLANICINI HESABINI DOĞRULAMAMIŞ İSE BURASI ÇALIŞIR
                if (response[0].approved == 0) {
                    res.json({ data: 4 });
                }
                // DOĞRULANMIŞ İSE BURASI ÇALIŞIR
                else {
                    // HASHLENMİŞ PAROLA İLE KULLANICININ GİRDİĞİ PAROLANIN KARŞILAŞTIRILDIĞI YER
                    bcrypt.compare(userPasswd, response[0].passwd, (err, result) => {
                        if (err) {
                            console.error('Karşılaştırma hatası:', err);
                            return;
                        }

                        // ŞİFRE EŞLEŞİYORSA BURASI ÇALIŞIR
                        if (result) {
                            const data = response[0]
                            const token = jwt.sign({ data }, 'user_secret_key', { expiresIn: '1h' });
                            res.json({ data: 1, token: token });
                        } else {
                            res.json({ data: 2 });
                        }
                    });
                }
            }
            // EŞLEŞME YOKSA BURASI ÇALIŞIR
            else {
                res.json({ data: 3 })
            }
        } catch (err) {
            console.log(err)
        }
    })
}

function loginAdmin(req, res) {
    const username = req.body.username
    const passwd = req.body.passwd

    db.query("SELECT * FROM admin WHERE username = ? AND password_hash = ?", [username, passwd], (err, response) => {
        if (response.length > 0) {
            const data = response[0]
            const token = jwt.sign({ data }, 'admin_secret_key', { expiresIn: '1h' });
            res.json({ data: 1, token: token });
        }
        else {
            res.json({ data: 2 })
        }
    })
}

module.exports = { loginUser, loginAdmin }