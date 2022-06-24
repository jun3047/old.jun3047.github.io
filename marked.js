import { marked } from "marked";

const body = `
# h1 header
Loren ipsum **test** area
[link](https://blog.itcode.dev)
![image](https://blog.itcode.dev/img/)
<span class="red">native html tag</span>
`;

const result = marked(body);

console.log(result.toString());