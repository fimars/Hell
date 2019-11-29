import React from "react";

type LayoutProps = {
  renderContent: () => React.ReactElement;
};

export default function(props: LayoutProps) {
  return <div className="content main">{props.renderContent()}</div>;
}
