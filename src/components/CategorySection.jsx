import { Reveal } from "react-awesome-reveal";
import { FaTrash, FaIndustry, FaHammer, FaRoad } from "react-icons/fa";

const CategorySection = () => {
	const categories = [
		{
			id: 1,
			name: "Garbage",
			icon: FaTrash,
			color: "bg-red-100 text-red-800",
		},
		{
			id: 2,
			name: "Illegal Construction",
			icon: FaIndustry,
			color: "bg-yellow-100 text-yellow-800",
		},
		{
			id: 3,
			name: "Broken Public Property",
			icon: FaHammer,
			color: "bg-blue-100 text-blue-800",
		},
		{
			id: 4,
			name: "Road Damage",
			icon: FaRoad,
			color: "bg-gray-100 text-gray-800",
		},
	];

	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
					Report These Common Issues
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{categories.map((category) => (
						<Reveal
							key={category.id}
							className="reveal"
							triggerOnce
							delay={category.id * 200}
							duration={800}
							easing="ease-out"
						>
							<button
								className={`
                w-full p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                ${category.color} border-2 border-transparent hover:border-primary
              `}
							>
								<div className="text-4xl mb-3">
									<category.icon />
								</div>
								<h3 className="font-semibold text-lg">
									{category.name}
								</h3>
								<p className="text-sm text-gray-600 mt-2">
									Report now
								</p>
							</button>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
};

export default CategorySection;
