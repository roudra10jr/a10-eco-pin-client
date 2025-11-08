import React from "react";
import NavBar from "../components/NavBar";

const HomeLayout = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<header>
				<NavBar></NavBar>
			</header>
		</div>
	);
};

export default HomeLayout;
