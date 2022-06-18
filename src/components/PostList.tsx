import { Link } from 'gatsby'
import React, { FunctionComponent } from 'react'
import { PostListProps } from 'types'

const PostList: FunctionComponent<PostListProps> = ({ edges }) => {
  return (
    <>
      {edges?.map(
        ({
          node: {
            id,
            excerpt,
            fields: { slug },
            frontmatter: { title, date, update, tags },
          },
        }) => (
          <article
            key={id}
            className="mb-8 p-4 hover:opacity-100 transition duration-500 opacity-80"
          >
            <Link to={slug}>
              <h2 className="text-xl font-bold">{title}</h2>
              <div className="flex text-xs text-gray-500 my-2 ">
                <div>
                  <span key={id}>{date}</span>
                  {update && <span>{` (Updated: ${update})`}</span>}
                </div>
                <div className="before:content-['·'] mx-1">
                  {tags &&
                    tags.map((tag, index) => (
                      <span className="mx-1" key={index}>{`#${tag}`}</span>
                    ))}
                </div>
              </div>
              <div className="text-gray-700 line-clamp-3">{excerpt}</div>
            </Link>
          </article>
        ),
      )}
    </>
  )
}

export default PostList
