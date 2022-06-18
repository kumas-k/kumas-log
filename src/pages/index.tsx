import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Head from 'components/Head'
import PostList from 'components/PostList'
import { IndexProps } from 'types'

const IndexPage: FunctionComponent<IndexProps> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <>
      <Head />
      <PostList edges={edges} />
    </>
  )
}
export default IndexPage

export const indexQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { fields: { slug: { regex: "/^/[a-zA-Z]/" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            update(formatString: "DD MMMM, YYYY")
            tags
          }
        }
      }
    }
  }
`
