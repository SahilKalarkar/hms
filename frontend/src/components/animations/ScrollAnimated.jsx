import React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const ScrollAnimated = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        delay: delay,
                        ease: "easeOut"
                    }
                }
            }}
            initial="hidden"
            animate={controls}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimated;