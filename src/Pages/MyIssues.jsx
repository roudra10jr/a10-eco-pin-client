import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Providers/AuthContext";
import Swal from "sweetalert2";

const MyIssues = () => {
	const { user } = useContext(AuthContext);
	const [issues, setIssues] = useState([]);
	const [selectId, setSelectId] = useState(null);
	const modalRef = useRef();

	useEffect(() => {
		if (user?.email) {
			fetch(`http://localhost:3000/issues?email=${user.email}
`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setIssues(data);
				});
		}
	}, [user]);

	const handleModal = (_id) => {
		modalRef.current.showModal();
		setSelectId(_id);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		//console.log(selectId);
		const title = e.target.title.value;
		const category = e.target.category.value;
		const description = e.target.description.value;
		const amount = e.target.amount.value;
		const status = e.target.status.value;

		//console.log({ title, category, description, amount, status });

		const updateIssue = {
			title,
			category,
			description,
			amount,
			status,
		};

		fetch(`http://localhost:3000/issues/${selectId}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(updateIssue),
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log("after updating", data);
				if (data.modifiedCount) {
					modalRef.current.close();
					e.target.reset();
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Issue has been updated successfully",
						showConfirmButton: false,
						timer: 1500,
					});

					const updatingIssues = issues.map((issue) => {
						if (issue._id === selectId) {
							return { ...issue, ...updateIssue };
						} else {
							return issue;
						}
					});

					setIssues(updatingIssues);
				}
			});
	};

	const handleDeleteIssue = (id) => {
		Swal.fire({
			title: "Are you sure to delete?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#5a8418",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:3000/issues/${id}`, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount) {
							Swal.fire({
								position: "center",
								icon: "success",
								title: "The issue has been deleted",
								showConfirmButton: false,
								timer: 1500,
							});

							const remainingIssues = issues.filter(
								(issue) => issue._id !== id
							);
							setIssues(remainingIssues);
						}
					});

				// Swal.fire({
				// 	title: "Deleted!",
				// 	text: "Your file has been deleted.",
				// 	icon: "success",
				// });
			}
		});
	};

	return (
		<div className="max-w-11/12 mx-auto">
			<h3 className="text-center text-3xl font-bold text-accent mt-25">
				My Issues: <span className="text-primary">{issues.length}</span>
			</h3>

			{/* issues table */}

			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>SL No.</th>
							<th>Title</th>
							<th>Category</th>
							<th>Amount</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{
							//
							issues.map((issue, index) => (
								<tr>
									<th>{index + 1}</th>
									<td>{issue?.title}</td>
									<td>{issue?.category}</td>
									<td>{issue?.amount}</td>
									<td>{issue?.status}</td>
									<td>
										<div className="flex gap-2 text-white">
											<button
												onClick={() =>
													handleModal(issue._id)
												}
												className="btn btn-primary"
											>
												Update
											</button>
											<button
												onClick={() =>
													handleDeleteIssue(issue._id)
												}
												className="btn btn-warning"
											>
												Delete
											</button>

											<dialog
												ref={modalRef}
												className="modal modal-bottom sm:modal-middle"
											>
												<div className="modal-box">
													<h3 className="font-bold text-lg text-center text-accent">
														Update the Issue
													</h3>

													{/* update modal form */}

													<form
														onSubmit={handleUpdate}
														className="space-y-4"
													>
														{/* Title */}
														<div>
															<label className="label font-semibold text-gray-600">
																Issue Title
															</label>
															<input
																type="text"
																defaultValue={
																	issue?.title
																}
																name="title"
																className="input input-bordered w-full text-accent"
																placeholder="Enter issue title"
															/>
														</div>

														{/* Category */}
														<div>
															<label className="label font-semibold text-gray-700">
																Category
															</label>
															<select
																name="category"
																className="select select-bordered w-full text-accent"
																required
															>
																<option value="Garbage">
																	Garbage
																</option>
																<option value="Illegal Construction">
																	Illegal
																	Construction
																</option>
																<option value="Broken Public Property">
																	Broken
																	Public
																	Property
																</option>
																<option value="Road Damage">
																	Road Damage
																</option>
															</select>
														</div>

														{/* Amount */}
														<div>
															<label className="label font-semibold text-gray-600">
																Amount
																(Suggested Fix
																Budget)
															</label>
															<input
																type="number"
																name="amount"
																defaultValue={
																	issue?.amount
																}
																className="input input-bordered w-full text-accent"
																placeholder="Enter amount"
															/>
														</div>

														{/* Description */}
														<div>
															<label className="label font-semibold text-gray-600">
																Description
															</label>
															<textarea
																defaultValue={
																	issue?.description
																}
																name="description"
																className="textarea textarea-bordered w-full text-accent"
																rows="3"
																placeholder="Describe the issue"
															></textarea>
														</div>

														{/* Status */}
														<div>
															<label className="label font-semibold text-gray-700">
																Status
															</label>
															<div className="flex gap-8 items-center bg-base-100 p-3 rounded-lg shadow-sm">
																{/* Ongoing */}
																<label className="flex items-center gap-2 cursor-pointer">
																	<input
																		type="radio"
																		name="status"
																		value="ongoing"
																		defaultChecked={
																			issue?.status ===
																			"ongoing"
																		}
																		className="radio radio-primary"
																	/>
																	<span className="text-gray-800 font-medium">
																		Ongoing
																	</span>
																</label>

																{/* Ended */}
																<label className="flex items-center gap-2 cursor-pointer">
																	<input
																		type="radio"
																		name="status"
																		value="ended"
																		defaultChecked={
																			issue?.status ===
																			"ended"
																		}
																		className="radio radio-primary"
																	/>
																	<span className="text-gray-800 font-medium">
																		Ended
																	</span>
																</label>
															</div>
														</div>

														{/* Submit Button */}
														<div className="flex justify-center mt-6">
															<button
																type="submit"
																className="btn btn-primary px-8 rounded-full"
															>
																Update Issue
															</button>
														</div>
													</form>

													<div className="modal-action">
														<form method="dialog">
															{/* if there is a button in form, it will close the modal */}
															<button className="btn">
																Cancel
															</button>
														</form>
													</div>
												</div>
											</dialog>
										</div>
									</td>
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

				{/* modal */}
				{/* Open the modal using document.getElementById('ID').showModal() method */}
			</div>
		</div>
	);
};

export default MyIssues;
