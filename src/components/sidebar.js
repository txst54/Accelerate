import React from 'react';
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react'

function SideBar() {
    const logoutFunction = useLogoutFunction()
    return (
        <div className="h-full bg-slate-800 rounded-br-3xl rounded-tr-3xl w-20">
            <div className="bg-red-500 rounded-tr-3xl px-2 py-4">
                <svg className="fill-white pt-2 px-1" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" image-rendering="optimizeQuality" text-rendering="geometricPrecision" shape-rendering="geometricPrecision" x="0px" y="0px" viewBox="0 0 841.9 367.3">
                    <path className="st0" d="M715.3,0.1h126.6L633,210.6H506.4L715.3,0.1z M118.9,210.6H0L148.3,60.8C190,16.2,243.7,0,310.9,0H690  l-78.7,79.3H306.1c-51.1-0.1-71.3,14.8-99.7,43.4L118.9,210.6z"/>
                    <path className="st0" d="M250.1,208.6H141.3l69.9-70.1c47.6-47.8,58.6-45.9,138.8-45.6h247.6l-71,71l-184.9-0.2  c-22.3,0-45.4-0.2-67.2,21.1L250.1,208.6z"/>
                </svg>
            </div>
            <div className="flex flex-col items-center pt-3">
                <div className="rounded-lg bg-slate-900 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24" fill="none">
                        <path d="M14 21.0001V15.0001H10V21.0001M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" className="stroke-white"/>
                    </svg>
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-900 p-3 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24" fill="none">
                        <path d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" className="stroke-slate-300"/>
                    </svg>
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-900 p-3 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.3" className="stroke-slate-300"/>
                        <path d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" className="stroke-slate-300"/>
                    </svg>
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-900 p-3 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24" fill="none">
                        <path xmlns="http://www.w3.org/2000/svg" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#1C274C" stroke-width="1.3" className="stroke-slate-300"/>
                        <path xmlns="http://www.w3.org/2000/svg" d="M8 10.5H16" stroke="#1C274C" stroke-width="1.3" stroke-linecap="round" className="stroke-slate-300"/>
                        <path xmlns="http://www.w3.org/2000/svg" d="M8 14H13.5" stroke="#1C274C" stroke-width="1.3" stroke-linecap="round" className="stroke-slate-300"/>
                    </svg>
                </div>
                <div className="pt-6"></div>
                <div onClick={() => logoutFunction(true)} className="rounded-lg hover:cursor-pointer hover:bg-slate-900 p-3 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24" fill="none">
                        <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#1C274C" stroke-width="1.3" stroke-linecap="round" className="stroke-slate-300"/>
                        <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke-width="1.3" stroke-linecap="round" className="stroke-slate-300"/>
                    </svg>
                </div>
            </div>

        </div>
    );
}

export default SideBar;