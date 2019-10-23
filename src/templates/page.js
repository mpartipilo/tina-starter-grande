import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"

import { remarkForm } from "gatsby-tinacms-remark"

function Page({ data }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <>
      <SEO title={frontmatter.title} />
      <Paper dangerouslySetInnerHTML={{ __html: html }}></Paper>
    </>
  )
}

let PageForm = {
  fields: [
    {
      label: "Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      label: "Body",
      name: "rawMarkdownBody",
      component: "markdown",
    },
  ],
}

export default remarkForm(Page, PageForm)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
