import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/about.css"

export default function About({ data }) {
  const aboutInfo = data.allInfo.edges.find(e => {
    return e.node.name
  })

  return (
    <Layout>
      <SEO title="About" />
      <div
        className="about-content"
        // style={{
        //   display: "flex",
        //   margin: "auto",
        //   width: "1000px",
        //   paddingTop: "20vh",
        // }}
      >
        <div id="about-image">
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
          email
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
