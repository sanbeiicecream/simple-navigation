import labelLinkdlist from './doubly-linked-list';

const labelListElement = document.querySelector('.label-list');
let initSetting;
let pointPosition = {};
let offsetPointPosition = {};
let pointLabelNode;
let pointLabelElement;
let pointIndex;
let resetPositionFlag = false;
let placeholderElementVisible = false;
const placeholderElement = document.createElement('div');
placeholderElement.classList.add('label', 'placeholder');
labelListElement.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    if (e.target.classList.contains('label')) {
      document.documentElement.addEventListener('mouseup', mouseup);
      const currentIndex = e.target.dataset.id;
      offsetPointPosition.x = e.offsetX;
      offsetPointPosition.y = e.offsetY;
      pointIndex = currentIndex;
      pointLabelNode = labelLinkdlist.getElementAt(Number(currentIndex));
      pointLabelElement = pointLabelNode.element.element;
      if (!pointLabelNode.element.originPosition) {
        const tem = e.target.getBoundingClientRect();
        const countLine = Math.ceil(
          labelLinkdlist.size() / initSetting.oneRowCount
        );
        // 点击的label所处行，列(0开始)
        const rowIndex = Math.floor(currentIndex / initSetting.oneRowCount);
        const columnIndex = currentIndex % initSetting.oneRowCount;
        for (let i = 0; i < countLine; i++) {
          let baseX = tem.x;
          let baseY = tem.y;
          // 先处理行的高度基准
          if (i < rowIndex) {
            baseY -= parseInt(initSetting.height) + 20;
          } else if (i > rowIndex) {
            baseY += parseInt(initSetting.height) + 20;
          }
          for (let j = 0; j < initSetting.oneRowCount; j++) {
            if (j + i * 5 > labelLinkdlist.size() - 1) {
              break;
            }
            // 再处理行的宽度基准
            let tem = {};
            if (j < columnIndex) {
              tem = {
                x:
                  baseX -
                  (20 + 20 + parseInt(initSetting.width)) * (columnIndex - j),
                y: baseY,
              };
            } else if (j > columnIndex) {
              tem = {
                x:
                  baseX +
                  (20 + 20 + parseInt(initSetting.width)) * (j - columnIndex),
                y: baseY,
              };
            } else {
              tem = {
                x: baseX,
                y: baseY,
              };
            }
            labelLinkdlist.getElementAt(j + i * 5).element.originPosition = tem;
          }
        }
      }
      document.documentElement.addEventListener('mousemove', move);
      pointPosition.x = e.clientX;
      pointPosition.y = e.clientY;
    }
  }
});

labelListElement.addEventListener('load', (e) => {
  labelLinkdlist.push(e.detail.data);
});

labelListElement.addEventListener('init', (e) => {
  initSetting = e.detail.data;
});

labelListElement.addEventListener('transitionend', (e) => {
  if (e.target.dataset.id !== pointLabelElement.dataset.id) {
    e.target.classList.remove('recovery_animation');
    return;
  }
  document.documentElement.removeEventListener('mouseup', mouseup);
  pointLabelElement.classList.remove('position-relative');
  moveEnd();
});

const move = (e) => {
  e.stopPropagation();
  // const moveDistanceX = e.clientX - pointPosition.x;
  // const moveDistanceY = e.clientY - pointPosition.y;
  const moveDistanceX = e.clientX - offsetPointPosition.x;
  const moveDistanceY = e.clientY - offsetPointPosition.y;
  // pointLabelElement.style.transform = `translate(${moveDistanceX}px, ${moveDistanceY}px)`;
  pointLabelElement.style.left = moveDistanceX + 'px';
  pointLabelElement.style.top = moveDistanceY + 'px';
  pointLabelElement.classList.add('position-fixed');
  if (!placeholderElementVisible) {
    moveInit();
  }

  // document.documentElement.appendChild(pointLabelElement);
  // pointLabelElement.style.transform = `translate(${moveDistanceX}px, ${moveDistanceY}px)`;
  const limitFlag =
    Math.abs(e.clientX - pointPosition.x) > 200 ||
    Math.abs(e.clientY - pointPosition.y) > 200;
  if (limitFlag && !resetPositionFlag) {
    resetPosition(pointIndex);
  }
};

moveInit = () => {
  placeholderElementVisible = true;
  $(`div[data-id='${Number(pointIndex) + 1}']`).before(placeholderElement);
};

mouseup = (e) => {
  e.stopPropagation();
  document.documentElement.removeEventListener('mousemove', move);
  if (e.clientX !== pointPosition.x || e.clientY !== pointPosition.y) {
    pointLabelElement.classList.add('recovery_animation');
    pointLabelElement.classList.remove('label_position');
    recoveryCurrentLabel();
    pointLabelElement.style.transform = `translate(${0}px, ${0}px)`;
  }
};

const resetPosition = (start, end) => {
  resetPositionFlag = true;
  let current = pointLabelNode.next;
  while (current) {
    const x = current.element.originPosition.x;
    const y = current.element.originPosition.y;
    const preX = current.prev.element.originPosition.x;
    const preY = current.prev.element.originPosition.y;
    current.element.element.classList.add('recovery_animation');
    current.element.element.style.transform = `translate(${preX - x}px, ${preY - y
      }px)`;
    current = current.next;
  }
  current = pointLabelNode.next;
  let prevOriginPosition = current.prev.element.originPosition;
  while (current) {
    if (!current.next) {
      pointLabelElement.originPosition = {
        ...current.element.originPosition,
      };
    }
    const tem = { ...prevOriginPosition };
    prevOriginPosition = { ...current.element.originPosition };
    current.element.originPosition = { ...tem };
    console.log(current.element.originPosition);
    current = current.next;
  }
  labelLinkdlist.remove(pointLabelNode.element);
};

const recoveryCurrentLabel = () => {
  console.log(labelLinkdlist.toArray());
  labelLinkdlist.push(pointLabelNode.element);
  console.log(labelLinkdlist.toArray());
  while (labelListElement.firstChild) {
    labelListElement.firstChild.remove();
  }
  let current = labelLinkdlist.head;
  while (current) {
    current.element.element.style.transform = '';
    labelListElement.appendChild(current.element.element);
    current = current.next;
  }
};

const moveEnd = () => {
  pointPosition = {};
  pointLabelNode = undefined;
  pointLabelElement = undefined;
  pointIndex = undefined;
  resetPositionFlag = false;
};
