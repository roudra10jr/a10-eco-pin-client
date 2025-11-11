import React from "react";
import Slider from "../components/Slider";
import CategorySection from "../components/CategorySection";
import { useLoaderData } from "react-router";
import IssueCard from "../components/IssueCard";
import JoinCleanDrive from "../components/JoinCleanDrive";
import CommunityStats from "../components/CommunityStats";

const Home = () => {
	const issuesData = useLoaderData();
	//console.log(issuesData);

	return (
		<div>
			<Slider></Slider>

			{/* recent issue */}
			<div className="max-w-11/12 mx-auto  mt-20">
				<h2 className="font-semibold text-4xl text-center my-5">
					Recent Issues
				</h2>
				<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{
						//
						issuesData.map((issue) => (
							<IssueCard
								key={issue._id}
								issue={issue}
							></IssueCard>
						))
					}
				</div>
			</div>

			<CategorySection></CategorySection>

			{/* part 3 */}
			<CommunityStats></CommunityStats>

			{/* part-4 */}
			<JoinCleanDrive></JoinCleanDrive>
		</div>
	);
};

export default Home;
