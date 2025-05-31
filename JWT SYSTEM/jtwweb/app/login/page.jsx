'use client';
import React, { useRef, useState } from 'react';
import '../globals.css'
import './login.css'
import axios from 'axios';

const LoginPage = () => {
    const [logo, setLogo] = useState("/logo.png");
    const [bgImage, setBgImage] = useState("/bg-image.jpg");

    const mailorphone = useRef();
    const passwd = useRef();
    const userLoginMessage = useRef();

    function btnLogin() {
        const userMailOrPhone = mailorphone.current.value;
        const userPasswd = passwd.current.value;

        if (!userMailOrPhone || !userPasswd) {
            userLoginMessage.current.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Tüm alanlar dolu olmalıdır!
                </div>
            `;
        }
        else {
            axios.post(process.env.NEXT_PUBLIC_SERVER + "/login", {
                userMailOrPhone,
                userPasswd
            }).then(response => {
                if (response.data.data == 1) {
                    localStorage.setItem("userToken", response.data.token)
                    window.location.href = "/";
                }
                else if (response.data.data == 2) {
                    userLoginMessage.current.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Parolanız hatalı!
                        </div>
                    `;
                }
                else if (response.data.data == 3) {
                    userLoginMessage.current.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Bu kullanıcı adı veya telefon numarası kullanılmıyor!
                        </div>
                    `;
                }
                else if (response.data.data == 4) {
                    userLoginMessage.current.innerHTML = `
                        <div class="alert alert-warning" role="alert">
                            Lütfen E-Mail adresinizden hesabınızı doğrulayınız!
                        </div>
                    `;
                }
            })
        }
    }

    return (
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
                                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Hesabına giriş yap</h5>
                                    <div className="form-outline mb-4">
                                        <input
                                            ref={mailorphone}
                                            type="text"
                                            id="emailorphone"
                                            className="form-control"
                                            placeholder='E-Mail veya Telefon'
                                        />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            ref={passwd}
                                            type="password"
                                            id="passwd"
                                            className="form-control"
                                            placeholder='Şifre'
                                        />
                                    </div>
                                    <div className="pt-1 mb-4">
                                        <div ref={userLoginMessage}></div>
                                        <button
                                            onClick={btnLogin}
                                            className="btn btn-dark btn-block"
                                            type="button"
                                        >
                                            Giriş Yap
                                        </button>
                                    </div>
                                    <a className="small text-muted" href="/forgotpassword">Şifreni mi unuttun?</a>
                                    <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                        Bir hesaba sahip değil misin? <a href="/register" style={{ color: '#393f81' }}>Kayıt Ol</a>
                                    </p>
                                    <a href="/" className="small text-muted">Anasayfaya geri dön.</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
