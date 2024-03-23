import React from 'react';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {getDatabase, ref, set} from "firebase/database";
function RobloxAuth(props) {
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    // delete b4 push
    const roblox_secret = "SECRET";
    if (code !== null) {
        fetch(`https://apis.roblox.com/oauth/v1/token`,
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'code': code,
                    'client_id': '7738059313603010926',
                    'client_secret': roblox_secret,
                    'grant_type': 'authorization_code'
                }).toString()
            })
            .then((r) => {
                r.json().then(
                    (response) => {
                        console.log(response);
                        fetch("https://apis.roblox.com/oauth/v1/userinfo",
                        {
                            headers: {
                                'Authorization':'Bearer '+response["access_token"]
                            }
                        }).then((auth_r) => {
                            console.log(auth_r)
                            if (auth_r.ok) {
                                auth_r.json().then(
                                    (auth_response) => {
                                        console.log(auth_response)
                                        set(ref(getDatabase(), `users/${auth_response["sub"]}`),
                                            {'roblox': auth_response["name"],
                                                    'email': props.user.email})
                                            .then((response) => {
                                                console.log("Successfully set")
                                                window.location.replace('/');
                                            }).catch((error) => {
                                            console.log(error);
                                        })
                                    }
                                ).catch((error) => {
                                    console.log(error);
                                })
                            } else {
                                alert('Authentication Error.');
                                window.location.replace('/');
                            }
                        }).catch((error) => {console.log(error);alert("A Roblox error occurred, please try again");})
                    }
                )
            }).catch((error) => {console.log(error);})
    }
    return (
        code === null ?
            <div className="h-screen flex flex-col justify-center w-full items-center ">
                <div
                    className="flex flex-col items-center rounded-2xl drop-shadow-xl hover:drop-shadow-2xl transition-all duration-200 bg-white p-4 w-96 ">
                    <svg className="w-16 fill-red-500" xmlns="http://www.w3.org/2000/svg" version="1.1"
                         viewBox="0 0 256 256">

                        <defs>
                        </defs>
                        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                            <path
                                d="M 18.421 0 L 0 71.579 L 71.579 90 L 90 18.421 L 18.421 0 z M 50.185 53.781 l -13.972 -3.596 l 3.596 -13.972 l 13.972 3.596 L 50.185 53.781 z"
                                transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                        </g>
                    </svg>
                    <div className="font-urbanist text-4xl pb-2">
                        Link with Roblox
                    </div>
                    <div className="text-center text-slate-800 pb-8 ">
                        Bring interactive driving simulations alive with Roblox
                    </div>
                    <a href="https://authorize.roblox.com/?client_id=7738059313603010926&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=openid+profile&response_type=code&step=accountConfirm"
                       className=" font-urbanist border-2 border-black rounded-2xl px-4 py-2 hover:cursor-pointer hover:bg-black hover:text-white transition-all duration-200">
                        Authenticate
                    </a>
                </div>
            </div>
            :
            <div>

            </div>

    );
}

export default RobloxAuth;