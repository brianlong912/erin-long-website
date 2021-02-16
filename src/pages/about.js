import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function about({data}) {
  const aboutInfo = data.allInfo.edges.find(e => {
    return e.node.name
  })

  console.log(aboutInfo)

  return (
    <Layout>
      <SEO title="About" />
      <div>
        <Img fluid={data.imageSharp.fluid} />
        <div>{aboutInfo.node.name}</div>
        <div>{aboutInfo.node.email}</div>
        <div>{aboutInfo.node.description}</div>
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
    imageSharp(fluid: {originalName: {eq: "erin.jpg"}}){
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
