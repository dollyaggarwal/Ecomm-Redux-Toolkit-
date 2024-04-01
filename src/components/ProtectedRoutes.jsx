import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFirebase } from '../firebase/firebaseConfig';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
	const { user } = useFirebase();

	useEffect(() => {
		if (!user) {
			toast.error('You must be logged in before accessing');
		}
	}, [user]);

	if (!user) {
		return <Navigate to='/' replace={true} />;
	}

	return children;
};

export default ProtectedRoute;
