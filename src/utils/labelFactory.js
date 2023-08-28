import utils from "./utils"
class LabelContainer {
  static container = undefined
  static startDragEvent = null
  static listCount = 0
  static previewDropNode = null
  static editStatus = false
  static labelList = new Proxy([], {
    deleteProperty(obj, prop) {
      if (Object.keys(obj).length === 1) {
        LabelContainer.setEditAnimation(false)
      }
      const res = obj.splice(prop, 1)
      utils.resetData(obj.map?.(item => item?.data))
      return res
    },
  })

  static setEditAnimation = status => {
    if (status) {
      $(LabelContainer.container).children().filter('li').children().filter('div').css('visibility', 'visible')
      $(LabelContainer.container).children().filter('div').css('visibility', 'hidden')
      $(LabelContainer.container).find('li').addClass(['animate__animated', 'animate__pulse'])
      LabelContainer.editStatus = true
    } else {
      $(LabelContainer.container).children().filter('li').children().filter('div').css('visibility', 'hidden')
      $(LabelContainer.container).children().filter('div').css('visibility', 'visible')
      $(LabelContainer.container).find('li').removeClass(['animate__animated', 'animate__pulse'])
      LabelContainer.editStatus = false
    }
  }


  static clearAnimation = (target) => {
    const node = target ? $(target) : $(LabelContainer.container).children()
    node.removeClass(['animate__animated', 'animate__wobble', 'animate__repeat-1'])
  }

  static getCurrentLabelIndex = id => {
    return LabelContainer.labelList.findIndex(item => item.data.id === id + '')
  }

  // 事件委托
  static mouseUp = ev => {
    if (ev.target.nodeName !== 'LI' && !ev.target.className.includes('icon') && ev.target.nodeName !== 'SPAN') {
      return
    }
    const id = $(ev.target).data('id') ?? $(ev.target).parent().data('id')
    const currentLabel = LabelContainer.labelList[LabelContainer.getCurrentLabelIndex(id)]
    if (!currentLabel) return
    if (ev.button === 0) {
      if (LabelContainer.editStatus) {
        if (ev.target.className === 'edit-icon') {
          document.dispatchEvent(new CustomEvent('globalEvent', {
            detail: { 'showWindow': true, instance: currentLabel }
          }));
        } else if (ev.target.className === 'delete-icon') {
          LabelContainer.labelList.splice(LabelContainer.getCurrentLabelIndex(id), 1)
          $(ev.target).parent().remove()
        }
      } else {
        window.location.href = currentLabel.data.url
      }
    } else if (ev.button === 2) {
      if (LabelContainer.editStatus) {
        LabelContainer.setEditAnimation(false)
        document.dispatchEvent(new CustomEvent('globalEvent', {
          detail: { 'showWindow': false }
        }));
      } else {
        LabelContainer.setEditAnimation(true)
      }
    }
    ev.target.draggable = false
  }

  // 事件委托
  static mouseDown = ev => {
    ev.stopPropagation()
    if (LabelContainer.editStatus || !['LI', 'SPAN'].includes(ev.target.nodeName) || ev.button !== 0) {
      return
    }
    if (ev.target.nodeName === 'SPAN') {
      ev.target.parentNode.draggable = true
    } else {
      ev.target.draggable = true
    }
  }

  // -----拖拽相关操作---------

  // 释放操作
  static drop_handler(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = "move";
    const originElement = Label.startDragEvent.target
    const targetElement = ev.target.nodeName === 'SPAN' ? ev.target.parentElement : ev.target
    if (['LI', 'SPAN'].includes(ev.target.nodeName) && (originElement !== ev.target)) {
      const placeholder = $('<div></div>').hide();
      $(originElement).before(placeholder)
      $(targetElement).before(originElement)
      $(placeholder).replaceWith(targetElement)
      const startId = $(originElement).data('id')
      const moveId = $(targetElement).data('id')
      Label.clearAnimation(targetElement);
      [LabelContainer.labelList[startId], LabelContainer.labelList[moveId]] = [LabelContainer.labelList[moveId], LabelContainer.labelList[startId]]
      utils.resetData(LabelContainer.labelList.map?.(item => item?.data))
    }
    originElement.draggable = false
  }

