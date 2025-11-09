import React from "react";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
	return (
		<div
			role="contentinfo"
			className="bg-[#1e4912] text-white py-12 px-6 md:px-16"
		>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-10">
				{/* Get Involved (Replaced Newsletter with relevant volunteer/community section) */}
				<div>
					<h2 className="font-bold text-lg mb-3">Get Involved</h2>
					<ul className="space-y-1 text-sm text-base-100">
						<li>
							<a href="#" className="hover:text-secondary">
								Become a Volunteer
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								Host a Local Event
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								Share Your Impact
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								Eco Tips & Resources
							</a>
						</li>
					</ul>
				</div>

				{/* Company */}
				<div>
					<h2 className="font-bold text-lg mb-3">Company</h2>
					<ul className="space-y-1 text-sm text-base-100">
						<li>
							<a href="#" className="hover:text-secondary">
								About Us
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								Contact Us
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								Terms &amp; Conditions
							</a>
						</li>
					</ul>
				</div>

				{/* Actions */}
				<div>
					<h2 className="font-bold text-lg mb-3">Quick Actions</h2>
					<ul className="space-y-1 text-sm text-base-100">
						<li>
							<a href="#" className="hover:text-secondary">
								Report Issue
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								Track Progress
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								Join Cleanup
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-secondary">
								View Community Stats
							</a>
						</li>
					</ul>
				</div>

				{/* Social */}
				<div>
					<h2 className="font-bold text-lg mb-3">Follow Us</h2>
					<ul className="space-y-1 text-sm text-base-100">
						<li>
							<a
								href="#"
								className="flex items-center hover:text-secondary gap-2"
							>
								<FaFacebook className="text-lg" />
								<span>Facebook</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center hover:text-secondary gap-2"
							>
								<FaInstagram className="text-lg" />
								<span>Instagram</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center hover:text-secondary gap-2"
							>
								<FaXTwitter className="text-lg" />
								<span>Twitter</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center hover:text-secondary gap-2"
							>
								<FaPinterest className="text-lg" />
								<span>Pinterest</span>
							</a>
						</li>
					</ul>
				</div>

				{/* Contact */}
				<div>
					<h2 className="font-bold text-lg mb-3">Contact</h2>
					<ul className="space-y-1 text-sm text-base-100">
						<li>📞 +8801616331250</li>
						<li>📧 ecopin@example.com</li>
					</ul>
				</div>
			</div>

			<div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-400 pt-4 text-sm text-white relative">
				<p className="text-center font-semibold">
					© 2025 EcoPin. All Rights Reserved.
				</p>

				<div className="mt-2 md:mt-0 relative z-10">
					<div className="absolute inset-0 bg-[#1e4912]/80 backdrop-blur-sm rounded-lg -z-10"></div>{" "}
					{/* Subtle backdrop for lift */}
					<h1 className="font-graffiti text-primary font-bold tracking-wider text-4xl md:text-5xl drop-shadow-3xl [text-shadow:0_0_10px_rgba(90,132,24,0.8),2px_2px_0px_#000,4px_4px_0px_rgba(30,73,18,0.5)] relative z-15 px-4 py-2">
						EcoPin
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Footer;
