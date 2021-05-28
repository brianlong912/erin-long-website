import React, { useState }  from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Modal from "../components/modal"
import "../styles/index.css"

export default function IndexPage({ data }) {
  const [numPicsWide, setNumPicsWide] = useState(3)
  const [modalImageId, setModalImageId] = useState(
    data.allImageSharp.edges[0].node.id
  )
  const [modalVisible, setModalVisible] = useState(false)

  /* Find the correct image for the modal overlay of a selected iamge */
  const modalImage = data.allImageSharp.edges.find(e => {
    return e.node.id === modalImageId
  })

  const modalInfo = data.allInfo.edges.find(e => {
    return (
      e.node.parent.relativeDirectory ===
      modalImage.node.parent.relativeDirectory
    )
  })

  /* Functions to incrase and decrease the size of the pictures on the screen */
  function increasePics() {
    if (numPicsWide > 3) {
      setNumPicsWide(numPicsWide - 2)
    }
  }
  function decreasePics() {
    if (numPicsWide < 10) {
      setNumPicsWide(numPicsWide + 2)
    }
  }

  let picWidth = 100 / numPicsWide

  /* function to toggle modal and set image for modal */
  function showImage(id) {
    setModalVisible(true);
    setModalImageId(id);
    let modal = document.getElementById("modal")
    modal.focus();
  }

  /*Creates an array of elements of all of the photos from the graphql query */
  const pics = data.allImageSharp.edges.map(edge => {
    const pic = edge.node.square
    //custom image used for about page, don't want it on main page
    if (pic.originalName === "erin.jpg") {
      return null
    }
    return (
      <button
        key={edge.node.id}
        className="pic-wrapper"
        style={{ width: picWidth + "%" }}
        onClick={() => showImage(edge.node.id)}
      >
        <Img
          fluid={pic}
          className={numPicsWide === 1 ? "pic-full" : "pic"}
          imgStyle={{ transition: "transform .5s", objectPosition: "center" }}
        />
      </button>
    )
  })

  return (
      <Layout>
        <SEO title="Photos" />

        {/* Buttons on the bottom left to increase and decrease the image sizes */}
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

        {/* All images shown here */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>{pics}</div>

        {/* Modal element for clicking on image */}
        <Modal modalImage={modalImage} modalInfo={modalInfo} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      </Layout>
  )
}

export const query = graphql`
  query {
    allImageSharp {
      edges {
        node {
          parent {
            ... on File {
              relativeDirectory
            }
          }
          square: fluid(maxWidth: 700, maxHeight: 700) {
            ...GatsbyImageSharpFluid
            originalName
          }
          originalAspect: fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
          id
        }
      }
    }
    allInfo {
      edges {
        node {
          parent {
            ... on File {
              relativeDirectory
            }
          }
          title
          size
          medium
          description
        }
      }
    }
  }
`
