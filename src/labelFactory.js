class Label {
  width = 0;
  height = 0;
  position = { x: 0, y: 0 };
  content = { text: '', url: '', icon: '' };
  parentNode = undefined;
  node = undefined;
  className = [];
  pointPosition = {};
  name = '';
  current;
  mousedown = (e) => {
    document.documentElement.addEventListener('mouseup', this.mouseup);
    e.stopPropagation();
    if (e.button === 0) {
      this.pointPosition.x = e.clientX;
      this.pointPosition.y = e.clientY;
      document.documentElement.addEventListener('mousemove', this.mousemove);
    } else {
      this.mouseup();
    }
  };
  mousemove = (e) => {
    e.stopPropagation();
    console.log('move.........');
    this.node.style.transform = `translate(${
      e.clientX - this.pointPosition.x
    }px, ${e.clientY - this.pointPosition.y}px)`;
  };

  mouseup = (e) => {
    console.log(this.name);
    e.stopPropagation();
    document.documentElement.removeEventListener('mousemove', this.mousemove);
    if (
      e.clientX !== this.pointPosition.x ||
      e.clientY !== this.pointPosition.y
    ) {
      this.node.classList.add('recovery_animation');
      this.node.style.transform = `translate(0px, 0px)`;
    }
  };

  constructor(params) {
    for (let key in params) {
      if (key) {
        this[key] = params[key];
      }
    }
    this.init();
  }

  init = () => {
    const node = document.createElement('div');
    this.node = node;
    node.addEventListener('mousedown', this.mousedown);
    node.addEventListener('transitionend', () => {
      this.node.classList.remove('recovery_animation');
      document.documentElement.removeEventListener('mouseup', this.mouseup);
    });
    node.style.height = this.height;
    node.style.width = this.width;
    node.classList.add(`${this.className}`.replace(',', ' '));
    this.parentNode
      ? this.parentNode.appendChild(node)
      : document.body.appendChild(node);
  };
}

export default (params) => {
  return new Label(params);
};
