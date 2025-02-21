import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';
import MapView from '@/pages/MapView';
import ResortDetail from '@/pages/ResortDetail';
import DivisionDetail from '@/pages/DivisionDetail';
import ProductList from '@/pages/ProductList';
import ProductDetail from '@/pages/ProductDetail';
import AllProducts from '@/pages/AllProducts';
import Contract from '@/pages/Contract';
import ContractDetail from '@/pages/ContractDetail';
import CustomerContractDetail from '@/pages/CustomerContractDetail';
import Contracts from '@/pages/Contracts';
import Membership from '@/pages/Membership';
import Notifications from '@/pages/Notifications';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/resort/:id" element={<ResortDetail />} />
          <Route path="/division/:id" element={<DivisionDetail />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/all" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contract/new" element={<Contract />} />
          <Route path="/contract/:id" element={<ContractDetail />} />
          <Route path="/contract/:id/customer" element={<CustomerContractDetail />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/membership/:membershipId" element={<Membership />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App