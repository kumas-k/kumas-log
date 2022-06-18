/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FunctionComponent, useState, useMemo } from 'react'
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { graphql } from 'gatsby'
import PostList from 'components/PostList'
import Head from 'components/Head'
import { SearchProps } from '../types'

const Search: FunctionComponent<SearchProps> = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  const [value, setValue] = useState('')
  const [isTitleOnly, setIsTitleOnly] = useState(true)

  const filteredPosts = useMemo(
    () =>
      edges.filter(
        ({
          node: {
            frontmatter: { title },
            rawMarkdownBody,
          },
        }) =>
          new RegExp(`${value}`, 'i').test(
            isTitleOnly ? title : title + rawMarkdownBody,
          ),
      ),
    [value, isTitleOnly],
  )

  return (
    <>
      <Head />
      <div className="mb-8 flex justify-center items-center text-gray-300 text-sm">
        <Fa icon={faSearch} />
        <input
          className="mx-2 text-gray-900 "
          type="text"
          value={value}
          placeholder="Search"
          autoComplete="off"
          autoFocus
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <div className="flex text-xs">
          <div
            className={`${
              isTitleOnly ? 'text-gray-900' : ''
            } mx-2 cursor-pointer`}
            onClick={() => setIsTitleOnly(true)}
          >
            in Title
          </div>
          <div
            className={`${
              !isTitleOnly ? 'text-gray-900' : ''
            } mx-2 cursor-pointer`}
            onClick={() => setIsTitleOnly(false)}
          >
            in Title+Content
          </div>
        </div>
      </div>

      {value !== '' && !filteredPosts.length ? (
        <span>No search results</span>
      ) : (
        <PostList edges={value === '' ? edges : filteredPosts} />
      )}
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "/^/[a-zA-Z]/" } } }
    ) {
      edges {
        node {
          rawMarkdownBody
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

export default Search
