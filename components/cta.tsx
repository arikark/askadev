import { motion } from "framer-motion";
import TextBlur from "@/components/ui/text-blur";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

const headerText = [
  "Looking to build an app?",
  "Hiring a CTO?",
  "Not sure where to start?",
]

export default function CTA() {
  return (
    <motion.div
      className="flex w-full flex-col gap-5"
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            ...containerVariants.visible.transition,
            staggerChildren: 1.5,
          },
        },
      }}
      initial="hidden"
      animate="visible">
      <motion.div variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 1,
            delay: 8,
          },
        },
      }}>
        <div className="flex items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full bg-muted/80 text-center">
            <AnimatedShinyText className="px-4 py-1">
              <span>Coming soon!</span>
            </AnimatedShinyText>
          </div>
        </div>
      </motion.div>


      {
        headerText.map((text, index) => (
          <motion.div key={index} variants={itemVariants}>
            <TextBlur
              className="text-center text-3xl font-medium tracking-tighter sm:text-5xl"
              text={text}
            />
          </motion.div>
        ))
      }



      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[28rem] pt-1.5 text-center text-base text-zinc-300 sm:text-lg"
          text="Join the waitlist to get early access to a community of trusted developers who can advise you along the way."
          duration={0.8}
        />
      </motion.div>
    </motion.div>
  );
}
