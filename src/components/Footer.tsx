import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FooterProps } from 'types'

const Footer: FunctionComponent = () => {
  const {
    site: {
      siteMetadata: { author },
    },
  } = useStaticQuery<FooterProps>(
    graphql`
      query {
        site {
          siteMetadata {
            author
            social {
              github
              linkedin
            }
          }
        }
      }
    `,
  )

  const TODAY = new Date()
  const YEAR = TODAY.getFullYear()

  return (
    <footer>
      <div className="wrapper text-center text-gray-500 text-xs py-5">
        © {YEAR} {author} | Theme by&nbsp;
        <a href="https://github.com/devKumas">devKumas</a>
        <span> | Built with </span>
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </footer>
  )
}

export default Footer
