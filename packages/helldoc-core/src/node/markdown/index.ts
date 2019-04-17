import prism = require("prismjs");
import marked = require("marked");

const loadLanguages = require("prismjs/components/index");

export default function md() {
  marked.setOptions({
    highlight: function(code, lang) {
      if (!lang) return code;
      try {
        loadLanguages([lang]);
      } catch (err) {
        console.log(lang, err);
      }
      return prism.highlight(code, prism.languages[lang], lang);
    }
  });
  return marked;
}
