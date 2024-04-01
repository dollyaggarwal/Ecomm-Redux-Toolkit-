import { FcCancel } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { itemSelector } from '../Redux/Reducers/itemsReducer';
import { useFirebase } from '../firebase/firebaseConfig';
import { addToCarts } from '../Redux/Reducers/cartReducer';
import toast from 'react-hot-toast';

function ItemsContainer() {
	const { user } = useFirebase();
	const { Items } = useSelector(itemSelector);
	const dispatch = useDispatch();

	const addItem = (item) => {
		if (!user) {
			toast.error('Please login to add items to the cart');
			return;
		}
		dispatch(addToCarts({ userId: user.uid, item }));
	};

	return (
		<>
			<div className='flex flex-row flex-wrap items-center md:justify-evenly justify-center gap-2 md:px-4 py-10  mb-14'>
				{Items.length === 0 ? (
					<div className='w-full h-full flex items-center pt-36 justify-center'>
						<FcCancel className='size-14' />
						<span className='text-red-700 font-bold text-3xl '>
							No product found for this search
						</span>
					</div>
				) : (
					Items.map((item) => (
						<div
							key={item.id}
							className='scale-up-center relative flex flex-col justify-center items-center text-gray-700 bg-white shadow-md bg-clip-border my-6 rounded-xl h-96 w-72'>
							<div className='relative w-[140px] h-[200px] md:w-[230px] md:h-[180px] mx-4 flex justify-center items-center overflow-hidden text-gray-70 bg-clip-border rounded-xl '>
								<img
									src={item.img}
									alt='card-image'
									className='max-w-full max-h-full md:max-w-full md:max-h-full'
								/>
							</div>
							<div className='py-4 '>
								<div className='flex flex-col items-center justify-between mb-2'>
									<p className='block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900'>
										{item.title}
									</p>
									<p className='block uppercase font-sans text-md antialiased font-normal leading-normal text-gray-700 opacity-75'>
										{item.category}
									</p>
								</div>
								<div className='flex items-center justify-between mb-2 w-48'>
									<p className='font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900'>
										&#8377;{item.price.toLocaleString('en-IN')}
									</p>
									<p className='uppercase font-sans text-md antialiased font-semibold leading-normal text-green-700 opacity-80'>
										-{item.discount}&#37; off
									</p>
								</div>
							</div>
							<div className='p-6 pt-0'>
								<button
									onClick={() => addItem(item)}
									className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20  active:shadow-none block w-full bg-gray-900/10 text-blue-gray-900  hover:scale-110 hover:bg-orange-400 hover:text-neutral-800 focus:scale-105 focus:shadow-none active:scale-100'
									type='button'>
									Add to Cart
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
}
export default ItemsContainer;
