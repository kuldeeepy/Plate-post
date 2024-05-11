// Photos from https://citizenofnowhe.re/lines-of-the-city
import "../styles.css";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import dis1 from "../assets/foo1.gif";
import dis2 from "../assets/foo2.gif";
import dis3 from "../assets/foo3.gif";
import dis4 from "../assets/foo4.gif";
import dis5 from "../assets/foo5.gif";
import dis6 from "../assets/foo6.gif";
import dis7 from "../assets/foo7.gif";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ dish, idx }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={dish.img} alt="A London skyscraper" />
        <h2 className="bottom-[-5px] tracking-tighter font-mono whitespace-normal font-semibold text-[20px] inline py-2 px-2 bg-white min-w-full left-[1px]">
          {dish.name}
        </h2>
      </div>
      <motion.h2
        className="text-orange-500 mt-60 text-[20px] sm:text-white font-semi font-mono sm:mt-72 sm:text-[40px]"
        style={{ y }}
      >{`#0${idx + 1}`}</motion.h2>
    </section>
  );
}

export default function Wrapper() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const dishes = [
    { name: "Lobster Skagen", img: dis1 },
    { name: "SmŌgen", img: dis2 },
    { name: "Zoey's Poke", img: dis3 },
    { name: "The New Yorker", img: dis4 },
    { name: "R⌀xt Lox", img: dis5 },
    { name: "The Joint Venture", img: dis6 },
    { name: "Smoked Salmon A La Carte", img: dis7 },
  ];

  return (
    <>
      {dishes.map((dish, idx) => (
        <Image key={dish.name} idx={idx} dish={dish} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
