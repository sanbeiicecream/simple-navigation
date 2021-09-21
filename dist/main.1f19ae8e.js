// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFormat = addFormat;
exports.addSiteFormat = addSiteFormat;
exports.addSiteAnimation = addSiteAnimation;
exports.editSite = editSite;
exports.changeSite = changeSite;
exports.addLocalStorage = addLocalStorage;
exports.getSiteIndexByName = getSiteIndexByName;
exports.editLocalStorage = editLocalStorage;
exports.removeLocalStorage = removeLocalStorage;
exports.getValueAndNameById = getValueAndNameById;
exports.createId = createId;

function addFormat() {
  $('.add').css('visibility', 'visible');
  $('.add').attr('style', 'opacity: .3;');
}

function addSiteFormat() {
  setTimeout(function () {
    $('.url').val('');
    $('.name').val('');
  }, 150);
  $('.add').removeClass('add-window-animation-display');
  $('#add-window').addClass('add-window-animation-hidden');
}

function addSiteAnimation() {
  $('#add-window').css('visibility', 'visible');
  $('#add-window').removeClass();
  $('#add-window').removeClass('add-window-animation-hidden');
  $('#add-window').addClass('add-window-animation-display'); // TODO 添加蒙版效果
}

function createId() {
  var maxId = JSON.parse(localStorage.getItem('maxId') || '-1') + 1;
  localStorage.setItem('maxId', maxId + '');
  return maxId;
}

function editSite(dataIndex) {
  var siteObj = getValueAndNameById(dataIndex);
  $('.name').val(siteObj.name);
  $('.url').val(siteObj.url);
  $('.confirmButton').text('修改').addClass('changeButton').removeClass('confirmButton');
  addSiteAnimation();
  $('#add-window').attr('data-id', dataIndex);
}

function changeSite() {
  var siteName = $('.name').val();
  var siteUrl = $('.url').val();
  var siteObj = {};

  if ($('.url').val().indexOf('http') === -1) {
    siteObj['url'] = 'https://' + $('.url').val();
  } else {
    siteObj['url'] = $('.url').val();
  }

  siteObj['name'] = siteName;
  siteObj['id'] = $('#add-window').data('id');
  addFormat();
  $('.name').val('');
  $('.url').val('');
  editLocalStorage(siteObj);
}

function getValueAndNameById(id) {
  var siteData = JSON.parse(localStorage.getItem('siteData'));
  return siteData.find(function (item) {
    return item.id === id;
  });
}

function addLocalStorage(siteObj) {
  var siteData = JSON.parse(localStorage.getItem('siteData') || '[]');
  siteData.push(siteObj);
  localStorage.setItem('siteData', JSON.stringify(siteData));
}

function getSiteIndexByName(name) {
  var siteData = JSON.parse(localStorage.getItem('siteData'));
  return siteData.lastIndexOf(name);
}

function editLocalStorage(siteObj) {
  var siteData = JSON.parse(localStorage.getItem('siteData') || '[]');
  var index = siteData.findIndex(function (item) {
    return item.id === siteObj.id;
  });
  siteData.splice(index, 1, siteObj);
  localStorage.setItem('siteData', JSON.stringify(siteData));
}

function removeLocalStorage(id) {
  var siteData = JSON.parse(localStorage.getItem('siteData') || '[]');
  var index = siteData.findIndex(function (item) {
    return item.id === id;
  });
  siteData.splice(index, 1);
  localStorage.setItem('siteData', JSON.stringify(siteData));
}
},{}],"pc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pcJs;

var _utils = require("./utils");

