import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import Footer from './components/footer';
import NavBar from './components/navbar';

import UserDashboard from './views/member/user/userDashboard';
import AdminDashboard from './views/member/admin/adminDashboard';
import RoleSelect from './views/onboarding/roleSelect';
import Login from './views/onboarding/login';
import Signup from './views/onboarding/signup';
import './App.css';

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
const auth = getAuth();
const provider = new GoogleAuthProvider();

function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [role, setRole] = useState("signedOut");
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscriber = getAuth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // attach listener to auth state change
  function onAuthStateChanged(user) {
    if (user) {
      setSignedIn(true);
      user.getIdTokenResult(true).then((idTokenResult) => {
        setUser(user);
        setRole(idTokenResult.claims.role)
      })
    }
  }

  const getUser = () => {
    // fetch user data from firebase rtdb based on their role
    return 0
  }

  const renderUserContent = () => {
    // if role is not defined, then they are not registered: redirect them to sign up page
    if (role === undefined) {
      return <RoleSelect />
    }
    return (<div>
      <Routes>
        <Route path="/dashboard/*" element={<UserDashboard user={user} role={role}/>} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </div>)
  }


  const loginElement = <Login auth={auth} provider={provider} setSignedIn={(val) => setSignedIn(val)} />;
  return (
      <div className="bg-youmeblue h-screen*2">
        <NavBar signedIn={isSignedIn} setSignedIn={setSignedIn} />
        {!isSignedIn ?
            <div>
              <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />
                <Route path="/" element={<Login />} />
              </Routes>
            </div>
            :
            renderUserContent()
        }
        <Footer />
      </div>
  );
}

export default App;
