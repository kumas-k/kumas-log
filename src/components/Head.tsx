import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { HeadProps, MetaProps } from 'types'

const Head: FunctionComponent<MetaProps> = ({ title, description, cover }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<HeadProps>(
    graphql`
      {
        site {
          siteMetadata {
            title
            author
            description
            social {
              email
            }
            cover
            keywords
          }
        }
      }
    `,
  )

  const metaTitle: string = title || siteMetadata.title
  const metaDescription: string = description || siteMetadata.description
  const metaCover: string = cover || siteMetadata.cover

  return (
    <Helmet
      title={metaTitle}
      meta={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          httpEquiv: 'Content-Type',
          content: 'text/html; charset=UTF-8',
        },
        {
          httpEquiv: 'title',
          content: metaTitle,
        },
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'author',
          content: siteMetadata.author,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: metaCover,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: metaTitle,
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: metaCover,
        },
        {
          property: 'email',
          content: siteMetadata.social.email,
        },
        {
          httpEquiv: 'copyright',
          content: siteMetadata.author,
        },
        {
          name: 'keywords',
          content: siteMetadata.keywords.join(`, `),
        },
      ]}
      htmlAttributes={{ lang: 'ko' }}
    />
  )
}

export default Head
