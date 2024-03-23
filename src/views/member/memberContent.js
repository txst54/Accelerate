import React, {useState} from "react"

import { withAuthInfo } from '@propelauth/react'
import {equalTo, getDatabase, orderByChild, ref, query, get} from "firebase/database";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import UserDashboard from "./user/userDashboard";
import AdminDashboard from "./admin/adminDashboard";
import SignUp from "../onboarding/signup";
import firebase from 'firebase/app';
import 'firebase/database';

const MemberContent = withAuthInfo((props) => {
    const [user, setUser] = useState(null);

    // isLoggedIn and user are injected automatically from withAuthInfo
    if (props.isLoggedIn) {
        if (user === null) {
            const db = getDatabase();
            const userRef = ref(db, 'users');
            get(query(userRef, orderByChild('email'), equalTo(props.user.email)))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        snapshot.forEach(childSnapshot => {
                            const key = Object.keys(snapshot.val())[0];
                            const userVal = snapshot.val()[key];
                            userVal.key = key;
                        });
                    }
                    else {
                        setUser({ key: "new_user" })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else if (user.key === "new_user") {
            return (<SignUp user={props.user}/>)
        }
        else {
            return (
                <div className="flex flex-row w-full">
                    <SideBar/>
                    <div className="flex flex-col w-full">
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<Navigate replace to="/dashboard"/>}/>
                            <Route path="/dashboard" element={<UserDashboard currentUserID={user.key}/>}/>
                            <Route path="/admin_dashboard" element={<AdminDashboard/>}/>
                        </Routes>
                    </div>
                </div>)
        }
    } else {
        return <p>Error: Login Error. Try refreshing and logging in again. Please contact our team if this error persists. </p>
    }
})

export default MemberContent