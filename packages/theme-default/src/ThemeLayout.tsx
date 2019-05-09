import NavBar from "#theme/components/NavBar";
import * as React from "react";

export default function GlobalLayout(props) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}
