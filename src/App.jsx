import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './component/common/ScrollToTop';

import Home from './pages/home/Home';
import ProductmainPage from './pages/productpage/ProductmainPage';
import ProductDetails from './pages/productDetails/ProductDetails';
import DesiGheeProduct from './pages/categoriesProduct/DesiGheeProduct';
import ComboProductDetails from './pages/combo/ComboProductDetails';
import CheckoutPage from './pages/productpage/CheckoutPage';
import OrdersPage from './pages/productpage/OrdersPage';
import OrderDetailsPage from './pages/productpage/OrderDetailsPage';
import ReturnDetailsPage from './pages/productpage/ReturnDetailsPage';
import ReturnPage from './pages/conditionsPage/ReturnPage';
import CancelOrderPage from './pages/conditionsPage/CancelOrderPage';
import InvoiceView from './pages/conditionsPage/InvoiceView';
import BlogsPage from './pages/blogs/BlogsPage';
import BlogDetailsPage from './pages/blogs/BlogDetailsPage';
import AboutUsPage from './pages/aboutus/AboutUsPage';
import ContactUs from './pages/contactUsPage/ContactUs';
import GawdeeForm from './pages/GawdeeForm';
import PdfViewPage from './pages/PdfViewPage';
import CookiePolicyPage from './pages/PolicyPage/CookiePolicyPage';
import PrivacyPolicyPage from './pages/PolicyPage/PrivacyPolicyPage';
import TermsConditionsPage from './pages/PolicyPage/TermsConditionsPage';
import AllOrdersPage from './pages/productpage/AllOrdersPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<ProductmainPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/products/:slug" element={<DesiGheeProduct />} />
        <Route path="/combo-product" element={<ComboProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog-details/:slug" element={<BlogDetailsPage />} />

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/exhibitions" element={<GawdeeForm />} />

        <Route path="/my-orders" element={<OrdersPage />} />
        <Route path="/my-orders/order-details/:id" element={<OrderDetailsPage />} />
        <Route path="/my-orders/return-order-details" element={<ReturnDetailsPage />} />
        <Route path="/my-orders/order-details/return-request/:id" element={<ReturnPage />} />
        <Route path="/my-orders/invoice/:orderId" element={<InvoiceView />} />
        <Route path="/my-orders/cancel/:id" element={<CancelOrderPage />} />

        <Route path="/gawdee-organic-lab-test" element={<PdfViewPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-condition" element={<TermsConditionsPage />} />
        <Route path="/all-orders" element={<AllOrdersPage />} />
      </Routes>
    </>
  );
}
