"use client";
import React, { useEffect, useState } from 'react'
import "../../app/globals.css"
import "./header.css"

function header( { userdata, loginstate } ) {

  const [logo, setLogo] = useState("/logo.png");
  const [isLogin, setLogin] = useState(loginstate);

  useEffect(() => {

  }, [])

  function UserLogout() {
    localStorage.removeItem('userToken');
    window.location.href = "/";
  }

  function goHome() {
    window.location.href = "/";
  }

  return (
    <>
      {isLogin ? (
        <>
          <header class="bg-dark d-flex justify-content-between align-items-center">
            <div class='responsive_logo'>
              <img onClick={goHome} src={logo} style={{ width: "130px", cursor: "pointer" }}
                class="logo-img image-settings" alt="logo" />
            </div>
            <div>
              <a className="brand-text nav-link text-white" href="/profile">{userdata.username}</a>
            </div>
            <div className='navbar-wrapper'>
              <nav class="navbar navbar-expand-lg navbar-custom">
                <button class="navbar-toggler bg-warning" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                      <a class="navbar-brand nav-link text-white" href="/profile">{userdata.username}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link text-white" style={ {cursor: "pointer" }} onClick={UserLogout}>Çıkış</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        </>
      ) : (
        <>
          <header class="bg-dark d-flex justify-content-between align-items-center">
            <div class='responsive_logo'>
              <img src={logo} style={{ width: "130px" }}
                class="logo-img image-settings" alt="logo" />
            </div>
            <div>
              <a className="brand-text nav-link text-white" href="/login">GİRİŞ YAP</a>
            </div>
            <div className='navbar-wrapper'>
              <nav class="navbar navbar-expand-lg navbar-custom">
                <button class="navbar-toggler bg-warning" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                      <a class="navbar-brand nav-link text-white" href="/login">| Giriş Yap</a>
                    </li>
                    <li class="nav-item active">
                      <a class="navbar-brand nav-link text-white" href="/register">| Kayıt Ol</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        </>
      )}
    </>
  )
}

export default header