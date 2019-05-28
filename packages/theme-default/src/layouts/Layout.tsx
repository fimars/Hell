import Page from "@theme/components/Page";
import Sidebar from "@theme/components/Sidebar";
import * as React from "react";

type LayoutProps = {
  renderContent: () => React.ReactElement;
};

export default function Layout(props: LayoutProps) {
  return (
    <div className="columns">
      <Sidebar />
      <Page {...props} />
    </div>
  );
}
