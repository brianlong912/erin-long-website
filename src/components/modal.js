import React from "react"
import Img from "gatsby-image"

function Modal( props ) {
  return (
    <div id="modal">
      <div
        id="modalPic"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Img fluid={props.modalImage.node.originalAspect} />
      </div>
      <div id="modalInfo">
          {props.modalInfo.node.title}
      </div>
    </div>
  )
}
export default Modal
