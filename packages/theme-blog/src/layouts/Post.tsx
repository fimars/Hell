import * as React from "react";
import Page from "@theme/components/Page";
import NavBar from "@theme/components/NavBar";

type LayoutProps = {
  renderContent: () => React.ReactElement;
};

export default function Layout(props: LayoutProps) {
  return (
    <div>
      <NavBar />
      <div className="columns">
        <div className="side" />
        <Page {...props} />
      </div>
    </div>
  );
}