function pcJs() {
  var $search_frame = $('.search-frame');
  var $add = $('.add');
  var $addWindow = $('#add-window');
  var $cancelButton = $('.cancelButton');
  var $siteList = $('.site-list');
  var localSiteData = JSON.parse(localStorage.getItem('siteData') || '[]');

  if (localSiteData.length === 0) {
    localSiteData = [{
      'name': '哔哩哔哩',
      'url': 'https://www.bilibili.com',
      'id': 0
    }, {
      'name': 'ACFUN',
      'url': 'https://www.acfun.cn/',
      'id': 1
    }];
    localStorage.setItem('maxId', '1');
    localStorage.setItem('siteData', JSON.stringify(localSiteData));
  }

  var isEdit = false;

  document.onmousedown = function (e) {
    if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') return;

    if ($addWindow.css('visibility') === 'hidden') {
      $('ul > li').removeClass();
      $add.css('visibility', 'visible');
      isEdit = false;
    } else if ($('ul>li').hasClass('edit')) {
      $search_frame.blur();
    }
  };

  $siteList.on('contextmenu', function (e) {
    e.preventDefault();
  });

  function loadSite() {
    $('.add-container').siblings().remove();

    if (localSiteData.length > 0) {
      appendSite(JSON.parse(localStorage.getItem('siteData')));
    }
  }

  $(function () {
    loadSite();
  });
  $addWindow.on('mousedown', function (e) {
    e.stopPropagation();
  });
  $search_frame.focus(function () {
    if ($addWindow.hasClass('add-window-animation-display')) {
      $search_frame.blur();
    } else {
      $('.searchButton').attr('style', 'visibility: visible');
    }
  });
  $search_frame.blur(function (e) {
    if (e.target.value !== '') {} else {
      $('.searchButton').attr('style', 'visibility: hidden');
    }
  });
  $($search_frame).on('keyup', function (e) {
    var val = $search_frame.val();

    if (e.keyCode === 13) {
      if (val === '') {
        location.href = 'https://www.baidu.com';
      } else if (val.substr(0, 4) === 'http') {
        location.href = val;
      } else if (val.substr(0, 3) === 'www') {
        location.href = 'https://' + val;
      } else {
        location.href = 'https://www.baidu.com/s?wd=' + val;
      }

      $search_frame.val('');
    }
  });
  $('.searchButton').on('mousedown', function () {
    var val = $search_frame.val();

    if (val === '') {
      $search_frame.blur();
    } else if (val.substr(0, 4) === 'http') {
      location.href = val;
    } else if (val.substr(0, 3) === 'www') {
      location.href = 'https://' + val;
    } else {
      location.href = 'https://www.baidu.com/s?wd=' + val;
    }

    $search_frame.val('');
  });
  $add.on('mousedown', function (e) {
    if (e.button === 0) {
      e.stopPropagation();

      if ($add.css('opacity') === '0.3') {
        $add.attr('style', 'opacity: 1;');
        (0, _utils.addSiteAnimation)();
      }
    }
  });
  $cancelButton.on('mousedown', function () {
    $('ul > li').removeClass();
    $add.css('visibility', 'visible');
    $addWindow.removeClass();
    (0, _utils.addSiteFormat)();
    (0, _utils.addFormat)();

    if ($('.changeButton') !== undefined) {
      setTimeout(function () {
        $('.changeButton').text('添加').addClass('confirmButton').removeClass('changeButton');
      }, 150);
    }

    isEdit = false;
  });
  $siteList.on('mouseup', function (e) {
    e.preventDefault();
    if (!e.target.tagName) return;

    if (e.target.tagName === 'LI') {
      if (e.button === 0 && !isEdit) {
        location.href = (0, _utils.getValueAndNameById)($(e.target).data('id')).url;
      }
    } else if (e.target.tagName === 'SPAN') {
      if (e.button === 0 && !isEdit) {
        location.href = (0, _utils.getValueAndNameById)($(e.target).parent().data('id')).url;
      }
    }

    if (e.button === 2 && e.target.tagName === 'LI' || e.button === 2 && e.target.tagName === 'SPAN') {
      isEdit = true;

      if (!$('ul>li').hasClass('edit')) {
        $('ul>li').addClass('selected-site');
        setTimeout(function () {
          $('ul>li').addClass('unselected-site delete edit');
          $add.css('visibility', 'hidden');
        }, 50);
      }
    }
  });
  $siteList.on('mousedown', function (e) {
    if (e.button === 0 && isEdit) {
      var deleteScope = {};
      var basePosition = e.target.getBoundingClientRect();

      if (e.target.tagName === 'SPAN') {
        basePosition = e.target.parentNode.getBoundingClientRect();
      }

      deleteScope.top = basePosition.y - 10;
      deleteScope.bottom = deleteScope.top + 20;
      deleteScope.left = basePosition.x - 10;
      deleteScope.right = deleteScope.left + 20;

      if (e.pageX >= deleteScope.left && e.pageX <= deleteScope.right && e.pageY >= deleteScope.top && e.pageY <= deleteScope.bottom) {
        e.stopPropagation();

        if ($addWindow.hasClass('') || $addWindow.hasClass('add-window-animation-hidden')) {
          removeSite(e);
          (0, _utils.addSiteFormat)();
        }
      } else {
        e.stopPropagation();

        if (e.target.tagName === 'LI') {
          (0, _utils.editSite)($(e.target).data('id'));
        } else if (e.target.tagName === 'SPAN') {
          (0, _utils.editSite)($(e.target).parent().data('id'));
        }
      }
    }
  });

  function removeSite(e) {
    $(e.target).remove();

    if ($siteList.children('li').length === 0) {
      (0, _utils.addFormat)();
    }

    (0, _utils.removeLocalStorage)($(e.target).data('id'));
  }

  $addWindow.on('mousedown', function (e) {
    var site_name = $('.name').val();
    var site_url = $('.url').val();

    if ($(e.target).text() === '添加') {
      if (site_name && site_url) {
        addSite();
        (0, _utils.addSiteFormat)();
      }
    }

    if ($(e.target).text() === '修改') {
      if (site_name && site_url) {
        (0, _utils.changeSite)();
        loadSite();
        $('.changeButton').text('添加').addClass('confirmButton').removeClass('changeButton');
        (0, _utils.addSiteFormat)();
      }
    }

    isEdit = false;
  });

  function appendSite(siteObjects) {
    siteObjects.forEach(function (item) {
      var $newLi = $("\n                <li data-id=".concat(item.id, ">\n                    <span>").concat(item.name.slice(0, 1), "</span>\n                    <span>").concat(item.name, "\n                    </span>\n                </li>\n            "));
      $newLi.insertBefore($('.add-container'));
      $newLi.on('contextmenu', function (e) {
        e.preventDefault();
      });
    });
  }

  function addSite() {
    var site_name = $('.name').val();
    var site_url = $('.url').val();

    if (site_name && site_url) {
      var siteObj = {};

      if (site_url.indexOf('http') === -1) {
        siteObj = {
          name: site_name,
          url: 'https://' + site_url
        };
      } else {
        siteObj = {
          name: site_name,
          url: site_url
        };
      }

      siteObj['id'] = (0, _utils.createId)();
      (0, _utils.addLocalStorage)(siteObj);
      appendSite([siteObj]);
      (0, _utils.addFormat)();
      $('.name').val('');
      $('.url').val('');
    }
  }
}
},{"./utils":"utils.js"}],"phone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = phoneJs;

