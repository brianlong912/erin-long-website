import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

import "../styles/header.css"
import MyLink from "./myLink"

function Header({ siteTitle }) {
  const [eyelidHeight, setEyelidHeight] = useState(-75)
  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent)
    return function cleanup() {
      window.removeEventListener("scroll", handleScrollEvent)
    }
  })

  function handleScrollEvent() {
    let yPos = window.pageYOffset
    // let header = document.getElementById("header")
    // header.style.top = "-" + yPos / 10 + "px"
    let eyeLidOpen = -75 + yPos / 4
    setEyelidHeight(eyeLidOpen < 75 ? eyeLidOpen : 75)
  }
  return (
    <header
      id="header"
      style={{
        background: "#191919",
        // position: "fixed",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "1.2rem 1.1rem",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 4" }}>
          <Link
            data-testid="title"
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
              fontSize: "2.5rem",
            }}
          >
            {siteTitle}
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            flex: "1 0",
            justifyContent: "flex-end",
          }}
        >
          <MyLink to="/">Photos</MyLink>
          <MyLink to="/about">About</MyLink>
          <MyLink to="/contact">Contact</MyLink>
        </div>
      </div>
      {/* Link animation design */}
      {/* <svg>
        <path
          id="shape"
          d="M 40,4 C 12,5 -0.34399266,7.7616201 0,28.219159 0.51526392,43.547005 32.812962,49.553439 55.163208,49.845686 77.513449,50.137943 99.568965,47.506795 99.863684,26.465657 100.10929,8.9306292 81.197555,3.0856164 58.356097,3.3778631 35.514639,3.670121 4,7 3.0945058,20 2,41.078172 18.567752,45 18.567752,45"
          fill="white"
          stroke="black"
        />
        <path id="line" d="m 18.567752,45 c 10,0 30,-1 70,0" fill="none" stroke="black"/>
      </svg> */}
      {/* <svg
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        width="200px"
        height="100px"
      >
        <clipPath id="eye-clip">
          <path d={`m 0 50 q 75 ${eyelidHeight} 150 0 q -75 75 -150 0`} />
        </clipPath>
        <path
          id="eye-lid"
          d={`m 0 50 q 75 -75 150 0 q -75 75 -150 0`}
          fill="#ffe4c7"
          stroke="black"
        />
        <path
          id="eye-lid"
          d={`m 0 50 q 75 ${eyelidHeight} 150 0 q -75 75 -150 0`}
          fill="white"
          stroke="black"
        />
        <circle
          id="iris"
          clipPath="url(#eye-clip)"
          r="44"
          cx="75"
          cy="50"
          fill="#3a4289"
        />
        <circle id="pupil" clipPath="url(#eye-clip)" r="22" cx="75" cy="50" />
      </svg> */}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
