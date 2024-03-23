import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

function UserDashboard(props) {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [user, setUser] = useState(null);

  ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Module Grade Report',
      },
    },
  };

  const labels = Array.from(Array(user ? user.last_completed_module : 0).keys());

  const data = {
    labels,
    datasets: [
      {
        label: 'Performance',
        data: labels.map(() => faker.datatype.number({ min: 70, max: 100 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, 'modules'), (snapshot) => {
      const modulesData = snapshot.val();
      const filteredModules = Array.isArray(modulesData) ? modulesData.filter(Boolean) : Object.values(modulesData).filter(Boolean);
      setModules(filteredModules);
      setActiveModule(filteredModules[0]);
    });
    onValue(ref(db, `users/${props.currentUserID}`), (snapshot) => setUser(snapshot.val()));
  }, [props.currentUserID]);

  const isModuleAccessible = (index) => user && (index <= (user.last_completed_module || 0));

  return (
    <div className="flex h-full px-8 pb-8">
      <div className=" flex flex-col w-1/3">
        <nav className="overflow-show bg-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-200 rounded-3xl px-4 py-2 pb-8">
          <div className="flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24" fill="none">
              <path xmlns="http://www.w3.org/2000/svg" d="M9 12C9 11.5341 9 11.3011 9.07612 11.1173C9.17761 10.8723 9.37229 10.6776 9.61732 10.5761C9.80109 10.5 10.0341 10.5 10.5 10.5H13.5C13.9659 10.5 14.1989 10.5 14.3827 10.5761C14.6277 10.6776 14.8224 10.8723 14.9239 11.1173C15 11.3011 15 11.5341 15 12C15 12.4659 15 12.6989 14.9239 12.8827C14.8224 13.1277 14.6277 13.3224 14.3827 13.4239C14.1989 13.5 13.9659 13.5 13.5 13.5H10.5C10.0341 13.5 9.80109 13.5 9.61732 13.4239C9.37229 13.3224 9.17761 13.1277 9.07612 12.8827C9 12.6989 9 12.4659 9 12Z" stroke="#1C274C" stroke-width="1.3" className="stroke-black"/>
              <path xmlns="http://www.w3.org/2000/svg" d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7" stroke="#1C274C" stroke-width="1.3" stroke-linecap="round" className="stroke-black"/>
              <path xmlns="http://www.w3.org/2000/svg" d="M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z" stroke="#1C274C" stroke-width="1.3" stroke-linecap="round" className="stroke-black"/>
            </svg>
            <h2 className="font-semibold text-xl px-2 py-4 ">Modules</h2>
          </div>
          <div className="pb-2">Lessons:</div>
          <ul className="border border-gray-200 rounded-2xl">
            {modules.map((module, index) => (
              <li key={index}
                  className={`hover:cursor-pointer p-4 text-sm rounded-2xl ${index === 0 || isModuleAccessible(index) ? 'hover:bg-gray-100' : 'text-gray-400 hover:cursor-default'} ${activeModule && activeModule.title === module.title ? 'bg-gray-100' : ''}`}
                  onClick={() => isModuleAccessible(index) && setActiveModule(module)}>
                {module.title}
              </li>
            ))}
          </ul>
        </nav>
        <div className="bg-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-200 pb-8 my-8 rounded-3xl px-4 py-2">
          <div className="font-semibold text-xl flex flex-row pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24" fill="none">
              <path d="M5.82333 6.00037C6.2383 6.36683 6.5 6.90285 6.5 7.5C6.5 8.60457 5.60457 9.5 4.5 9.5C3.90285 9.5 3.36683 9.2383 3.00037 8.82333M5.82333 6.00037C5.94144 6 6.06676 6 6.2 6H17.8C17.9332 6 18.0586 6 18.1767 6.00037M5.82333 6.00037C4.94852 6.00308 4.46895 6.02593 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3.02593 7.46895 3.00308 7.94852 3.00037 8.82333M3.00037 8.82333C3 8.94144 3 9.06676 3 9.2V14.8C3 14.9332 3 15.0586 3.00037 15.1767M3.00037 15.1767C3.36683 14.7617 3.90285 14.5 4.5 14.5C5.60457 14.5 6.5 15.3954 6.5 16.5C6.5 17.0971 6.2383 17.6332 5.82333 17.9996M3.00037 15.1767C3.00308 16.0515 3.02593 16.531 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.46895 17.9741 4.94852 17.9969 5.82333 17.9996M5.82333 17.9996C5.94144 18 6.06676 18 6.2 18H17.8C17.9332 18 18.0586 18 18.1767 17.9996M21 15.1771C20.6335 14.7619 20.0973 14.5 19.5 14.5C18.3954 14.5 17.5 15.3954 17.5 16.5C17.5 17.0971 17.7617 17.6332 18.1767 17.9996M21 15.1771C21.0004 15.0589 21 14.9334 21 14.8V9.2C21 9.06676 21 8.94144 20.9996 8.82333M21 15.1771C20.9973 16.0516 20.974 16.5311 20.782 16.908C20.5903 17.2843 20.2843 17.5903 19.908 17.782C19.5311 17.9741 19.0515 17.9969 18.1767 17.9996M20.9996 8.82333C20.6332 9.2383 20.0971 9.5 19.5 9.5C18.3954 9.5 17.5 8.60457 17.5 7.5C17.5 6.90285 17.7617 6.36683 18.1767 6.00037M20.9996 8.82333C20.9969 7.94852 20.9741 7.46895 20.782 7.09202C20.5903 6.71569 20.2843 6.40973 19.908 6.21799C19.5311 6.02593 19.0515 6.00308 18.1767 6.00037M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="px-2">
              Grade Report
            </div>
          </div>
          <div>
            Current Grade
          </div>
          <div className="font-semibold text-3xl text-green-500">
            A
          </div>
          <div className="pt-4"></div>
          <div className="bg-white border-slate-200 border-2 rounded-lg flex-row flex justify-center p-2 font-semibold hover:text-white transition-all duration-200">
            <Line options={options} data={data} />
          </div>

        </div>
        <div className="bg-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-200 pb-8 my-8 rounded-3xl px-4 py-2">
          <div className="font-semibold text-xl flex flex-row pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24" fill="none">
              <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="px-2">
              Interactive Roblox Experience
            </div>
          </div>
          <div>
            Users online:
          </div>
          <div className="font-semibold text-3xl ">
            560,327
          </div>
          <div className="flex flex-row pt-4 justify-between">
            <div className="flex flex-col items-center">
              <div className="bg-red-600 rounded-full p-2 w-11 flex flex-col items-center hover:cursor-pointer hover:drop-shadow-lg transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-7" viewBox="0 0 24 24" version="1.1">
                  <title>Upload-3</title>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Upload-3">
                      <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24">

                      </rect>
                      <line x1="12" y1="5" x2="12" y2="15" id="Path" stroke="#0C0310" stroke-width="1.3" stroke-linecap="round" className="stroke-white">

                      </line>
                      <line x1="19" y1="20" x2="5" y2="20" id="Path" stroke="#0C0310" stroke-width="1.3" stroke-linecap="round" className="stroke-white">

                      </line>
                      <path d="M7,9 L11.2929,4.70711 C11.6834,4.31658 12.3166,4.31658 12.7071,4.70711 L17,9" id="Path" stroke="#0C0310" stroke-width="1.3" stroke-linecap="round" className="stroke-white">

                      </path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="text-slate-700 text-sm">
                Practice
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white border-2 border-slate-300 rounded-full p-2 w-11 flex flex-col items-center hover:cursor-pointer transition-all duration-200 hover:drop-shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 0 24 24" version="1.1">
                  <title>Download-3</title>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Download-3">
                      <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24">

                      </rect>
                      <line x1="12" y1="5" x2="12" y2="15" id="Path" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" className="stroke-slate-400">

                      </line>
                      <path d="M17,11 L12.7071,15.2929 C12.3166,15.6834 11.6834,15.6834 11.2929,15.2929 L7,11" id="Path" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" className="stroke-slate-400">

                      </path>
                      <line x1="19" y1="20" x2="5" y2="20" id="Path" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" className="stroke-slate-400">

                      </line>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="text-slate-700 text-sm">
                Request Instructor
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white border-2 border-slate-300 flex flex-col items-center rounded-full p-2 w-11 hover:cursor-pointer hover:drop-shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 stroke-white" viewBox="0 0 1000 1000" >
                  <g>

                    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">

                      <path d="M1685.8,4989.2c-253.7-58.9-499.3-265.9-621.1-519.6l-75.1-158.3l-6.1-4141c-4.1-2772.8,2-4173.4,16.2-4238.4c56.8-267.9,257.8-513.6,523.7-639.4l156.3-75.1l3258-6.1c2174-4.1,3290.4,2,3355.4,16.2c326.8,69,627.2,365.4,702.4,692.2c14.2,58.9,22.3,1049.5,22.3,2809.4c0,2616.5-2,2724.1-38.6,2801.2c-48.7,101.5-3373.6,3428.5-3458.9,3460.9C5449.2,5017.6,1797.5,5015.6,1685.8,4989.2z M4856.5,3087.2c0-1433.1,2-1451.4,115.7-1648.3c89.3-152.2,253.7-298.4,426.3-381.6l158.3-75.1l1427-6.1l1425-6.1v-2494.7c0-1891.9-6.1-2506.9-24.4-2547.5c-52.8-117.7,148.2-111.6-3385.8-111.6s-3333.1-6.1-3385.8,111.6c-38.6,81.2-34.5,8302.2,4.1,8371.2c58.9,105.6,12.2,101.5,1682.8,103.5h1556.9V3087.2z M6866.1,1585.1c-1351.9-4.1-1337.7-6.1-1380.3,109.6c-12.2,30.5-20.3,552.1-20.3,1293V4230l1319.4-1319.4l1319.4-1319.4L6866.1,1585.1z" className="fill-slate-400"/>

                      <path d="M2989-327.1v-304.5h2009.6h2009.6v304.5v304.5H4998.6H2989V-327.1z" className="fill-slate-400"/>

                      <path d="M2989-1646.5V-1951h2009.6h2009.6v304.5v304.5H4998.6H2989V-1646.5z" className="fill-slate-400"/>

                      <path d="M2989-2925.3v-304.5h954.1h954v304.5v304.5h-954H2989V-2925.3z" className="fill-slate-400"/>

                    </g>

                  </g>
                </svg>
              </div>
              <div className="text-slate-700 text-sm">
                Driving Logs
              </div>
            </div>

          </div>
          <div className="pt-4"></div>
          <a href="https://www.roblox.com/games/16842719463/GTA-1" className="bg-white border-slate-200 border-2 rounded-lg flex-row flex justify-center p-2 font-semibold hover:text-white transition-all duration-200 hover:cursor-pointer hover:bg-red-500 hover:border-red-500">

            Join Experience
          </a>
        </div>
      </div>
      <div className=" h-full w-2/3 pl-8">
        <div className="h-full bg-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-200 rounded-3xl mx-4 overflow-auto">
          {activeModule && (
            <div className="p-8">
              <h3 className="text-3xl mb-2 font-semibold">{activeModule.title}</h3>
              <p className="mb-4 text-slate-600 text-lg">{activeModule.description}</p>
              <div className="flex flex-col mt-8">
                {activeModule.content.split('\n').map((m) => <div><p className="flex-1 px-8 indent-12">{m}</p><br></br></div>)}
              </div>
              <div className="mt-4 h-full px-8">
                <iframe className="w-full aspect-video" src={activeModule.video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;