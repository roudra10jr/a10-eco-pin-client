import React from "react";
import { motion } from "framer-motion";
import volImg from "../assets/volunteer.jpg";

const JoinCleanDrive = () => {
	return (
		<div className="max-w-11/12 mx-auto my-20 flex flex-col md:flex-row items-center gap-10 bg-base-200 rounded-3xl shadow-lg overflow-hidden">
			{/* Image Section */}
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className="md:w-1/2 w-full"
			>
				<img
					src={volImg}
					alt="Join Clean Drive"
					className="w-full h-[350px] md:h-[450px] object-cover"
				/>
			</motion.div>

			{/* Text Section */}
			<motion.div
				initial={{ opacity: 0, x: 50 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className="md:w-1/2 w-full p-8 space-y-5 text-center md:text-left"
			>
				<h2 className="text-4xl font-bold text-primary">
					Join Our Clean Drive 🌍
				</h2>
				<p className="text-accent leading-relaxed">
					Be a part of the movement towards a cleaner and greener
					community! Volunteer to help remove garbage, plant trees,
					and restore our public spaces. Together, we can make a
					sustainable impact for future generations.
				</p>

				<button className="btn btn-primary btn-outline text-gray-800 px-8 rounded-full hover:scale-105 transition-transform duration-300">
					Join the Clean Drive
				</button>
			</motion.div>
		</div>
	);
};

export default JoinCleanDrive;
