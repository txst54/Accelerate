import React from 'react';
import carBg from '../../assets/car-landing.webp';
import { AuthProvider } from "@propelauth/react";

function Login() {
    return (
        <div className="flex flex-row items-center">
            <div className="w-1/3 mx-12 bg-white py-8 px-8 drop-shadow-xl rounded-xl">
                <div className=" flex flex-row font-urbanist text-red-500 text-5xl">
                    <div className="flex flex-col justify-end">
                        <svg className="fill-red-500 w-full pt-2" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" image-rendering="optimizeQuality" text-rendering="geometricPrecision" shape-rendering="geometricPrecision" x="0px" y="0px" viewBox="0 0 841.9 367.3">
                            <path className="st0" d="M715.3,0.1h126.6L633,210.6H506.4L715.3,0.1z M118.9,210.6H0L148.3,60.8C190,16.2,243.7,0,310.9,0H690  l-78.7,79.3H306.1c-51.1-0.1-71.3,14.8-99.7,43.4L118.9,210.6z"/>
                            <path className="st0" d="M250.1,208.6H141.3l69.9-70.1c47.6-47.8,58.6-45.9,138.8-45.6h247.6l-71,71l-184.9-0.2  c-22.3,0-45.4-0.2-67.2,21.1L250.1,208.6z"/>
                        </svg>
                    </div>
                    <div className="px-2">accelerate</div>
                </div>
                <div className="font-urbanist text-center text-lg text-slate-700">
                    The fastest way to learn the road
                </div>
                <div className="px-24 pt-8">
                    <a href={"https://042176320.propelauthtest.com"} className="py-2 border-2 border-black rounded-xl font-urbanist text-xl flex flex-col items-center justify-center hover:bg-black hover:text-white hover:cursor-pointer transition-all duration-200">
                        Early Access
                    </a>
                </div>
            </div>
            <img src={carBg} className="w-2/3" alt="car"></img>
        </div>
    );
}

export default Login;