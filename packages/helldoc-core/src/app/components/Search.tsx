import * as React from "react";

import { Link } from "react-router-dom";
import siteData from "@internal/site-data";
import { TocHead as header } from "../../types";

interface head {
  subTitle?: string;
  path: string;
  mainTitle: string;
  parentPath: string;
}

interface SearchResultItemProps {
  item: head;
  onClick: () => void;
}
function SearchResultItem({ item, onClick }: SearchResultItemProps) {
  return (
    <li key={item.path} className="result-item">
      <Link to={item.path} onClick={onClick} className="full link-link">
        <span>{item.mainTitle}</span>
        <span>{item.subTitle ? ` > ${item.subTitle}` : ``}</span>
      </Link>
    </li>
  );
}

interface SearchState {
  fullWidth: boolean;
  keyword: string;
  results: head[];
  onFocus: boolean;
}
class Search extends React.Component<{}, SearchState> {
  private inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: {}) {
    super(props);
    this.state = {
      fullWidth: false,
      onFocus: true,
      keyword: "",
      results: []
    };
    this.inputRef = React.createRef();

    this.onTouchSearchBox = this.onTouchSearchBox.bind(this);
    this.onLeaveSearchBox = this.onLeaveSearchBox.bind(this);
    this.userInputing = this.userInputing.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  render() {
    const hasResult = this.state.onFocus && this.state.keyword.trim();
    return (
      <div className="search-box" onClick={this.onTouchSearchBox}>
        <i className="fas fa-search search-icon" />
        <input
          ref={this.inputRef}
          type="text"
          onBlur={this.onLeaveSearchBox}
          value={this.state.keyword}
          onChange={this.userInputing}
          className={`${this.state.fullWidth ? "full-width-input" : ""}`}
          id="searchInput"
        />
        {hasResult && (
          <ul className="search-results">
            {this.state.results.map((item: head) => (
              <SearchResultItem item={item} onClick={this.clearState} />
            ))}
          </ul>
        )}
      </div>
    );
  }

  onTouchSearchBox() {
    this.setState({ onFocus: true });
    this.isFullWidth();
  }
  onLeaveSearchBox() {
    if (isMobileSize()) {
      this.setState({ fullWidth: false });
    }
  }
  userInputing(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ keyword: e.currentTarget.value }, this.search);
  }
  clearState() {
    this.setState({
      keyword: "",
      onFocus: false
    });
  }

  isFullWidth() {
    const shouldUseFullWidth = isMobileSize() && !this.state.fullWidth;
    if (shouldUseFullWidth) {
      this.setState({ fullWidth: true });
      const node = this.inputRef.current;
      node && node.focus();
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
        const isMatchResult =
          header.text
            .toLowerCase()
            .indexOf(this.state.keyword.trim().toLowerCase()) > -1 &&
          this.state.keyword !== "";
        if (isMatchResult) {
          const newHeaderResult = {
            subTitle: header.text,
            path: `${page.path}#${header.text}`,
            parentPath: page.path,
            mainTitle: ""
          };
          headerResult.push(newHeaderResult);
        }
      });
    });
    return headerResult;
  }
  addMainTitle(headers: head[]) {
    headers.forEach(head => {
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
      const isMatchResult =
        nav.text
          .toLowerCase()
          .indexOf(this.state.keyword.trim().toLowerCase()) > -1 &&
        this.state.keyword !== "";
      if (isMatchResult) {
        navResults.push({
          path: nav.link,
          parentPath: nav.link,
          mainTitle: nav.text
        });
      }
    });
    return navResults;
  }
}

function isMobileSize() {
  const mobileSize = 545;
  return window.innerWidth <= mobileSize;
}

export default Search;
