import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Modal from "../components/modal"
import "../styles/index.css"

export default function IndexPage({ data }) {
  /* State variables, mostly for the modal image */
  const [numPicsWide, setNumPicsWide] = useState(3)
  const [modalMarkdown, setModalMarkdown] = useState(data.allMarkdownRemark.edges[0].node)
  const [modalVisible, setModalVisible] = useState(false)

  /* Functions to increase and decrease the size of the pictures on the screen */
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

  /* click callback function to toggle modal and set image for modal */
  function showImage(markdown) {
    setModalMarkdown(markdown)
    setModalVisible(true)
    let modal = document.getElementById("modal")
    modal.focus()
  }

  /*Creates an array of elements of all of the photos from the graphql query */
  const pics = data.allMarkdownRemark.edges.map(edge => {
    if (edge.node.frontmatter.title === "About") return null
    const pic = edge.node.frontmatter.image.childImageSharp.square

    return (
      <button
        key={edge.node.frontmatter.title}
        className="pic-wrapper fade-in"
        style={{ width: picWidth + "%" }}
        onClick={() => showImage(edge.node)}
      >
        <Img fluid={pic} className={numPicsWide === 1 ? "pic-full" : "pic"} />
      </button>
    )
  })

  /* Intersection observer to fade and grow in images as scrolling down */
  useEffect(() => {
    /* Observe all elements with the fade-in class, give them the appear class on intersection */
    const fadingImages = document.querySelectorAll(".fade-in")
    const appearOptions = { threshold: 0.25 }
    /* setting up intersection observer */
    const appearOnScroll = new IntersectionObserver(function (
      entries,
      appearOnScroll
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("appear")
        appearOnScroll.unobserve(entry.target)
      })
    },
    appearOptions)

    /* attach intersection observer to images */
    fadingImages.forEach(image => {
      appearOnScroll.observe(image)
    })
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
      <Modal
        markdown={modalMarkdown}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark (sort: {order: ASC, fields: frontmatter___image___dir}) {
      edges {
        node {
          frontmatter {
            title
            media
            description
            image {
              childImageSharp {
                square: fluid(maxWidth: 700, maxHeight: 700) {
                  ...GatsbyImageSharpFluid
                }
                originalAspect: fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
