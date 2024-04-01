import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from './firebaseInit';

//initiaize the context API
const FirebaseContext = createContext();

//custom hook
export const useFirebase = () => useContext(FirebaseContext);

//context API provider
export const FirebaseProvider = ({ children }) => {
	//get user state
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			 console.clear()
			if (user) {
				setUser(user);
			} else {
				console.log('you are logged out');
				setUser(null);
			}
			navigate('/');
		});
	}, [user]);

	return (
		<FirebaseContext.Provider value={{ user }}>
			{children}
		</FirebaseContext.Provider>
	);
};
