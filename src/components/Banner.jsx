import banner from '../assets/img/b1.jpg';
import ItemsContainer from './itemsCard';

function Banner() {
	return (
		<>
			<div className='relative top-1 font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10'>
				<img
					src={banner}
					alt='Banner Image'
					className='absolute inset-0 w-full h-full'
				/>
				<div className='h-[320px] md:h-[430px] max-w-xl relative z-50 flex md:ml-[20%]  flex-col justify-center items-center text-center text-white '>
					<h4 className='text-md md:text-3xl font-semibold mb-6'>
						{' '}
						Hurry up!!!
					</h4>
					<h2 className='md:text-3xl text-lg text-nowrap font-semibold mb-6'>
						Discover Our Brand New Collection
					</h2>
					<p className='text-sm md:text-xl text-center text-gray-200'>
						Elevate your style with our latest arrivals.
						<br />
						Shop now and enjoy exclusive discounts!!
					</p>
				</div>
			</div>
			<ItemsContainer />
		</>
	);
}

export default Banner;
