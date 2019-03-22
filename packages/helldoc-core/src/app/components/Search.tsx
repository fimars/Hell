import * as React from "react";

import { Link } from "react-router-dom";
import siteData from "@internal/site-data";

interface Result {
  link: string;
  mainTitle: string;
  subTitle?: string;
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
      onFocus: false,
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
    const searchHeaders = () => {
      return siteData.pages.flatMap(({ headers, path }) => {
        let toReturn: head[] = [];
        headers.forEach(({ text }) => {
          if (
            text
              .toLowerCase()
              .indexOf(this.state.keyword.trim().toLowerCase()) > -1
          ) {
            toReturn.push({
              subTitle: text,
              path: path + `#${text}`,
              mainTitle: "",
              parentPath: path
            });
          }
        });
        return toReturn;
      });
    };

    const searchNav = (headers: head[]) => {
      const navSearch = (head: head | null) => {
        let toReturn: head[] = [];
        siteData.themeConfig.nav.forEach(({ link, text }) => {
          if (
            text
              .toLowerCase()
              .indexOf(this.state.keyword.trim().toLowerCase()) > -1
          ) {
            toReturn.push({
              mainTitle: text,
              path: link,
              parentPath: link
            });
          }

          if (head && head.parentPath === link) {
            head.mainTitle = text;
            toReturn.push(head);
          }
        });

        return toReturn;
      };

      return headers.length
        ? headers.flatMap(head => {
            return navSearch(head);
          })
        : navSearch(null);
    };

    let headers = searchHeaders();
    const results = searchNav(headers);
    this.setState({ results: results });
  }

  miniInput(e: any) {
    if (
      e.relatedTarget.nodeName === "A" &&
      e.relatedTarget.offsetParent.nodeName === "UL"
    ) {
      this.setState({ keyword: "" });
    } else {
      this.setState({ onFocus: false });
      this.miniWidth();
    }
  }

  userInputing(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ keyword: e.currentTarget.value }, this.search);
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
        />
        {this.state.onFocus && (
          <ul className="search-results">
            {this.state.results.map((item: head) => {
              return (
                <li key={item.path} className="result-item">
                  <Link to={item.path} className="full link-link">
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
