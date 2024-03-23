import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function UserDashboard(props) {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [user, setUser] = useState(null);
  
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
    <div className="flex h-screen">
      <nav className="w-1/3 overflow-auto border-r border-gray-200">
        <h2 className="font-bold px-5 py-4">Modules</h2>
        <ul>
          {modules.map((module, index) => (
            <li key={index}
                className={`cursor-pointer p-4 ${isModuleAccessible(index) ? 'hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'} ${activeModule && activeModule.title === module.title ? 'bg-gray-100' : ''}`}
                onClick={() => isModuleAccessible(index) && setActiveModule(module)}>
              {module.title}
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-2/3 p-8 overflow-auto">
        {activeModule && (
          <>
            <h3 className="text-2xl font-bold mb-4">{activeModule.title}</h3>
            <p className="mb-4">{activeModule.description}</p>
            <div className="flex mt-4">
              <p className="flex-1">{activeModule.content}</p>
              <img src={activeModule.image} alt="Module visual" className="ml-4 w-48 h-auto rounded shadow" />
            </div>
            <div className="mt-4">
              <video controls className="max-w-full h-auto">
                <source src={activeModule.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;