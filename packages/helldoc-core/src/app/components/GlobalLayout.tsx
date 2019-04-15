import { useEffect, ReactElement } from "react";
import { siteData } from "../runtime";

function GlobalLayout(props: { children: ReactElement }) {
  const { title } = siteData;
  useEffect(() => {
    document.title = title || "Welcome to Hell";
  });

  return props.children;
}
export default GlobalLayout;
