import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const HomeLayout = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<header>
				<NavBar></NavBar>
			</header>

			<main className="flex-1">
				<Outlet></Outlet>
			</main>

			<footer>
				<Footer></Footer>
			</footer>
		</div>
	);
};

export default HomeLayout;
