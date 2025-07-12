import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UpdateProductPopup from './Updateproduct';
import DeleteProductPopup from './DeleteProduct';
import AddProductPopup from './AddProducts';
import GirlsApparelManager from './GirlsApparelManager';
import BoysApparelManager from './BoysApparelManager';
import SportswearManager from './SportsApparelManager';
import ToysManager from './ToysManager';
import ShoesManager from './ShoesManager';

import {
  FaTshirt, FaPuzzlePiece, FaChild, FaRunning, FaShoePrints,
  FaPlus, FaSync, FaClipboardList, FaBars, FaTimes, FaTrash,
  FaShoppingCart, FaHome
} from 'react-icons/fa';

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Add Product", action: "addPopup", icon: <FaPlus /> },
  { name: "Update", action: "updatePopup", icon: <FaSync /> },
  { name: "Delete", action: "deletePopup", icon: <FaTrash /> },
  { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
];

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showGirlsPopup, setShowGirlsPopup] = useState(false);
  const [showBoysPopup, setShowBoysPopup] = useState(false);
  const [showSportswearPopup, setShowSportswearPopup] = useState(false);
  const [showToysPopup, setShowToysPopup] = useState(false);
const [showShoesPopup, setShowShoesPopup] = useState(false);

 // For Girls Apparel

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.action === 'addPopup') setShowAddPopup(true);
    if (link.action === 'updatePopup') setShowUpdatePopup(true);
    if (link.action === 'deletePopup') setShowDeletePopup(true);
     
  };

  const handleCardClick = (title) => {
    if (title === "Girls' Apparel") setShowGirlsPopup(true);
    if (title === "Boys' Apparel") setShowBoysPopup(true);
     if (title === "Sports' wear") setShowSportswearPopup(true);
     if (title === "Toys") setShowToysPopup(true);
  if (title === "Shoes") setShowShoesPopup(true);
    // In future you can add other categories here
  };

  return (
    <>
      {showAddPopup && <AddProductPopup onClose={() => setShowAddPopup(false)} />}
      {showUpdatePopup && <UpdateProductPopup onClose={() => setShowUpdatePopup(false)} />}
      {showDeletePopup && <DeleteProductPopup onClose={() => setShowDeletePopup(false)} />}
      {showGirlsPopup && <GirlsApparelManager onClose={() => setShowGirlsPopup(false)} />}
        {showBoysPopup && <BoysApparelManager onClose={() => setShowBoysPopup(false)} />}
        {showSportswearPopup && <SportswearManager onClose={() => setShowSportswearPopup(false)} />}
            {showToysPopup && <ToysManager onClose={() => setShowToysPopup(false)} />}
{showShoesPopup && <ShoesManager onClose={() => setShowShoesPopup(false)} />}



      <div className="p-6 bg-slate-900">
        <div className="h-auto pb-20 p-2 border rounded shadow-sm bg-[#1E1E2F] relative text-white">
          {/* Mobile topbar */}
          <div className="flex md:hidden justify-between items-center bg-mypurple px-4 py-3">
            <h2 className="text-xl font-bold">Admin</h2>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <aside className={`bg-slate-900 w-full md:w-64 p-4 md:block ${menuOpen ? 'block absolute z-20 top-[80px] left-0' : 'hidden'}`}>
              <div className="flex justify-center mb-6">
                <NavLink to="/">
                  <img src="/images/minnalogo.png" alt="Logo" className="w-32 h-auto" />
                </NavLink>
              </div>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.name}>
                    {link.action ? (
                      <button
                        onClick={() => handleNavClick(link)}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 rounded text-white hover:text-mypink hover:bg-white/10"
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span>{link.name}</span>
                      </button>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded transition ${
                            isActive
                              ? 'bg-myPink text-white font-semibold'
                              : 'text-white hover:text-mypink hover:bg-white/10'
                          }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span>{link.name}</span>
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 space-y-6">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card icon={<FaTshirt />} title="Girls' Apparel" count="120" onClick={handleCardClick} />
                <Card icon={<FaChild />} title="Boys' Apparel" count="98" onClick={handleCardClick} />
                <Card icon={<FaRunning />} title="Sports' wear" count="75" onClick={handleCardClick} />
                <Card icon={<FaPuzzlePiece />} title="Toys" count="60" onClick={handleCardClick} />
                <Card icon={<FaShoePrints />} title="Shoes" count="110" onClick={handleCardClick} />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowAddPopup(true)}
                  className="flex items-center justify-center gap-2 p-3 bg-mypurple text-white font-semibold rounded shadow hover:bg-myPink transition duration-300"
                >
                  <FaPlus /> Add Product
                </button>
                <button
                  onClick={() => setShowUpdatePopup(true)}
                  className="flex items-center justify-center gap-2 p-3 bg-mypurple text-white font-semibold rounded shadow hover:bg-myPink transition duration-300"
                >
                  <FaSync /> Update
                </button>
                <button
                  onClick={() => setShowDeletePopup(true)}
                  className="flex items-center justify-center gap-2 p-3 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700 transition duration-300"
                >
                  <FaTrash /> Delete
                </button>
              </div>

              <div className="pt-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

const Card = ({ icon, title, count, onClick }) => (
  <div
    className="bg-mypurple hover:bg-myPink transition duration-300 cursor-pointer p-3 lg:p-6 rounded shadow text-white text-center flex flex-col items-center justify-center"
    onClick={() => onClick(title)}
  >
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-sm">{count} Products</p>
  </div>
);

const Button = ({ icon, label }) => (
  <button className="flex items-center justify-center gap-2 p-3 bg-mypurple text-white font-semibold rounded shadow hover:bg-myPink transition duration-300">
    {icon} {label}
  </button>
);

export default Dashboard;
