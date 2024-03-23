import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const dbRef = ref(getDatabase(), 'users');
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const usersArray = Object.entries(data)
                .filter(([key, value]) => !value.is_admin) // Filter out admin users
                .map(([key, value]) => ({
                    id: key,
                    ...value
                }));
            setUsers(usersArray);
        });
    }, []);

    const incrementModule = (userId, lastCompletedModule) => {
        update(ref(getDatabase(), `users/${userId}`), {
            last_completed_module: lastCompletedModule + 1
        });
    };

    const decrementModule = (userId, lastCompletedModule) => {
        const newModuleIndex = lastCompletedModule > 0 ? lastCompletedModule - 1 : 0;
        update(ref(getDatabase(), `users/${userId}`), {
            last_completed_module: newModuleIndex
        });
    };

    const deleteUser = (userId) => {
        remove(ref(getDatabase(), `users/${userId}`));
    };

    return (
        <div className="h-screen overflow-auto p-4">
            <table className="rounded-lg overflow-hidden w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="font-bold text-white text-sm py-3 px-6">User ID</th>
                        <th scope="col" className="font-bold text-white text-sm py-3 px-6">First Name</th>
                        <th scope="col" className="font-bold text-white text-sm py-3 px-6">Last Name</th>
                        <th scope="col" className="font-bold text-white text-sm py-3 px-6">Roblox ID</th>
                        <th scope="col" className="font-bold text-white text-sm py-3 px-6">Instructor</th>
                        <th scope="col" className="font-bold text-white text-sm py-3 px-6">Last Completed Module</th>
                        <th scope="col" className="font-bold text-white text-sm py-3 px-6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="text-gray-200 py-4 px-6">{user.id}</td>
                            <td className="text-gray-200 py-4 px-6">{user.firstname}</td>
                            <td className="text-gray-200 py-4 px-6">{user.lastname}</td>
                            <td className="text-gray-200 py-4 px-6">{user.roblox_id}</td>
                            <td className="text-gray-200 py-4 px-6">{user.instructor || 'N/A'}</td>
                            <td className="text-gray-200 py-4 px-6">{user.last_completed_module}</td>
                            <td className="py-4 px-6 flex justify-start items-center space-x-4">
                                <button 
                                    className="transition-all duration-100 border-2 border-green-500 bg-gray-800 hover:bg-green-500 text-green-500 hover:text-white font-bold py-2 px-4 rounded"
                                    onClick={() => incrementModule(user.id, user.last_completed_module)}
                                >
                                    Increment Module
                                </button>
                                <button 
                                    className="transition-all duration-100 border-2 border-red-500 bg-gray-800 hover:bg-red-500 text-red-500 hover:text-white font-bold py-2 px-4 rounded"
                                    onClick={() => decrementModule(user.id, user.last_completed_module)}
                                >
                                    Decrement Module
                                </button>
                                <button 
                                    className="transition-all duration-100 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete User
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
