import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useEffect } from "react";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// login with google:
	const signInWithGoogleFunc = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	// sign in/ login:
	const signInWithEmailAndPasswordFunc = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	// create user: sign up/ register:
	const createUserWithEmailAndPasswordFunc = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setLoading(false);
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		setUser,
		loading,
		setLoading,
		signInWithGoogleFunc,
		signInWithEmailAndPasswordFunc,
		createUserWithEmailAndPasswordFunc,
	};
	return (
		<AuthContext value={authInfo}>
			{/*  */}
			{children}
		</AuthContext>
	);
};

export default AuthProvider;
