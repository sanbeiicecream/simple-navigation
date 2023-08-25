
class Label {
  static parentNode = undefined;
  static className = [];
  static width = 0;
  static height = 0;
  static restPositionFlag = false;
  static startEvent = null
  content = { text: '', url: '', icon: '' };
  element = undefined;
  name = '';

  constructor(params) {
    for (let key in params) {
      if (key) {
        this[key] = params[key];
      }
    }
    this.init();
  }

  static animationClassRemoveFlag = false

  static animationend = ev => {
    Label.clearAnimation(ev.target)
    Label.animationClassRemoveFlag = false
  }

  static drop_handler(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = "move";
    if (ev.target.nodeName === 'LI' && (Label.startEvent.target !== ev.target)) {
      const startIndex = $(Label.parentNode).children().index(Label.startEvent.target)
      const moveIndex = $(Label.parentNode).children().index(ev.target)
      if (startIndex > moveIndex) {
        $(ev.target).before(Label.startEvent.target)
      } else {
        $(ev.target).after(Label.startEvent.target)
      }
      Label.clearAnimation(ev.target)
    }
  }

  static dragover_handler(ev) {
    ev.preventDefault();
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = "move";
  }

  static dragleave_handler(ev) {
    ev.preventDefault();
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = "move";
    Label.animationClassRemoveFlag = true
    if (ev.target.nodeName !== 'LI') {
      Label.clearAnimation()
    }
  }


  static clearAnimation = (target) => {
    const node = target ? $(target) : $(Label.parentNode).children()
    node.removeClass(['animate__animated', 'animate__wobble', 'animate__repeat-1'])
  }

  static previewDropNode = null
  static dragenter_handler(ev) {
    ev.preventDefault();
    ev.stopPropagation()
    if (ev.target.nodeName !== 'LI') {
      return
    }
    if (Label.previewDropNode && Label.previewDropNode !== ev.target) {
      Label.clearAnimation()
    }
    Label.previewDropNode = ev.target
    // Set the dropEffect to move
    if (ev.target.nodeName === 'LI' && Label.startEvent.target !== ev.target) {
      $(ev.target).addClass(['animate__animated', 'animate__wobble', 'animate__repeat-1'])
    }
    ev.dataTransfer.dropEffect = "move";
  }

  static dragstart_handler(ev) {
    ev.stopPropagation()
    Label.startEvent = ev
    ev.dataTransfer.effectAllowed = "move"
    // const img = new Image();
    // img.src = 'https://upload.wikimedia.org/wikipedia/zh/d/d0/Dogecoin_Logo.png'
    // ev.dataTransfer.setDragImage(img, 0, 0);
    // const img = new Image();
    // const img = document.createElement("img")
    // img.src = pic
    // ev.dataTransfer.setDragImage(img, 0, 0);
  }

  init = () => {
    const element = document.createElement('li');
    element.draggable = true
    this.element = element;
    element.classList.add(['draggable-element'])
    this.element.textContent = this.name;
    this.element.dataset.id = this.currentIndex;
    document.documentElement.style.setProperty('--labelWidth', Label.width);
    document.documentElement.style.setProperty('--labelHeight', Label.height);
    element.classList.add(`${Label.className}`.replace(',', ' '));
    element.addEventListener("dragstart", Label.dragstart_handler)
    Label.parentNode
      ? $(Label.parentNode).children().last().before(element)
      : document.body.appendChild(element);
    this.element.ondrop = Label.drop_handler
    this.element.ondragover = Label.dragover_handler
    this.element.ondragenter = Label.dragenter_handler
    this.element.ondragleave = Label.dragleave_handler
    // document.querySelector('.label-list').dispatchEvent(
    //   new CustomEvent('load', {
    //     detail: {
    //       data: this,
    //     },
    //     bubbles: true,
    //     cancelable: false,
    //   })
    // );
  };
}

const labels = [];
const create = (params) => {
  labels.push(new Label({ ...params }));
  return labels[labels.length - 1];
};

const init = (params) => {
  for (let key in params) {
    if (key) {
      Label[key] = params[key];
    }
  }
  params.parentNode.ondrop = Label.drop_handler
  params.parentNode.ondragover = Label.dragover_handler
  params.parentNode.ondragenter = Label.dragenter_handler
  params.parentNode.onanimationend = Label.animationend
};

export default { create, init };
