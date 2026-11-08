import fs from "node:fs";
import { createRequire } from "node:module";
const sharp = createRequire(import.meta.url)("sharp");

// Text-free product metaphors, not screenshots. The central composition is crop-safe.
const defs = `<defs>
  <radialGradient id="back"><stop stop-color="#fffdf8"/><stop offset="1" stop-color="#eee8dd"/></radialGradient>
  <linearGradient id="ivory" x2=".8" y2="1"><stop stop-color="#fffdf8"/><stop offset=".55" stop-color="#f1ebdf"/><stop offset="1" stop-color="#d8cfc0"/></linearGradient>
  <linearGradient id="paper" x2="0" y2="1"><stop stop-color="#fffefa"/><stop offset="1" stop-color="#ece4d6"/></linearGradient>
  <linearGradient id="side" x2="1" y2="1"><stop stop-color="#d4c7b5"/><stop offset="1" stop-color="#b7a88f"/></linearGradient>
  <linearGradient id="dark" x2=".9" y2="1"><stop stop-color="#56534e"/><stop offset=".5" stop-color="#33332f"/><stop offset="1" stop-color="#202220"/></linearGradient>
  <linearGradient id="gold" x2=".8" y2="1"><stop stop-color="#f2dca8"/><stop offset=".28" stop-color="#dfbd73"/><stop offset=".7" stop-color="#b78b3e"/><stop offset="1" stop-color="#e6c983"/></linearGradient>
  <linearGradient id="glass" x2="1" y2="1"><stop stop-color="#b5c3bb"/><stop offset="1" stop-color="#45584e"/></linearGradient>
  <linearGradient id="green" x2="1" y2="1"><stop stop-color="#849782"/><stop offset="1" stop-color="#4c6455"/></linearGradient>
  <filter id="shadow" x="-50%" y="-50%" width="220%" height="220%"><feDropShadow dx="0" dy="20" stdDeviation="22" flood-color="#534533" flood-opacity=".14"/></filter>
  <filter id="soft"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".035"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter>
  <radialGradient id="orb" cx=".32" cy=".25"><stop stop-color="#fff2cd"/><stop offset=".38" stop-color="#e2bf79"/><stop offset="1" stop-color="#9b743b"/></radialGradient>
</defs>`;
const path = (d, fill, extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;
const rect = (x,y,w,h,fill,r=0,extra="") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const ellipse = (x,y,rx,ry,fill,extra="") => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
const circle = (x,y,r,fill,extra="") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const line = (x1,y1,x2,y2,color,width=3) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" fill="none"/>`;
const check = (x,y,color,scale=1) => `<path d="M${x} ${y}l${12*scale} ${12*scale}l${26*scale} ${-29*scale}" fill="none" stroke="${color}" stroke-width="${5*scale}" stroke-linecap="round" stroke-linejoin="round"/>`;
const ground = ellipse(620,790,280,30,"#79684e",'opacity=".13" filter="url(#soft)"');
const coin = (x,y,r=46) => `<g filter="url(#shadow)">${ellipse(x,y+12,r,r*.34,"#ac813c")}${rect(x-r,y,r*2,12,"#ac813c")}${ellipse(x,y,r,r*.34,"url(#gold)")}${ellipse(x,y-1,r-7,r*.24,"none",'stroke="#fae5b5" stroke-width="2" opacity=".75"')}</g>`;

const serahin = ground + `<g filter="url(#shadow)">
  ${path("M355 446L570 342L795 448L580 558Z","url(#ivory)")}
  ${path("M355 446L580 558V784L355 670Z","url(#side)")}
  ${path("M580 558L795 448V674L580 784Z","url(#ivory)")}
  ${path("M458 397L682 504L719 486L494 379Z","url(#gold)")}
  ${path("M682 504L719 486V711L682 731Z","#c09b5b")}
  ${path("M355 446L580 558L795 448","none",'stroke="#fffdf6" stroke-width="2"')}
  ${path("M385 550L500 608V672L385 614Z","#f9f3e7")}
  ${line(402,580,475,616,"#aaa38f",4)}${line(402,593,451,618,"#c4baa7",3)}
</g><g transform="translate(660 268) rotate(12)" filter="url(#shadow)">
  ${rect(0,0,180,240,"url(#paper)",14)}${rect(25,32,56,56,"#e2e7dc",14)}
  ${check(39,59,"#5b7560",.75)}${line(26,124,150,124,"#c6bdac",6)}${line(26,147,124,147,"#ddd4c5",6)}${line(26,170,139,170,"#ddd4c5",6)}
  ${circle(139,210,10,"url(#gold)")}
</g>${coin(388,739,35)}`;

const manifly = ground + `<g transform="translate(345 408) rotate(-8 250 170)" filter="url(#shadow)">
  ${rect(8,-10,480,300,"#242723",40)}${rect(0,0,480,300,"url(#dark)",40)}
  ${rect(18,18,443,262,"none",29,'stroke="#7b796e" stroke-width="1.5" stroke-dasharray="3 6"')}
  ${path("M290 99H487Q511 99 511 122V184Q511 207 487 207H290Q263 207 263 177V128Q263 99 290 99Z","url(#dark)",'stroke="#747164" stroke-width="1"')}
  ${circle(456,153,15,"url(#gold)")}
</g><g transform="translate(427 257) rotate(-13 80 140)" filter="url(#shadow)">
  ${path("M0 0H191V259L175 250L160 259L144 250L128 259L112 250L96 259L80 250L64 259L48 250L32 259L16 250L0 259Z","url(#paper)")}
  ${circle(95,54,21,"#e4d8c0")}${line(35,105,156,105,"#bdb4a3",5)}${line(35,130,130,130,"#d3c9b6",5)}${line(35,155,150,155,"#d3c9b6",5)}${line(35,195,156,195,"#a8997d",7)}
</g>${coin(793,716,65)}${coin(793,692,65)}${coin(793,668,65)}${coin(692,787,48)}`;

let tuju = ground;
for (const [x,y,i] of [[346,691,0],[415,625,1],[484,559,2],[553,493,3],[622,427,4]]) {
  tuju += `<g filter="url(#shadow)">${path(`M${x} ${y}l145 -74l150 74l-145 74Z`,"url(#paper)")}${path(`M${x} ${y}l150 74v73l-150 -74Z`,"url(#side)")}${path(`M${x+150} ${y+74}l145 -74v73l-145 74Z`,i===4?"url(#gold)":"url(#ivory)")}${line(x+5,y,x+150,y+73,"#fffdf7",2)}</g>`;
}
tuju += `<path d="M375 640Q350 526 425 454T602 338Q664 298 724 306" stroke="#b99551" stroke-width="3" stroke-dasharray="3 13" stroke-linecap="round" fill="none"/>${circle(770,295,63,"url(#orb)",'filter="url(#shadow)"')}`;

const insuralab = ground + `<g transform="translate(326 326) rotate(-8 260 220)" filter="url(#shadow)">
  ${path("M0 244Q125 211 266 267Q389 215 515 244V443Q389 413 266 463Q128 411 0 443Z","#c7bba6")}
  ${path("M0 230Q125 196 266 252Q389 200 515 230V425Q389 395 266 446Q128 394 0 425Z","url(#paper)")}
  ${path("M266 252V446","none",'stroke="#c5b79e" stroke-width="3"')}
  ${line(37,285,207,305,"#d2c5b0",5)}${line(37,309,207,329,"#d2c5b0",5)}${line(37,333,177,350,"#d2c5b0",5)}
  ${line(314,305,477,285,"#d2c5b0",5)}${line(314,329,477,309,"#d2c5b0",5)}${line(314,353,450,337,"#d2c5b0",5)}
</g><g filter="url(#shadow)">
  ${path("M630 239L776 293V437Q776 542 630 603Q484 542 484 437V293Z","#b49964")}
  ${path("M615 225L761 279V423Q761 528 615 589Q469 528 469 423V279Z","url(#gold)")}
  ${path("M615 250L739 295V421Q739 509 615 563Q491 509 491 421V295Z","url(#ivory)")}
  ${circle(615,387,62,"#e5dece")}${check(580,387,"#8d794f",1.65)}
</g>`;

const rentaja = ground + `<g filter="url(#shadow)">
  ${path("M331 547Q333 514 369 503L437 470L498 361Q518 332 555 332H697Q737 332 765 368L826 463Q864 481 870 519V641Q870 680 829 682H374Q331 682 331 643Z","url(#ivory)")}
  ${path("M457 465L514 370H678L729 465Z","url(#glass)")}
  ${path("M544 370V465M689 370L740 465","none",'stroke="#e3dccd" stroke-width="9"')}
  ${path("M331 547L479 576H870V641Q870 680 829 682H374Q331 682 331 643Z","url(#side)")}
  ${path("M479 576L467 473L731 465L826 463Q864 481 870 519V641H479Z","url(#ivory)")}
  ${circle(420,655,58,"url(#dark)")}${circle(420,655,27,"#c2bba9")}${circle(420,655,12,"#7b7c71")}
  ${circle(785,655,58,"url(#dark)")}${circle(785,655,27,"#c2bba9")}${circle(785,655,12,"#7b7c71")}
  ${rect(529,535,268,13,"#b7aa91",6)}${rect(805,507,41,33,"#e6c57e",9)}${rect(349,541,30,32,"#f3e3bd",8)}
  ${line(497,476,497,614,"#d2c6b1",2)}${line(663,481,663,613,"#d2c6b1",2)}${line(674,509,704,509,"#8d8879",5)}
</g><g transform="translate(730 288) rotate(25)" filter="url(#shadow)">
  ${circle(0,0,51,"none",'stroke="url(#gold)" stroke-width="12"')}
  ${rect(-25,40,50,121,"url(#dark)",16)}${rect(-13,78,26,44,"url(#gold)",8)}
</g>`;

const djotos = ground + `<g filter="url(#shadow)">
  ${path("M395 350L708 326L803 379L486 406Z","url(#paper)")}
  ${path("M708 326L803 379V752L708 707Z","url(#side)")}
  ${path("M395 350L708 372V755L395 732Z","url(#ivory)")}
  ${path("M395 437L708 459","none",'stroke="#c9beac" stroke-width="2"')}
  ${circle(660,414,18,"url(#gold)")}${rect(422,384,105,19,"#c5bcaa",4)}
  ${ellipse(555,588,112,119,"url(#side)")}${ellipse(555,586,97,104,"#e9e2d4")}
  ${ellipse(555,586,82,89,"url(#dark)")}${path("M497 609Q532 557 592 597L615 627Q547 677 497 609Z","#8a9890")}
  ${path("M497 557Q522 523 559 523","none",'stroke="#c4d0c7" stroke-width="5" stroke-linecap="round" opacity=".4"')}
</g><g transform="translate(429 265) rotate(4)" filter="url(#shadow)">
  ${rect(0,39,275,61,"#c5b594",18)}${rect(0,29,275,59,"#e4d7bd",18)}${rect(9,27,257,7,"#f4e9d3",3)}
  ${rect(13,-13,255,60,"#748373",18)}${rect(13,-24,255,59,"#9da995",18)}${rect(23,-24,235,7,"#c2cbb7",3)}
  ${line(248,3,248,25,"#6c7c69",2)}${line(255,56,255,78,"#baab8d",2)}
</g>`;

const pranaja = ground + `<g filter="url(#shadow)">
  ${path("M305 682L624 530L916 676L600 840Z","#d8cdb9")}
  ${path("M305 682L600 831L916 676V695L600 859L305 704Z","#b7aa92")}
  ${path("M411 509L605 415L811 517L616 615Z","url(#paper)")}
  ${path("M411 509L616 615V765L411 659Z","url(#side)")}
  ${path("M616 615L811 517V666L616 765Z","url(#ivory)")}
  ${path("M446 546L565 608V713L446 652Z","url(#glass)")}
  ${path("M646 628L777 562V656L646 723Z","url(#glass)")}
  ${line(499,577,499,679,"#c7c0ae",4)}${line(710,599,710,688,"#c7c0ae",4)}
  ${path("M443 340L642 244L839 342L641 442Z","url(#paper)")}
  ${path("M443 340L641 442V566L443 465Z","url(#ivory)")}
  ${path("M641 442L839 342V466L641 566Z","url(#side)")}
  ${path("M479 380L605 445V518L479 453Z","url(#glass)")}
  ${path("M676 456L804 392V461L676 525Z","#5e6a5e")}
  ${path("M421 329L642 220L861 330L640 441Z","url(#paper)")}
  ${path("M421 329L640 441L861 330V347L640 457L421 347Z","#d4c9b6")}
  ${line(521,403,521,475,"#d1c9b7",4)}${line(755,416,755,484,"#aaa28e",4)}
  ${path("M357 690L396 672L467 706L427 725Z","#b9b396")}
  ${path("M357 690L427 725V753L357 719Z","#b5a78c")}
  ${path("M427 725L467 706V734L427 753Z","#d3c4a9")}
  ${ellipse(414,678,46,23,"url(#green)")}${ellipse(405,657,31,25,"url(#green)")}
</g>`;

for (const [slug, art] of Object.entries({ serahin, manifly, tuju, insuralab, rentaja, "djotos-laundry": djotos, "pranaja-ashari": pranaja })) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1000" viewBox="0 0 1200 1000">${defs}${rect(0,0,1200,1000,"url(#back)")}<g filter="url(#grain)">${art}</g></svg>`;
  fs.writeFileSync(`public/products/${slug}/editorial-v2.svg`, svg);
  await sharp(Buffer.from(svg)).webp({ quality: 92 }).toFile(`public/products/${slug}/editorial-v2.webp`);
}
console.log("Exported seven text-free editorial covers.");
