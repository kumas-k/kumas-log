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
      keywords: string[]
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

type FrontmatterProps = {
  title: string
  date: string
  update: string
  tags: Array<string>
}

type ContentProps = {
  node: {
    id: string
    excerpt: string
    fields: {
      slug: string
    }
    frontmatter: FrontmatterProps
  }
}

type SearchContentProps = ContentProps & {
  node: {
    rawMarkdownBody: string
  }
}

type Group = {
  fieldValue: string
  totalCount: number
  edges: ContentProps[]
}

type ContentItemProps = {
  node: {
    id: string
    html: string
    frontmatter: FrontmatterProps
  }
}

export type IndexProps = {
  data: {
    allMarkdownRemark: {
      edges: ContentProps[]
    }
  }
}

export type AboutProps = {
  data: {
    allMarkdownRemark: {
      edges: ContentItemProps[]
    }
  }
}

export type TagsProps = {
  data: {
    allMarkdownRemark: {
      group: Group[]
    }
  }
}

export type SearchProps = {
  data: {
    allMarkdownRemark: {
      edges: SearchContentProps[]
    }
  }
}

export type PostListProps = {
  edges: ContentProps[]
}

export type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: ContentItemProps[]
    }
    site: {
      siteMetadata: {
        comment: {
          utterances: string
        }
      }
    }
  }
}
