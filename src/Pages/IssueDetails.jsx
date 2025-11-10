import React, { useContext, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Providers/AuthContext";
import { GrMoney } from "react-icons/gr";

const IssueDetails = () => {
	const { user } = useContext(AuthContext);
	const issue = useLoaderData();
	const { _id } = issue;
	//console.log(issueId);

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
			amount,
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
				console.log("after contribution", data);
			});
	};

	return (
		<div className="w-11/12 md:w-9/12 lg:w-7/12 mx-auto mt-28 mb-16">
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
									<button className="btn">Close</button>
								</form>
							</div>
						</div>
					</dialog>
				</div>
			</div>

			{/* Contribution Section Placeholder */}
			<div className="mt-10 text-center">
				{/* <h3 className="text-2xl font-bold text-primary mb-3">
					Contributions
				</h3>
				<p className="text-gray-600">
					No contributions added yet. Be the first to support this
					issue!
				</p> */}
			</div>
		</div>
	);
};

export default IssueDetails;
