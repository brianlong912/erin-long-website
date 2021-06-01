import React, { useEffect, useState } from "react"
import Img from "gatsby-image"

import CloseButton from "./closeButton"
import "../styles/modal.css"

function Modal(props) {
  const [picWidth, setPicWidth] = useState(0)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [closeFocus, setCloseFocus] = useState(false);

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

  /* Update the size of the picture wrapper for fluid pic */
  useEffect(() => {
    let aspect = props.modalImage.node.originalAspect.aspectRatio
    let clientW = document.documentElement.clientWidth
    let clientH = document.documentElement.clientHeight
    let w = aspect * clientH * 0.9
    if (w > clientW * 0.45) {
      w = clientW * 0.45
    }
    setPicWidth(w)
  }, [
    props.modalImage.node.originalAspect.aspectRatio,
    props.modalVisible,
    screenWidth,
  ])

  /* Watch for screen resizing to trigger useEffect above and change pic size */
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    return function cleanup() {
      window.removeEventListener("resize", handleResize)
    }
  })

  /* Function to handle closing the modal */
  function closeModal(e) {
    if (e.type === "keydown" && !(e.key === "Escape" || e.key === "Enter")) return
    props.setModalVisible(false)
  }

  /* Main modal element to create and return */
  return (
    <div
      id="modal"
      role="button"
      style={{
        opacity: props.modalVisible ? "1" : "0",
        pointerEvents: props.modalVisible ? "visible" : "none",
        transition: "opacity 400ms linear",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(43, 43, 43, 0.8)",
        zIndex: "99",
      }}
      onClick={closeModal}
      onKeyDown={closeModal}
      tabIndex="-1"
    >
      <button
        id="close-button"
        style={{
          position: "absolute",
          right: "2rem",
          top: "2rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={closeModal}
        onFocus={()=>{setCloseFocus(true)}}
        onBlur={()=>{setCloseFocus(false)}}
        data-testid="modal-close-button"
      >
        <CloseButton duration={500} visible={props.modalVisible} focus={closeFocus} />
      </button>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events*/}
      <div
        id="modal-content"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Image to be displayed */}
        <div
          id="modal-pic"
          style={{ width: picWidth + "px", flex: "0 0 " + picWidth + "px" }}
        >
          <Img fluid={props.modalImage.node.originalAspect} />
        </div>
        {/* Modal Information to be shown, relating to the image */}
        <div
          id="modal-info"
          style={{
            display: info ? "block" : "none",
          }}
        >
          {info}
        </div>
      </div>
    </div>
  )
}
export default Modal
