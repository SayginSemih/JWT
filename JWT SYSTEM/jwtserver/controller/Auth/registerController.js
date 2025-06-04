const db = require("../Database/db.js");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const fs = require('fs');
dotenv.config();
const mailService = require("./../../controller/Mail/MailController.js");

function userRegister(req, res) {
    const saltRounds = 10; // Hash için kullanılacak tuzun tur sayısı
    const userPassword = req.body.userPassword;

    // ŞİFREYİ HASH ETME YERİ
    bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
        const newUser = {
            username: req.body.username,
            phone: req.body.userPhone,
            email: req.body.userMail,
            passwd: hashedPassword,
            name: req.body.userName,
            surname: req.body.userSurname,
            approved_code: req.body.Approved,
            sessionid: req.body.sessionid
        };

        if (err) {
            console.error('Hashleme sırasında hata oluştu:', err);
        } else {
            // BU KULLANICI ADI VEYA E-MAİL DAHA ÖNCEDEN KULLANILMIŞ MI KONTROLÜ
            db.query("SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?", [newUser.username, newUser.email, newUser.phone], (err1, res1) => {
                if (res1.length > 0) {
                    console.log("Bu Kullanıcı Adı, E-Mail veya Telefon zaten kullanılmaktadır!")
                    res.send("3")
                }
                else {
                    // INSERT INTO TELEFON EKLEME
                    db.query('INSERT INTO users SET ?', newUser, (err2, result) => {
                        if (!err2) {
                            // Mail Gönderme
                            mailService.userRegisterMail(newUser.username, newUser.approved_code, newUser.email);
                            console.log("Veritabanına kayıt işlemi başarılı!");
                            res.send("1")
                        }
                        else {
                            console.log(err2)
                            console.log("Veritabanına kayıt işlemi başarısız!");
                            res.send("2")
                        }
                    });
                }
            })
            // Hashlenmiş parolayı veritabanına kaydetme veya başka bir işlem yapma
        }
    });
}

module.exports = { userRegister }