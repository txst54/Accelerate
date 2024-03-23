import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import Footer from './components/footer';
import NavBar from './components/navbar';
import SideBar from './components/sidebar';

import UserDashboard from './views/member/user/userDashboard';
import AdminDashboard from './views/member/admin/adminDashboard';
import RoleSelect from './views/onboarding/roleSelect';
import Login from './views/onboarding/login';
import Loading from './views/loading';
import Signup from './views/onboarding/signup';
import './App.css';

import { RequiredAuthProvider, RedirectToLogin } from "@propelauth/react";
import { getDatabase, ref, onValue, orderByChild, child, get, equalTo } from 'firebase/database';
import MemberContent from "./views/member/memberContent";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1JlLTylrMdz85sSgEw10ooH-A31zEqFA",
  authDomain: "formula-one-academy.firebaseapp.com",
  projectId: "formula-one-academy",
  storageBucket: "formula-one-academy.appspot.com",
  messagingSenderId: "417346101833",
  appId: "1:417346101833:web:e8a173025473374d6c9598",
  measurementId: "G-PPQR8R6JGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [role, setRole] = useState("signedOut");
  const [user, setUser] = useState({});


  // const loginElement = <Login auth={auth} provider={provider} setSignedIn={(val) => setSignedIn(val)} />;
  return (
      <div className="flex flex-row">

        <RequiredAuthProvider
          authUrl="https://042176320.propelauthtest.com"
          displayWhileLoading={<Loading />}
          displayIfLoggedOut={<Login />}
          >
            <MemberContent />
        </RequiredAuthProvider>
        <Footer />
      </div>
  );
}

export default App;
