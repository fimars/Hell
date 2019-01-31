"use strict";
exports.__esModule = true;
var matter = require("gray-matter");
var toml = require("toml");
function extractHeaders(content, include, lexer) {
    if (include === void 0) { include = []; }
    var tokens = lexer(content);
    var headerTokens = tokens.filter(function (_a) {
        var type = _a.type;
        return type === "heading";
    });
    var headers = headerTokens.map(function (_a, headerIndex) {
        var depth = _a.depth, text = _a.text;
        return {
            id: text,
            level: depth,
            parent: findHeaderParent(depth, headerIndex, headerTokens),
            text: text
        };
    });
    return headers;
}
exports.extractHeaders = extractHeaders;
function findHeaderParent(depth, idx, headers) {
    for (; idx > 0; idx--) {
        var _a = headers[idx], prevDepth = _a.depth, prevId = _a.id, prevParent = _a.parent;
        if (depth > prevDepth) {
            return prevId;
        }
        if (prevParent && prevDepth === depth) {
            return prevParent;
        }
    }
    return null;
}
function parseFrontmatter(content) {
    return matter(content, {
        engines: {
            toml: toml.parse.bind(toml)
        },
        excerpt: true,
        excerpt_separator: "<!-- more -->"
    });
}
exports.parseFrontmatter = parseFrontmatter;
