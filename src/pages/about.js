import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/about.css"

export default function About({ data }) {
  /* only use the info for the about page, so the node that has a name is used (imageInfo has title, size, and description) */
  const aboutInfo = data.allInfo.edges.find(e => {
    return e.node.name
  })

  return (
    <Layout>
      <SEO title="About" />
      <div
        className="about-content"
      >
        <div id="about-image">
          {/* Custom image, queried with exact name in graphql below */}
          <Img fluid={data.imageSharp.fluid} />
        </div>
        <div id="about-info">
          <div>{aboutInfo.node.description}</div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allInfo {
      edges {
        node {
          name
          description
        }
      }
    }
    imageSharp(fluid: { originalName: { eq: "erin.jpg" } }) {
      fluid(maxWidth: 700, maxHeight: 700) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
