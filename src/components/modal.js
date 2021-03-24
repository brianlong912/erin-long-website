import React from "react"
import Img from "gatsby-image"

import { FaTimes as Close } from "react-icons/fa"

function Modal(props) {
  /* Conditionally render the Image Info with the modal */
  let info
  if (props.modalInfo) {
    info = (
      <div>
        <div>{props.modalInfo.node.title}</div>
        <div>{props.modalInfo.node.medium}</div>
        <div>{props.modalInfo.node.size}</div>
        <br />
        <div>{props.modalInfo.node.description}</div>
      </div>
    )
  }

  /* Main modal element to create and return */
  return (
    <div id="modal">
      <button
        style={{
          position: "absolute",
          right: "1.25em",
          top: "1.25em",
          background: "transparent",
          borderRadius: "50%",
          color: "inherit",
          border: "white",
          cursor: "pointer"
        }}
      >
        <Close style={{ width: "2.5rem", height: "2.5rem" }} />
      </button>
      <div
        id="modal-content"
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        {/* Modal Image to be displayed */}
        <div id="modal-pic">
          <Img fluid={props.modalImage.node.originalAspect} />
        </div>
        {/* Modal Information to be shown, relating to the image */}
        <div
          id="modal-info"
          style={{
            display: info ? "block" : "none",
            width: "18em",
            backgroundColor: "#2f2f2f",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          {info}
        </div>
      </div>
    </div>
  )
}
export default Modal
