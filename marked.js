// /*eslint-env browser*/

// // 모듈
// const path = require("path");
const fs = require("fs")

// // contents 디렉토리 경로
// const directoryPath = path.join(__dirname, "post");
// console.log(directoryPath);
// // 디렉토리에 있는 파일 읽기
// const contentFiles = fs.readdirSync(directoryPath);
// // console.log(contentFiles);

// const hljs = require("highlight.js");

const md = require("markdown-it")({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});


const body = fs.readFileSync(`./README.md`, "utf8");
const convertedBody = md.render(body);

// console.debug(convertedBody);
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

global.document = new JSDOM(html).window.document;

document.getElementById('content').innerHTML = "convertedBody";

console.debug(document);