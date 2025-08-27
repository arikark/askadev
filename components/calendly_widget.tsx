"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { itemVariants } from "@/lib/animation-variants";

interface CalendlyWidgetProps {
	calendlyUrl: string;
}

export default function CalendlyWidget({ calendlyUrl }: CalendlyWidgetProps) {
	const calendlyRef = useRef<HTMLDivElement>(null);
	const isInitialized = useRef<boolean>(false);

		// Function to initialize Calendly widget
	const initCalendly = () => {
		console.log("Calendly widget: Attempting to initialize", {
			windowExists: typeof window !== "undefined",
			calendlyExists: typeof window !== "undefined" && !!window.Calendly,
			refExists: !!calendlyRef.current,
			isInitialized: isInitialized.current
		});

		if (
			typeof window !== "undefined" &&
			window.Calendly &&
			calendlyRef.current &&
			!isInitialized.current
		) {
			console.log("Calendly widget: Initializing inline widget");
			// Initialize the inline widget with custom styling
			window.Calendly.initInlineWidget({
				url: `${calendlyUrl}?hide_event_type_details=1&hide_landing_page_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=f0ff00`,
				parentElement: calendlyRef.current,
				prefill: {},
				utm: {},
				hideEventTypeDetails: false,
				hideLandingPageDetails: false,
			});
			isInitialized.current = true;
			console.log("Calendly widget: Initialization complete");
		}
	};

	useEffect(() => {

		// Function to handle Calendly events
		const handleCalendlyMessage = (e: MessageEvent) => {
			if (e.data.event && e.data.event.indexOf("calendly") === 0) {
				console.log("Calendly event:", e.data);

				// Specifically log when an event is scheduled
				if (e.data.event === "calendly.event_scheduled") {
					console.log("payload :", e.data.payload);
					console.log("Event :", e.data.payload.event);
				}
			}
		};

		// Add event listener for Calendly messages
		window.addEventListener("message", handleCalendlyMessage);

		// Try to initialize immediately if Calendly is already loaded
		initCalendly();

		// If Calendly is not loaded yet, wait for it
		if (typeof window !== "undefined" && !window.Calendly) {
			const checkCalendly = setInterval(() => {
				if (window.Calendly && !isInitialized.current) {
					initCalendly();
					clearInterval(checkCalendly);
				}
			}, 100);

			// Cleanup interval after 10 seconds
			setTimeout(() => clearInterval(checkCalendly), 10000);
		}

		// Cleanup function
		return () => {
			window.removeEventListener("message", handleCalendlyMessage);
		};
	}, [calendlyUrl]);

	// Initialize when component mounts (no delay needed since parent controls timing)
	useEffect(() => {
		console.log("Calendly widget: Component mounted, attempting to initialize");
		// Small delay to ensure DOM is ready
		const timer = setTimeout(() => {
			initCalendly();
		}, 100);
		return () => clearTimeout(timer);
	}, []);



	return (
		<motion.div
			variants={itemVariants}
			initial="hidden"
			animate="visible"
			className="w-full min-w-[320px] sm:min-w-[820px]"
		>
			<div
				ref={calendlyRef}
				className="calendly-inline-widget w-full"
				style={{ minWidth: "100%", height: "900px" }}
				data-url={`${calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=f0ff00`}
			/>
		</motion.div>
	);
}
