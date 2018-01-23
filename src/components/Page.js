// BuiltIn
import qs from "querystring";
// Packages
import React from "react";
import marked from "marked";
// Libs
import Toc from "./Toc";
import config from "../config";
import { isTest, fetchFile, jumpTo } from "../lib/helper";

const renderer = new marked.Renderer();

export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      docContent: "",
      docHeadings: []
    };
  }

  get currentPath() {
    return this.formatPath(this.props);
  }

  static formatPath({ location }) {
    // Rename current to index
    const { index, path } = config.it;
    let { pathname } = location;

    // render index
    if (pathname === "/") pathname += index;

    return path + pathname + ".md";
  }

  async scrollIntoLastVisit() {
    const { search } = this.props.location;
    if (search) {
      const { id } = qs.parse(search.slice(1));
      jumpTo(id);
    }
  }

  async fetchData() {
    try {
      const toc = [];
      let preNode = null;
      renderer.heading = function(text, level) {
        if (level <= 2) {
          const node = {
            level,
            text,
            children: [],
            parent: preNode || toc
          };

          if (!preNode) {
            toc.push(node);
            preNode = node;
          } else {
            if (level > preNode.level) {
              preNode.children.push(node);
            } else {
              toc.push(node);
              preNode = node;
            }
          }
        }
        return level > 1 ? `<h${level} id="${text}">${text}</h${level}>` : "";
      };
      marked.setOptions({ renderer });

      const currentPath = this.currentPath;

      isTest && console.warn(`The file ${currentPath} fetching...`);
      const raw = await fetchFile(currentPath);
      isTest && console.warn(`The file ${currentPath} fetch done!`);
      isTest && console.log(`Result: \n${raw}`);
      const formatted = marked(raw);
      isTest && console.warn("The file Content format done!");

      this.setState(
        {
          docHeadings: toc,
          docContent: formatted
        },
        this.scrollIntoLastVisit
      );
    } catch (e) {
      if (isTest) {
        console.error(e);
      }
      this.props.history.replace("/404");
    }
  }

  async componentDidUpdate(prevProps) {
    const prevPath = this.formatPath(prevProps);
    if (prevPath !== this.currentPath) {
      await this.fetchData();
    }
  }

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    return (
      <div>
        <div className="columns">
          <div className="column-2">
            <div className="nav section">
              <Toc
                location={this.props.location}
                headings={this.state.docHeadings}
              />
            </div>
          </div>
          <div className="column-8">
            <div
              className="markdown-body section"
              dangerouslySetInnerHTML={{ __html: this.state.docContent }}
            />
          </div>
        </div>
      </div>
    );
  }
}
