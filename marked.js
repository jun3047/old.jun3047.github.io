const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "post");

const contentFiles = fs.readdirSync(directoryPath);

const hljs = require("highlight.js");

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



contentFiles.map(file => {
    const body = fs.readFileSync(`./post/${file}`, "utf8");
    const convertedBody = md.render(body); // 이 부분을 추가해주세요!
    console.log(convertedBody);  
});
  

// list_format.html파일 읽기
const listHtmlFormat = fs.readFileSync("./templates/list_format.html", "utf8");

// index.html파일 생성 / 파일 목록 렌더
const listContent = ejs.render(listHtmlFormat, {
  lists: deployFiles
});
const listHtml = ejs.render(layoutHtmlFormat, {
  content: listContent
});

fs.writeFileSync("./index.html", listHtml);