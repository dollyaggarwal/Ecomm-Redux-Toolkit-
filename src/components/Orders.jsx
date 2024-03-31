import React from 'react';
import { itemValue } from '../contextApi/itemContext';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
function Orders() {
	const { orders } = itemValue();

	return (
		<>
			<section className={` ${orders.length === 0 ? "h-full": "h-screen md:h-full w-full py-1 bg-gray-100"}`}>
				<div className='w-full xl:w-8/12 mb-24 xl:mb-2 md:px-4 mx-auto mt-20'>
					<div className='rounded-t mb-0 px-2 py-3 border-0'>
						<div className='flex flex-wrap items-center justify-center'>
							<h3 className='font-semibold text-2xl text-blueGray-700'>
								Your Orders
							</h3>
						</div>
					</div>
					{orders.length === 0 ? (
						<div className=' h-full'>
									<div className='w-full h-[45vh] flex items-center justify-around'>
										<p className='text-5xl text-red-800 text-bold text-center'>
											Orders Yet To Be Placed!!
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
					) : (
						orders.map((order, index) => {
							const orderTotal = order.order
								.reduce((curr, item) => curr + item.price * item.qty, 0)
								.toLocaleString('en-IN');

							return (
								<>
									<div
										key={index}
										className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded '>
										<div className='block w-full overflow-x-auto'>
											<table className='items-center bg-transparent w-full border-collapse '>
												<thead>
													<tr>
														<th className='md:px-6 px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
															Products Name
														</th>
														<th className='md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
															Price
														</th>
														<th className='md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
															Quantity
														</th>
														<th className='md:px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
															Sub Total
														</th>
													</tr>
												</thead>
												<tbody>
													{order.order.map((item, itemIndex) => (
														<tr key={itemIndex}>
															<th className='border-t-0 max-w-48 md:px-6 px-4 align-middle border-l-0 border-r-0 text-md p-2 text-left text-blueGray-700'>
																{item.title}
															</th>
															<td className='border-t-0 md:px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-2'>
																&#8377;{item.price.toLocaleString('en-IN')}
															</td>
															<td className='border-t-0 md:px-10 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-2'>
																{item.qty}
															</td>
															<td className='border-t-0 md:px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-2'>
																&#8377;{(item.price * item.qty).toLocaleString('en-IN')}
															</td>
														</tr>
													))}

													<tr className='border-t-2'>
														<th className='border-t-0 md:px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-2 text-left text-blueGray-700'>
															Ordered On:
														</th>
														<td
															className='border-t-0 md:px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-2 font-bold '
															colSpan={2}>
															{order.date}
														</td>

														<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-2 font-bold'>
															&#8377;{orderTotal.toLocaleString('en-IN')}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</>
							);
						})
					)}
				</div>
			</section>
		</>
	);
}
export default Orders;
