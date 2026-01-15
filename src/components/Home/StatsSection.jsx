import React, { useRef, useEffect } from "react";
import { useInView, animate } from "framer-motion";

const CountUp = ({ to, suffix = "", duration = 2, decimals = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            const node = ref.current;
            const controls = animate(0, to, {
                duration: duration,
                onUpdate: (value) => {
                    node.textContent = value.toFixed(decimals) + suffix;
                }
            });
            return () => controls.stop();
        }
    }, [to, suffix, duration, inView, decimals]);

    return <span ref={ref}>0{suffix}</span>;
}

const StatsSection = () => {
    return (
        <section className="py-16 bg-[var(--color-birst-dark)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            <div className="container relative z-10 px-4 mx-auto">
                <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                    {[
                        { value: 10, suffix: "k+", label: "Students Trained" },
                        { value: 700, suffix: "+", label: "Expert Instructors" },
                        { value: 20, suffix: "+", label: "Global Partners" },
                        { value: 100, suffix: "k+", label: "Student Reviews" }
                    ].map((stat, index) => (
                        <div key={index} className="p-4">
                            <div className="mb-2 text-4xl font-bold text-[var(--color-birst-primary)] lg:text-5xl font-mono">
                                <CountUp to={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-sm font-medium tracking-wider uppercase text-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;