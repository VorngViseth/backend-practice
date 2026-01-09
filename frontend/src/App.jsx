import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// components
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

import './css/App.css'

const Tvna = lazy(() => import('./pages/Tvna.jsx'))
const Community = lazy(() => import('./pages/Community.jsx'))

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Tvna />} />
          <Route path="/Community" element={<Community />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App
