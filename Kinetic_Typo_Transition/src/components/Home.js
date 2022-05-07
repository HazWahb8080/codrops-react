import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Figures_Data, Type_Lines } from "../data/data";
import Codrop from "../utils/Codrop";
import Figure from "./Figure";
import TypeTransition from "./TypeTransition";
import { preloadImages } from "../utils/preload";

function Home() {
  const figRef = useRef(null);
  const frameRef = useRef(null);
  const mainRef = useRef(null);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    // preload images then remove loader (loading class)
    preloadImages(".item__img, .article__img").then(() =>
      document.body.classList.remove("loading")
    );
    const tl = gsap.timeline();
    tl.from(mainRef.current, {
      opacity: 0,
      duration: 1,
    }).to(mainRef.current, {
      opacity: 1,
      duration: 2,
      delay: 0.5,
    });
  }, []);

  const figures_Click = () => {
    const AnimationDefaults = {
      duration: 0.8,
      ease: "power2.inOut",
      opacity: 0,
      onComplete: () =>
        gsap.set(["#item24,#item13"], { pointerEvents: "none" }),
    };
    const tl = gsap.timeline({ defaults: AnimationDefaults });
    tl.to("#item24", {
      y: "25%",
    })
      .to("#item13", {
        y: "-25%",
        delay: -0.8,
      })
      .to(frameRef.current, {
        duration: 0.4,
        ease: "power3",
        opacity: 0,
        delay: -0.8,
        onComplete: () => {
          gsap.set(frameRef.current, { pointerEvents: "none" });
          setTransition(true);
        },
      });
  };
  return (
    <main ref={mainRef}>
      <div className="type" data-type-transition aria-hidden="true">
        {Type_Lines.map((line, i) => (
          <div key={i} className="type__line">
            {line}
          </div>
        ))}
      </div>

      {/* codrop_frame */}
      <div ref={frameRef}>
        <Codrop />
      </div>

      {/* figures */}
      <section className="item-wrap">
        {Figures_Data.map((figure, i) => (
          <div
            onClick={figures_Click}
            key={i}
            ref={figRef}
            id={(i + 1) % 2 ? "item24" : "item13"}
            className="item"
          >
            <Figure figure={figure} number={i + 1} />
          </div>
        ))}
      </section>
      {transition && <TypeTransition In />}
    </main>
  );
}

export default Home;
