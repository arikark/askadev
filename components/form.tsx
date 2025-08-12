
import { motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { Input } from "@/components/ui/input";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

interface FormProps {
	name: string;
	email: string;
	handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	loading: boolean;
}

export default function Form({
	name,
	email,
	handleNameChange,
	handleEmailChange,
	handleSubmit,
	loading,
}: FormProps) {
	return (
		<form onSubmit={handleSubmit} className="w-full">
			<motion.div
				className="mt-6 flex w-full max-w-[24rem] flex-col gap-2"
				variants={{
					...containerVariants,
					visible: {
						...containerVariants.visible,
						transition: {
							...containerVariants.visible.transition,
							delayChildren: 6.5,
							staggerChildren: 0.5,
						},
					},
				}}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants}>
					<Input
						type="text"
						placeholder="Your Name"
						value={name}
						onChange={handleNameChange}
					/>
				</motion.div>
				<motion.div variants={itemVariants}>
					<Input
						type="email"
						placeholder="Your Email Address"
						value={email}
						onChange={handleEmailChange}
					/>
				</motion.div>
				<motion.div variants={itemVariants}>
					<EnhancedButton
						type="submit"
						variant="expandIcon"
						Icon={FaArrowRightLong}
						iconPlacement="right"
						className="mt-2 w-full"
						disabled={loading}
					>
						{loading ? "Loading..." : "Join Our Waitlist!"}
					</EnhancedButton>
				</motion.div>

			</motion.div>
		</form>
	);
}
