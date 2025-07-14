import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import GirlsApparel from './Girlsapparel/Girlsapparel';
import BoysApparel from './boyapparel/BoysApparel';
import Dashboard from './Admin/Dashboard';
import AllWatches from './AllWatches';

function App() {
  const location = useLocation();

  // List of routes that should NOT show Header and Footer
  const hideLayoutRoutes = ["/dashboard"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {/* Show Header only if not on a hidden layout route */}
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allgarments" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/toy/:id" element={<ToyDetail />} />
        <Route path="/toys" element={<AllToys />} />
        <Route path="/sportwears" element={<AllSportswear />} />
        <Route path="/sportswear/:id" element={<SportswearDetail />} />
        <Route path="/shoes" element={<AllShoes />} />
        <Route path="/shoe/:id" element={<ShoeDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/babycare" element={<Babycare />} />
        <Route path="/girlsapparel" element={<GirlsApparel />} />
        <Route path="/boysapparel" element={<BoysApparel />} />
        <Route path="/watches" element={<AllWatches />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Show Footer only if not on a hidden layout route */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
