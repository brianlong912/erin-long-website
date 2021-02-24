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
        textAlign: "center",
      }}
    >
      <div style={{ margin: 0 }}>
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
          justifyContent: "space-between",
          position: "absolute",
          right: "4em",
          height: "1.5em",
          width: "18em",
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
