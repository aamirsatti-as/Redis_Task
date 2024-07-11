import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import  { useContext } from 'react';
import { AuthContext } from '../authContext';

const Sidebar = () => {
  const authContext = useContext(AuthContext);
  if(!authContext){
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { handleLogout } = authContext
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
      <nav className="mt-10">
        <NavLink 
          to="users" 
          className={({ isActive }) => 
            isActive ? "block py-2.5 px-4 rounded bg-gray-700" : "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          }
        >
          Users
        </NavLink>
        <NavLink 
          to="charts" 
          className={({ isActive }) => 
            isActive ? "block py-2.5 px-4 rounded bg-gray-700" : "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          }
        >
          Charts
        </NavLink>
        <button 
          onClick={()=>{
            handleLogout()
          }} 
          className="block w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-left"
        >
          Logout
        </button>
        {/* <NavLink 
          to="charts" 
          className={({ isActive }) => 
            isActive ? "block py-2.5 px-4 rounded bg-gray-700" : "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          }
        >
          Logout
        </NavLink> */}
      </nav>
    </div>
  );
};

export default Sidebar;
