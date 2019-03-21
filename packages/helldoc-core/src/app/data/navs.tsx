import siteData from "@internal/site-data";

function resolveNavs() {
  if (siteData && siteData.themeConfig) {
    return siteData.themeConfig.nav || [];
  } else {
    return siteData.pages
      .filter(page => page.title)
      .map(page => ({ text: page.title, link: page.path }));
  }
}
export const navs = resolveNavs();
