import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/about.css"

export default function About({ data }) {
  const img = data.markdownRemark.frontmatter.image.childImageSharp.fluid
  const  html = data.markdownRemark.html;
  return (
    <Layout>
      <SEO title="About" />
      <div className="about-content">
        <div id="about-image">
          <Img
            fluid={img}
          />
        </div>
        <div
          id="about-info"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    markdownRemark(frontmatter: { title: { eq: "About" } }) {
      html
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
