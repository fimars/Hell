import * as React from "react";

import { Link } from "react-router-dom";
import siteData from "@internal/site-data";

// interface Result {
//   link: string;
//   mainTitle: string;
//   subTitle?: string;
// }

interface header {
  id: string;
  level: number;
  parent?: any;
  text: string;
}

interface head {
  subTitle?: string;
  path: string;
  mainTitle: string;
  parentPath: string;
}

class Search extends React.Component<
  {},
  {
    fullWidth: boolean;
    keyword: string;
    results: Array<head>;
    onFocus: boolean;
  }
> {
  private inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      fullWidth: false,
      onFocus: true,
      keyword: "",
      results: []
    };
    this.inputRef = React.createRef();
  }

  isFullWidth() {
    if (window.innerWidth <= 545 && !this.state.fullWidth) {
      this.setState({ fullWidth: true });
      const node = this.inputRef.current;
      node && node.focus();
    }
  }

  miniWidth() {
    if (window.innerWidth <= 545) {
      this.setState({ fullWidth: false });
    }
  }

  search() {
    let headers = this.searchPagesHeaders();
    if (headers.length) {
      this.addMainTitle(headers);
    } else {
      headers = this.searchNavs();
    }
    this.setState({
      results: headers
    });
  }

  searchPagesHeaders() {
    let headerResult: head[] = [];
    siteData.pages.forEach(page => {
      page.headers.forEach((header: header) => {
        if (
          header.text
            .toLowerCase()
            .indexOf(this.state.keyword.trim().toLowerCase()) > -1 &&
          this.state.keyword !== ""
        ) {
          headerResult.push({
            subTitle: header.text,
            path: `${page.path}#${header.text}`,
            parentPath: page.path,
            mainTitle: ""
          });
        }
      });
    });
    return headerResult;
  }

  addMainTitle(headers: head[]) {
    headers.forEach((head: head) => {
      siteData.themeConfig.nav.forEach(({ text, link }) => {
        if (head.parentPath === link) {
          head.mainTitle = text;
        }
      });
    });
  }

  searchNavs() {
    let navResults: head[] = [];
    siteData.themeConfig.nav.forEach((nav: { text: string; link: string }) => {
      if (
        nav.text
          .toLowerCase()
          .indexOf(this.state.keyword.trim().toLowerCase()) > -1 &&
        this.state.keyword !== ""
      ) {
        navResults.push({
          path: nav.link,
          parentPath: nav.link,
          mainTitle: nav.text
        });
      }
    });
    return navResults;
  }

  miniInput(e: React.FocusEvent) {
    if (!e.relatedTarget) {
      this.setState({ onFocus: false });
      this.miniWidth();
    }
    // else if(e.relatedTarget && (e.relatedTarget as HTMLElement).className === "full link-link") {

    // }
  }

  userInputing(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ keyword: e.currentTarget.value }, this.search);
  }

  linkClick() {
    this.setState({
      keyword: "",
      onFocus: false
    });
  }

  render() {
    return (
      <div
        className="search-box"
        onClick={() => {
          this.setState({ onFocus: true });
          this.isFullWidth();
        }}
      >
        <i className="fas fa-search search-icon" />
        <input
          ref={this.inputRef}
          type="text"
          onBlur={e => this.miniInput(e)}
          value={this.state.keyword}
          onChange={e => this.userInputing(e)}
          className={`${this.state.fullWidth ? "full-width-input" : ""}`}
          id="searchInput"
        />
        {this.state.onFocus && this.state.keyword.trim() && (
          <ul className="search-results">
            {this.state.results.map((item: head) => {
              return (
                <li key={item.path} className="result-item">
                  <Link
                    to={item.path}
                    onClick={() => this.linkClick()}
                    className="full link-link"
                  >
                    <span>{item.mainTitle}</span>
                    <span>{item.subTitle ? ` > ${item.subTitle}` : ``}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default Search;
