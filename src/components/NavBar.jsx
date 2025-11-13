import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import navLogo from "../assets/nav-logo.jpg";
import { AuthContext } from "../Providers/AuthContext";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBar = () => {
	const { user, loading, signOutFunc } = useContext(AuthContext);
	const [scrolled, setScrolled] = useState(false);
	const [showLogout, setShowLogout] = useState(false);
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	const location = useLocation();
	const isHomePage = location.pathname === "/";
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		document.querySelector("html").setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	useEffect(() => {
		const onDocClick = (e) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target)
			) {
				setShowLogout(false);
			}
		};
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, []);

	const toggleTheme = () =>
		setTheme((t) => (t === "light" ? "dark" : "light"));

	const handleLogout = () => {
		signOutFunc()
			.then(() => toast.success("Successfully Logout"))
			.catch((e) => toast.error(e.message));
	};

	const navlinkClass = ({ isActive }) =>
		`px-3 py-1 rounded transition-colors ${
			isActive
				? "font-semibold border-b-4 border-[#fece00]"
				: "hover:opacity-90"
		}`;

	const links = (
		<>
			<li>
				<NavLink className={navlinkClass} to="/">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink className={navlinkClass} to="/all-issues">
					All Issues
				</NavLink>
			</li>
			{user && (
				<>
					<li>
						<NavLink className={navlinkClass} to="/add-issue">
							Add Issue
						</NavLink>
					</li>
					<li>
						<NavLink className={navlinkClass} to="/my-issues">
							My Issues
						</NavLink>
					</li>
					<li>
						<NavLink
							className={navlinkClass}
							to="/my-contributions"
						>
							My Contributions
						</NavLink>
					</li>
				</>
			)}
		</>
	);

	const navBackground =
		scrolled || !isHomePage
			? theme === "dark"
				? "bg-gray-900 text-white shadow-md"
				: "bg-base-200 shadow-md text-black"
			: "bg-transparent text-white";

	return (
		<div
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBackground}`}
		>
			<div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center py-3 px-3">
				{/* Left Section */}
				<div className="navbar-start flex items-center gap-3">
					{/* Mobile Dropdown */}
					<div className="dropdown lg:hidden">
						<label
							tabIndex={0}
							className="btn btn-ghost p-2 mr-2"
							aria-label="menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</label>

						<ul
							tabIndex={0}
							className={`menu menu-compact dropdown-content mt-3 p-3 shadow rounded-box w-56 ${
								theme === "dark"
									? "bg-gray-800 text-white"
									: "bg-base-100 text-black"
							}`}
						>
							{/* Main navigation links */}
							{links}

							{/* Theme switcher */}
							<li className="mt-2 border-t border-[#fece00]/30 pt-2">
								<div className="flex items-center justify-between px-1">
									<span className="text-sm">Theme</span>
									<label className="swap swap-rotate">
										<input
											type="checkbox"
											onChange={toggleTheme}
											checked={theme === "dark"}
										/>
										<FaSun className="swap-on text-[#fece00]" />
										<FaMoon className="swap-off text-gray-400" />
									</label>
								</div>
							</li>

							{/* ✅ Show login/register only if user not logged in */}
							{!user && (
								<li className="mt-3 flex flex-col gap-2">
									<Link to="/login">
										<button className="btn btn-primary w-full text-white rounded-lg">
											Login
										</button>
									</Link>
									<Link to="/register">
										<button className="btn btn-primary w-full text-white rounded-lg">
											Register
										</button>
									</Link>
								</li>
							)}
						</ul>
					</div>

					{/* Logo */}
					<img
						className="h-12 w-12 rounded-full"
						src={navLogo}
						alt="EcoPin"
					/>
					<h1 className="text-primary font-bold tracking-wider text-4xl md:text-5xl drop-shadow-lg [text-shadow:2px_2px_0px_#000]">
						EcoPin
					</h1>
				</div>

				<div className="navbar-end flex items-center gap-3">
					<ul className="menu menu-horizontal px-1 hidden lg:flex">
						{links}
					</ul>

					<label className="swap swap-rotate cursor-pointer mx-2 hidden lg:inline-flex">
						<input
							type="checkbox"
							onChange={toggleTheme}
							checked={theme === "dark"}
						/>
						<FaSun className="swap-on fill-current text-[#fece00] text-2xl" />
						<FaMoon className="swap-off fill-current text-gray-400 text-2xl" />
					</label>

					<div ref={dropdownRef} className="flex items-center">
						{loading ? (
							<ClockLoader color="#5a8418" />
						) : user ? (
							<div className="relative">
								<img
									src={
										user?.photoURL ||
										"https://via.placeholder.com/88"
									}
									className="h-[40px] w-[40px] rounded-full border-2 border-[#fece00] cursor-pointer hover:scale-105 transition-transform duration-200"
									alt={user?.displayName}
									onClick={() => setShowLogout((s) => !s)}
								/>

								{showLogout && (
									<div
										className={`absolute top-12 right-0 ${
											theme === "dark"
												? "bg-gray-800 text-white"
												: "bg-base-100 text-black"
										} border border-[#fece00]/30 shadow-lg rounded-xl p-3 min-w-[180px] z-50`}
									>
										<p className="text-sm font-semibold mb-2 border-b border-[#fece00]/40 pb-1">
											{user?.displayName || "User"}
										</p>
										<p className="text-xs opacity-80 mb-3">
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
							<div className="hidden lg:flex gap-2">
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
