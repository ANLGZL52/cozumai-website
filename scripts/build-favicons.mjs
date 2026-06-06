import { readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const svg = readFileSync(new URL("../favicon.svg", import.meta.url));

function renderPng(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "#0B1020",
  });
  return resvg.render().asPng();
}

const png48 = renderPng(48);
const png192 = renderPng(192);

writeFileSync(new URL("../favicon-48.png", import.meta.url), png48);
writeFileSync(new URL("../favicon-192.png", import.meta.url), png192);
writeFileSync(new URL("../apple-touch-icon.png", import.meta.url), renderPng(180));

const ico = await pngToIco([png48]);
writeFileSync(new URL("../favicon.ico", import.meta.url), ico);

console.log("favicon.ico, favicon-48.png, favicon-192.png, apple-touch-icon.png");
