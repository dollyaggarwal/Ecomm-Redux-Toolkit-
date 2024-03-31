import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../firebase/firebaseConfig';
import toast from 'react-hot-toast';

const userContext = createContext();
function useValue() {
	const value = useContext(userContext);
	return value;
}

function CustomContextProvider({ children }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
		// Check if there's a user already logged in
		const user = auth.currentUser;
		if (user) {
			setIsLoggedIn(true);
		}
		return () => unsubscribe(); // Clean up the observer on component unmount
	}, []);

	const handleSubmitForRegister = async (e) => {
		e.preventDefault();
		try {
			const userCredentails = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredentails.user;
			localStorage.setItem('token', user.accessToken);
			localStorage.setItem('user', JSON.stringify(user));
			setIsLoggedIn(true);
			toast.success(user.email + ' registered successfully');
		} catch (err) {
			alert(err.message);
		}
	};
	const handleSubmitForLogin = async (e) => {
		e.preventDefault();
		try {
			const userCredentails = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredentails.user;
			localStorage.setItem('token', user.accessToken);
			localStorage.setItem('user', JSON.stringify(user));
			setIsLoggedIn(true);
			toast.success(user.email + ' logged in successfully');
		} catch (err) {
			alert(err.message);
		}
	};
	const handleLogout = async (e) => {
		await signOut(auth);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setIsLoggedIn(false);
		toast.success('You have logged out successfully');
	};

	return (
		<userContext.Provider
			value={{
				name,
				setName,
				email,
				setEmail,
				password,
				setPassword,
				handleSubmitForRegister,
				handleSubmitForLogin,
				handleLogout,
				isLoggedIn,
			}}>
			{children}
		</userContext.Provider>
	);
}
export default CustomContextProvider;
export { useValue };
