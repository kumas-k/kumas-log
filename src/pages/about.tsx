import React, { FunctionComponent } from 'react'
import Head from 'components/Head'
import { graphql } from 'gatsby'
import { AboutProps } from '../types'

const About: FunctionComponent<AboutProps> = ({
  data: {
    allMarkdownRemark: { edges },
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
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex text-xs text-gray-500 my-5">
        <div>
          <span>{date}</span>
          {update && <span>{` (Updated: ${update})`}</span>}
        </div>
        <div className="before:content-['·'] mx-1">
          {tags &&
            tags.map((tag, index) => (
              <span className="mx-1 hover:text-gray-900" key={index}>
                {`#${tag}`}
              </span>
            ))}
        </div>
      </div>
      <div
        className="markdown-content mt-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { fields: { slug: { regex: "/^/__about/resume/" } } }
    ) {
      edges {
        node {
          id
          html
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

export default About
