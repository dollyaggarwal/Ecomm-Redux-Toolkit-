import React, { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, decreaseQuantity, findCartTotal, findFinalTotal, getAllCarts, increaseQuantity, removeFromCarts } from '../Redux/Reducers/cartReducer';
import { checkoutOrders } from '../Redux/Reducers/orderReducer';

function CartItems() {
	const {user} = useFirebase();
	const dispatch = useDispatch();
	const {carts,cartTotal,finalTotal} = useSelector(cartSelector);
	const navigate = useNavigate();

	const checkoutToOrders = ()=>{
		dispatch(checkoutOrders({userId:user.uid}))
		navigate('/orders');
	}
useEffect(()=>{

 dispatch(getAllCarts({userId:user.uid}));

},[dispatch,user])

	return (
		<>
			<div className='p-5'>
				<div className='container mx-auto px-4'>
					<h1 className='text-2xl font-semibold mb-4'>Shopping Cart</h1>
					<div className='flex flex-col md:flex-row gap-8'>
						<div className={`${carts?.length == 0 ? "md:w-full": "md:w-3/4"}`}>
							{carts?.length > 0 ? (
								<div className='bg-white rounded-lg shadow-lg pl-1 py-6 mb-4'>
									<table className='w-full h-full '>
										<thead>
											<tr>
												<th className='text-center text-md font-bold'>Product</th>
												<th className='text-center text-md font-bold'>Name</th>
												<th className='text-left text-md font-bold'>Price</th>
												<th className='text-left text-md font-bold'>Quantity</th>
												<th className='text-left text-md font-bold'>Total</th>
												<th className='text-left text-md font-bold'>Action</th>
											</tr>
										</thead>

										<tbody>
											{carts.map((item) => {
												return (
												
													<tr key={item.id}>
														<td className='py-2 flex items-center justify-center'>
															<div className='h-20 w-16'>
																<img
																	className=' w-full h-full'
																	src={item.img}
																	alt='Product image'
																/>
															</div>
														</td>
														<td className='py-4 text-sm text-center'>
														  {item.title}
														</td>
														<td className='py-4 text-sm '>
															&#8377;{item.price.toLocaleString('en-IN')}
														</td>
														<td className='py-4 text-sm text-center'>
															<div className='flex items-center'>
																<button
																	className='border rounded-md py-2 px-4 mr-2'
																	onClick={() => dispatch(decreaseQuantity({userId:user.uid,itemId:item.id}))}>
																	-
																</button>
																<span className='text-center w-2'>
																	{item.qty}
																</span>
																<button
																	className='border rounded-md py-2 px-4 ml-2'
																	onClick={() => dispatch(increaseQuantity({userId:user.uid,itemId:item.id}))}>
																	+
																</button>
															</div>
														</td>
														<td className='py-4 text-sm '>
															&#8377;{(item.qty * item.price).toLocaleString('en-IN')}
														</td>
														<td className='py-4 text-lg'>
															<MdDelete
																onClick={() => dispatch(removeFromCarts({userId:user.uid,itemId:item.id}))}
																className='size-6 cursor-pointer hover:text-red-700'
															/>
														</td>
													</tr>
												
												);
											
											})}
											</tbody>
											{/* More product rows */}
										
									</table>
								</div>
							) : (
								<div className=' h-full'>
									<div className='w-full h-[45vh] flex items-center justify-around'>
										<p className='text-5xl text-red-800 text-bold text-center'>
											Your Cart is empty!!
										</p>
									</div>
									<div className='w-full flex justify-around group'>
										<Link to='/'>
											<Button className='px-6 py-3 text-lg bg-black hover:bg-red-700'>
												Shop Now
											</Button>
										</Link>
									</div>
								</div>
							)}
						</div>

						{carts?.length > 0 && (
							<div className='md:w-1/4'>
								<div className='bg-white rounded-lg shadow-lg p-6'>
									<h2 className='text-md font-bold mb-4'>Summary</h2>
									<div className='flex justify-between mb-2 text-md'>
										<span>Subtotal</span>
										<span>&#8377;{cartTotal}</span>
									</div>

									<div className='flex justify-between mb-2 text-md '>
										<span>Shipping</span>
										<span>
											&#8377;{cartTotal < 500 && cartTotal != 0 ? 75 : 0.0}
										</span>
									</div>
									<hr className='my-2' />
									<div className='flex justify-between mb-2 text-md '>
										<span className='font-bold'>Total</span>
										<span className='font-bold'>
											&#8377;{finalTotal.toLocaleString('en-IN')}
										</span>
									</div>
									<Link to='/orders'>
										<button
											className='bg-black text-white font-bold text-md py-2 px-2 rounded-md hover:bg-orange-400 hover:text-black mt-4 w-full'
											onClick={checkoutToOrders}>
											Checkout
										</button>
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default CartItems;
