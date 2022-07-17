
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/index.scss';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/product/id=:id" element={<Product />}></Route>
				<Route path="/cart" element={<Cart />}></Route>
				<Route path="/confirmation/orderId=:id" element={<Confirmation />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

