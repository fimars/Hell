export type Tag = [string, { [key: string]: string | number }, string];

export interface TocHeader {
  id: string;
  level: number;
  parent?: string | null;
  text: string;
}

export interface PageData {
  path: string;
  component: string;
  title?: string;
  headers?: TocHeader[];
  frontmatter?: {
    [key: string]: string;
  };
}

interface Navbar {
  text: string;
  link?: string;
  items?: Navbar[];
}

export interface ThemeConfig {
  navbar: Navbar;
}

export interface SiteConfig {
  theme: string;
  title?: string;
  description?: string;
  dest?: string;
  base?: string;
  head?: Tag[];
  ignores?: string[];
  themeConfig?: ThemeConfig;
}

export interface SiteData {
  title: string;
  description: string;
  base: string;
  pages: PageData[];
  themeConfig?: ThemeConfig;
}

export interface AppContext {
  base: string;
  sourceDir: string;
  outDir: string;
  siteConfig: SiteConfig;
  tempPath: string;
  writeTemp: any;
  pageFiles: string[];
  siteData?: SiteData;
}

export interface CLIOptions {
  output?: string;
}

export interface stateTypes {
  sideBarDisplay: boolean;
}
