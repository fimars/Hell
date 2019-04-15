import Page from "@theme/components/Page";
import NavBar from "@theme/components/NavBar";
import { AppContext } from "@theme/browser";
import { useState } from "react";
import * as React from "react";

type LayoutProps = {
  renderContent: () => React.ReactElement;
};

export default function Layout(props: LayoutProps) {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return (
    <AppContext.Provider
      value={{
        displaySidebar,
        setDisplaySidebar
      }}
    >
      <NavBar />
      <div className="columns">
        <Page {...props} />
      </div>
    </AppContext.Provider>
  );
}
