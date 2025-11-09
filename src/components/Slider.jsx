import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import slide1 from "../assets/garbage-slide1.jpg";
import slide2 from "../assets/slide-2.jpg";
import slide3 from "../assets/slide-3.webp";
import slide4 from "../assets/slide-4.jpg";
import slide5 from "../assets/slide-5.jpg";

const Slider = () => {
	const slides = [slide1, slide2, slide3, slide4, slide5];

	return (
		// <div className="w-full container mx-auto rounded-2xl overflow-hidden shadow-lg">
		// 	<Swiper
		// 		modules={[Navigation, Pagination, Autoplay, A11y]}
		// 		spaceBetween={30}
		// 		slidesPerView={1}
		// 		navigation
		// 		pagination={{ clickable: true }}
		// 		autoplay={{ delay: 3000, disableOnInteraction: false }}
		// 		loop
		// 		className="mySwiper"
		// 	>
		// 		{slides.map((slide, index) => (
		// 			<SwiperSlide key={index}>
		// 				<img
		// 					src={slide}
		// 					alt={`Slide ${index + 1}`}
		// 					className="w-full h-[500px] object-cover"
		// 				/>
		// 			</SwiperSlide>
		// 		))}
		// 	</Swiper>
		// </div>

		<section className="relative w-full h-[70vh]">
			<Swiper
				modules={[Navigation, Pagination, Autoplay, A11y]}
				spaceBetween={0}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				loop
				className="h-full"
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className="relative w-full h-screen">
							<img
								src={slide}
								alt={`Slide ${index + 1}`}
								className="w-full h-full object-cover"
							/>
							{/* Optional overlay */}
							<div className="absolute inset-0 bg-black/40" />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Slider;
