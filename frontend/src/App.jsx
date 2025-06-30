import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home';
import ScrollToTop from './Scrolltop';
import Footer from './Footer/Footer';
import AllProducts from './All garments/Allgarments';
import ProductDetail from './Productdetails/ProducDetails';
function App() {
  return (
    <>
    <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allgarments" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
