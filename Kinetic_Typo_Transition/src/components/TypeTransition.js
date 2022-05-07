import gsap from "gsap";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Type_Lines } from "../data/data";

function TypeTransition({ In, Out }) {
  // .type__line CSS opacity value (CSS variable)
  const TYPE_LINE_OPACITY = getComputedStyle(document.body).getPropertyValue(
    "--type-line-opacity"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();
    if (In) {
      tl.to(".type", {
        duration: 1.4,
        ease: "power2.inOut",
        scale: 2.7,
        rotate: -90,
        stagger: 0.04,
      })
        .to(
          ".type__line",
          {
            keyframes: [
              { x: "20%", duration: 1, ease: "power1.inOut" },
              { x: "-200%", duration: 1.5, ease: "power1.in" },
            ],
            stagger: 0.04,
          },
          0
        )
        .to(
          ".type__line",
          {
            keyframes: [
              { opacity: 1, duration: 1, ease: "power1.in" },
              { opacity: 0, duration: 1.5, ease: "power1.in" },
            ],
          },
          0
        );
    } else if (Out) {
      tl.set(".type", {
        ease: "power2.inOut",
        scale: 2.7,
        rotate: -90,
        stagger: 0.04,
        opacity: 0.3,
        delay: -0.2,
      })
        .to(".type", {
          scale: 1.5,
          stagger: 0.05,
        })
        .set(
          ".type__line",
          {
            keyframes: [{ x: "-100%", duration: 1.5, ease: "power1.in" }],
            stagger: 0.04,
            onComplete: () => navigate("/"),
          },
          0
        )
        .to(
          ".type__line",
          {
            keyframes: [
              { opacity: 1, duration: 1, ease: "power1.in" },
              { opacity: 0, duration: 1.5, ease: "power1.in" },
            ],
          },
          0
        );
    }
  });

  return (
    <>
      {Out && (
        <div className="type" data-type-transition aria-hidden="true">
          {Type_Lines.map((line, i) => (
            <div key={i} className="type__line">
              {line}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TypeTransition;
