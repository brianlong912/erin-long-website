import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/index.css"

export default function IndexPage({ data }) {
  const [numPicsWide, setNumPicsWide] = useState(3)
  let picWidth = 100 / numPicsWide

  /*Functions to incrase and decrease the size of the pictures on the screen */
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

  /*Creates an array of all of the photos from the graphql query */
  const pics = data.allFile.edges.map(edge => {
    const pic = edge.node.childImageSharp.fluid
    return (
      <div
        key={pic.src}
        className="pic-wrapper"
        style={{ width: picWidth + "%", overflow: "hidden" }}
      >
        <Img
          fluid={pic}
          className={numPicsWide === 1 ? "pic-full" : "pic"}
          imgStyle={{ transition: "transform .5s" }}
        />
      </div>
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
          zIndex: "99",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className="inc-dec-button" onClick={() => increasePics()}>
          +
        </button>
        <button className="inc-dec-button" onClick={() => decreasePics()}>
          -
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{pics}</div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: {
        extension: { regex: "/(png|jpg)/" }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
