import globby from 'globby';

export default async function resolveOptions(sourceDir) {

  const patterns = ['**/*.md', '!.vuepress', '!node_modules']
  const pageFiles = await globby(patterns, { cwd: sourceDir })

  const pagesData = await Promise.all(pageFiles.map(async (file) => {
    // TODO:
    // 1. store base(key, path) info
    // 2. handle the page title
    // 3. handle the page headers
    // 4. handle the page settings
    // 5. handle the page content by the markdown parser
  }));

  const siteData = {
    pages: pagesData,
    title: ''
  }

  const options = {
    siteData
  }

  return options
}