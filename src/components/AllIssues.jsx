import React from "react";
import { useLoaderData } from "react-router";
import IssueCard from "./IssueCard";

const AllIssues = () => {
	const issues = useLoaderData();

	return (
		<div className="max-w-11/12 mx-auto mt-28 mb-10">
			<p className="text-3xl font-bold text-center mb-8">
				All Reported Issues
			</p>

			<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{issues.map((issue) => (
					<IssueCard key={issue._id} issue={issue} />
				))}
			</div>
		</div>
	);
};

export default AllIssues;
