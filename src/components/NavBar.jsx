// import React from "react";
// import { NavLink } from "react-router";
// import navLogo from "../assets/nav-logo.jpg";

// const NavBar = () => {
// 	const links = (
// 		<>
// 			<li>
// 				<NavLink to="/">Home</NavLink>
// 			</li>
// 			<li>
// 				<NavLink to="">All Issues</NavLink>
// 			</li>
// 			{/* <li><NavLink to="/">Home</NavLink></li> */}
// 		</>
// 	);

// 	return (
// 		<div className="w-11/12 mx-auto flex flex-col md:flex-row bg-base-200 justify-between items-center py-3 px-3 shadow-sm">
// 			<div className="navbar-start">
// 				<div className="dropdown">
// 					<div
// 						tabIndex={0}
// 						role="button"
// 						className="btn btn-ghost lg:hidden"
// 					>
// 						<svg
// 							xmlns="http://www.w3.org/2000/svg"
// 							className="h-5 w-5"
// 							fill="none"
// 							viewBox="0 0 24 24"
// 							stroke="currentColor"
// 						>
// 							{" "}
// 							<path
// 								strokeLinecap="round"
// 								strokeLinejoin="round"
// 								strokeWidth="2"
// 								d="M4 6h16M4 12h8m-8 6h16"
// 							/>{" "}
// 						</svg>
// 					</div>
// 					<ul
// 						tabIndex="-1"
// 						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
// 					>
// 						{links}
// 					</ul>
// 				</div>

// 				<div className="flex gap-3">
// 					<img
// 						className="h-12 w-12 rounded-full"
// 						src={navLogo}
// 						alt=""
// 					/>
// 					<h1 className="text-primary font-bold tracking-wider text-4xl md:text-5xl  drop-shadow-lg [text-shadow:2px_2px_0px_#000] ">
// 						EcoPin
// 					</h1>
// 				</div>
// 			</div>
// 			<div className="navbar-end hidden lg:flex">
// 				<ul className="menu menu-horizontal px-1">{links}</ul>

// 				<div className="">
// 					<button className="btn mx-2 btn-primary text-white">
// 						Login
// 					</button>
// 					<button className="btn btn-primary text-white">
// 						Register
// 					</button>
// 				</div>
// 			</div>
// 			{/* <div className="navbar-end">
// 				<a className="btn">Button</a>
// 			</div> */}
// 		</div>
// 	);
// };

// export default NavBar;

import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import navLogo from "../assets/nav-logo.jpg";
import { AuthContext } from "../Providers/AuthContext";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";

const NavBar = () => {
	const { user, loading, signOutFunc } = useContext(AuthContext);
	const [scrolled, setScrolled] = useState(false);
	const [showLogout, setShowLogout] = useState(false);
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleLogout = () => {
		signOutFunc()
			.then(() => {
				toast.success("Successfully Logout");
			})
			.catch((e) => {
				toast.error(e.message);
			});
	};

	const links = (
		<>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="/all-issues">All Issues</NavLink>
			</li>
			{user && (
				<>
					<li>
						<NavLink to="/add-issue">Add Issue</NavLink>
					</li>
					<li>
						<NavLink to="/my-issues">My Issues</NavLink>
					</li>
					<li>
						<NavLink to="/my-contributions">
							My Contributions
						</NavLink>
					</li>
				</>
			)}
		</>
	);

	return (
		<div
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
				scrolled || !isHomePage
					? "bg-base-200 shadow-md text-black"
					: "bg-transparent text-white"
			}`}
		>
			<div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center py-3 px-3">
				{/* Left Section */}
				<div className="navbar-start">
					{/* Mobile Menu */}
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className={`btn btn-ghost lg:hidden ${
								scrolled || !isHomePage
									? "text-black"
									: "text-white"
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex="-1"
							className="menu menu-sm dropdown-content bg-base-100 text-black font-semibold rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							{links}

							{user && (
								<li className="mt-3 border-t pt-3 flex flex-col items-center">
									<div className="relative">
										{/* Avatar */}
										<div
											onClick={() =>
												setShowLogout(!showLogout)
											}
										>
											<img
												src={
													user?.photoURL ||
													"https://via.placeholder.com/88"
												}
												className="h-[40px] w-[40px] rounded-full border-2 border-primary cursor-pointer hover:scale-105 transition-transform duration-200"
												alt={user?.displayName}
											/>
										</div>

										{/* Dropdown Menu */}
										{showLogout && (
											<div className="absolute top-12 right-0 bg-base-100 border border-base-300 shadow-lg rounded-xl p-3 min-w-[160px] animate-fadeIn z-50">
												<p className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">
													{user?.displayName ||
														"User"}
												</p>
												<p className="text-xs text-accent mb-3">
													{user?.email}
												</p>
												<button
													onClick={handleLogout}
													className="btn btn-primary w-full rounded-xl"
												>
													Logout
												</button>
											</div>
										)}
									</div>
								</li>
							)}
						</ul>
					</div>

					{/* Logo */}
					<div className="flex gap-3 items-center">
						<img
							className="h-12 w-12 rounded-full"
							src={navLogo}
							alt="EcoPin logo"
						/>
						<h1 className="text-primary font-bold tracking-wider text-4xl md:text-5xl drop-shadow-lg [text-shadow:2px_2px_0px_#000]">
							EcoPin
						</h1>
					</div>
				</div>

				{/* Right Section */}
				<div className="navbar-end hidden lg:flex items-center relative">
					<ul className="menu menu-horizontal px-1">{links}</ul>

					{/* User Actions */}
					<div className="flex justify-center items-center relative">
						{loading ? (
							<ClockLoader color="#5a8418" />
						) : user ? (
							<div className="relative">
								{/* Avatar */}
								<div onClick={() => setShowLogout(!showLogout)}>
									<img
										src={
											user?.photoURL ||
											"https://via.placeholder.com/88"
										}
										className="h-[40px] w-[40px] rounded-full border-2 border-primary cursor-pointer hover:scale-105 transition-transform duration-200"
										alt={user?.displayName}
									/>
								</div>

								{/* Dropdown Menu */}
								{showLogout && (
									<div className="absolute top-12 right-0 bg-base-100 border border-base-300 shadow-lg rounded-xl p-3 min-w-[160px] animate-fadeIn z-50">
										<p className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">
											{user?.displayName || "User"}
										</p>
										<p className="text-xs text-accent mb-3">
											{user?.email}
										</p>
										<button
											onClick={handleLogout}
											className="btn btn-primary w-full rounded-xl"
										>
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<div>
								<Link to="/login">
									<button className="btn mx-2 btn-primary text-white">
										Login
									</button>
								</Link>
								<Link to="/register">
									<button className="btn btn-primary text-white">
										Register
									</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
