import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllIssues from "../components/AllIssues";

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
			{
				path: "/register",
				Component: Register,
			},
			{
				path: "/all-issues",
				loader: () => fetch("http://localhost:3000/issues"),
				Component: AllIssues,
			},
		],
	},
]);
