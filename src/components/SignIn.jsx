import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { getADocsFromFirestore, loginUserWithEmailAndPassword } from '../firebase/firebase';

function SignIn() {
	
	//create initial data
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	  });

	  //set data
	  const data = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setUserData({ ...userData, [name]: value });
	  };

	const  handleSubmitForLogin = async()=>{
		try{
			if(!userData.email.includes("@")){
				toast.error("Please enter valid email id");
				return;
			}
			const data = await loginUserWithEmailAndPassword(userData.email, userData.password);
			
			if(data.message.includes("invalid-credential")){
				toast.error("Invalid email or password");
				return;
			}
			const user = data.user;
			const cart = await  getADocsFromFirestore("carts", user.uid);
			
		}catch(err){
			console.log(err.message)
		}
			
	}
	return (
		<>
			<section>
				<div className='scale-up-center flex flex-col md:w-full w-screen items-center justify-center px-4 py-8 mx-auto md:h-screen lg:py-0'>
					<a href='#' className='flex items-center mb-6 text-3xl font-semibold'>
						Bucket Store
					</a>
					<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-800'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-6'>
							<h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
								Login
							</h1>
							<form
								onSubmit={handleSubmitForLogin}
								className='space-y-4 md:space-y-6'
								action='#'>
								<div>
									<label
										htmlFor='email'
										className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>
										Your email
									</label>
									<input
										type='email'
										name='email'
										id='email'
										value={userData.email}
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='name@company.com'
										required
										onChange={data}
									/>
								</div>
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>
										Password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										value={userData.password}
										placeholder='••••••••'
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										required
										onChange={data}
									/>
								</div>

								<button
									type='button'
									onClick={handleSubmitForLogin}
									className='w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-5 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-primary-800'>
									Login
								</button>
								<p className='text-sm font-light text-gray-200 dark:text-gray-200'>
									Not Registered Yet ? {'  '}
									<span className='text-md font-medium text-blue-600 hover:underline dark:text-blue-500'>
										<Link to='/signup'>Create an Account </Link>
									</span>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
export default SignIn;
