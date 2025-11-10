import React from "react";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
	const { _id, image, title, category, location, amount } = issue;

	return (
		<div className="bg-base-200 rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
			<img src={image} alt={title} className="w-full h-48 object-cover" />

			<div className="p-4 space-y-2">
				<h3 className="text-xl font-semibold text-primary">{title}</h3>
				<p className="text-accent text-sm font-medium">
					Category: <span className="text-black">{category}</span>
				</p>
				<p className="text-accent text-sm font-medium">
					Location: <span className="text-black">{location}</span>
				</p>
				<p className="text-accent text-sm font-medium">
					Estimated Cost:{" "}
					<span className="font-semibold text-black">${amount}</span>
				</p>

				<div className="pt-3">
					<Link to={`/issues/${_id}`}>
						<button className="btn btn-sm w-full bg-primary text-white hover:bg-green-700">
							See Details
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default IssueCard;
