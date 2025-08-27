"use client";

import { useEffect, useState } from "react";
import CalendlyWidget from "@/components/calendly_widget";
import CTA from "@/components/cta";
import Particles from "@/components/ui/particles";

export default function Home() {

	const [showCalendly, setShowCalendly] = useState<boolean>(false);




	// Timer to switch from CTA to Calendly
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowCalendly(true);
		}, 9000); // 11 seconds to allow CTA animation to complete

		return () => clearTimeout(timer);
	}, []);

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center overflow-x-clip pt-12">
			<section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
				{!showCalendly ? (
					<CTA />
				) : (
					<CalendlyWidget calendlyUrl="https://calendly.com/arielkark/dev-advice" />
				)}
			</section>

			<Particles
				quantityDesktop={350}
				quantityMobile={100}
				ease={80}
				color={"#F7FF9B"}
				refresh
			/>
		</main>
	);
}
