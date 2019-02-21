declare module "siteData" {
  interface PageData {
    path: string;
    title?: string;
    frontmatter?: {
      [key: string]: string;
    };
  }
  interface SiteData {
    title: string;
    description: string;
    base: string;
    pages: PageData[];
  }

  export const siteData: SiteData;
  export const PageComponents: { [key: string]: any };
}
