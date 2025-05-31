const express = require("express");
const router = express.Router();
const register = require("./../controller/Auth/registerController.js")
const login = require("./../controller/Auth/loginController.js");
const check = require("./../controller/Auth/jwtCheckController.js");
const verification = require("./../controller/Auth/userVerificationController.js");
const forgotPassword = require("./../controller/Auth/forgotPasswordController.js");

// KULLANICI KAYIT BÖLÜMÜ
router.post("/register-user", (req, res) => {
    register.userRegister(req, res);
})


// KULLANICI GİRİŞİ
router.post("/login", (req, res) => {
    login.loginUser(req, res)
})

// ADMİN GİRİŞİ
router.post("/admin-login", (req, res) => {
    login.loginAdmin(req, res)
})

// KULLANICI GİRİŞ YAPTI MI KONTROLÜ
router.post("/check-user", (req, res) => {
    check.checkUser(req, res)
})

// ADMİN GİRİŞ YAPTI MI KONTROLÜ
router.post("/check-admin", (req, res) => {
    check.checkAdmin(req, res)
})

// KULLANICI HESAP ONAYLAMA
router.post("/verification", (req, res) => {
    verification(req, res)
})

// KULLANICIYA ŞİFRE YENİLEME MAİLİ GÖNDERME
router.post("/user-forgot-password-send-mail", (req, res) => {
    forgotPassword.userSendPasswordMail(req, res)
})

// KULLANICI ŞİFRE SIFIRLAMA
router.post("/user-forgot-change-password", (req, res) => {
    forgotPassword.userChangePassword(req, res)
})

module.exports = router;