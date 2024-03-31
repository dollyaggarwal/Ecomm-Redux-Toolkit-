import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { FaHome } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { RiLoginBoxFill } from 'react-icons/ri';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { useFirebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { searchItems } from '../Redux/Reducers/itemsReducer';
import { useEffect } from 'react';
import { getAllCarts } from '../Redux/Reducers/cartReducer';
import { logoutUser } from '../firebase/firebase';

function Navbar() {
	const {user} = useFirebase();
	const dispatch = useDispatch();

useEffect(()=>{

	dispatch(getAllCarts())	
},[]);
	return (
		<>
			<nav>
				<div className='w-full h-fit border border-b-1 shadow-md flex flex-col md:flex-row items-center md:justify-between z-1 relative'>
					<div className='flex md:max-w-[50%] md:min-w-[40%] w-full items-center md:py-0 py-4'>

					<div className='w-20 h-full mx-6'>
						<img src={logo} alt='logo' />
					</div>

					<div className='relative md:max-w-[80%] md:min-w-[60%] md:w-[70%] text-gray-900 font-semibold lg:block mr-4 w-full'>
						<input
							onChange={(e)=>dispatch(searchItems(e.target.value))}
							className='border-2 border-gray-400 bg-white w-full h-11 pl-3 rounded-lg text-sm focus:outline-none'
							type='search'
							name='search'
							placeholder='Search for Brands,Products and more...'
						/>
					</div>
					</div>

					<div className='flex justify-between gap-2 md:min-w-[35rem] md:max-w-[50rem] items-center py-5 w-full px-8 sm:mr-5'>
						<div className='flex justify-between gap-1 items-center cursor-pointer hover:text-orange-400 font-semibold md:text-2xl text-xl'>
							<span>
								<FaHome />
							</span>
							<Link to='/'>
								<span>Home</span>
							</Link>
						</div>
						<div className='flex  justify-between gap-2 items-center cursor-pointer hover:text-orange-400 font-semibold md:text-2xl text-xl'>
							<span>
								<FaShoppingBag />
							</span>
							<Link to='/orders'>
								<span>Orders</span>
							</Link>
						</div>
						<div className='flex justify-between gap-2 items-center cursor-pointer hover:text-orange-400  font-semibold md:text-2xl text-xl'>
							<span>
								{' '}
								<FaShoppingCart />
							</span>
							<Link to='/cart'>
								{' '}
								<span>Cart</span>
							</Link>
						</div>
						<div className='flex  justify-between gap-2 items-center cursor-pointer hover:text-orange-400  font-semibold md:text-2xl text-xl'>
							{user ? (
								<>
									<span>
										<RiLogoutBoxFill />
									</span>
									<Link to='/' onClick={logoutUser}>
										<span>Logout</span>
									</Link>
								</>
							) : (
								<>
									<span>
										<RiLoginBoxFill />
									</span>

									<Link to='/login'>
										<span>Login</span>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
			<Outlet />
		</>
	);
}
export default Navbar;
