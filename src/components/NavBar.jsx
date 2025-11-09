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

import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import navLogo from "../assets/nav-logo.jpg";

const NavBar = () => {
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const links = (
		<>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="">All Issues</NavLink>
			</li>
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
				<div className="navbar-start">
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
						</ul>
					</div>

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

				<div className="navbar-end hidden lg:flex items-center">
					<ul className="menu menu-horizontal px-1">{links}</ul>
					<div>
						<Link to="/login">
							<button className="btn mx-2 btn-primary text-white">
								Login
							</button>
						</Link>
						<Link to="">
							<button className="btn btn-primary text-white">
								Register
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
