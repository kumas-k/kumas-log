const path = require('path')

const { createFilePath } = require(`gatsby-source-filesystem`)

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {}

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        styles: path.resolve(__dirname, 'src/styles'),
        types: path.resolve(__dirname, 'src/types'),
      },
    },
  })
}

// Generate a Slug Each Post Data
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

    createNodeField({ node, name: 'slug', value: slug })
  }
}

// Generate Page Through Markdown Data
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  // Import Template Component
  const postTemplate = path.resolve('src/templates/PostTemplate.tsx')

  // Get All Markdown File For Paging
  return graphql(`
    {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              draft
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.posts.edges

    for (const post of posts) {
      const {
        node: {
          fields: { slug },
          frontmatter: { draft },
        },
      } = post

      if (draft) if (process.env.NODE_ENV != 'development') continue

      createPage({
        path: slug,
        component: postTemplate,
        context: { slug },
      })
    }
  })
}
