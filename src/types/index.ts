export type FrontmatterProps = {
  title: string
  date: string
  update: string
  tags: Array<string>
}

export type ContentProps = {
  node: {
    id: string
    excerpt: string
    fields: {
      slug: string
    }
    timeToRead: number
    frontmatter: FrontmatterProps
  }
}

export type ContentItemProps = {
  node: {
    id: string
    html: string
    timeToRead: number
    frontmatter: FrontmatterProps
  }
}

export type IndexProps = {
  data: {
    posts: {
      edges: ContentProps[]
    }
  }
}

export type PostProps = {
  posts: {
    edges: ContentProps[]
  }
}

export type PostTemplateProps = {
  data: {
    posts: {
      edges: ContentItemProps[]
    }
  }
}

export type FooterProps = {
  site: {
    siteMetadata: {
      author: string
    }
  }
}

export type MetaProps = {
  title?: string
  description?: string
  cover?: string
}

export type HeadProps = {
  site: {
    siteMetadata: {
      title: string
      author: string
      description: string
      social: {
        email: string
      }
      cover: string
      keywords: Array<string>
    }
  }
}
