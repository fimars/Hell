"use strict";
exports.__esModule = true;
var loader_utils_1 = require("loader-utils");
var util_1 = require("../util");
var resolvePaths_1 = require("../util/resolvePaths");
function MarkdownLoader(source) {
    var markdown = loader_utils_1.getOptions(this).markdown;
    var frontmatter = util_1.parseFrontmatter(source);
    var headers = util_1.extractHeaders(frontmatter.content, [], markdown.lexer);
    var html = markdown(frontmatter.content);
    // TODO: use configurable dir path
    var res = [
        "import * as React from 'react';",
        "import PageLayout from '" + resolvePaths_1.atApp("components/PageLayout") + "';",
        "import Toc from '" + resolvePaths_1.atApp("components/Toc") + "';",
        "const headers = " + JSON.stringify(headers) + ";",
        "const Article = () => <div className='markdown-body section' dangerouslySetInnerHTML={{ __html: `" + html + "` }}></div>;",
        "export default () => (<PageLayout Side={ <Toc headings={headers} /> } Content={ <Article /> } />)"
    ].join("\n");
    return res;
}
exports["default"] = MarkdownLoader;
