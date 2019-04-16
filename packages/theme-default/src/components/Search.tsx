// @ts-ignore
import { siteData } from "@internal/runtime";
import { HashLink as Link } from "react-router-hash-link";
import { useState, useRef } from "react";
import * as React from "react";

const navData = siteData.themeConfig.nav;
const pageData = siteData.pages;

interface head {
  subTitle?: string;
  path: string;
  mainTitle: string;
  parentPath: string;
}

type SearchResultProps = {
  results: head[];
  onItemClick: () => void;
};
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

export default function Search() {
  const [fullWidth, setFullWidth] = useState(false);
  const [focus, setFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<head[]>([]);
  const inputEl = useRef(null);

  const showResults = focus && keyword.trim();
  console.log(showResults);

  return (
    <div className="search-box" onClick={onTouchSearchBox}>
      <i className="fas fa-search search-icon" />
      <input
        id="searchInput"
        type="text"
        ref={inputEl}
        onBlur={onLeaveSearchBox}
        value={keyword}
        onChange={userInputing}
        className={`${fullWidth ? "full-width-input" : ""}`}
      />
      {showResults && (
        <SearchResult results={results} onItemClick={resetState} />
      )}
    </div>
  );

  function onTouchSearchBox() {
    setFocus(true);
    isFullWidth();
  }
  function onLeaveSearchBox(e: React.FocusEvent) {
    if (!e.relatedTarget) {
      isMobileSize() && setFullWidth(false);
      setFocus(false);
    }
  }
  function userInputing(e: React.FormEvent<HTMLInputElement>) {
    setKeyword(e.currentTarget.value);
    search();
  }
  function resetState() {
    setKeyword("");
    setFocus(false);
  }

  function isFullWidth() {
    const shouldUseFullWidth = isMobileSize() && !fullWidth;
    if (shouldUseFullWidth) {
      setFullWidth(true);
      // @ts-ignore
      inputEl.current && inputEl.current.focus();
    }
  }
  function search() {
    let headers = searchPagesHeaders();
    if (headers.length) {
      addMainTitle(headers);
    } else {
      headers = searchNavs();
    }
    console.log(headers);
    setResults(headers);
  }
  function searchPagesHeaders() {
    const headerResult: head[] = pageData.reduce((result: head[], page) => {
      const matchHeaders = page.headers.filter(isMatchItem).map(header => ({
        subTitle: header.text,
        path: `${page.path}#${header.id}`,
        parentPath: page.path,
        mainTitle: ""
      }));
      return result.concat(matchHeaders);
    }, []);
    return headerResult;
  }
  function addMainTitle(headers: head[]) {
    headers.forEach(head => {
      navData.forEach(({ text, link }) => {
        if (head.parentPath === link) {
          head.mainTitle = text;
        }
      });
    });
  }
  function searchNavs() {
    const navResults: head[] = navData.filter(isMatchItem).map(nav => ({
      path: nav.link,
      parentPath: nav.link,
      mainTitle: nav.text
    }));
    return navResults;
  }

  function isMatchItem(item: { text: string }) {
    return (
      item.text.toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1 &&
      keyword !== ""
    );
  }
}

function isMobileSize() {
  const mobileSize = 545;
  return window.innerWidth <= mobileSize;
}
