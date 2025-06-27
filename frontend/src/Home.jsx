import React from 'react'
import ShopbyCategory from './Category/ShopbyCategory'
import ImageCarousel from './Crousal'
import Toys from './Toys/Toys'
import BabyGarments from './BabyGarmets/BabyGarmets'
function Home() {
  return (
    <>
    <ShopbyCategory/>
    <ImageCarousel/>
    <BabyGarments/>
    <Toys/>
   </>
  )
}

export default Home