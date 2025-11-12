import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Providers/AuthContext";
import { GrMoney } from "react-icons/gr";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const IssueDetails = () => {
	const { user } = useContext(AuthContext);
	const issue = useLoaderData();
	const { _id, title, category } = issue;
	//console.log(issueId);

	const [contributions, setContributions] = useState([]);

	const contributionModalref = useRef(null);

	const handleModal = () => {
		contributionModalref.current.showModal();
	};

	const handleContribution = (e) => {
		e.preventDefault();

		const issueId = _id;
		const amount = e.target.amount.value;
		const name = e.target.name.value;
		const email = e.target.email.value;
		const phone = e.target.phone.value;
		const address = e.target.address.value;
		const date = new Date();
		const additionalInfo = e.target.info.value;

		// console.log({
		// 	issueId,
		// 	amount,
		// 	name,
		// 	email,
		// 	phone,
		// 	address,
		// 	date,
		// 	additionalInfo,
		// });

		const newContribute = {
			issueId,
			title,
			category,
			amount,
			photoURL: user?.photoURL,
			name,
			email,
			phone,
			address,
			date,
			additionalInfo,
		};

		fetch("http://localhost:3000/contributions", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newContribute),
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log("after contribution", data);
				if (data.insertedId) {
					contributionModalref.current.close();
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Thanks for your great contribution",
						showConfirmButton: false,
						timer: 1500,
					});

					// add the newbid at the state for the imadiate update UI:
					newContribute._id = data.insertedId;
					const newContributions = [...contributions, newContribute];
					newContributions.sort((a, b) => b.amount - a.amount);
					setContributions(newContributions);
				}
			});
	};

	//display the contribution for specific issueId:
	useEffect(() => {
		fetch(`http://localhost:3000/issue/contributions/${_id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log("list of of contribution for this issue", data);
				setContributions(data);
			});
	}, [_id]);

	return (
		<div className="max-w-11/12 mx-auto mt-28 mb-16">
			<Helmet>
				<title>Issue details | EcoPin</title>
			</Helmet>
			{/* Issue Card */}
			<div className="bg-base-200 shadow-lg rounded-2xl overflow-hidden">
				{/* Image Section */}
				<div className="w-full h-64 md:h-80 overflow-hidden">
					<img
						src={
							issue?.image ||
							"https://via.placeholder.com/600x400"
						}
						alt={issue?.title || "Issue Image"}
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>

				{/* Content Section */}
				<div className="p-6 md:p-8 space-y-4">
					<h2 className="text-3xl font-bold text-primary">
						{issue?.title}
					</h2>

					{/* Meta Info */}
					<div className="flex flex-wrap gap-4 text-gray-700">
						<p>
							<span className="font-semibold text-accent">
								Category:
							</span>{" "}
							{issue?.category}
						</p>
						<p>
							<span className="font-semibold text-accent">
								Location:
							</span>{" "}
							{issue?.location}
						</p>
						<p>
							<span className="font-semibold text-accent">
								Date:
							</span>{" "}
							{issue?.date}
						</p>
					</div>

					{/* Description */}
					<p className="text-gray-800 leading-relaxed">
						<span className="font-semibold text-accent">
							Description:
						</span>{" "}
						{issue?.description}
					</p>

					{/* Budget */}
					<p className="text-lg font-semibold text-primary mt-4 flex  items-center gap-2">
						<GrMoney /> Suggested Fix Budget:{" "}
						<span className="text-black">${issue?.amount}</span>
					</p>
				</div>

				{/* Button Section */}
				<div className="flex justify-center p-6 border-t border-base-300 bg-base-100">
					<button
						onClick={handleModal}
						className="btn btn-primary btn-outline rounded-full px-6 py-2 font-semibold hover:scale-105 transition-transform duration-200"
					>
						Pay Clean-Up Contribution
					</button>

					{/* modals */}

					<dialog
						ref={contributionModalref}
						className="modal modal-bottom sm:modal-middle"
					>
						<div className="modal-box">
							<h3 className="font-bold text-lg text-center">
								Add Contribution
							</h3>
							{/* <p className="py-4">
								Press ESC key or click the button below to close
							</p> */}

							{/*contribution form */}
							<form
								onSubmit={handleContribution}
								className="space-y-3"
							>
								{/* Issue Title */}
								<div>
									<label className="block font-semibold mb-1">
										Issue Title
									</label>
									<input
										type="text"
										name="title"
										defaultValue={issue?.title}
										readOnly
										className="input input-bordered w-full"
									/>
								</div>

								{/* Amount */}
								<div>
									<label className="block font-semibold mb-1">
										Amount
									</label>
									<input
										type="number"
										name="amount"
										placeholder="Enter amount"
										className="input input-bordered w-full"
									/>
								</div>

								{/* Contributor Name */}
								<div>
									<label className="block font-semibold mb-1">
										Contributor Name
									</label>
									<input
										type="text"
										name="name"
										defaultValue={user?.displayName}
										readOnly
										className="input input-bordered w-full"
									/>
								</div>

								{/* Email (read-only, logged-in user) */}
								<div>
									<label className="block font-semibold mb-1">
										Email
									</label>
									<input
										type="email"
										name="email"
										readOnly
										defaultValue={user?.email}
										className="input input-bordered w-full bg-base-300 text-gray-600"
									/>
								</div>

								{/* Phone */}
								<div>
									<label className="block font-semibold mb-1">
										Phone Number
									</label>
									<input
										type="tel"
										name="phone"
										placeholder="Enter your phone number"
										className="input input-bordered w-full"
									/>
								</div>

								{/* Address */}
								<div>
									<label className="block font-semibold mb-1">
										Address
									</label>
									<input
										type="text"
										name="address"
										placeholder="Enter your address"
										className="input input-bordered w-full"
									/>
								</div>

								{/* Additional Info */}
								<div>
									<label className="block font-semibold mb-1">
										Additional Info
									</label>
									<textarea
										name="info"
										placeholder="Add any additional notes..."
										className="textarea textarea-bordered w-full"
									></textarea>
								</div>

								{/* Submit Button (placeholder only) */}
								<div className="text-center mt-5">
									<button
										type="submit"
										className="btn btn-primary w-full"
									>
										Submit Contribution
									</button>
								</div>
							</form>

							<div className="modal-action">
								<form method="dialog">
									{/* if there is a button in form, it will close the modal */}
									<button className="btn">Cancel</button>
								</form>
							</div>
						</div>
					</dialog>
				</div>
			</div>

			{/* Contribution Section Placeholder */}
			<div className="mt-10 text-center">
				<h3 className="text-3xl font-bold text-accent mb-3">
					Contributions added for this issue:{" "}
					<span className="text-primary">{contributions.length}</span>
				</h3>

				{/* table */}

				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>SL No.</th>
								<th>Contributor Image</th>
								<th>Contributor Name</th>
								<th>Contribution Amount</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{
								//
								contributions.map((contribution, index) => (
									<tr>
										<th>{index + 1}</th>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle h-12 w-12">
														<img
															src={
																contribution?.photoURL ||
																"https://img.daisyui.com/images/profile/demo/2@94.webp"
															}
															alt="Avatar Tailwind CSS Component"
														/>
													</div>
												</div>
												{/* <div>
													<div className="font-bold">
														{contribution?.name}
													</div>
													<div className="text-sm opacity-50">
														{contribution?.amount}
													</div>
												</div> */}
											</div>
										</td>
										<td>{contribution?.name}</td>
										<td>${contribution?.amount}</td>
										{/* <th>
									<button className="btn btn-ghost btn-xs">
										details
									</button>
								</th> */}
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default IssueDetails;
