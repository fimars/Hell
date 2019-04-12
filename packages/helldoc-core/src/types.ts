/* Runtime Information */
export interface PageData {
  path: string;
  component: string;
  title?: string;
  headers?: TocHeader[];
  frontmatter?: {
    [key: string]: string;
  };
}

export interface ThemeConfig {
  navbar: Navbar;
}
interface Navbar {
  text: string;
  link?: string;
  items?: Navbar[];
}

export interface SiteData {
  title: string;
  description: string;
  base: string;
  pages: PageData[];
  themeConfig?: ThemeConfig;
}

/* Node Types */
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
export interface AppContext {
  base: string;
  sourceDir: string;
  outDir: string;
  siteConfig: SiteConfig;
  tempPath: string;
  themePath: string;
  writeTemp: (path: string, content: string) => Promise<string>;
  genTempRuntime: () => Promise<void>;
  pageFiles: string[];
  siteData?: SiteData;
}

export interface CLIOptions {
  output?: string;
}

export type Tag = [string, { [key: string]: string | number }, string];

export interface TocHeader {
  id: string;
  level: number;
  parent?: string | null;
  text: string;
}
