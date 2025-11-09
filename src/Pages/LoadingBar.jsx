import React from "react";
import { MoonLoader } from "react-spinners";

const LoadingBar = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<MoonLoader color="#5a8418" />
		</div>
	);
};

export default LoadingBar;
