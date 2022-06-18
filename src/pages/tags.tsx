import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { graphql } from 'gatsby'

import PostList from 'components/PostList'
import Head from 'components/Head'
import { TagsProps } from '../types'

const Tags: FunctionComponent<TagsProps> = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => {
  const [targetTag, setTargetTag] = useState('')

  useEffect(() => {
    setTargetTag(location.hash.split('#')[1] ?? group[0].fieldValue)
  }, [])

  const tagPosts = useMemo(
    () => group.filter((g) => g.fieldValue === targetTag)[0]?.edges,
    [targetTag],
  )

  return (
    <>
      <Head />
      <div className="mt-4">
        <div className="my-4 mx-6">
          <ul className="flex flex-wrap justify-center">
            {group.map((g) => (
              <li className="mx-3" key={g.fieldValue}>
                <span
                  className={`cursor-pointer font-medium ${
                    g.fieldValue === targetTag
                      ? 'text-gray-900'
                      : 'text-gray-300'
                  } hover:text-gray-900`}
                  onClick={() => setTargetTag(g.fieldValue)}
                >
                  <a href={`#${g.fieldValue}`}>{g.fieldValue}</a>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <PostList edges={tagPosts} />
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "/^/[a-zA-Z]/" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
        edges {
          node {
            id
            excerpt(pruneLength: 200, truncate: true)
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "MMM DD, YYYY")
              update(formatString: "MMM DD, YYYY")
              tags
            }
          }
        }
      }
    }
  }
`

export default Tags
