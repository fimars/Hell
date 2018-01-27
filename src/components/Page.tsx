// BuiltIn
import qs from "querystring";

// Packages
import * as React from "react";
import * as marked from "marked";

// Libs
import Toc from "./Toc";
import config from "../config";
import {fetchFile, isTest, jumpTo} from "../lib/helper";
import {Route, RouterProps} from "react-router";

export interface PageState {
    docContent: string;
    docHeadings: Array<string>
}

const renderer = new marked.Renderer();

export default class Page extends React.Component<RouterProps, PageState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = {
            docContent: '',
            docHeadings: []
        } as PageState
    }

    get currentPath() {
        const {location: {pathname}} = this.props
        return formatPath(pathname);
    }

    scrollIntoLastVisit() {
        const {location: {search}} = this.props
        if (search) {
            const {id} = qs.parse(search.slice(1));
            jumpTo(id);
        }
    }

    async fetchData() {
        const { history } = this.props
        try {
            const toc: Array<string> = [];
            let preNode = null;
            renderer.heading = function (text, level) {
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
            marked.setOptions({renderer});

            const currentPath = this.currentPath;

            isTest && console.warn(`The file ${currentPath} fetching...`);
            const raw = await fetchFile(currentPath);
            isTest && console.warn(`The file ${currentPath} fetch done!`);
            isTest && console.log(`Result: \n${raw}`);
            const formatted = marked(raw, void 0);
            isTest && console.warn("The file Content format done!");

            const newState: PageState = {
                docHeadings: toc,
                docContent: formatted
            }
            this.setState(newState, this.scrollIntoLastVisit);
        } catch (e) {
            if (isTest) {
                console.error(e);
            }
            history.replace("/404");
        }
    }

    async componentDidUpdate({location: {pathname}}) {
        const prevPath = formatPath(pathname + '');
        if (prevPath !== this.currentPath) {
            await this.fetchData();
        }
    }

    async componentDidMount() {
        await this.fetchData();
    }

    render() {
        const {children, location} = this.props
        return (
            <div>
                <div className="columns">
                    <div className="column-2">
                        <div className="nav section">
                            <Toc location={location} headings={this.state.docHeadings}/>
                        </div>
                    </div>
                    <div className="column-8">
                        <div className="markdown-body section"
                             dangerouslySetInnerHTML={{__html: this.state.docContent}}/>
                    </div>
                </div>
            </div>
        );
    }
}

function formatPath(pathname: string): string {
    const {index, path} = config.it;

    if (pathname === "/") pathname += index;

    return path + pathname + ".md";
}
