import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthContext";

const MyContributions = () => {
	const { user } = useContext(AuthContext);
	const [contributions, setContributions] = useState([]);

	useEffect(() => {
		if (user?.email) {
			fetch(``)
				.then((res) => res.json())
				.then((data) => {
					setContributions(data);
				});
		}
	}, [user]);
	return (
		<div className="max-w-11/12 mx-auto">
			<h3 className="text-center text-3xl font-bold text-accent mt-25">
				My Issues:{" "}
				<span className="text-primary">{contributions.length}</span>
			</h3>

			{/* contribution table */}
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>SL No.</th>
							<th>Issue Title</th>
							<th>Category</th>
							<th>Paid Amount</th>
							<th>Download Report</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{
							//
							contributions.map((contribution, index) => (
								<tr>
									<th>{index + 1}</th>

									<td>Zemlak, Daniel and Leannon</td>
									<td>Purple</td>
									<th>
										<button className="btn btn-ghost btn-xs">
											details
										</button>
									</th>
								</tr>
							))
						}
					</tbody>
					{/* foot */}
				</table>
			</div>
		</div>
	);
};

export default MyContributions;
