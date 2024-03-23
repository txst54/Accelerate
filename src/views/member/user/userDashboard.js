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
    <div className="flex h-full px-8">
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
            A+
          </div>
          <div className="pt-4"></div>
          <div className="bg-white border-slate-200 border-2 rounded-lg flex-row flex justify-center p-2 font-semibold hover:text-white transition-all duration-200">
            <Line options={options} data={data} />
          </div>

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
              <div className="mt-4">
                <video controls className="max-w-full h-auto">
                  <source src={activeModule.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;