import React from 'react'
import ShopbyCategory from './Category/ShopbyCategory'
import ImageCarousel from './Crousal'
import Toys from './Toys/Toys'
import BabyGarments from './BabyGarmets/BabyGarmets'
import KidsSportswear from './Sportwears/Sportwears'
import KidsShoes from './Shoes/Shoes'
function Home() {
  return (
    <>
    <ShopbyCategory/>
    <ImageCarousel/>
    <BabyGarments/>
    <Toys/>
    <KidsSportswear/>
    <KidsShoes/>
   </>
  )
}

export default Home