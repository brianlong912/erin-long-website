import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../styles/header.css"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: "#191919",
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
          justifyContent: "right",
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
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