var _utils = require("./utils");

function phoneJs() {
  var $search_frame = $('.search-frame');
  var $add = $('.add');
  var $addSite = $('#add-window');
  var $cancelButton = $('.cancelButton');
  var $siteList = $('.site-list');
  var $addWindow = $('#add-window');
  var deleteList = [];
  var isDispatch = true;
  var localSiteData = JSON.parse(localStorage.getItem('siteData')) || {};

  document.ontouchstart = function () {
    isDispatch = true;

    if ($addSite.css('visibility') === 'hidden') {
      $('ul > li').removeClass();
      (0, _utils.addFormat)();

      if (deleteList.length > 0) {
        (0, _utils.removeLocalStorage)(deleteList);
        deleteList.length = 0;
      }
    } else if ($('ul>li').hasClass('edit')) {
      $search_frame.blur();
    }
  };

  function loadSite() {
    $('.add-container').siblings().remove();

    if (localSiteData.length > 0) {
      append_site(JSON.parse(localStorage.getItem('siteData')));
    }
  }

  $(function ($) {
    loadSite();
  });
  $addSite.on('touchstart', function (e) {
    e.stopPropagation();
  });
  $search_frame.focus(function (e) {
    if ($addSite.hasClass('add-window-animation-display')) {
      $search_frame.blur();
    } else {
      $('.searchButton').attr('style', 'visibility: visible');
      $('#headStyle').attr('style', 'margin-top: 130px');
    }
  });
  $search_frame.blur(function (e) {
    if (e.target.value !== '') {
      $('#headStyle').attr('style', 'margin-top: 165px');
    } else {
      $('#headStyle').attr('style', 'margin-top: 165px');
      $('.searchButton').attr('style', 'visibility: hidden');
    }
  }); // TODO 使用location指定 不用表单提交

  $('.searchButton').on('touchstart', function (e) {
    var val = $search_frame.val();

    if (val === '') {
      $search_frame.blur();
    } else if (val.substr(0, 4) === 'http') {
      location.href = val;
    } else if (val.substr(0, 3) === 'www') {
      location.href = 'https://' + val;
    } else {
      location.href = 'https://www.baidu.com/s?wd=' + val;
    }

    $search_frame.val('');
    $('#headStyle').attr('style', 'margin-top: 165px');
    return false;
  });
  $add.on('touchstart', function (e) {
    e.stopPropagation();

    if ($add.css('opacity') === '0.3') {
      $add.attr('style', 'opacity: 1;');
      (0, _utils.addSiteAnimation)();
    }
  });
  $cancelButton.on('touchstart', function (e) {
    $('ul > li').removeClass();
    (0, _utils.addFormat)();
    $addSite.removeClass();
    (0, _utils.addSiteFormat)();
    (0, _utils.addFormat)();

    if ($('.changeButton') !== undefined) {
      setTimeout(function () {
        $('.changeButton').text('添加').addClass('confirmButton').removeClass('changeButton');
      }, 150);
    }
  });

  function removeSite(e) {
    deleteList.push(parseInt($(e.target.children[0]).data('id')));
    $(e.target).remove();

    if ($siteList.children('li').length === 0) {
      (0, _utils.addFormat)();
      (0, _utils.removeLocalStorage)(deleteList);
      deleteList.length = 0;
    }
  }

  function longPress() {
    if ($('ul > li').length > 0) {
      $('ul>li').addClass('selected-site');
      $('ul>li').addClass('unselected-site delete edit');
      $add.css('visibility', 'hidden');
    }
  }

  $siteList.on('touchstart', function (e) {
    if ($('.delete')[0] !== null && $('.delete')[0] !== undefined) {
      var deleteScope = {};
      var editScope = {};
      var basePosition = e.target.getBoundingClientRect();

      if (e.target.tagName === 'SPAN') {
        basePosition = e.target.parentNode.getBoundingClientRect();
      }

      deleteScope.top = basePosition.y - 10;
      deleteScope.bottom = deleteScope.top + 20;
      deleteScope.left = basePosition.x - 10;
      deleteScope.right = deleteScope.left + 20;
      editScope.top = basePosition.y;
      editScope.bottom = basePosition.y + 50;
      editScope.left = basePosition.x;
      editScope.right = basePosition.x + 50;

      if (e.touches[0].pageX >= deleteScope.left && e.touches[0].pageX <= deleteScope.right && e.touches[0].pageY >= deleteScope.top && e.touches[0].pageY <= deleteScope.bottom) {
        e.stopPropagation();

        if ($addWindow.hasClass('') || $addWindow.hasClass('add-window-animation-hidden')) {
          removeSite(e); // setTimeout(()=>{$add.css("visibility","visible")},100)

          (0, _utils.addSiteFormat)();
        }
      } else if (e.touches[0].pageX >= editScope.left && e.touches[0].pageX <= editScope.right && e.touches[0].pageY >= editScope.top && e.touches[0].pageY <= editScope.bottom) {
        e.stopPropagation();

        if (e.target.tagName === 'LI') {
          (0, _utils.editSite)($(e.target.children[0]).data('id'));
        } else if (e.target.tagName === 'SPAN') {
          (0, _utils.editSite)($(e.target).data('id'));
        }
      }
    }
  });
  $addSite.on('touchstart', function (e) {
    if ($(e.target).text() === '添加') {
      var site_name = $('.name').val();
      var site_url = $('.url').val();

      if (site_name && site_url) {
        addSite();
        (0, _utils.addSiteFormat)();
      }
    }

    if ($(e.target).text() === '修改') {
      (0, _utils.changeSite)();
      loadSite();
      $('.changeButton').text('添加').addClass('confirmButton').removeClass('changeButton');
      (0, _utils.addSiteFormat)();
    }
  });
  var custom_handle_event = {
    time: null,
    handleEvent: function handleEvent(e) {
      if (e.type === 'touchstart') {
        this.customStart(e);
      }

      if (e.type === 'touchend') {
        this.customEnd(e);
      }
    },
    customStart: function customStart(e) {
      this.time = setTimeout(function () {
        isDispatch = false;
        longPress();
      }, 300);
    },
    customEnd: function customEnd(e) {
      if (isDispatch) {
        clearTimeout(this.time);
        location.href = (0, _utils.getValueAndNameById)($(e.target).data('id'))[1];
      }

      isDispatch = !$('ul>li').hasClass('edit');
    }
  };

  function append_site(siteObjects) {
    for (var i = 0; i < siteObjects.length; i += 2) {
      var $newLi = $("\n                <li>\n                    <span>".concat(siteObjects[i].slice(1, 1), "</span>\n                    <span data-id=").concat((0, _utils.getSiteIndexByName)(siteObjects[i]), "> ").concat(siteObjects[i], "\n                    </span>\n                </li>\n            "));
      $newLi.insertBefore($('.add-container'));
      $newLi[0].addEventListener('touchstart', custom_handle_event);
      $newLi[0].addEventListener('touchend', custom_handle_event);
    }
  }

  function addSite() {
    var site_name = $('.name').val();
    var site_url = $('.url').val();

    if (site_name && site_url) {
      var siteArray = [];

      if ($('.url').val().indexOf('http') === -1) {
        siteArray = [$('.name').val(), 'https://' + $('.url').val()];
      } else {
        siteArray = [$('.name').val(), $('.url').val()];
      }

      (0, _utils.addLocalStorage)(siteArray);
      append_site(siteArray);
      (0, _utils.addFormat)();
      $('.name').val('');
      $('.url').val('');
    }
  }
}
},{"./utils":"utils.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _pc = _interopRequireDefault(require("./pc.js"));

var _phone = _interopRequireDefault(require("./phone.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var os = function () {
  var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}();

if (os.isAndroid || os.isPhone || os.isTablet) {
  (0, _phone.default)();
} else if (os.isPc) {
  (0, _pc.default)();
}
},{"./pc.js":"pc.js","./phone.js":"phone.js"}],"C:/Users/thl/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "5885" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/thl/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map