import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import girlsapparels from "../images/Girls_Apparel_1024x1024.jpg"
import boysapparel from '../images/Boys_Apparel_1024x1024.jpg'
import toys from "../images/toys_festival_puzzle_games_26c51f5d-e9ca-458c-a745-438758782a38_1024x1024.jpg"
import sportwears from "../images/sportswears.jpeg"
import boysshows from "../images/Boy_shoes_1024x1024.jpg"
import Babycare from "../images/Baby_Care_1024x1024.jpg"

const categories = [
  {
    title: 'GIRLS APPAREL',
    image: girlsapparels,
    path: '/baby-garments',
  },
  {
    title: 'BOYS APPAREL',
    image:boysapparel,
    path: '/accessories',
  },
  {
    title: 'TOYS',
    image: toys,
    path: '/toys',
  },
  {
    title: 'SPORT WEARS',
    image: sportwears,
    path: '/sport-wears',
  },
  {
    title: 'Baby Shoes',
    image: boysshows,
    path: '/baby-shoes',
  },
   {
    title: 'Baby care',
    image: Babycare,
    path: '/baby-care',
  },
];

function ShopbyCategory() {
  useEffect(() => {
    AOS.init({ duration: 1000 });

  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl text-center my-5 mb-7 font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text" data-aos="fade-down">Shop By Category</h2>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((item, index) => (
          <NavLink to={item.path} key={index}>
            <div
              className="bg-white shadow-lg rounded overflow-hidden hover:shadow-xl transition duration-300"
              
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
                data-aos="fade-right"
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
