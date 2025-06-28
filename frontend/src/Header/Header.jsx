import React, { useState } from 'react';
import logo from '../images/minnaminnilogo.jpg';
import herovideo from '../videos/topvideo1.mp4';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import Cart from '../Cart/Cart';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessoriesOpen, setAccessoriesOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) setAccessoriesOpen(false);
  };

  const navLinkStyle =
    'cursor-pointer hover:underline decoration-2 underline-offset-4 decoration-mypurple';
  const getActiveLink = ({ isActive }) =>
    isActive ? `${navLinkStyle} underline decoration-2` : navLinkStyle;

  return (
    <>
      {/* Top Marquee */}
      <div className="w-full bg-myPink overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee min-w-[200%]">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex space-x-8 text-sm sm:text-base">
              <p className="text-white font-semibold px-4 py-2">
                🎉 New Arrival: Organic Cotton Baby Clothes
              </p>
              <p className="text-white font-semibold px-4 py-2">
                🍼 50% Off on Baby Bottles
              </p>
              <p className="text-white font-semibold px-4 py-2">
                🚚 Free Shipping on Orders Over PKR 2000
              </p>
              <p className="text-white font-semibold px-4 py-2">
                👶 Shop Now for Safe & Gentle Products!
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white text-gray-700 p-2 uppercase shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left: Hamburger (Mobile) */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center md:justify-start items-center relative">
            <NavLink to="/">
              <img
                src={logo}
                alt="Minna Minni Logo"
                className="w-20 sm:w-20 md:w-24 h-auto rounded-full"
              />
            </NavLink>

            {/* Cart icon on mobile (right to logo) */}
            <div className="absolute right-0 md:hidden flex items-center gap-4">
              <button className="text-gray-700">
                <Search size={22} />
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="relative text-pink-600"
              >
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Right: Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 font-medium text-base ml-auto">
            <li><NavLink to="/baby-garments" className={getActiveLink}>Baby Garments</NavLink></li>

            <li
              className="relative"
              onMouseEnter={() => setAccessoriesOpen(true)}
              onMouseLeave={() => setAccessoriesOpen(false)}
            >
              <span className={navLinkStyle}>Accessories</span>
              {accessoriesOpen && (
                <ul className="absolute bg-myPink text-white top-5 left-0 py-2 shadow-md rounded z-20">
                  <li><NavLink to="/accessories/fiddle" className="px-4 py-1 block hover:bg-mypurple">FIDDLE</NavLink></li>
                  <li><NavLink to="/accessories/prams" className="px-4 py-1 block hover:bg-mypurple">PRAMS</NavLink></li>
                  <li><NavLink to="/accessories/walkers" className="px-4 py-1 block hover:bg-mypurple">WALKERS</NavLink></li>
                </ul>
              )}
            </li>

            <li><NavLink to="/toys" className={getActiveLink}>Toys</NavLink></li>
            <li><NavLink to="/sport-wears" className={getActiveLink}>Sport Wears</NavLink></li>
            <li><NavLink to="/baby-shoes" className={getActiveLink}>Baby Shoes</NavLink></li>
            <li className="cursor-pointer hover:text-mypurple"><Search size={24} /></li>

            <li>
              <button onClick={() => setShowCart(true)} className="relative text-pink-600">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-myPink text-white px-4 py-4 space-y-2 text-sm font-medium">
            <NavLink to="/baby-garments" className={getActiveLink}>Baby Garments</NavLink>

            <div
              className="flex justify-between items-center cursor-pointer hover:underline underline-offset-4 decoration-white"
              onClick={() => setAccessoriesOpen(!accessoriesOpen)}
            >
              <span>Accessories</span>
              {accessoriesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {accessoriesOpen && (
              <div className="pl-4 space-y-1 flex flex-col gap-1">
                <NavLink to="/accessories/fiddle" className={getActiveLink}>Fiddle</NavLink>
                <NavLink to="/accessories/prams" className={getActiveLink}>Prams</NavLink>
                <NavLink to="/accessories/walkers" className={getActiveLink}>Walkers</NavLink>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <NavLink to="/toys" className={getActiveLink}>Toys</NavLink>
              <NavLink to="/sport-wears" className={getActiveLink}>Sport Wears</NavLink>
              <NavLink to="/baby-shoes" className={getActiveLink}>Baby Shoes</NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer (works on both mobile and desktop) */}
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />

      {/* Hero Section */}
      <div className="relative w-full lg:h-screen h-[70vh] overflow-hidden animate__animated animate__zoomIn">
        <div className="absolute top-0 bottom-0 w-full bg-black bg-opacity-40"></div>
        <video
          className="w-full h-[70vh] lg:h-full object-cover"
          src={herovideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute bottom-10 flex items-center w-full justify-center text-white text-center px-4">
          <div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">SUMMER'2025</h1>
            <NavLink to="/shop">
              <button className="border-[3px] px-3 py-1 mt-3 border-white">SHOP NOW</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
