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
})({"FOZT":[function(require,module,exports) {
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
  $('#add-window').removeClass('add-window-animation-display');
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
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _utils = require("./utils");

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
var $search_frame = $('.search-frame');
var $add = $('.add');
var $addWindow = $('#add-window');
var $cancelButton = $('.cancelButton');
var $siteList = $('.site-list');
var localSiteData = JSON.parse(localStorage.getItem('siteData') || '[]');
var timer = -1;
var isLongPress = false;

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
$add.on('click', function (e) {
  if (e.button === 0) {
    e.stopPropagation();

    if ($add.css('opacity') === '0.3') {
      $add.attr('style', 'opacity: 1;');
      (0, _utils.addSiteAnimation)();
    }
  }
});
$cancelButton.on('click', function () {
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

$addWindow.on('click', function (e) {
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
    $newLi.on('touchstart', function (e) {
      e.stopPropagation();

      if (!isLongPress) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        isLongPress = true;
        longPress();
      }, 500);
    });
    $newLi.on('touchend', function (e) {
      e.stopPropagation();
      clearTimeout(timer);
      isLongPress = false;
    });
  });
}

function longPress() {
  isEdit = true;

  if (!$('ul>li').hasClass('edit')) {
    $('ul>li').addClass('selected-site');
    setTimeout(function () {
      $('ul>li').addClass('unselected-site delete edit');
      $add.css('visibility', 'hidden');
    }, 50);
  }
}

function addSite() {
  var site_name = $('.name').val();
  var site_url = $('.url').val();

  if (site_name && site_url) {
    var siteObj;

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
},{"./utils":"FOZT"}]},{},["epB2"], null)
//# sourceMappingURL=main.eab51328.js.map