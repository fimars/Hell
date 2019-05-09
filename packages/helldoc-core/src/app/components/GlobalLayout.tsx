// @ts-ignore
import ThemeLayout from "#theme/ThemeLayout";
import { useEffect, ReactElement } from "react";

function GlobalLayout(props: { children: ReactElement }) {
  const title = "";
  useEffect(() => {
    document.title = title;
  });

  const Layout = ThemeLayout ? ThemeLayout(props) : props.children;

  return Layout;
}
export default GlobalLayout;
