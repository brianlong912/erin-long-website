import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import "../styles/header.css"

function Header({ siteTitle }) {
  const [eyelidHeight, setEyelidHeight] = useState(-75)
  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent)
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
        position: "fixed",
        width: "100%",
        height: "80px",
        zIndex: "99",
      }}
    >
      <div
        style={{
          display: "flex",
          margin: `0 auto`,
          padding: `1.2rem 1.1rem`,
        }}
      >
        <div style={{ width: "50%" }}>
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
            justifyContent: "flex-end",
            height: "1.5em",
            width: "50%",
          }}
        >
          <Link to="/" className="pageLink">
            Photos
          </Link>
          <Link to="/about" className="pageLink">
            About
          </Link>
          <Link to="/contact" className="pageLink">
            Contact
          </Link>
        </div>
      </div>
      <svg
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
      </svg>
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
