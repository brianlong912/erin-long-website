import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/index.css"

export default function IndexPage({ data }) {
  const [numPicsWide, setNumPicsWide] = useState(3)
  const [modalImageId, setModalImageId] = useState(
    data.allImageSharp.edges[0].node.id
  )
  const [modalImage, setModalImage] = useState(
    data.allImageSharp.edges.find(e => {
      return e.node.id === modalImageId
    })
  )
  let picWidth = 100 / numPicsWide

  /* Functions to incrase and decrease the size of the pictures on the screen */
  function increasePics() {
    if (numPicsWide > 1) {
      setNumPicsWide(numPicsWide - 2)
    }
  }
  function decreasePics() {
    if (numPicsWide < 10) {
      setNumPicsWide(numPicsWide + 2)
    }
  }

  // /* Find the correct image for the modal overlay of a selected iamge */
  // const modalImage =
  /* function to toggle modal and set image for modal */
  function showImage(id) {
    var modalWindow = document.getElementById("modal")
    modalWindow.style.visibility = "visible"
    modalWindow.style.opacity = "1"

    setModalImageId(id)
    setModalImage(
      data.allImageSharp.edges.find(e => {
        return e.node.id === modalImageId
      })
    )

    var modalPic = document.getElementById("modalPic")
    let aspect = modalImage.node.originalAspect.aspectRatio
    let w = aspect * document.documentElement.clientHeight
    modalPic.style.width = aspect > 1 ? "80%" : w + "px"
    console.log(aspect)
    console.log(w)
  }

  /* add event listener to modal window for user clicking off of image */
  var modalWindow = document.getElementById("modal")
  if (modalWindow) {
    modalWindow.addEventListener("click", function (e) {
      const modalPic = document.getElementById("modalPic")
      if (!modalPic.contains(e.target)) {
        modalWindow.style.visibility = "hidden"
        modalWindow.style.opacity = "0"
      }
    })
  }

  /*Creates an array of elements of all of the photos from the graphql query */
  const pics = data.allImageSharp.edges.map(edge => {
    const pic = edge.node.square
    return (
      <button
        key={edge.id}
        className="pic-wrapper"
        style={{ width: picWidth + "%", overflow: "hidden" }}
        onClick={() => showImage(edge.node.id)}
      >
        <Img
          fluid={pic}
          className={numPicsWide === 1 ? "pic-full" : "pic"}
          imgStyle={{ transition: "transform .5s" }}
        />
      </button>
    )
  })

  return (
    <Layout>
      <SEO title="Photos" />
      <div
        style={{
          position: "fixed",
          left: "30px",
          bottom: "30px",
          zIndex: "98",
          display: "flex",
          flexDirection: "column",
          width: "32px",
        }}
      >
        <button className="inc-dec-button" onClick={() => increasePics()}>
          <div className="inc-dec-text">+</div>
        </button>
        <button className="inc-dec-button" onClick={() => decreasePics()}>
          <div className="inc-dec-text">-</div>
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{pics}</div>
      <div
        id="modal"
        style={{
          visibility: "hidden",
          opacity: 0,
          transition: "opacity 0.25s linear",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(51,51,51,.75)",
          zIndex: "99",
        }}
      >
        <div
          id="modalPic"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Img fluid={modalImage.node.originalAspect} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allImageSharp {
      edges {
        node {
          square: fluid(maxWidth: 700, maxHeight: 700) {
            ...GatsbyImageSharpFluid
          }
          originalAspect: fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
          id
        }
      }
    }
  }
`
