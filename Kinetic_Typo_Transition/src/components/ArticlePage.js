import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Articles_Data } from "./../data/data";
import { CurrentItemState } from "../atoms/CurrentItemAtom";
import gsap from "gsap";
import "../App.css";
import TypeTransition from "./TypeTransition";
import { preloadImages } from "../utils/preload";

function ArticlePage() {
  const [currentItem, setCurrentItem] = useRecoilState(CurrentItemState);
  const articleRef = useRef();
  const articleRef2 = useRef();
  const numberRef = useRef();
  const titleRef = useRef();
  const introRef = useRef();
  const descRef = useRef();
  const imgWrapRef = useRef();
  const imgRef = useRef();
  const [transition, setTransition] = useState(false);
  useEffect(() => {
    // preload images then remove loader (loading class)
    preloadImages(".item__img, .article__img").then(() =>
      document.body.classList.remove("loading")
    );
    setCurrentItem(
      window.location.pathname.replace("/articles", "").replace("/", "")
    );
    const tl = gsap.timeline();
    if (descRef.current) {
      tl.add(() => {
        gsap.set(".back", { pointerEvents: "auto" });
        articleRef.current.classList.add("article--current");
        articleRef2.current.classList.add("article--current");
      })
        .to(".back", {
          duration: 0.7,
          opacity: 1,
          delay: -0.4,
        })
        .from(
          [
            titleRef.current,
            numberRef.current,
            introRef.current,
            descRef.current,
          ],
          {
            opacity: 0,
            y: "50%",
          }
        )
        .from(imgWrapRef.current, { y: "100%" }, 0.5)
        .from(imgRef.current, { y: "-100%" }, 0.5)
        .to(
          [
            titleRef.current,
            numberRef.current,
            introRef.current,
            descRef.current,
          ],
          {
            duration: 1,
            ease: "expo",
            opacity: 1,
            y: "0%",
            stagger: 0.04,
            delay: -0.5,
          }
        )
        // and reveal the image
        .to([imgWrapRef.current, imgRef.current], {
          duration: 1,
          ease: "expo",
          y: "0%",
        });
    }
  });
  // back
  const closeHandler = () => {
    const closeTl = gsap.timeline();
    closeTl
      .to(".back", {
        duration: 0.7,
        ease: "power1",
        opacity: 0,
        delay: -0.5,
      })
      .to(
        [
          titleRef.current,
          numberRef.current,
          introRef.current,
          descRef.current,
        ],
        {
          duration: 1,
          ease: "power4.in",
          opacity: 0,
          y: "50%",
          stagger: -0.04,
          delay: -0.6,
          onComplete: () => {
            setTransition(true);
          },
        }
      )
      .to(imgWrapRef.current, {
        duration: 1,
        ease: "power4.in",
        height: "0",
        delay: -1,
      });

    // // remove current class from the item's article and set the pointer events
    // .add(() => {
    //     gsap.set(".back", { pointerEvents: "none" });
    //     articleRef.classList.remove("article--current");
    //     articleRef2.classList.remove("article--current");
    // });
  };

  return (
    <>
      {transition && <TypeTransition Out />}
      {!transition && (
        <section ref={articleRef} className="article-wrap">
          <button onClick={closeHandler} className="back">
            <svg viewBox="0 0 50 9" width="100%">
              <path d="M0 4.5l5-3M0 4.5l5 3M50 4.5h-77"></path>
            </svg>
          </button>

          {Articles_Data.map(({ id, title, intro, description }, i) => {
            return id === currentItem ? (
              <article
                ref={articleRef2}
                key={id}
                className="article"
                id={`article-${i + 1}`}
              >
                <div ref={imgWrapRef} className="article__img-wrap">
                  <div
                    ref={imgRef}
                    className="article__img"
                    style={{
                      backgroundImage: `url(../images/large/${i + 1}.jpg)`,
                    }}
                  ></div>
                </div>
                <span ref={numberRef} className="article__number">
                  {i + 1}
                </span>
                <h2 ref={titleRef} className="article__title">
                  {title}
                </h2>
                <p ref={introRef} className="article__intro">
                  {intro}
                </p>
                <p ref={descRef} className="article__description">
                  {description}
                </p>
              </article>
            ) : null;
          })}
        </section>
      )}
    </>
  );
}

export default ArticlePage;
