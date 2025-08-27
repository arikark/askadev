import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Ask a dev",
	description:
		"Get technical advice from experienced developers.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<script
					type="text/javascript"
					src="https://assets.calendly.com/assets/external/widget.js"
					async
				/>
			</head>
			<meta
				property="og:site_name"
				content="Ask a dev - A community of trusted developers"
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
			/>
			<meta
				property="og:url"
				content="https://nextjs-notion-waitlist.vercel.app/"
			/>
			<body className={FigtreeFont.className}>
				{children}
				<Toaster richColors position="top-center" />
				<Analytics />
			</body>
		</html>
	);
}
