import { Link } from "gatsby"
import React, { useState } from "react"
import LinkAnimation from "./linkAnimation"

const MyLink = ({children, to}) => {
  const [mouseHover, setMouseHover] = useState(false);

  function mouseEnter() {
    setMouseHover(true);
  }
  function mouseLeave(){
    setMouseHover(false);
  }

  return (
    <Link to={to} className="pageLink" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onFocus={mouseEnter} onBlur={mouseLeave}>
      <LinkAnimation hover={mouseHover} />
      {children}
    </Link>
  )
}

export default MyLink;
