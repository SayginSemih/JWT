"use client";
import Header from '@/component/header/header'
import React, { useEffect, useState, useRef } from 'react'
import "../globals.css"
import axios from 'axios';
import Loading from '@/component/loading/loading';

function profile() {

    const [userdata, setData] = useState([]);
    const [isLogin, setLogin] = useState(false);
    const [pageLoad, setLoad] = useState(false);
    const inputUsername = useRef();
    const inputName = useRef();
    const inputSurname = useRef();
    const inputMail = useRef();
    const inputPhone = useRef();
    const inputPassword = useRef();
    const inputRePassword = useRef();
    const userChangePasswordMessage = useRef();
    const userUpdateMessage = useRef();

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            axios.post(process.env.NEXT_PUBLIC_SERVER + "/check-user", {
                token: localStorage.getItem("userToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data);
                    setLogin(true);
                }
                else if (response.data.data == 2) {
                    setData(response.data.userdata.data);
                    setLogin(true);
                }
                setLoad(true)
            })
        }
        else {
            setLoad(true)
        }
    }, [])

    function btnUpdate() {
        const userUserName = inputUsername.current.value;
        const userName = inputName.current.value;
        const userSurname = inputSurname.current.value;
        const userMail = inputMail.current.value;
        const userPhone = inputPhone.current.value;

        if (!userUserName || !userName || !userSurname || !userMail || !userPhone) {
            userUpdateMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            axios.post(process.env.NEXT_PUBLIC_SERVER + "/user-update", {
                userUserName,
                userName,
                userSurname,
                userMail,
                userPhone,
                userID: userdata.user_id
            }).then(response => {
                if (response.data.status == 1) {
                    userUpdateMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Kullanıcı bilgileriniz başarıyla güncellendi!
                    </div>
                `;
                    localStorage.removeItem("userToken")
                    localStorage.setItem("userToken", response.data.token)
                    const newData = {
                        username: userUserName,
                        name: userName,
                        surname: userSurname,
                        email: userMail,
                        phone_number: userPhone,
                        user_id: userdata.user_id
                    }
                    setData(newData);
                }
                else if (response.data.status == 1) {
                    userUpdateMessage.current.innerHTML = `
                    <div class="alert alert-alert mt-2" role="alert">
                        Güncelleme esnasında bir hata meydana geldi!
                    </div>
                `;
                }
                else if (response.data.status == 3) {
                    userUpdateMessage.current.innerHTML = `
                    <div class="alert alert-warning mt-2" role="alert">
                        Bu kullanici adi baska bir kullanici tarafindan kullanilmaktadir!
                    </div>
                `;
                }
            })
        }
    }

    function btnChangePassword() {
        const userPassword = inputPassword.current.value;
        const userRePassword = inputRePassword.current.value;

        if (!userPassword || !userRePassword) {
            userUpdateMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            if (userPassword == userRePassword) {
                const pwdControl = String(userPassword)
                if (pwdControl.length > 5) {
                    axios.post(process.env.NEXT_PUBLIC_SERVER + "/user-changepassword", {
                        userPassword,
                        userID: userdata.user_id
                    }).then(response => {
                        if (response.data == "1") {
                            userChangePasswordMessage.current.innerHTML = `
                            <div class="alert alert-success mt-2" role="alert">
                                Şifreniz başarıyla güncellendi!
                            </div>
                        `;
                            setTimeout(function () {
                                localStorage.removeItem("userToken");
                            }, 1000);
                        }
                        else if (response.data == "2") {
                            userChangePasswordMessage.current.innerHTML = `
                            <div class="alert alert-danger mt-2" role="alert">
                                Şifre değiştirme sırasında bir hata meydana geldi!
                            </div>
                        `;
                        }
                    })
                }
                else {
                    userChangePasswordMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Şifreniz 5 haneden büyük olmalıdır!
                    </div>
                `;
                }
            }
            else {
                userChangePasswordMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Şifreler aynı olmalıdır!
                    </div>
                `;
            }
        }
    }

    if (!pageLoad) return <Loading />

    return (
        <>
            <Header userdata={userdata} loginstate={isLogin} />
            <div class="container mt-5">
                <div class="card">
                    <div class="card-header">
                        Kullanıcı Bilgileri
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="username" class="col-sm-3 col-form-label">Kullanıcı Adı</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control-plaintext" id="username" value={userdata.username} readonly />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-sm-3 col-form-label">Ad Soyad</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control-plaintext" id="name" value={userdata.name + " " + userdata.surname} readonly />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-sm-3 col-form-label">E-mail</label>
                            <div class="col-sm-9">
                                <input type="email" class="form-control-plaintext" id="email" value={userdata.email} readonly />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-sm-3 col-form-label">Telefon</label>
                            <div class="col-sm-9">
                                <input type="tel" class="form-control-plaintext" id="phone" value={userdata.phone} readonly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                Kuaför Bilgileri Güncelleme
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="username">Kullanıcı Adı</label>
                                    <input ref={inputUsername} type="text" class="form-control" id="username" defaultValue={userdata.username} placeholder="Kullanıcı Adı" />
                                </div>
                                <div class="form-group">
                                    <label for="name">Ad</label>
                                    <input ref={inputName} type="text" class="form-control" id="name" defaultValue={userdata.name} placeholder="Adı" />
                                </div>
                                <div class="form-group">
                                    <label for="surname">Soyad</label>
                                    <input ref={inputSurname} type="text" class="form-control" id="surname" defaultValue={userdata.surname} placeholder="Soyadı" />
                                </div>
                                <div class="form-group">
                                    <label for="email">E-mail</label>
                                    <input ref={inputMail} type="email" class="form-control" id="email" defaultValue={userdata.email} placeholder="E-mail adresi" />
                                </div>
                                <div class="form-group">
                                    <label for="phone">Telefon Numarası</label>
                                    <input ref={inputPhone} type="tel" class="form-control" id="phone" defaultValue={userdata.phone} placeholder="Telefon numarası" />
                                </div>
                                <div ref={userUpdateMessage}></div>
                                <button onClick={btnUpdate} type="submit" class="btn btn-primary mt-2">Bilgileri Güncelle</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                Şifre Değiştirme
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="newPassword">Yeni Şifre</label>
                                    <input ref={inputPassword} type="password" class="form-control" id="newPassword" placeholder="Yeni şifreniz" />
                                </div>
                                <div class="form-group">
                                    <label for="confirmPassword">Yeni Şifre Tekrar</label>
                                    <input ref={inputRePassword} type="password" class="form-control" id="confirmPassword" placeholder="Yeni şifrenizi tekrar girin" />
                                </div>
                                <div ref={userChangePasswordMessage}></div>
                                <button onClick={btnChangePassword} type="submit" class="btn btn-primary mt-2">Şifreyi Değiştir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default profile