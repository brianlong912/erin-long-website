import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import css from "../styles/header.module.css"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: "#222222",
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <p>- Photography -</p>
      <div
        style={{
          display: "flex",
          padding: "0 18em",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" className={css.pageLink}>
          Photos
        </Link>
        <Link to="/about" className={css.pageLink}>
          About
        </Link>
        <Link to="/contact" className={css.pageLink}>
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
