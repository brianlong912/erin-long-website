/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FaArrowUp as ArrowUp } from "react-icons/fa"

import Header from "./header"
import "../styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  })

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div style={{}}>
        <main>{children}</main>
        <ScrollTopButton />
        {/* <footer
          style={{
            marginTop: `2rem`,
          }}
        ></footer> */}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

function ScrollTopButton() {
  var yPos;
  useEffect(() => {
    yPos = window.pageYOffset
  })
  function toTopFunction() {
    document.body.scrollTop = 0 //For Safari?
    document.documentElement.scrollTop = 0 //for other browsers
  }

  return (
    <button
      id="toTopButton"
      className="toTopButton"
      onClick={() => toTopFunction()}
      style={{
        opacity: yPos ? "1" : "0",
        visibility: yPos ? "visible" : "hidden",
        cursor: "pointer",
      }}
    >
      <ArrowUp style={{ width: "50px", height: "50px" }} />
    </button>
  )
}

function handleScroll() {
  var yPos = window.pageYOffset
  var toTopButton = document.getElementById("toTopButton")
  if (yPos) {
    toTopButton.style.opacity = "1"
    toTopButton.style.visibility = "visible"
  } else {
    toTopButton.style.opacity = "0"
    toTopButton.style.visibility = "hidden"
  }
}

export default Layout
