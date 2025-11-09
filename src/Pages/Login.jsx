import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router";

const Login = () => {
	const [show, setShow] = useState(false);
	return (
		<div className="flex justify-center min-h-screen items-center">
			<div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl py-7 rounded-xl">
				<h2 className="text-2xl font-semibold text-center">
					Login in your account
				</h2>
				<div className="card-body">
					<form className="fieldset">
						{/* email */}
						<label className="label  text-gray-600 font-semibold">
							Email
						</label>
						<input
							type="email"
							// ref={emailRef}
							className="input text-accent"
							name="email"
							placeholder="Email"
							required
						/>

						{/* password */}
						<div className="relative form-control">
							<label className="block mb-1 text-gray-600 font-semibold">
								Password
							</label>
							<input
								type={show ? "text" : "password"}
								name="password"
								placeholder="••••"
								className="input text-accent"
								required
							/>
							<span
								onClick={() => setShow(!show)}
								className="absolute right-[19px] top-[38px] cursor-pointer z-50"
							>
								{show ? <FaEye /> : <IoEyeOff />}
							</span>
						</div>

						<button type="submit" className="btn btn-primary mt-4">
							Login
						</button>
						<p className="text-bg-300 text-center py-3">
							Don't have an Account?{" "}
							<Link
								className="text-primary underline hover:text-secondary"
								to="/register"
							>
								register
							</Link>{" "}
						</p>
					</form>
					<div className="divider">OR</div>

					<button className="btn btn-primary btn-outline px-2 w-full">
						<FcGoogle size={24} /> Continue with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
