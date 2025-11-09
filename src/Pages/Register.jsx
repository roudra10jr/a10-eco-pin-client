import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Providers/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
	const [show, setShow] = useState(false);

	const {
		user,
		setUser,
		signInWithGoogleFunc,
		createUserWithEmailAndPasswordFunc,
		updateProfileFunc,
		signOutFunc,
		setLoading,
	} = useContext(AuthContext);

	const navigate = useNavigate();

	const handleRegisterSubmit = (e) => {
		e.preventDefault();

		const displayName = e.target.name.value;
		const photoURL = e.target.photo.value;
		const email = e.target.email.value;
		const password = e.target.password.value;

		// console.log({ name, photoURL, email, password });

		const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

		if (!regex.test(password)) {
			toast.error(
				'"Password must contain at least one uppercase & lowercase letter, and be at least 6 characters long.'
			);
			return;
		}

		// create user:
		createUserWithEmailAndPasswordFunc(email, password)
			.then((res) => {
				updateProfileFunc(displayName, photoURL)
					.then(() => {
						signOutFunc().then(() => {
							toast.success("Successfully registered");
							console.log(res.user);
							setUser(null);
							navigate("/login");
						});
					})
					.catch((error) => {
						toast.error(error.message);
					});
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	// continue with google:
	const handleGoogleSignFunc = () => {
		signInWithGoogleFunc()
			.then((res) => {
				setLoading(false);
				setUser(res.user);
				console.log(res.user);
				toast.success("Sign in Successfully");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<div className="flex justify-center min-h-screen items-center my-5">
			<div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl py-7 rounded-xl">
				<h2 className="text-2xl font-semibold text-center">
					Register your account
				</h2>
				<div className="card-body">
					<form onSubmit={handleRegisterSubmit} className="fieldset">
						{/* name */}
						<label className="label  text-gray-600 font-semibold">
							Name
						</label>
						<input
							type="text"
							name="name"
							className="input text-accent"
							placeholder="Your Name"
							required
						/>
						{/* photo url */}
						<label className="label  text-gray-600 font-semibold">
							Photo URL
						</label>
						<input
							type="text"
							name="photo"
							className="input text-accent"
							placeholder="photo-url"
							required
						/>
						{/* email */}
						<label className="label  text-gray-600 font-semibold">
							Email
						</label>
						<input
							type="email"
							name="email"
							className="input text-accent"
							placeholder="Email"
							required
						/>

						{/* password */}
						{/* <label className="label text-gray-600 font-semibold">
							Password
						</label>
						<input
							type="password"
							name="password"
							className="input text-accent"
							placeholder="Password"
						/> */}
						{/* password */}
						<div className="relative form-control">
							<label className="block mb-1 text-gray-600 font-semibold">
								Password
							</label>
							<input
								type={show ? "text" : "password"}
								name="password"
								placeholder="••••"
								className="input text-accent "
								required
							/>
							<span
								onClick={() => setShow(!show)}
								className="absolute right-[19px] top-[38px] cursor-pointer z-50"
							>
								{show ? <FaEye /> : <IoEyeOff />}
							</span>
						</div>

						<button className="btn btn-primary mt-4">
							Register
						</button>
						<p className="text-bg-300 text-center py-3">
							Already have an Account?{" "}
							<Link
								className="text-primary underline hover:text-secondary"
								to="/login"
							>
								login
							</Link>{" "}
						</p>
					</form>
					<div className="divider">OR</div>

					<button
						onClick={handleGoogleSignFunc}
						className="btn btn-primary btn-outline px-2 w-full"
					>
						<FcGoogle size={24} /> Continue with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
