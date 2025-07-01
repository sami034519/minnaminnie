import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home';
import ScrollToTop from './Scrolltop';
import Footer from './Footer/Footer';
import AllProducts from './All garments/Allgarments';
import ProductDetail from './Productdetails/ProducDetails';
import ToyDetail from './ToyDetails/ToyDetail';
import AllToys from './AllToys/AllToys';
import AllSportswear from './AllSportswear/AllSportswear';
import SportswearDetail from './Sportweardetail/SportwearDetail';
import AllShoes from './AllShoes/Allshoes';
import ShoeDetail from './ShoeDetail/ShoeDetail';
import SearchPage from './Searchpage/Searchpage';
import TermsAndConditions from './TermsAndCondition/Terms';
import PrivacyPolicy from './Privacypolicy/Privacy';
import Babycare from './BABYcare/Babycare';
function App() {
  return (
    <>
    <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allgarments" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/toy/:id" element={<ToyDetail />} />
        <Route path="/toys" element={<AllToys />} />
        <Route path="/sportwears" element={<AllSportswear/>} />
        <Route path="/sportswear/:id" element={<SportswearDetail />} />
        <Route path="/shoes" element={<AllShoes />} />
        <Route path="/shoe/:id" element={<ShoeDetail />} />
        <Route path="/search" element={<SearchPage />} />
         <Route path="/terms" element={<TermsAndConditions />} />
         <Route path="/privacy" element={<PrivacyPolicy/>} />
         <Route path="/babycare" element={<Babycare/>} />



      </Routes>
      <Footer/>
    </>
  );
}

export default App;
