import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

import "../styles/header.css"
import MyLink from "./myLink"

function Header({ siteTitle }) {
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
            tabIndex="1"
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