  static dragover_handler(ev) {
    ev.preventDefault();
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = "move";
  }

  static dragleave_handler(ev) {
    ev.preventDefault();
    ev.stopPropagation()
    if (ev.target.nodeName === 'SPAN') {
      return
    }
    ev.dataTransfer.dropEffect = "move";
    if (ev.target.nodeName !== 'LI') {
      Label.clearAnimation()
    }
  }

  static dragenter_handler(ev) {
    ev.preventDefault();
    ev.stopPropagation()
    if (ev.target.nodeName !== 'LI' || ev.target.nodeName === 'SPAN') {
      return
    }
    console.log(ev.target.nodeName)
    if (Label.previewDropNode && Label.previewDropNode !== ev.target) {
      Label.clearAnimation()
    }
    Label.previewDropNode = ev.target
    // Set the dropEffect to move
    if (ev.target.nodeName === 'LI' && Label.startDragEvent.target !== ev.target) {
      $(ev.target).addClass(['animate__animated', 'animate__wobble', 'animate__repeat-1'])
    }
    ev.dataTransfer.dropEffect = "move";
  }

  static dragstart_handler(ev) {
    ev.stopPropagation()
    Label.startDragEvent = ev
    ev.dataTransfer.effectAllowed = "move"
  }
  // -----end-------
}


class Label extends LabelContainer {
  static className = [];
  static width = 0;
  static height = 0;
  data = { name: '', url: '', icon: '', id: '', delete: 0 };
  element = undefined;

  constructor(params) {
    super(params)
    for (let key in params) {
      if (key) {
        this[key] = params[key];
      }
    }
    this.element = document.createElement('li');
    this.init();
  }

  init() {
    this.element.draggable = false
    this.element.classList.add(['draggable-element'])
    if (this.data.icon) {
      $(this.element).append(`<span>${this.data.name}</span>`);
    } else {
      $(this.element).append(`<span>${this.data.name}</span>`);
    }
    $(this.element).append('<div class="edit-icon" style="visibility: hidden;"></div>');
    $(this.element).append('<div class="delete-icon" style="visibility: hidden;"></div>');
    this.element.dataset.id = this.data.id;
    document.documentElement.style.setProperty('--labelWidth', Label.width);
    document.documentElement.style.setProperty('--labelHeight', Label.height);
    this.element.classList.add(`${Label.className}`.replace(',', ' '));
    this.element.addEventListener("dragstart", Label.dragstart_handler)
    LabelContainer.container
      ? $(LabelContainer.container).children().last().before(this.element)
      : document.body.appendChild(this.element);
    this.element.ondrop = Label.drop_handler
    this.element.ondragover = Label.dragover_handler
    this.element.ondragenter = Label.dragenter_handler
    this.element.ondragleave = Label.dragleave_handler
    LabelContainer.labelList.push(this)
  }


  update(value) {
    if (value.icon) {
      console.log('icon')
    } else {
      $(this.element).children().filter('span').text(value.name)
      this.data = value
    }
  }
}

const create = (params) => {
  new Label({ ...params })
};

const init = (params) => {
  for (let key in params) {
    if (key === 'container') {
      LabelContainer.container = params[key]
      continue
    }
    if (key) {
      Label[key] = params[key];
    }
  }
  params.container.ondrop = Label.drop_handler
  params.container.ondragover = Label.dragover_handler
  params.container.ondragenter = Label.dragenter_handler
  params.container.onmouseup = LabelContainer.mouseUp
  params.container.onmousedown = LabelContainer.mouseDown
  params.container.oncontextmenu = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
  }
};

export default { create, init, Label };
