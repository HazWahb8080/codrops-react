import React, { useEffect, useRef, useState } from 'react';
import "../App.css";
import gsap from 'gsap';
import {useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import  {CurrentItemState}  from '../atoms/CurrentItemAtom';

function Figure({figure,number,click}) {
    const {title,caption,id} = figure;
    const figureRef = useRef(null);
    const imgRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const [currentItem,setCurrentItem] = useRecoilState(CurrentItemState);

    const [animateFirst , setAnimateFirst] = useState(false);
      let navigate = useNavigate();

    
    // hover effect on figure items
    useEffect(()=>{
      const hoverTimelineDefaults = {duration: 1, ease: 'expo'};
      figureRef.current.addEventListener("mouseenter",()=>{
        gsap.timeline({defaults: hoverTimelineDefaults})
         .to([imgRef.current,titleRef.current,descRef.current], {
                y: pos => pos * 8-4
            });
      })

      figureRef.current.addEventListener("mouseleave",()=>{
         gsap.timeline({defaults: hoverTimelineDefaults})
         .to([imgRef.current,titleRef.current,descRef.current], {
                y: 0
            });
      })
    });

    const handleClick = () => {
      setAnimateFirst(true)
      setTimeout(()=>{
        setCurrentItem(id)
        setAnimateFirst(false)
        navigate(animateFirst ? "" : `/articles/${id}`)
      },2800) // 0.3s fadeout + 2.5s transition
    }

    
    
  return (
    <figure onClick={handleClick} ref={figureRef} className="item" data-article={`article-${number}`}>
          <img ref={imgRef} className="item__img" src={`/images/${number}.jpg`} alt="Some title" />
          <figcaption className="item__caption">
            <h2 ref={titleRef} className="item__caption-title">0{number} &mdash; {title}</h2>
            <p ref={descRef} className="item__caption-description">
              {caption}
            </p>
          </figcaption>
        </figure>
  )
}

export default Figure;