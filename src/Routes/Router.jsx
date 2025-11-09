import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: HomeLayout,

		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "/login",
				Component: Login,
			},
		],
	},
]);
