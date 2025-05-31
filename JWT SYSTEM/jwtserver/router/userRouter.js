const express = require("express");
const router = express.Router();
const userUpdate = require("./../controller/User/userUpdateController.js");
const userChangePassword = require("./../controller/User/userChangePasswordController.js");


// KULLANICI BİLGİLERİNİ GÜNCELLEME
router.post("/user-update", (req, res) => {
    userUpdate(req, res);
})

// KULLANICI ŞİFRE GÜNCELLEME
router.post("/user-changepassword", (req, res) => {
    userChangePassword(req, res);
})

module.exports = router;