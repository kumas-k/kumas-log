import React, { FunctionComponent } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

type HeaderProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const Header: FunctionComponent = () => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery<HeaderProps>(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  )

  return (
    <header className="sticky top-0 z-50">
      <div className="wrapper flex items-center justify-between bg-white ">
        <Link to="/">
          <div className="text-xl md:text-2xl font-bold">{title}</div>
        </Link>
        <nav>
          <ol className="flex text-sm">
            <Link to="/about">
              <li className="mx-3 my-5">About</li>
            </Link>
          </ol>
        </nav>
      </div>
    </header>
  )
}

export default Header
