import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllIssues from "../components/AllIssues";
import AddIssue from "../Pages/AddIssue";
import IssueDetails from "../Pages/IssueDetails";
import MyIssues from "../Pages/MyIssues";
import MyContributions from "../Pages/MyContributions";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: HomeLayout,

		children: [
			{
				index: true,
				loader: () => fetch("http://localhost:3000/recent-issues"),
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
			{
				path: "/add-issue",
				Component: AddIssue,
			},
			{
				path: "/issues/:id",
				loader: ({ params }) =>
					fetch(`http://localhost:3000/issues/${params.id}`),
				Component: IssueDetails,
			},

			{
				path: "/my-issues",
				Component: MyIssues,
			},
			{
				path: "/my-contributions",
				Component: MyContributions,
			},
		],
	},
]);
