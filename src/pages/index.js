import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function IndexPage({ data }) {
  const pics = data.allFile.edges.map(edge => {
    const pic = edge.node.childImageSharp.fluid
    return (
      <div key={pic.src} style={{width: "25%"}}>
        <Img fluid={pic} style={{display: "block", objectPosition: "center"}}/>
      </div>
    )
  })
  return (
    <Layout>
      <SEO title="Photos" />
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
