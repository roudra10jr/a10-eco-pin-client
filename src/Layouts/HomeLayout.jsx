import React from "react";
import NavBar from "../components/NavBar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../components/Footer";
import LoadingBar from "../Pages/LoadingBar";
import { Helmet } from "react-helmet-async";

const HomeLayout = () => {
	const { state } = useNavigation();
	return (
		<div className="min-h-screen flex flex-col">
			<Helmet>
				<title>EcoPin | Discover Eco-Friendly Places Near You</title>
			</Helmet>
			<header>
				<NavBar></NavBar>
			</header>

			<main className="flex-1">
				{state == "loading" ? (
					<LoadingBar></LoadingBar>
				) : (
					<Outlet></Outlet>
				)}
			</main>

			<footer>
				<Footer></Footer>
			</footer>
		</div>
	);
};

export default HomeLayout;
