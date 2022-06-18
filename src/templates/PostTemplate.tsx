import React, { FunctionComponent, createRef, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Head from 'components/Head'
import { PostTemplateProps } from 'types'

const PostTemplate: FunctionComponent<PostTemplateProps> = ({
  data: {
    allMarkdownRemark: { edges },
    site: {
      siteMetadata: {
        comment: { utterances },
      },
    },
  },
}) => {
  const {
    node: {
      html,
      frontmatter: { title, date, update, tags },
    },
  } = edges[0]

  const element = createRef<HTMLDivElement>()

  useEffect(() => {
    if (element.current === null) return

    const comment: HTMLScriptElement = document.createElement('script')
    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: utterances,
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: 'true',
    }

    Object.entries(attributes).forEach(([key, value]) => {
      comment.setAttribute(key, value)
    })

    element.current.appendChild(comment)
  }, [])

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
                <Link to={`/tags#${tag}`}>{`#${tag}`}</Link>
              </span>
            ))}
        </div>
      </div>
      <div
        className="markdown-content mt-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div ref={element} />
    </>
  )
}

export const profileQuery = graphql`
  query ($slug: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { slug: { eq: $slug } } }
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
    site {
      siteMetadata {
        comment {
          utterances
        }
      }
    }
  }
`

export default PostTemplate
