// @ts-ignore
import { siteData } from "@internal/runtime";
import { HashLink as Link } from "react-router-hash-link";
import { useState, useRef, useEffect } from "react";
import * as React from "react";
import { nav as navData } from "@theme/themeConfig";

const pageData: any[] = siteData.pages;

type Result = {
  subTitle?: string;
  path: string;
  mainTitle: string;
  parentPath: string;
};

type SearchResultsProps = {
  results: Result[];
  onItemClick: () => void;
};
function SearchResults({ results, onItemClick }: SearchResultsProps) {
  return (
    <ul className="search-results">
      {results.map(item => (
        <li key={item.path} className="result-item">
          <Link to={item.path} onClick={onItemClick} className="full link-link">
            <span>{item.mainTitle}</span>
            {item.subTitle && <span>{` > ${item.subTitle}`}</span>}
          </Link>
        </li>
      ))}
      {!results.length && <li className="result-item">🧐 No Match</li>}
    </ul>
  );
}

let blurTimer: NodeJS.Timeout;

export default function Search() {
  const [focus, setFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  const showResults = focus && keyword.trim();

  useEffect(() => {
    clearTimeout(blurTimer);
  });

  return (
    <div className="search-box" onClick={handleClick}>
      <i className="fas fa-search search-icon" />
      <input
        type="text"
        ref={inputEl}
        value={keyword}
        className={`${focus ? "full-width-input" : ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {showResults && <SearchResults results={results} onItemClick={clear} />}
    </div>
  );

  function handleClick() {
    if (isMobileSize()) {
      inputEl.current && inputEl.current.focus();
    }
    setFocus(true);
  }

  function handleBlur() {
    blurTimer = setTimeout(() => {
      setFocus(false);
    }, 300);
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setKeyword(e.currentTarget.value);
    search(e.currentTarget.value);
  }

  function clear() {
    setKeyword("");
    setFocus(false);
  }

  function search(keyword: string) {
    let headers = searchPagesHeaders(keyword);
    if (!headers.length) {
      headers = searchNavs(keyword);
    }
    setResults(headers);
  }
}

function searchPagesHeaders(keyword: string): Result[] {
  return pageData.reduce((result: Result[], page) => {
    const parentPath = page.path;
    const headers = page.headers || [];
    const matchHeaders = headers
      .filter(header => matchItem(keyword, header))
      .map(({ id, text: subTitle }) => {
        const path = `${parentPath}#${id}`;
        const matchNav = navData.find(nav => parentPath === nav.link);

        return {
          subTitle,
          path,
          parentPath,
          mainTitle: matchNav ? matchNav.text : ""
        };
      });
    return result.concat(matchHeaders);
  }, []);
}
function searchNavs(keyword: string): Result[] {
  return navData
    .filter(nav => matchItem(keyword, nav))
    .map(({ link, text }) => ({
      path: link,
      parentPath: link,
      mainTitle: text
    }));
}

function matchItem(keyword: string, item: { text: string }) {
  return (
    item.text.toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1 &&
    keyword !== ""
  );
}

function isMobileSize() {
  const mobileSize = 545;
  return window.innerWidth <= mobileSize;
}
