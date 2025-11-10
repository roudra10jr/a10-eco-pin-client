import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthContext";
import { data } from "react-router";
import Swal from "sweetalert2";

const AddIssue = () => {
	const { user } = useContext(AuthContext);
	const handleAddIssue = (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const category = e.target.category.value;
		const location = e.target.location.value;
		const description = e.target.description.value;
		const image = e.target.image.value;
		const amount = e.target.amount.value;
		const email = user?.email;
		const date = new Date();

		// console.log({
		// 	title,
		// 	category,
		// 	location,
		// 	description,
		// 	image,
		// 	amount,
		// 	email,
		// });

		const newIssue = {
			title,
			category,
			location,
			description,
			image,
			amount,
			email,
			status: "ongoing",
			date,
		};

		//console.log(newIssue);

		fetch("http://localhost:3000/issues", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newIssue),
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log("after saving post", data);
				if (data.insertedId) {
					e.target.reset();
					Swal.fire({
						position: "left-right",
						icon: "success",
						title: "The Issue has been saved",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
	return (
		<div className="min-h-screen flex justify-center items-center bg-base-200 py-10 px-4">
			<div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
				<h2 className="text-3xl font-bold text-center text-primary mb-6">
					Add a New Issue
				</h2>

				<form onSubmit={handleAddIssue} className="space-y-4">
					{/* Issue Title */}
					<div>
						<label className="block font-semibold mb-1 text-accent">
							Issue Title
						</label>
						<input
							type="text"
							name="title"
							placeholder="Enter issue title"
							className="input input-bordered w-full"
							required
						/>
					</div>

					{/* Category */}
					<div>
						<label className="block font-semibold mb-1 text-accent">
							Category
						</label>
						<select
							name="category"
							className="select select-bordered w-full"
							required
						>
							<option value="">Select a category</option>
							<option value="Garbage">Garbage</option>
							<option value="Illegal Construction">
								Illegal Construction
							</option>
							<option value="Broken Public Property">
								Broken Public Property
							</option>
							<option value="Road Damage">Road Damage</option>
						</select>
					</div>

					{/* Location */}
					<div>
						<label className="block font-semibold mb-1 text-accent">
							Location
						</label>
						<input
							type="text"
							name="location"
							placeholder="Enter issue location"
							className="input input-bordered w-full"
							required
						/>
					</div>

					{/* Description */}
					<div>
						<label className="block font-semibold mb-1 text-accent">
							Description
						</label>
						<textarea
							name="description"
							placeholder="Describe the issue..."
							className="textarea textarea-bordered w-full"
							rows="4"
							required
						></textarea>
					</div>

					{/* Image */}
					<div>
						<label className="block font-semibold mb-1 text-accent">
							Image URL
						</label>
						<input
							type="url"
							name="image"
							placeholder="Enter image URL"
							className="input input-bordered w-full"
							required
						/>
					</div>

					{/* Amount */}
					<div>
						<label className="block font-semibold mb-1 text-accent">
							Amount (Suggested Fix Budget)
						</label>
						<input
							type="number"
							name="amount"
							placeholder="Enter amount"
							className="input input-bordered w-full"
							required
						/>
					</div>

					{/* Status */}
					{/* <div>
						<label className="block font-semibold mb-1 text-accent">
							Status
						</label>
						<input
							type="text"
							name="status"
							value="ongoing"
							readOnly
							className="input input-bordered w-full bg-base-300 cursor-not-allowed"
						/>
					</div> */}

					{/* Date */}
					{/* <div>
						<label className="block font-semibold mb-1 text-accent">
							Date
						</label>
						<input
							type="text"
							name="date"
							value={new Date().toLocaleDateString()}
							readOnly
							className="input input-bordered w-full bg-base-300 cursor-not-allowed"
						/>
					</div> */}

					{/* Email */}
					<div>
						<label className="block font-semibold mb-1 text-accent">
							Email (Your account email)
						</label>
						<input
							type="email"
							name="email"
							value={user?.email}
							readOnly
							className="input input-bordered w-full bg-base-300 cursor-not-allowed"
						/>
					</div>

					{/* Submit Button */}
					<div className="pt-4">
						<button
							type="submit"
							className="btn w-full bg-primary text-white hover:bg-green-700"
						>
							Submit Issue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddIssue;
