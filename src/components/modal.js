import React, { useEffect, useState } from "react"
import Img from "gatsby-image"

import { FaTimes as Close } from "react-icons/fa"

function Modal(props) {
  const [picWidth, setPicWidth] = useState(0)
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
    // let modalPicElem = document.getElementById("modal-pic")
    // modalPicElem.style.width = w > clientW * 0.45 ? "45vw" : w + "px"

    /* add event listener to modal window for user clicking off of image */
    // var modalWindow = document.getElementById("modal")
    // if (modalWindow) {
    //   modalWindow.addEventListener("click", function (e) {
    //     const modalPic = document.getElementById("modal-pic")
    //     const modalInfoElem = document.getElementById("modal-info")
    //     if (!modalPic.contains(e.target) && !modalInfoElem.contains(e.target)) {
    //       closeModal()
    //     }
    //   })
    // }
  })

  function handleModalClick(e) {
    const modalPic = document.getElementById("modal-pic")
    const modalInfoElem = document.getElementById("modal-info")
    if (!modalPic.contains(e.target) && !modalInfoElem.contains(e.target)) {
      closeModal()
    }
  }

  function closeModal() {
    props.setModalVisible(false)
    // const modalWindow = document.getElementById("modal")
    // modalWindow.style.visibility = "hidden"
    // modalWindow.style.opacity = "0"
  }

  /* Main modal element to create and return */
  return (
    <div
      id="modal"
      style={{
        visibility: props.modalVisible ? "visible" : "hidden",
        opacity: props.modalVisible ? "1" : "0",
        transition: "opacity 0.4s linear",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(43, 43, 43, 0.705)",
        zIndex: "99",
      }}
      onClick={handleModalClick}
    >
      <button
        style={{
          position: "absolute",
          right: "1.25em",
          top: "1.25em",
          background: "transparent",
          borderRadius: "50%",
          color: "inherit",
          border: "white",
          cursor: "pointer",
        }}
        onClick={() => closeModal()}
        data-testid="modal-close-button"
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
        <div id="modal-pic" style={{width: picWidth + "px"}}>
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
