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
})({"FO+Z":[function(require,module,exports) {
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
exports.getValueAndNameByIndex = getValueAndNameByIndex;

function addFormat() {
  $(".add").css("visibility", "visible");
  $(".add").attr("style", "opacity: .3;");
}

function addSiteFormat() {
  setTimeout(function () {
    $(".url").val("");
    $(".name").val("");
  }, 150);
  $(".add").removeClass("add-window-animation-display");
  $("#add-window").addClass("add-window-animation-hidden");
}

function addSiteAnimation() {
  $("#add-window").css("visibility", "visible");
  $("#add-window").removeClass();
  $("#add-window").removeClass("add-window-animation-hidden");
  $("#add-window").addClass("add-window-animation-display"); // TODO 添加蒙版效果
}

function editSite(dataIndex) {
  var siteArray = getValueAndNameByIndex(dataIndex);
  $(".name").val(siteArray[0]);
  $(".url").val(siteArray[1]);
  $(".confirmButton").text("修改").addClass("changeButton").removeClass("confirmButton");
  addSiteAnimation();
  $("#add-window").attr("data-id", dataIndex);
}

function changeSite() {
  var siteName = $(".name").val();
  var siteUrl = $(".url").val();

  if (siteName && siteUrl) {
    var siteArray = [];

    if ($(".url").val().indexOf("http") === -1) {
      siteArray = [$(".name").val(), "https://" + $(".url").val()];
    } else {
      siteArray = [$(".name").val(), $(".url").val()];
    }

    addFormat();
    $(".name").val("");
    $(".url").val("");
    editLocalStorage(siteArray, $("#add-window").data("id"));
  }
}

function getValueAndNameByIndex(index) {
  var siteData = JSON.parse(localStorage.getItem("siteData"));
  return [siteData[index], siteData[index + 1]];
}

function addLocalStorage(siteArray) {
  var siteData = JSON.parse(localStorage.getItem("siteData"));

  if (siteArray !== null) {
    if (siteData !== null) {
      siteData.push.apply(siteData, siteArray);
      localStorage.setItem("siteData", JSON.stringify(siteData));
    } else {
      localStorage.setItem("siteData", JSON.stringify(siteArray));
    }
  }
}

function getSiteIndexByName(name) {
  var siteData = JSON.parse(localStorage.getItem("siteData"));
  return siteData.lastIndexOf(name);
}

function editLocalStorage(siteArray, index) {
  var siteData = JSON.parse(localStorage.getItem("siteData"));
  siteData[index] = siteArray[0];
  siteData[index + 1] = siteArray[1];
  localStorage.setItem("siteData", JSON.stringify(siteData));
}

function removeLocalStorage(deleteArray) {
  var siteData = JSON.parse(localStorage.getItem("siteData"));
  deleteArray.sort(function (x, y) {
    return y - x;
  });

  for (var i = 0; i < deleteArray.length; i++) {
    siteData.splice(deleteArray[i], 2);
  }

  localStorage.setItem("siteData", JSON.stringify(siteData));
}
},{}],"p3/I":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pcJs;

var _utils = require("./utils");

function pcJs() {
  var $search_frame = $(".search-frame");
  var $add = $(".add");
  var $addWindow = $("#add-window");
  var $cancelButton = $(".cancelButton");
  var $siteList = $(".site-list");
  var deleteList = [];
  var isDispatch = true;
  var localSiteData = JSON.parse(localStorage.getItem("siteData")) || {};

  document.onmousedown = function () {
    if ($addWindow.css("visibility") === "hidden") {
      $("ul > li").removeClass();
      $add.css("visibility", "visible");

      if (deleteList.length > 0) {
        (0, _utils.removeLocalStorage)(deleteList);
        deleteList.length = 0;
      }
    } else if ($("ul>li").hasClass("edit")) {
      $search_frame.blur();
    }
  };

  function loadSite() {
    isDispatch = true;
    var siteArrays = [];
    $(".add-container").siblings().remove();

    if (localSiteData.length > 0) {
      append_site(JSON.parse(localStorage.getItem("siteData")));
    }
  }

  $(function ($) {
    loadSite();
  });
  $addWindow.on("mousedown", function (e) {
    e.stopPropagation();
  });
  $search_frame.focus(function (e) {
    if ($addWindow.hasClass("add-window-animation-display")) {
      $search_frame.blur();
    } else {
      $(".searchButton").attr("style", "visibility: visible");
    }
  });
  $search_frame.blur(function (e) {
    if (e.target.value !== '') {} else {
      $(".searchButton").attr("style", "visibility: hidden");
    }
  });
  $($search_frame).on("keyup", function (e) {
    var val = $search_frame.val();

    if (e.keyCode === 13) {
      if (val === "") {
        location.href = "https://www.baidu.com";
      } else if (val.substr(0, 4) === "http") {
        location.href = val;
      } else if (val.substr(0, 3) === "www") {
        location.href = "https://" + val;
      } else {
        location.href = "https://www.baidu.com/s?wd=" + val;
      }

      $search_frame.val("");
    }
  }); // TODO 使用location指定 不用表单提交

  $(".searchButton").on("mousedown", function (e) {
    var val = $search_frame.val();

    if (val === "") {
      $search_frame.blur();
    } else if (val.substr(0, 4) === "http") {
      location.href = val;
    } else if (val.substr(0, 3) === "www") {
      location.href = "https://" + val;
    } else {
      location.href = "https://www.baidu.com/s?wd=" + val;
    }

    $search_frame.val("");
  });
  $add.on("mousedown", function (e) {
    if (e.button === 0) {
      e.stopPropagation();

      if ($add.css("opacity") === "0.3") {
        $add.attr("style", "opacity: 1;");
        (0, _utils.addSiteAnimation)();
      }
    }
  });
  $cancelButton.on("mousedown", function (e) {
    isDispatch = true;
    $("ul > li").removeClass();
    $add.css("visibility", "visible");
    $addWindow.removeClass();
    (0, _utils.addSiteFormat)();
    (0, _utils.addFormat)();

    if ($(".changeButton") !== undefined) {
      setTimeout(function () {
        $(".changeButton").text("添加").addClass("confirmButton").removeClass("changeButton");
      }, 150);
    }
  });
  $siteList.on("mouseup", function (e) {
    e.preventDefault();

    if (e.target.tagName === "SPAN") {
      if (e.button === 0) {
        if (isDispatch) {
          location.href = (0, _utils.getValueAndNameByIndex)($(e.target).data("id"))[1];
        }
      }
    }

    if (e.button === 2) {
      if (!$("ul>li").hasClass("edit")) {
        $("ul>li").addClass("selected-site");
        setTimeout(function () {
          $("ul>li").addClass("unselected-site delete edit");
          $add.css("visibility", "hidden");
        }, 50);
      }
    }
  });
  $siteList.on("mousedown", function (e) {
    if (e.button === 0) {
      if ($(".delete")[0] !== null && $(".delete")[0] !== undefined) {
        isDispatch = false;
        var deleteScope = {};
        var editScope = {};
        var basePosition = e.target.getBoundingClientRect();

        if (e.target.tagName === "SPAN") {
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

        if (e.pageX >= deleteScope.left && e.pageX <= deleteScope.right && e.pageY >= deleteScope.top && e.pageY <= deleteScope.bottom) {
          e.stopPropagation();

          if (!$addWindow.hasClass("add-window-animation-display")) {
            removeSite(e); // setTimeout(()=>{$add.css("visibility","visible")},100)

            (0, _utils.addSiteFormat)();
          }
        } else if (e.pageX >= editScope.left && e.pageX <= editScope.right && e.pageY >= editScope.top && e.pageY <= editScope.bottom) {
          e.stopPropagation();

          if (e.target.tagName === "LI") {
            (0, _utils.editSite)($(e.target.children[0]).data("id"));
          } else if (e.target.tagName === "SPAN") {
            (0, _utils.editSite)($(e.target).data("id"));
          }
        }
      }
    }
  });

  function removeSite(e) {
    deleteList.push(parseInt($(e.target.children[0]).data("id")));
    $(e.target).remove();

    if ($siteList.children("li").length === 0) {
      (0, _utils.addFormat)();
      (0, _utils.removeLocalStorage)(deleteList);
      deleteList.length = 0;
    }
  }

  $addWindow.on("mousedown", function (e) {
    if ($(e.target).text() === "添加") {
      var site_name = $(".name").val();
      var site_url = $(".url").val();

      if (site_name && site_url) {
        addSite();
        (0, _utils.addSiteFormat)();
      }
    }

    if ($(e.target).text() === "修改") {
      (0, _utils.changeSite)();
      loadSite();
      $(".changeButton").text("添加").addClass("confirmButton").removeClass("changeButton");
      (0, _utils.addSiteFormat)();
    }
  });

  function append_site(siteObjects) {
    for (var i = 0; i < siteObjects.length; i += 2) {
      var $newLi = $("\n                <li>\n                    <span data-id=".concat((0, _utils.getSiteIndexByName)(siteObjects[i]), ">").concat(siteObjects[i], "\n                    </span>\n                </li>\n            "));
      $newLi.insertBefore($(".add-container"));
      $newLi.on("contextmenu", function (e) {
        e.preventDefault();
      });
    }
  }

  function addSite() {
    var site_name = $(".name").val();
    var site_url = $(".url").val();

    if (site_name && site_url) {
      var siteArray = [];

      if ($(".url").val().indexOf("http") === -1) {
        siteArray = [$(".name").val(), "https://" + $(".url").val()];
      } else {
        siteArray = [$(".name").val(), $(".url").val()];
      }

      (0, _utils.addLocalStorage)(siteArray);
      append_site(siteArray);
      (0, _utils.addFormat)();
      $(".name").val("");
      $(".url").val("");
    }
  }
}
},{"./utils":"FO+Z"}],"+N3k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = phoneJs;

var _utils = require("./utils");

function phoneJs() {
  var $search_frame = $(".search-frame");
  var $add = $(".add");
  var $addSite = $("#add-window");
  var $cancelButton = $(".cancelButton");
  var $siteList = $(".site-list");
  var deleteList = [];
  var isDispatch = true;
  var localSiteData = JSON.parse(localStorage.getItem("siteData")) || {};

  document.ontouchstart = function () {
    isDispatch = true;

    if ($addSite.css("visibility") === "hidden") {
      $("ul > li").removeClass();
      (0, _utils.addFormat)();

      if (deleteList.length > 0) {
        (0, _utils.removeLocalStorage)(deleteList);
        deleteList.length = 0;
      }
    } else if ($("ul>li").hasClass("edit")) {
      $search_frame.blur();
    }
  };

  function loadSite() {
    isDispatch = true;
    var siteArrays = [];
    $(".add-container").siblings().remove();

    if (localSiteData.length > 0) {
      append_site(getSiteObject());
    }
  }

  $(function ($) {
    loadSite();
  });
  $addSite.on("touchstart", function (e) {
    e.stopPropagation();
  });
  $search_frame.focus(function (e) {
    if ($addSite.hasClass("add-window-animation-display")) {
      $search_frame.blur();
    } else {
      $(".searchButton").attr("style", "visibility: visible");
      $("#headStyle").attr("style", "margin-top: 130px");
    }
  });
  $search_frame.blur(function (e) {
    if (e.target.value !== '') {
      $("#headStyle").attr("style", "margin-top: 165px");
    } else {
      $("#headStyle").attr("style", "margin-top: 165px");
      $(".searchButton").attr("style", "visibility: hidden");
    }
  }); // TODO 使用location指定 不用表单提交

  $(".searchButton").on("touchstart", function (e) {
    var val = $search_frame.val();

    if (val === "") {
      $search_frame.blur();
    } else if (val.substr(0, 4) === "http") {
      location.href = val;
    } else if (val.substr(0, 3) === "www") {
      location.href = "https://" + val;
    } else {
      location.href = "https://www.baidu.com/s?wd=" + val;
    }

    $search_frame.val("");
    $("#headStyle").attr("style", "margin-top: 165px");
    return false;
  });
  $add.on("touchstart", function (e) {
    e.stopPropagation();

    if ($add.css("opacity") === "0.3") {
      $add.attr("style", "opacity: 1;");
      (0, _utils.addSiteAnimation)();
    }
  });
  $cancelButton.on("touchstart", function (e) {
    $("ul > li").removeClass();
    (0, _utils.addFormat)();
    $addSite.removeClass();
    (0, _utils.addSiteFormat)();
    (0, _utils.addFormat)();

    if ($(".changeButton") !== undefined) {
      setTimeout(function () {
        $(".changeButton").text("添加").addClass("confirmButton").removeClass("changeButton");
      }, 150);
    }
  });

  function removeSite(e) {
    deleteList.push(parseInt($(e.target.children[0]).data("id")));
    $(e.target).remove();

    if ($siteList.children("li").length === 0) {
      console.log(e.target);
      (0, _utils.addFormat)();
      (0, _utils.removeLocalStorage)(deleteList);
      deleteList.length = 0;
    }
  }

  function longPress() {
    if ($("ul > li").length > 0) {
      $("ul>li").addClass("selected-site");
      $("ul>li").addClass("unselected-site delete edit");
      $add.css("visibility", "hidden");
    }
  }

  $siteList.on("touchstart", function (e) {
    if ($(".delete")[0] !== null && $(".delete")[0] !== undefined) {
      var deleteScope = {};
      var editScope = {};
      var basePosition = e.target.getBoundingClientRect();

      if (e.target.tagName === "SPAN") {
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

        if (!$addSite.hasClass("add-window-animation-display")) {
          removeSite(e); // setTimeout(()=>{$add.css("visibility","visible")},100)

          (0, _utils.addSiteFormat)();
        }
      } else if (e.touches[0].pageX >= editScope.left && e.touches[0].pageX <= editScope.right && e.touches[0].pageY >= editScope.top && e.touches[0].pageY <= editScope.bottom) {
        e.stopPropagation();

        if (e.target.tagName === "LI") {
          (0, _utils.editSite)($(e.target.children[0]).data("id"));
        } else if (e.target.tagName === "SPAN") {
          (0, _utils.editSite)($(e.target).data("id"));
        }
      }
    }
  });
  $addSite.on("touchstart", function (e) {
    if ($(e.target).text() === "添加") {
      var site_name = $(".name").val();
      var site_url = $(".url").val();

      if (site_name && site_url) {
        addSite();
        (0, _utils.addSiteFormat)();
      }
    }

    if ($(e.target).text() === "修改") {
      (0, _utils.changeSite)();
      loadSite();
      $(".changeButton").text("添加").addClass("confirmButton").removeClass("changeButton");
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
        location.href = (0, _utils.getValueAndNameByIndex)($(e.target).data("id"))[1];
      }

      if ($("ul>li").hasClass("edit")) {
        isDispatch = false;
      } else {
        isDispatch = true;
      }
    }
  };

  function append_site(siteObjects) {
    for (var i = 0; i < siteObjects.length; i += 2) {
      var $newLi = $("\n                <li>\n                    <span data-id=".concat((0, _utils.getSiteIndexByName)(siteObjects[i]), "> ").concat(siteObjects[i], "\n                    </span>\n                </li>\n            "));
      $newLi.insertBefore($(".add-container"));
      $newLi[0].addEventListener('touchstart', custom_handle_event);
      $newLi[0].addEventListener('touchend', custom_handle_event);
    }
  }

  function addSite() {
    var site_name = $(".name").val();
    var site_url = $(".url").val();

    if (site_name && site_url) {
      var siteArray = [];

      if ($(".url").val().indexOf("http") === -1) {
        siteArray = [$(".name").val(), "https://" + $(".url").val()];
      } else {
        siteArray = [$(".name").val(), $(".url").val()];
      }

      (0, _utils.addLocalStorage)(siteArray);
      append_site(siteArray);
      (0, _utils.addFormat)();
      $(".name").val("");
      $(".url").val("");
    }
  }
}
},{"./utils":"FO+Z"}],"epB2":[function(require,module,exports) {
"use strict";

var _pc = _interopRequireDefault(require("./pc"));

var _phone = _interopRequireDefault(require("./phone"));

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
},{"./pc":"p3/I","./phone":"+N3k"}]},{},["epB2"], null)
//# sourceMappingURL=main.33af2946.js.map