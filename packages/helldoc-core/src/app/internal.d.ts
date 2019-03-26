declare module "@internal/site-data" {
  interface PageData {
    path: string;
    component: string;
    title?: string;
    headers: headers[];
    frontmatter?: {
      [key: string]: string;
    };
  }
  interface SiteData {
    title: string;
    description: string;
    base: string;
    pages: PageData[];
    themeConfig: {
      nav: any[];
    };
  }
  interface headers {
    id: string;
    level: number;
    parent: any;
    text: string;
  }
  const siteData: SiteData;
  export default siteData;
}
declare module "@internal/pages" {
  const pages: { [key: string]: any };
  export default pages;
}
