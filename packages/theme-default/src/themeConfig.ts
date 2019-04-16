// @ts-ignore
import { siteData } from "@internal/runtime";

const themeConfig = siteData.themeConfig || {};

export const nav: Array<{
  text: string;
  link: string;
}> = themeConfig.nav || [];
