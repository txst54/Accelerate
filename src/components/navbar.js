import React from 'react';

function NavBar() {
    return (
        <div className="flex flex-col justify-center h-16 p-4 bg-white">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path className="fill-slate-400" d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/>
                    </svg>
                    <input className="p-4 font-urbanist text-slate-800 focus:border-0 focus:outline-none" placeholder="Search">
                    </input>
                </div>
                <div className="flex flex-row items-center">
                    <div className="font-urbanist font-semibold p-6 hover:cursor-pointer hover:text-slate-600 transition-all duration-200">
                        Support
                    </div>
                    <div className="font-urbanist font-semibold p-6 hover:cursor-pointer hover:text-slate-600 transition-all duration-200">
                        Settings
                    </div>
                    <div className="px-6 pr-12">
                        <svg className="w-6 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" className="stroke-slate-400"/>
                            <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" className="stroke-slate-400"/>
                            <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" className="stroke-slate-400"/>
                        </svg>
                    </div>
                    <div className="px-6 bg-gray-100 rounded-full h-10 flex flex-col justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.5" className="stroke-black"/>
                            <path d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" className="stroke-black"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;