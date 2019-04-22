// @ts-ignore
import ThemeLayout from "@theme/ThemeLayout";
import { useEffect, ReactElement } from "react";
import { siteData } from "../runtime";

function GlobalLayout(props: { children: ReactElement }) {
  const { title } = siteData;
  useEffect(() => {
    document.title = title || "Welcome to Hell";
  });

  const Layout = ThemeLayout ? ThemeLayout(props) : props.children;

  return Layout;
}
export default GlobalLayout;
