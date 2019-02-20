import React, { lazy } from 'react'
export const PageComponents = {
 PageCHANGELOG: lazy(() => import("/Users/fimars/workshadow/OSS/Hell/docs/CHANGELOG.md")),
Index: lazy(() => import("/Users/fimars/workshadow/OSS/Hell/docs/README.md")) 
};

export const siteData = {
  "title": "Hell Docs",
  "base": "/",
  "pages": [
    {
      "path": "/CHANGELOG",
      "title": "Changelog"
    },
    {
      "path": "/",
      "frontmatter": {
        "title": "TODO??",
        "date": "2018-05-07 14:12:59",
        "tags": "TODO"
      }
    }
  ]
}