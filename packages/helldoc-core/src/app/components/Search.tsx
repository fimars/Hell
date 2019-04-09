import * as React from "react";

import Link from "./Link";
import siteData from "@internal/site-data";

const navData = siteData.themeConfig.nav;
const pageData = siteData.pages;

interface head {
  subTitle?: string;
  path: string;
  mainTitle: string;
  parentPath: string;
}

interface SearchResultProps {
  results: head[];
  onItemClick: () => void;
}
function SearchResult({ results, onItemClick }: SearchResultProps) {
  return (
    <ul className="search-results">
      {results.map((item: head) => (
        <li key={item.path} className="result-item">
          <Link to={item.path} onClick={onItemClick} className="full link-link">
            <span>{item.mainTitle}</span>
            <span>{item.subTitle ? ` > ${item.subTitle}` : ``}</span>
          </Link>
        </li>
      ))}
    </ul>
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
      onFocus: false,
      keyword: "",
      results: []
    };
    this.inputRef = React.createRef();
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
          <SearchResult
            results={this.state.results}
            onItemClick={this.resetState}
          />
        )}
      </div>
    );
  }

  onTouchSearchBox = () => {
    this.setState({ onFocus: true });
    this.isFullWidth();
  };
  onLeaveSearchBox = (e: React.FocusEvent) => {
    if (!e.relatedTarget) {
      isMobileSize() && this.setState({ fullWidth: false });
      this.setState({ onFocus: false });
    }
  };
  userInputing = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ keyword: e.currentTarget.value }, this.search);
  };
  resetState = () => {
    this.setState({
      keyword: "",
      onFocus: false
    });
  };

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
    const headerResult: head[] = pageData.reduce((result: head[], page) => {
      const matchHeaders = page.headers
        .filter(this.isMatchItem)
        .map(header => ({
          subTitle: header.text,
          path: `${page.path}#${header.id}`,
          parentPath: page.path,
          mainTitle: ""
        }));
      return result.concat(matchHeaders);
    }, []);
    return headerResult;
  }
  addMainTitle(headers: head[]) {
    headers.forEach(head => {
      navData.forEach(({ text, link }) => {
        if (head.parentPath === link) {
          head.mainTitle = text;
        }
      });
    });
  }
  searchNavs() {
    const navResults: head[] = navData.filter(this.isMatchItem).map(nav => ({
      path: nav.link,
      parentPath: nav.link,
      mainTitle: nav.text
    }));
    return navResults;
  }

  isMatchItem = (item: { text: string }) => {
    return (
      item.text.toLowerCase().indexOf(this.state.keyword.trim().toLowerCase()) >
        -1 && this.state.keyword !== ""
    );
  };
}

function isMobileSize() {
  const mobileSize = 545;
  return window.innerWidth <= mobileSize;
}

export default Search;
