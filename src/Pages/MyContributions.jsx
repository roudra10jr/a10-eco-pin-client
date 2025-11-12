import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import { Helmet } from "react-helmet-async";

const MyContributions = () => {
	const { user } = useContext(AuthContext);
	const [contributions, setContributions] = useState([]);

	useEffect(() => {
		if (user?.email) {
			fetch(`http://localhost:3000/contributions?email=${user?.email}`)
				.then((res) => res.json())
				.then((data) => {
					setContributions(data);
				});
		}
	}, [user]);

	const generatePDF = (contribution) => {
		try {
			const doc = new jsPDF();

			doc.setFontSize(16);
			doc.text("Billing Report", 14, 20);

			const currentDate = new Date().toLocaleDateString();
			doc.setFontSize(12);
			doc.text(`Generated on: ${currentDate}`, 14, 28);

			const tableColumn = ["Field", "Value"];
			const tableRows = [
				["User Email", user?.email],
				["Issue Title", contribution?.title],
				["Category", contribution?.category],
				["Paid Amount", `$${contribution?.amount || 0}`],
				["Report Date", currentDate],
			];

			autoTable(doc, {
				head: [tableColumn],
				body: tableRows,
				startY: 40,
				theme: "grid",
				styles: { fontSize: 10, cellPadding: 3 },
				headStyles: {
					fillColor: [41, 128, 185],
					textColor: 255,
					fontStyle: "bold",
				},
			});

			const pdfOutput = doc.output("blob");
			const fileName = `billing_report_${
				contribution?.title?.replace(/\s+/g, "_")?.toLowerCase() ||
				"contribution"
			}_${Date.now()}.pdf`;
			saveAs(pdfOutput, fileName);
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert(
				"Failed to generate PDF. Please check the console for details."
			);
		}
	};

	return (
		<div className="max-w-11/12 mx-auto">
			<Helmet>
				<title>My contributions | EcoPin</title>
			</Helmet>
			<h3 className="text-center text-3xl font-bold text-accent mt-25">
				My Issues:{" "}
				<span className="text-primary">{contributions.length}</span>
			</h3>

			{/* contribution table */}
			<div className="overflow-x-auto">
				<table className="table">
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
						{contributions.length > 0 ? (
							contributions.map((contribution, index) => (
								<tr key={contribution?.id || index}>
									<th>{index + 1}</th>
									<td>{contribution?.title}</td>
									<td>{contribution?.category}</td>
									<td>${contribution?.amount}</td>
									<th>
										<button
											className="btn btn-primary btn-xs"
											onClick={() =>
												generatePDF(contribution)
											}
										>
											Download
										</button>
									</th>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className="text-center py-4">
									No contributions found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyContributions;
