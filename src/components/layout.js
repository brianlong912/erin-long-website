/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FaArrowUp as ArrowUp } from "react-icons/fa"

import Header from "./header"
import "../styles/layout.css"

export const PureLayout = ({ children, data }) => {
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

export const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return <PureLayout children={children} data={data} />
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

function ScrollTopButton() {
  const [showTopButton, setShowTopButton] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return function cleanup(){
      window.removeEventListener("scroll", handleScroll)
    }
  })
  
  function handleScroll() {
    var yPos = window.pageYOffset
    if (yPos>700) {
      setShowTopButton(true)
    } else {
      setShowTopButton(false)
    }
  }

  function toTopFunction() {
    window.scroll({ top: "0", behavior: "smooth" })
  }

  return (
    <button
      id="toTopButton"
      className="toTopButton"
      onClick={() => toTopFunction()}
      style={{
        opacity: showTopButton ? "1" : "0",
        pointerEvents: showTopButton ? "visible" : "hidden",
        cursor: "pointer",
        transition: "opacity 400ms",
      }}
    >
      <ArrowUp style={{ width: "50px", height: "50px" }} />
    </button>
  )
}

export default Layout
