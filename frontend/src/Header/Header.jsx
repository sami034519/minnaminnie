import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessoriesOpen, setAccessoriesOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) setAccessoriesOpen(false);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setAccessoriesOpen(false);
    setSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const navLinkStyle =
    "cursor-pointer border-b-2 border-transparent hover:border-mypurple";
  const getActiveLink = ({ isActive }) =>
    isActive
      ? `${navLinkStyle} border-mypurple`
      : `${navLinkStyle} border-transparent`;

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Marquee */}
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

        {/* Navbar */}
        <nav className="bg-white text-gray-700 p-2 uppercase shadow-md w-full">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 flex justify-center md:justify-start items-center relative">
              <NavLink to="/" onClick={closeMenus}>
                <img
                  src="/images/minnalogo.png"
                  alt="Minna Minni Logo"
                  className="w-28 md:w-28 h-auto"
                />
              </NavLink>

              {/* Mobile Cart + Search */}
              <div className="absolute right-0 md:hidden flex items-center gap-4">
                <button onClick={() => setSearchOpen(!searchOpen)}>
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

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center space-x-6 font-medium text-base ml-auto">
              <li>
                <NavLink to="/allgarments" className={getActiveLink}>
                  Baby Garments
                </NavLink>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setAccessoriesOpen(true)}
                onMouseLeave={() => setAccessoriesOpen(false)}
              >
                <span className="cursor-pointer border-b-2 border-transparent hover:border-mypurple">
                  Accessories
                </span>
                {accessoriesOpen && (
                  <ul className="absolute bg-myPink text-white top-5 left-0 py-2 shadow-md rounded z-20">
                    <li>
                      <NavLink
                        to="/accessories/fiddle"
                        className="px-4 py-1 block hover:bg-mypurple"
                      >
                        FIDDRE
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/accessories/prams"
                        className="px-4 py-1 block hover:bg-mypurple"
                      >
                        PRAMS
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/accessories/walkers"
                        className="px-4 py-1 block hover:bg-mypurple"
                      >
                        WALKERS
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink to="/toys" className={getActiveLink}>
                  Toys
                </NavLink>
              </li>
              <li>
                <NavLink to="/sportwears" className={getActiveLink}>
                  Sport Wears
                </NavLink>
              </li>
              <li>
                <NavLink to="/shoes" className={getActiveLink}>
                  Baby Shoes
                </NavLink>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={24} />
              </li>
              <li>
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
              </li>
            </ul>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="p-3 bg-pink-50 shadow-md"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none"
              />
            </form>
          )}

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-myPink text-white px-4 py-4 space-y-2 text-sm font-medium">
              <NavLink
                to="/allgarments"
                onClick={closeMenus}
                className={({ isActive }) =>
                  `border-b-2 py-1 ${
                    isActive ? "border-mypurple" : "border-white"
                  }`
                }
              >
                Baby Garments
              </NavLink>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setAccessoriesOpen(!accessoriesOpen)}
              >
                <span>Accessories</span>
                {accessoriesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {accessoriesOpen && (
                <div className="pl-4 space-y-1 flex flex-col gap-1">
                  <NavLink
                    to="/accessories/fiddle"
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `border-b-2 py-1 ${
                        isActive ? "border-mypurple" : "border-white"
                      }`
                    }
                  >
                    FiddRe
                  </NavLink>
                  <NavLink
                    to="/accessories/prams"
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `border-b-2 py-1 ${
                        isActive ? "border-mypurple" : "border-white"
                      }`
                    }
                  >
                    Prams
                  </NavLink>
                  <NavLink
                    to="/accessories/walkers"
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `border-b-2 py-1 ${
                        isActive ? "border-mypurple" : "border-white"
                      }`
                    }
                  >
                    Walkers
                  </NavLink>
                </div>
              )}
              <div className="flex-col gap-y-2 flex">
                <NavLink
                  to="/toys"
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `border-b-2 py-1 ${
                      isActive ? "border-mypurple" : "border-white"
                    }`
                  }
                >
                  Toys
                </NavLink>
                <NavLink
                  to="/sportwears"
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `border-b-2 py-1 ${
                      isActive ? "border-mypurple" : "border-white"
                    }`
                  }
                >
                  Sport Wears
                </NavLink>
                <NavLink
                  to="/shoes"
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `border-b-2 py-1 ${
                      isActive ? "border-mypurple" : "border-white"
                    }`
                  }
                >
                  Baby Shoes
                </NavLink>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Cart Drawer */}
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />

      {/* Hero Section */}
      <div className="relative w-full lg:h-screen h-[70vh] overflow-hidden pt-[132px] animate__animated animate__zoomIn">
        {!videoLoaded && (
          <img
            src="/images/Mob-banner2.jpg"
            alt="Hero Fallback"
            className="absolute w-full h-full object-cover z-0"
          />
        )}

        <div className="absolute top-0 bottom-0 w-full bg-black bg-opacity-40 z-10"></div>

        <video
          className={`w-full h-[70vh] lg:h-full object-cover mt-32 lg:mt-36 absolute top-0 left-0 transition-opacity duration-500 ${
            videoLoaded ? "opacity-100 z-0" : "opacity-0"
          }`}
          src="/videos/topvideo1.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
        />

        <div className="absolute bottom-10 flex items-center w-full justify-center text-white text-center px-4 z-20">
          <div >
            <div className="flex gap-5">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
              SUMMER'2025
            </h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
              WINTER'2025
            </h1>
            </div>
            <NavLink to="/allgarments" onClick={closeMenus}>
              <button className="border-[3px] px-3 py-1 mt-3 border-white">
                SHOP NOW
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923328205786?text=Greetings%20to%20Minna%20%26%20Minnie."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 lg:right-20 right-3 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
    </>
  );
}

export default Header;
