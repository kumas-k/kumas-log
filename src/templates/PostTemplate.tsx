import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Head from 'components/Head'
import { PostTemplateProps } from 'types'

const PostTemplate: FunctionComponent<PostTemplateProps> = ({
  data: {
    posts: { edges },
  },
}) => {
  const {
    node: {
      html,
      frontmatter: { title, date, update, tags },
    },
  } = edges[0]

  return (
    <>
      <Head />
      <div className="my-10">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex text-xs text-gray-500 my-5">
          <div>
            <span>{date}</span>
            {update && <span>{` (Updated: ${update})`}</span>}
          </div>
          <div className="before:content-['·'] mx-1">
            {tags &&
              tags.map((tag) => <span className="mr-1">{` #${tag}`}</span>)}
          </div>
        </div>
        <div
          className="markdown-content mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  )
}

export const profileQuery = graphql`
  query Post($slug: String) {
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          id
          html
          timeToRead
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY", locale: "kr")
            update(formatString: "MMM DD, YYYY", locale: "kr")
            tags
          }
        }
      }
    }
  }
`

export default PostTemplate
