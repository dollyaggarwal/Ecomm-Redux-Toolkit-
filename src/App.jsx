import React from 'react';
import {
	Route,
	RouterProvider,
	Routes,
	createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CartItems from './components/cartItems';
import Orders from './components/Orders';
import RouteErrorPage from './errorHandles/RouteErrorPage';
import ProtectedRoute from './components/ProtectedRoutes';
import { Helmet } from 'react-helmet';
import logo from './assets/img/logo.png';

function App() {
	// const router = createBrowserRouter([
	// 	{
	// 		path: '/',
	// 		element: <Navbar />,
	// 		errorElement: <RouteErrorPage />,
	// 		children: [
	// 			{
	// 				index: true,
	// 				element: <Banner />,
	// 			},
	// 			{
	// 				path: 'orders',
	// 				element: (
	// 					<ProtectedRoute>
	// 						<Orders />
	// 					</ProtectedRoute>
	// 				),
	// 			},
	// 			{
	// 				path: 'cart',
	// 				element: (
	// 					<ProtectedRoute>
	// 						<CartItems />
	// 					</ProtectedRoute>
	// 				),
	// 			},
	// 			{ path: 'login', element: <SignIn /> },
	// 			{ path: 'signup', element: <SignUp /> },
	// 		],
	// 	},
	// ]);

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Bucket Store</title>
				<link rel='icon' type='image/svg+xml' href={logo} />
			</Helmet>
			<Routes>
				<Route path='/' element={<Navbar />}>
				<Route index element={<Banner />} />
				<Route
						path='orders'
						element={
							<ProtectedRoute>
								<Orders />
							</ProtectedRoute>
						}
					/>
				<Route
						path='cart'
						element={
							
								<CartItems />
							
						}
					/>
				<Route path='login' element={<SignIn />} />
				<Route path='signup' element={<SignUp />} />
				<Route path='*' element={<RouteErrorPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
