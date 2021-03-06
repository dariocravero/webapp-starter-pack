import { minify } from 'html-minifier'
import { INITIAL_DATA } from '../common/constants/initial'
import { APP_ID, DEBUG_ID } from '../common/constants/ids'

export function getEntryPointFromPath (pathname) {
  if (pathname === '/') {
    if (__DEV__) console.log('main file')
    return 'landing-async'
  } else if (/^\/dashboard[\/.*]$/.test(pathname)) {
    if (__DEV__) console.log('dashboard file')
    return 'dashboard-async'
  }
  return false
}

export function getEntryPointFile (pathname) {
  const entryPoint = getEntryPointFromPath(pathname)
  if (!entryPoint) return ''

  return `<script src="/assets/${entryPoint}.chunk.js"></script>`
}

export function shrinkPage (html) {
  // all options can be seen here
  // https://www.npmjs.com/package/html-minifier
  return minify(html, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true
  })
}

export function generateHTML ({ initialData, html, entryPoint }) {
  const debugPanel = __DEV__ && __DEVTOOLS__ ?
    `<div id="${DEBUG_ID}"></div>` : ''
  return `
    <html>
      <head>
        <meta charset="utf-8">
        <title>testing</title>
        <script>${INITIAL_DATA} = ${JSON.stringify(initialData)};</script>
        <script src="/assets/commonsChunk.js"></script>
        <script src="/assets/app.entry.js"></script>
        ${entryPoint}
      </head>
      <body>
        <div id="${APP_ID}">${html}</div>
        ${debugPanel}
      </body>
    </html>
  `
}
