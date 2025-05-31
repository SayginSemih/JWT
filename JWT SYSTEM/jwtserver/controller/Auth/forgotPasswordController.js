const db = require("../Database/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();
const mailService = require("./../../controller/Mail/MailController.js");

function userSendPasswordMail(req, res) {
    const userMail = req.body.userMail;
    const cpcode = req.body.cpcode;
    db.query("SELECT * FROM users WHERE email = ?", [userMail], (err, data) => {
        if (data.length > 0) {
            const user = data[0];
            db.query("SELECT * FROM userscode WHERE user_id = ?", [user.user_id], (err2, data2) => {
                if (data2.length > 0) {
                    db.query("UPDATE userscode SET cpcode = ? WHERE user_id = ?", [cpcode, user.user_id], (err3, data3) => {
                        // Mail Gönderme
                        mailService.userForgotPasswdMail(user.unique_code, cpcode, userMail);
                        console.log("DATA GÜNCELLENDİ VE MAİL GÖNDERİLDİ")
                        res.send("1");
                    })
                }
                else {
                    const newData = {
                        cpcode: cpcode,
                        user_id: user.user_id
                    }

                    db.query("INSERT INTO userscode SET ?", newData, (err3, data3) => {
                        // Mail Gönderme
                        mailService.userForgotPasswdMail(user.user_id, cpcode, userMail);
                        console.log("DATA EKLENDİ VE MAİL GÖNDERİLDİ")
                        res.send("1");
                    })
                }

            })
        } else {
            res.send("2");
        }
    })
}

function userChangePassword(req, res) {
    const { cpcode, user_id, userPassword } = req.body;
    const saltRounds = 10; // Hash için kullanılacak tuzun tur sayısı
    db.query("SELECT * FROM users WHERE user_id = ?", [user_id], (err, data) => {
        const user = data[0];
        if (data.length > 0) {
            db.query("SELECT * FROM userscode WHERE cpcode = ? AND user_id = ?", [cpcode, user.user_id], (err2, data2) => {
                if (data2.length > 0) {
                    // ŞİFREYİ HASH ETME YERİ
                    bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {

                        if (err) {
                            console.error('Hashleme sırasında hata oluştu:', err);
                        } else {
                            db.query("UPDATE users SET passwd = ? WHERE user_id = ?", [hashedPassword, user.user_id], (err3, data3) => {
                                res.send("1");
                            })
                            // Hashlenmiş parolayı veritabanına kaydetme veya başka bir işlem yapma
                        }
                    });
                } else {
                    res.send("2");
                }
            })
        }
        else {
            res.send("2");
        }
    })
}

module.exports = { userSendPasswordMail, userChangePassword }