import React, { FunctionComponent } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome'
import { faTags, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'

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
          <ol className="flex text-gray-400 ">
            <Link to="/tags">
              <li className="mx-3 my-5 hover:text-gray-700">
                <Fa icon={faTags} />
              </li>
            </Link>
            <Link to="/search">
              <li className="mx-3 my-5 hover:text-gray-700">
                <Fa icon={faSearch} />
              </li>
            </Link>
            <Link to="/about">
              <li className="mx-3 my-5 hover:text-gray-700">
                <Fa icon={faUser} />
              </li>
            </Link>
          </ol>
        </nav>
      </div>
    </header>
  )
}

export default Header
