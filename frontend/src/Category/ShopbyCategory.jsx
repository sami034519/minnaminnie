import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';

// Public images are now accessed via /images/filename.jpg (hosted from public folder)
const categories = [
  {
    title: 'GIRLS APPAREL',
    image: '/images/Girls_Apparel_1024x1024.jpg',
    path: '/allgarments',
  },
  {
    title: 'BOYS APPAREL',
    image: '/images/Boys_Apparel_1024x1024.jpg',
    path: '/allgarments',
  },
  {
    title: 'TOYS',
    image: '/images/toys_festival_puzzle_games_26c51f5d-e9ca-458c-a745-438758782a38_1024x1024.jpg',
    path: '/toys',
  },
  {
    title: 'SPORT WEARS',
    image: '/images/sportswears.jpeg',
    path: '/sport-wears',
  },
  {
    title: 'BABY SHOES',
    image: '/images/Boy_shoes_1024x1024.jpg',
    path: '/baby-shoes',
  },
  {
    title: 'BABY CARE',
    image: '/images/Baby_Care_1024x1024.jpg',
    path: '/baby-care',
  },
];

function ShopbyCategory() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2
        className="text-3xl text-center my-5 mb-7 font-extrabold text-myPink"
        data-aos="fade-down"
      >
        Shop By Category
      </h2>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((item, index) => (
          <NavLink to={item.path} key={index}>
            <div className="bg-white shadow-lg rounded overflow-hidden hover:shadow-xl transition duration-300">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
                data-aos="fade-left"
              />
              <h1 className="text-center text-lg font-semibold py-4 uppercase">
                {item.title}
              </h1>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ShopbyCategory;
