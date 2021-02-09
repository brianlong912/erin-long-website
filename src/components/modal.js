import React from "react"
import Img from "gatsby-image"

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
  return (
    <div id="modal">
      <div
        id="modalPic"
        style={{
          position: "absolute",
          top: "50%",
          left: info ? "25%" : "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Img fluid={props.modalImage.node.originalAspect} />
      </div>
      <div
        id="modalInfo"
        style={{
          position: "absolute",
          top: "50%",
          left: "75%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          backgroundColor: info ? "#2f2f2f" : "unset",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {info}
      </div>
    </div>
  )
}
export default Modal
