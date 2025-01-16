export default function makeCarousel(itemList) {
  const iconNext = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path color="white" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
`;
  const iconPrev = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path color="white" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
`;
  const wrapper = createElement({
    tagName: "div",
  });

  wrapper.style.cssText = `
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  `;

  addBtn();

  const itemContainer = createElement({
    tagName: "div",
    parent: wrapper,
  });

  itemContainer.style.cssText = `
  display: flex;
  transform: translateX(-700px)
  `;

  // itemList가 있는 경우 새로 아이템을 만들어서 추가
  if (itemList) {
    itemList.forEach((item) => {
      addImageItem(itemContainer, item);
    });
  } else {
    // 없을 경우 기존과 동일하게 동작
    addImageItem(itemContainer, "./images/01.jpg");
    addImageItem(itemContainer, "./images/02.jpg");
    addImageItem(itemContainer, "./images/03.jpg");
    addImageItem(itemContainer, "./images/04.jpg");
  }

  function addBtn() {
    const [prevBtn, nextBtn] = createElement({
      tagName: "button",
      parent: wrapper,
      count: 2,
    });

    prevBtn.style.cssText = `
    position: absolute;
    z-index: 1;
    border: 0;
    top: 0;
    width: 50px;
    height: 100%;
    background-color: transparent;
    background: linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0) 100%);
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.7));
    `;

    nextBtn.style.cssText = prevBtn.style.cssText;
    nextBtn.style.background =
      "linear-gradient(270deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0) 100%)";
    prevBtn.style.left = "0px";
    nextBtn.style.right = "0px";

    prevBtn.innerHTML = iconPrev;
    nextBtn.innerHTML = iconNext;

    nextBtn.onclick = () => {
      handleSlide();
    };

    prevBtn.onclick = () => {
      handleSlide(false);
    };
  }

  function handleSlide(next = true) {
    itemContainer.style.transitionDuration = "0.5s";
    itemContainer.style.transform = `translateX(${next ? -1400 : 0}px)`;

    itemContainer.ontransitionend = () => {
      itemContainer.style.removeProperty("transition-duration");
      itemContainer.style.transform = "translateX(-700px)";

      next
        ? itemContainer.appendChild(itemContainer.firstChild)
        : itemContainer.prepend(itemContainer.lastChild);
    };
  }

  function addImageItem(parent, src, captionText = "Caption text") {
    const container = createElement({
      tagName: "div",
      parent,
    });
    container.style.cssText = `
    width: 700px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #000;
    position: relative;
    `;

    const image = createElement({
      tagName: "img",
      parent: container,
      properties: { src },
    });

    const caption = createElement({
      tagName: "span",
      properties: { innerText: captionText },
      parent: container,
    });

    caption.style.cssText = `
    color: white;
    font-weight: bold;
    position: absolute;
    filter: drop-shadow(3px 3px 3px rgb(0 0 0 / 0.5));
    `;

    return container;
  }

  return wrapper;
}

export function createElement({
  tagName,
  properties,
  parent,
  children,
  count = 1,
}) {
  const create = () => {
    const element = document.createElement(tagName);
    Object.assign(element, properties);
    parent?.appendChild(element);
    children?.map((child) => {
      child.parent = element;
      createElement(child);
    });
    return element;
  };

  if (count > 1) {
    const results = [];
    for (let i = 0; i < count; ++i) {
      results.push(create());
    }
    return results;
  } else {
    return create();
  }
}
