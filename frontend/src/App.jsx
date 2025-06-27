import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home';
import ScrollToTop from './Scrolltop';
import Footer from './Footer/Footer';
function App() {
  return (
    <>
    <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
