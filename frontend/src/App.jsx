import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home';
import ScrollToTop from './Scrolltop';
import Footer from './Footer/Footer';
import AllProducts from './All garments/Allgarments';
function App() {
  return (
    <>
    <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allgarments" element={<AllProducts />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
