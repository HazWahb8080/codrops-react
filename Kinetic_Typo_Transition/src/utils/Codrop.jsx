import React from 'react';
import "../App.css";

function Codrop() {
  return (
       <div className="frame">
        <div className="frame__title-wrap">
          <h1 className="frame__title">Kinetic Typography Page Transition</h1>
          <p className="frame__tagline">
            Inspired by this{" "}
            <a href="https://dribbble.com/shots/16174007-Kinetic-Typography">
              shot
            </a>
          </p>
        </div>
        <div className="frame__author">
          <a href="https://www.twitter.com/codrops" className="link-alt">
            @codrops
          </a>
        </div>
        <nav className="frame__links">
          <a href="http://tympanus.net/Development/MenuThumbStackAnimation/">
            Previous demo
          </a>
          <a href="https://tympanus.net/codrops/?p=56722">Article</a>
          <a href="https://github.com/codrops/KineticTypePageTransition/">
            GitHub
          </a>
        </nav>
      </div>
  )
}

export default Codrop