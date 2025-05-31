"use client";
import Header from '@/component/header/header'
import React, { useEffect, useRef, useState } from 'react'
import "./home.css"
import axios from 'axios';
import { data } from 'autoprefixer';
import Loading from '@/component/loading/loading';

function home() {

  const [cities, setCities] = useState([])
  const [_advertdata, _setAdvertData] = useState([]); // filteri defaulta döndürmek için static olan data
  const [advertdata, setAdvertData] = useState([]); // dynamic olan data
  const [categories, setCategories] = useState([])
  const [userdata, setData] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [pageLoad, setLoad] = useState(false);
  const city = useRef();
  const state = useRef();
  const category = useRef();
  const date = useRef();
  const filterMessage = useRef();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      axios.post(process.env.NEXT_PUBLIC_SERVER + "/check-user", {
        token: localStorage.getItem("userToken")
      }).then(response => {
        if (response.data.data == 1) {
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
  
  if (!pageLoad) return <Loading />

  return (
    <>
      <Header userdata={userdata} loginstate={isLogin} />
    </>
  )
}

export default home