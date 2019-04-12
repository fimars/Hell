import * as React from "react";
import { useContext } from "react";
import { PageDataContext } from "../context";
import { layouts } from "../runtime";

export default function LayoutManager(props: { renderContent: any }) {
  const page = useContext(PageDataContext);

  function resolveLayoutName() {
    let layoutName = "Layout";
    if (page.frontmatter && page.frontmatter.layout) {
      layoutName = page.frontmatter.layout;
    }
    return layoutName;
  }

  const Layout = layouts[resolveLayoutName()];
  return <Layout {...props} />;
}
