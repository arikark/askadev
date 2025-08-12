"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import CalendlyWidget from "@/components/calendly_widget";
import CTA from "@/components/cta";
import { DevProfileBanner } from "@/components/dev-profile-banner";
import Footer from "@/components/footer";
import Form from "@/components/form";
import Logos from "@/components/logos";
import Particles from "@/components/ui/particles";

export default function Home() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [showCalendly, setShowCalendly] = useState<boolean>(false);

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name || !email) {
			toast.error("Please fill in all fields 😠");
			return;
		}

		if (!isValidEmail(email)) {
			toast.error("Please enter a valid email address 😠");
			return;
		}

		setLoading(true);

		const promise = new Promise((resolve, reject) => {
			(async () => {
				try {
					// // First, attempt to send the email
					// const mailResponse = await fetch("/api/mail", {
					// 	cache: "no-store",
					// 	method: "POST",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	body: JSON.stringify({ firstname: name, email }),
					// });

					// if (!mailResponse.ok) {
					// 	if (mailResponse.status === 429) {
					// 		reject("Rate limited");
					// 	} else {
					// 		reject("Email sending failed");
					// 	}
					// 	return; // Exit the promise early if mail sending fails
					// }

					// If email sending is successful, proceed to insert into Notion
					const notionResponse = await fetch("/api/notion", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ name, email }),
					});

					if (!notionResponse.ok) {
						if (notionResponse.status === 429) {
							reject("Rate limited");
						} else {
							reject("Notion insertion failed");
						}
					} else {
						resolve({ name });
					}
				} catch (error) {
					reject(error);
				}
			})();
		});

		toast.promise(promise, {
			loading: "Getting you on the waitlist... 🚀",
			success: (data) => {
				setName("");
				setEmail("");
				return "Thank you for joining the waitlist 🎉";
			},
			error: (error) => {
				if (error === "Rate limited") {
					return "You're doing that too much. Please try again later";
				} else if (error === "Email sending failed") {
					return "Failed to send email. Please try again 😢.";
				} else if (error === "Notion insertion failed") {
					return "Failed to save your details. Please try again 😢.";
				}
				return "An error occurred. Please try again 😢.";
			},
		});

		promise.finally(() => {
			setLoading(false);
		});
	};

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
					<CalendlyWidget calendlyUrl="https://calendly.com/arielkark/30min" />
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
