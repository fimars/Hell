import * as React from "react";

import { Link } from "react-router-dom";
import siteData from "@internal/site-data";

interface Result {
  link: string;
  mainTitle: string;
  subTitle?: string;
}

class Search extends React.Component<
  {},
  {
    fullWidth: boolean;
    keyword: string;
    results: Array<Result>;
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
      results: [
        {
          link: "/hell",
          mainTitle: "Get Start",
          subTitle: "快速开始"
        },
        {
          link: "/hell/1",
          mainTitle: "Get Start",
          subTitle: "快速开始"
        }
      ]
    };
    this.inputRef = React.createRef();
  }

  isFullWidth() {
    if (window.innerWidth <= 545 && !this.state.fullWidth) {
      this.setState({ fullWidth: true });
      const node = this.inputRef.current;
      if (node) {
        node.focus();
      }
    }
  }

  miniWidth() {
    if (window.innerWidth <= 545) {
      this.setState({ fullWidth: false });
    }
  }

  searching() {
    const searchInHeaders = () => {
      return siteData.pages.map(({ headers, path }) => {
        let toReturn = {
          subTitle: "",
          path: ""
        };
        headers.forEach(({ text }) => {
          if (text.indexOf(this.state.keyword) > -1) {
            toReturn.subTitle = text;
            toReturn.path = path + `#${text}`;
          }
        });
        // if(toReturn.subTitle && toReturn.path) {
        return toReturn;
        // }
      });
    };

    const searchInNav = (headers: any[] | null, navString: string) => {
      if (Array.isArray(headers)) {
        // if found keyowrd in headers
        headers.map(head => {
          siteData.themeConfig.nav.forEach(({ link, text }) => {
            if (link === head.link) {
              head.maintitle = text;
            }
          });
          return head;
        });
      } else {
        siteData.themeConfig.nav.map(({ link, text }) => {
          if (text.indexof(navString) > -1) {
            return {
              mainTitle: text,
              link: link
            };
          }
        });
      }
    };

    let headers = searchInHeaders();
    console.log(headers);
    // if(headers.length) {
    //   headers.map(({path})=> {
    //     return searchInNav(path);
    //   });
    // } else {

    //   searchInNav(null, this.state.keyword);
    // }
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
          onBlur={() => {
            this.setState({ onFocus: false });
            this.miniWidth();
          }}
          value={this.state.keyword}
          onChange={e => {
            this.setState({ keyword: e.target.value.trim() }, this.searching);
          }}
          className={`${this.state.fullWidth ? "full-width-input" : ""}`}
        />
        {this.state.onFocus && this.state.keyword !== "" && (
          <ul className="search-results">
            {this.state.results.map((item: Result) => {
              return (
                <li key={item.link} className="result-item">
                  <Link to={item.link} className="full">
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
