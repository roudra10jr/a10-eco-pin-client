import React, { useEffect, useState } from "react";
import {
	FaUsers,
	FaClipboardList,
	FaCheckCircle,
	FaHourglassHalf,
} from "react-icons/fa";

const CommunityStats = () => {
	const [stats, setStats] = useState(null);

	useEffect(() => {
		fetch("https://a10-eco-pin-server.vercel.app/community-stats")
			.then((res) => res.json())
			.then((data) => {
				//console.log('after getting',data);
				setStats(data);
			});
	}, []);

	if (!stats) {
		return (
			<div className="flex justify-center items-center h-40">
				<span className="loading loading-spinner loading-lg text-primary"></span>
			</div>
		);
	}

	return (
		<section className="bg-base-200 py-12 rounded-2xl my-10 max-w-11/12 mx-auto shadow-lg">
			<h2 className="text-3xl font-bold text-center text-primary mb-10">
				🌍 Community Statistics
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
				{/* Total Users */}
				<div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
					<div className="flex justify-center text-4xl text-accent mb-3">
						<FaUsers />
					</div>
					<p className="text-4xl font-extrabold text-primary">
						{stats.totalUsers}
					</p>
					<p className="text-gray-600 font-semibold mt-2">
						Total Registered Users
					</p>
				</div>

				{/* Total Issues */}
				<div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
					<div className="flex justify-center text-4xl text-accent mb-3">
						<FaClipboardList />
					</div>
					<p className="text-4xl font-extrabold text-primary">
						{stats.totalIssues}
					</p>
					<p className="text-gray-600 font-semibold mt-2">
						Total Reported Issues
					</p>
				</div>

				{/* Resolved */}
				<div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
					<div className="flex justify-center text-4xl text-green-600 mb-3">
						<FaCheckCircle />
					</div>
					<p className="text-4xl font-extrabold text-green-600">
						{stats.resolvedIssues}
					</p>
					<p className="text-gray-600 font-semibold mt-2">
						Issues Resolved
					</p>
				</div>

				{/* Pending */}
				<div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
					<div className="flex justify-center text-4xl text-yellow-500 mb-3">
						<FaHourglassHalf />
					</div>
					<p className="text-4xl font-extrabold text-yellow-600">
						{stats.pendingIssues}
					</p>
					<p className="text-gray-600 font-semibold mt-2">
						Issues Pending
					</p>
				</div>
			</div>
		</section>
	);
};

export default CommunityStats;
