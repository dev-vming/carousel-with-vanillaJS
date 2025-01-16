import makeCarousel,{createElement} from "./module.js";

const app = createElement({
  tagName: "div",
  parent: document.body,
});

app.style.cssText = `
width: 700px;
height: 250px;
// background-color: rgb(100, 100, 100);
`;

// 기본 캐러셀 동작
app.appendChild(createElement({
  tagName: "h2",
  properties: {innerText : "기본 캐러셀"} 
}))

app.appendChild(makeCarousel());

// itemList가 있는 캐러셀 동작
app.appendChild(createElement({
  tagName: "h2",
  properties: {innerText : "itemList가 있는 캐러셀"} 
}))

app.appendChild(makeCarousel([
  './images/08.jpg',
  './images/09.jpg',
  './images/11.jpg',
  './images/12.jpg',
  './images/13.jpg',
]))