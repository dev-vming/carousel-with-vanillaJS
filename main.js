import makeCarousel,{createElement} from "./module.js";

const app = createElement({
  tagName: "div",
  parent: document.body,
});

app.style.cssText = `
width: 700px;
height: 250px;
margin : auto;
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

// 여러 장이 보이는 캐러셀 동작
app.appendChild(createElement({
  tagName: "h2",
  properties: {innerText : "여러 장이 한 번에 보이는 캐러셀"} 
}))

app.appendChild(makeCarousel([
  './images/01.jpg',
  './images/02.jpg',
  './images/03.jpg',
  './images/04.jpg',
  './images/05.jpg',
],3))

// 여러 장이 보이고, 한 번에 이동할 이미지 수가 정해진 캐러셀 동작
app.appendChild(createElement({
  tagName: "h2",
  properties: {innerText : "여러 장이 한 번에 보이고, 이동 수가 정해진 캐러셀"} 
}))

app.appendChild(makeCarousel([
  './images/08.jpg',
  './images/09.jpg',
  './images/10.jpg',
  './images/11.jpg',
  './images/12.jpg',
  './images/13.jpg',
  './images/14.jpg',
  './images/15.jpg',
],4,2))
