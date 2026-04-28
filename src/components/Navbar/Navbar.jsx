import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // استيراد Link للتنقل
import { HiOutlineMenuAlt3, HiX, HiOutlineUserCircle } from 'react-icons/hi';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {userLogin,setUserLogin} = useContext(AuthContext)
   const navigate =useNavigate()  
   function logout(e){
    if (e) e.preventDefault();
    localStorage.removeItem('userToken')
    localStorage.removeItem('user')
    setUserLogin(null)
    navigate('/login')
   }

  const userString = localStorage.getItem('user');
  const userData = userString && userString !== "undefined" ? JSON.parse(userString) : null;

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-3 px-6 flex items-center justify-between sticky top-0 z-40">
        {/* جهة اليسار: المنيو (جوال) + اللوجو */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setIsMenuOpen(true)}
          >
            <HiOutlineMenuAlt3 />
          </button>
          <Link
            to="/"
            className="font-extrabold text-2xl uppercase tracking-tighter text-blue-600"
          >
            Social-App
          </Link>
        </div>

        {/* جهة اليمين: الروابط النصية + الأفاتار */}
        <div className="flex items-center gap-8">
          {/* الروابط النصية للشاشات الكبيرة */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-semibold text-sm">
          {userLogin !== null &&( <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>)}
          {userLogin === null && (
            <>
              
            <Link to="/login" className="hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-blue-600 transition-colors"
            >
              Register
            </Link>
            </>
          )}
          </div>

          {/* منطقة البروفايل (Hover) */}
          { userLogin !== null &&(<div
            className="relative py-2"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <div className="cursor-pointer p-0.5 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-all">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover"
              />
            </div>

            {/* الـ Dropdown (يظهر عند الهوفر) */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-50 overflow-hidden z-50">
                <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                  <p className="font-bold text-gray-900">{userData?.name || "User"}</p>
                  <p className="text-xs text-gray-500 font-medium">
                    {userData?.email || "No Email Provided"}
                  </p>
                </div>

                <div className="p-2">
                  <Link
                    to="/profile"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors group text-sm"
                  >
                    <HiOutlineUserCircle className="text-xl text-gray-400 group-hover:text-blue-600" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors group text-sm"
                  >
                    <FiSettings className="text-lg text-gray-400 group-hover:text-blue-600" />
                    Account Settings
                  </Link>
                </div>

                <div className="p-2 border-t border-gray-50">
                  <button  onClick={()=>logout()} className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm">
                    <FiLogOut className="text-lg"/>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>)}
        </div>
      </nav>

      {/* القائمة الجانبية للجوال */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="w-72 h-full bg-white p-8 shadow-2xl flex flex-col gap-10 transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-6">
              <h1 className="font-black text-xl text-blue-600 uppercase">
                SOCIAL-APP
              </h1>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-gray-100 p-2 rounded-full"
              >
                <HiX size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-gray-800 text-lg font-bold">
           {  userLogin!==null&& (<Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Home
              </Link>)}
              {userLogin=== null &&(<> <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Login
              </Link> </>)}
            </div>
            {userLogin !==null && (<div className="mt-auto border-t pt-6">
              <button  onClick={(e) => {
        setIsMenuOpen(false);
        logout(e);
      }} className="flex items-center gap-3 text-red-500 font-bold">
                <FiLogOut size={22} /> Log Out
              </button>
            </div>)}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
