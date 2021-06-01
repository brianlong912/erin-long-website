/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Info implements Node {
      title: String
      size: String
      medium: String
      description: String
      name: String
      email: String
    }
  `
  createTypes(typeDefs)
}