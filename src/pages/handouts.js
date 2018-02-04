import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
    let posts = data.allMarkdownRemark.edges
        .map(({ node }) => node);

    return <div className="ph2 ph3-ns mw7 center">
        <article className="page">
            <h1 className="f2 f1-ns mb2 mb3-ns black b">Handouts</h1>
            {posts.map(({ frontmatter: fm, id }) =>
                <div key={id}>
                    <Link style={{ boxShadow: 'none' }} to={fm.path}>
                        {moment(fm.date).utc().format('ddd, M/D')} — {fm.title}
                    </Link>
                </div>)}
        </article>
    </div>
}

export const handoutsQuery = graphql`
query handoutsQuery {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {fields: {collection: {eq: "handouts"}}}) {
      edges {
        node {
          id
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }
`;