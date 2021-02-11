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

  /* Main modal element to create and return */
  return (
    <div id="modal">
      <div
        id="modalContent"
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        {/* Modal Image to be displayed */}
        <div
          id="modalPic"
        >
          <Img fluid={props.modalImage.node.originalAspect} />
        </div>
        {/* Modal Information to be shown, relating to the image */}
        <div
          id="modalInfo"
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
