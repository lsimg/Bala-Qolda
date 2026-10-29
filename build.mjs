import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const files = ["index.html", "styles.css", "i18n.js", "script.js"];
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const file of files) {
  await cp(file, `dist/${file}`, { recursive: true });
}
await mkdir("dist/assets/images", { recursive: true });
await cp("assets/images/animal-helpers.png", "dist/assets/images/animal-helpers.png");
await mkdir("dist/server", { recursive: true });
await cp("server/ai", "dist/server/ai", { recursive: true });

const deployFiles = [
  ["/index.html", "index.html", "text/html; charset=utf-8"],
  ["/styles.css", "styles.css", "text/css; charset=utf-8"],
  ["/i18n.js", "i18n.js", "text/javascript; charset=utf-8"],
  ["/script.js", "script.js", "text/javascript; charset=utf-8"],
  ["/assets/images/animal-helpers.png", "assets/images/animal-helpers.png", "image/png"]
];
const embedded = {};
for (const [route, path, type] of deployFiles) {
  embedded[route] = { type, body: (await readFile(path)).toString("base64") };
}
const worker = `import { handleApi } from "./ai/ai-runtime.js";
const files=${JSON.stringify(embedded)};
function decode(value){const raw=atob(value);const bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);return bytes}
export default{async fetch(request,env){const apiResponse=await handleApi(request,env);if(apiResponse)return apiResponse;const url=new URL(request.url);let path=url.pathname;if(path==="/")path="/index.html";if(!files[path]&&!path.includes("."))path="/index.html";const file=files[path];if(!file)return new Response("Not found",{status:404});const headers={"content-type":file.type,"x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin","permissions-policy":"camera=(), microphone=(), geolocation=()"};if(path!=="/index.html")headers["cache-control"]="public, max-age=604800";return new Response(decode(file.body),{status:200,headers})}};`;
await writeFile("dist/server/index.js", worker);
console.log("Static BalaQoldau build and Sites worker are ready in dist/");
