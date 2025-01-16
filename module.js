export default function makeCarousel(
  itemList,
  visibleCount = 1,
  slideCount = 1,
  captionPos = 'center middle',
) {
  const iconNext = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path color="white" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
`;
  const iconPrev = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path color="white" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
`;

  const itemWidth = Math.trunc(700 / visibleCount);

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
  transform: translateX(0px)
  `;

  // itemList가 있는 경우 새로 아이템을 만들어서 추가
  if (itemList) {
    itemList.forEach((item) => {
      addImageItem(itemContainer, item);
    });
  } else {
    // 없을 경우 기존과 동일하게 동작
    addImageItem(itemContainer, "./images/05.jpg");
    addImageItem(itemContainer, "./images/01.jpg");
    addImageItem(itemContainer, "./images/02.jpg");
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
    for (let i = 0; i < slideCount; ++i) {
      if (next) {
        const idx = i % itemContainer.children.length;
        itemContainer.appendChild(itemContainer.children[idx].cloneNode(true));
      } else {
        const idx = itemContainer.children.length - i - 1;
        itemContainer.prepend(itemContainer.children[idx].cloneNode(true));
      }
    }
    next ||
      (itemContainer.style.transform = `translateX(${
        -itemWidth * slideCount
      }px)`);

    setTimeout(() => {
      handleTransitionEnd(next);
    }, 0);
  }

  function handleTransitionEnd(next) {
    itemContainer.style.transitionDuration = "0.5s";
    itemContainer.style.transform = `translateX(${
      next ? -itemWidth * slideCount : 0
    }px)`;

    itemContainer.ontransitionend = () => {
      for (let i = 0; i < slideCount; ++i) {
        next
          ? itemContainer.firstChild.remove()
          : itemContainer.lastChild.remove();
      }

      itemContainer.style.removeProperty("transition-duration");
      itemContainer.style.transform = `translateX(0px)`;
    };
  }

  function addImageItem(parent, src, captionText = "Caption text") {
    const container = createElement({
      tagName: "div",
      parent,
    });
    container.style.cssText = `
    width: ${itemWidth}px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #0001;
    position: relative;
    `;

    const image = createElement({
      tagName: "img",
      parent: container,
      properties: { src },
    });

    if (visibleCount > 1 || slideCount > 1) {
      image.style.cssText = `
    height: 100%;
    `;
    }

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

    if (captionPos.includes('left')) {
      caption.style.left = '10%';
    } else if (captionPos.includes('right')) {
      caption.style.right = '10%';
    }

    if (captionPos.includes('top')) {
      caption.style.top = '20%';
    } else if (captionPos.includes('bottom')) {
      caption.style.bottom = '20%';
    }

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
