'use client';
import React, { useRef, useState } from 'react';
import '../globals.css'
import './page.css'
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');

const Register = () => {
    const [logo, setLogo] = useState("/logo.png");
    const [bgImage, setBgImage] = useState("/bg-image.jpg");

    const refUsername = useRef();
    const refPhone = useRef();
    const refMail = useRef();
    const refPassword = useRef();
    const refRePassword = useRef();
    const refName = useRef();
    const refSurname = useRef();
    const userRegMessage = useRef();

    function btnSubmit() {

        // Input değerlerini variableye atama
        const username = refUsername.current.value;
        const userPhone = refPhone.current.value;
        const userMail = refMail.current.value;
        const userPassword = refPassword.current.value;
        const userRePassword = refRePassword.current.value;
        const userName = String(refName.current.value).toUpperCase();
        const userSurname = String(refSurname.current.value).toUpperCase();

        // Hesap doğrulama kodu oluşturma fonskiyonu
        function createApprovedCode() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        // Şifre ve Şifre Tekrar Inputlarının doğrulandığı yer
        if (userPassword == userRePassword) {
            userRegMessage.current.innerHTML = "";
            const Approved = createApprovedCode();
            // Girilin Inputların tümünün dolu olma kontrolünün yapıldığı yer
            if (!username || !userPhone || !userMail || !userPassword || !userRePassword || !userName || !userSurname) {
                userRegMessage.current.innerHTML = "";
                userRegMessage.current.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        Tüm alanlar dolu olmalıdır!
                    </div>
                `;
            }
            else {
                // Sunucu tarafına post isteği
                axios.post(process.env.NEXT_PUBLIC_SERVER + "/register-user", {
                    username,
                    userPhone,
                    userMail,
                    userPassword,
                    userName,
                    userSurname,
                    Approved,
                    sessionid: uuidv4()
                }).then(response => {
                    // Kayıt işlemi başarılıysa response 1 döner
                    if (response.data == 1) {
                        userRegMessage.current.innerHTML = "";
                        userRegMessage.current.innerHTML = `
                            <div class="alert alert-success" role="alert">
                                Kayıt işlemi başarıyla tamamlandı!
                            </div>
                        `;
                    }
                    // Kayıt işlemi başarısızsa response 2 döner
                    else if (response.data == 2) {
                        userRegMessage.current.innerHTML = "";
                        userRegMessage.current.innerHTML = `
                            <div class="alert alert-danger" role="alert">
                                Kayıt işlemi sırasında bir hata meydana geldi!
                            </div>
                        `;
                    }
                    // Mail veya telefon kullanılıyorsa response 3 döner
                    else if (response.data == 3) {
                        userRegMessage.current.innerHTML = "";
                        userRegMessage.current.innerHTML = `
                            <div class="alert alert-danger" role="alert">
                                Bu mail adresi veya telefon zaten kullanılmaktadır!
                            </div>
                        `;
                    }
                })
            }
        }
        else {
            // Şifreler aynı değilse burası çalışır!
            userRegMessage.current.innerHTML = "";
            userRegMessage.current.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Şifreler aynı olmalıdır!
                </div>
            `;
        }
    }

    return (
        <>
            <div className="container py-5 h-100" style={{ minHeight: '100vh' }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src={bgImage}
                                        alt="login form"
                                        className="img-fluid"
                                        style={{ borderRadius: '1rem 0 0 1rem', height: '100%', width: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <div style={{ backgroundColor: "black" }}>
                                            <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <img style={{ width: "250px" }} src={logo} alt="Logo" />
                                            </div>
                                        </div>
                                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Hesabını Oluştur</h5>
                                        <div className="form-outline mb-1">
                                            <input
                                                ref={refUsername}
                                                type="text"
                                                id="username"
                                                className="form-control"
                                                placeholder='Kullanıcı Adı'
                                            />
                                        </div>
                                        <div className="form-outline mb-1">
                                            <input
                                                ref={refMail}
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                placeholder='E-Mail'
                                            />
                                        </div>
                                        <div className="form-outline mb-1">
                                            <input
                                                ref={refPhone}
                                                type="text"
                                                id="phone"
                                                className="form-control"
                                                placeholder='Telefon'
                                            />
                                        </div>
                                        <div className="form-outline mb-1">
                                            <input
                                                ref={refName}
                                                type="text"
                                                id="firstname"
                                                className="form-control"
                                                placeholder='Ad'
                                            />
                                        </div>
                                        <div className="form-outline mb-1">
                                            <input
                                                ref={refSurname}
                                                type="text"
                                                id="lastname"
                                                className="form-control"
                                                placeholder='Soyad'
                                            />
                                        </div>
                                        <div className="form-outline mb-1">
                                            <input
                                                ref={refPassword}
                                                type="password"
                                                id="passwd"
                                                className="form-control"
                                                placeholder='Şifre'
                                            />
                                        </div>
                                        <div className="form-outline mb-1">
                                            <input
                                                ref={refRePassword}
                                                type="password"
                                                id="repasswd"
                                                className="form-control"
                                                placeholder='Şifre Tekrar'
                                            />
                                        </div>
                                        <div ref={userRegMessage}>

                                        </div>
                                        <div className="pt-1 mb-2">
                                            <button
                                                onClick={btnSubmit}
                                                className="btn btn-dark btn-block"
                                                type="button"
                                            >
                                                Kayıt Ol
                                            </button>
                                        </div>
                                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                            Zaten bir hesaba sahip misin? <a href="/login" style={{ color: '#393f81' }}>Giriş Yap</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
