// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5F97s":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "eba4635e5d6a021854846032beca3f50";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"fH284":[function(require,module,exports) {
$search_frame = $(".search-frame")
$add = $(".add")
$add_site = $("#add-site")
$confirmButton = $(".confirmButton")
$cancelButton = $(".cancelButton")
$site_list = $(".site-list")
delete_list = []
let isDispatch = true
let isDelete = true
let localSiteData = window.localStorage
let os = function() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    }
}()

if(os.isAndroid || os.isPhone || os.isTablet) {
    document.ontouchstart = (()=>{
        isDispatch = true
        if($add_site.css("visibility") === "hidden" ){
            $("ul > li").removeClass()
            add_format()
            if(delete_list.length > 0){
                removeLocalStorage(delete_list)
            }
        }else if($("ul>li").hasClass("edit")){
            $search_frame.blur()
        }

    })



    $(function($){
        loadSite()
    })

    $add_site.on("touchstart",(e)=>{
        e.stopPropagation()
    })

    $search_frame.focus((e)=>{
        if($add_site.hasClass("add-site-animation-display")){
            $search_frame.blur()
        }else{
            $(".searchButton").attr("style", "visibility: visible")
            $("#headStyle").attr("style","margin-top: 130px")    
        }

    })
    $search_frame.blur((e)=>{
        if(e.target.value !== ''){
            $("#headStyle").attr("style","margin-top: 165px")
        }else{
            $("#headStyle").attr("style","margin-top: 165px")
            $(".searchButton").attr("style", "visibility: hidden")
        }
        
    })

    // TODO 使用location指定 不用表单提交
    $(".searchButton").on("touchstart", (e)=>{
        let val = $search_frame.val()
        if(val === ""){
            $search_frame.blur()
        }
        else if(val.substr(0, 4) === "http"){
            location.href = val
        }else if(val.substr(0, 3) === "www"){
            location.href = "https://" + val
        }else{
            location.href = "https://www.baidu.com/s?wd=" + val
        }
        $search_frame.val("")
        $("#headStyle").attr("style","margin-top: 165px")
        return false;
    })

    $add.on("touchstart",((e) => {
        e.stopPropagation()
        if($add.css("opacity") === "0.1"){
            $add.attr("style","opacity: 1;") 
            addSiteAnimation()
        }
    }))


    $cancelButton.on("touchstart", ((e)=>{
        $("ul > li").removeClass()
        add_format()
        $add_site.removeClass()
        add_site_format()
        add_format()
        if($(".changeButton") !== undefined){
            setTimeout(() =>{
            $(".changeButton").text("添加").addClass("confirmButton").removeClass("changeButton")   
            },150)
            
        }
    }))
    function removeSite(e){
        delete_list.push(parseInt($(e.target.children[0]).data("id")))
        $(e.target).remove()
        if($site_list.children("li").length === 0){
            console.log(e.target)
            add_format()
            removeLocalStorage(delete_list)
        }
    }
    function longPress(){
        if($("ul > li").length > 0){
            $("ul>li").addClass("selected-site")
            $("ul>li").addClass("unselected-site delete edit")
            $add.css("visibility","hidden")
        }
        
    }

    $site_list.on("touchstart" , (e)=>{
        if($(".delete")[0] !== null && $(".delete")[0] !== undefined){
            let deleteScope = {}
            let editScope = {}
            let basePosition = e.target.getBoundingClientRect()
            if(e.target.tagName === "SPAN"){
                basePosition = e.target.parentNode.getBoundingClientRect()
            }
            deleteScope.top = basePosition.y - 10
            deleteScope.bottom = deleteScope.top + 20
            deleteScope.left = basePosition.x - 10
            deleteScope.right = deleteScope.left + 20
            editScope.top = basePosition.y
            editScope.bottom = basePosition.y + 50
            editScope.left = basePosition.x
            editScope.right = basePosition.x + 50
            if(e.touches[0].pageX >= deleteScope.left && e.touches[0].pageX <= deleteScope.right && e.touches[0].pageY >= deleteScope.top && e.touches[0].pageY <= deleteScope.bottom){
                e.stopPropagation()
                if(!$add_site.hasClass("add-site-animation-display")){
                    removeSite(e)
                    // setTimeout(()=>{$add.css("visibility","visible")},100)
                    add_site_format()
                }
            }else if(e.touches[0].pageX >= editScope.left && e.touches[0].pageX <= editScope.right && e.touches[0].pageY >= editScope.top && e.touches[0].pageY <= editScope.bottom){
                e.stopPropagation()
                if(e.target.tagName === "LI"){
                    editSite($(e.target.children[0]).data("id"))
                }else if(e.target.tagName === "SPAN"){
                    editSite($(e.target).data("id"))
                }
            }
        }
        
    })

    $add_site.on("touchstart",(e)=>{
        if($(e.target).text() === "添加"){
            let site_name = $(".name").val()
            let site_url = $(".url").val()
            if(site_name && site_url){
                addSite()
                add_site_format()
            }

        }
        if($(e.target).text() === "修改"){
            changeSite()
            loadSite()
            $(".changeButton").text("添加").addClass("confirmButton").removeClass("changeButton")
            add_site_format()
        }

    })
    let custom_handle_event = { 
        time : null,
        handleEvent :function(e){
            if(e.type === 'touchstart'){
                this.customStart(e)
            }
            if(e.type === 'touchend'){
                this.customEnd(e)
            }
        },
        customStart: function(e){
            this.time = setTimeout(function(){
                isDispatch = false
                longPress()
                },300)
        },
        customEnd : function(e){
            if(isDispatch){
                clearTimeout(this.time)
                location.href  = getValueAndNameByIndex($(e.target).data("id"))[1]
            }
            if($("ul>li").hasClass("edit")){
                isDispatch = false
            }else{
                isDispatch = true  
            }
            
        }
    }
    function append_site(siteObjects){
    for(let i = 0; i < siteObjects.length; i += 2){
        let $newLi = $(`
            <li>
                <span data-id=${getSiteIndexByName(siteObjects[i])}> ${siteObjects[i]}
                </span>
            </li>
        `)
        $newLi.insertBefore($(".add-container"))
        $newLi[0].addEventListener('touchstart', custom_handle_event)
        $newLi[0].addEventListener('touchend', custom_handle_event)
    }

    }

    

}else if(os.isPc) {
    document.onmousedown = (()=>{
        
        if($add_site.css("visibility") === "hidden" ){
            $("ul > li").removeClass()
            $add.css("visibility","visible")
            if(delete_list.length > 0){
                removeLocalStorage(delete_list)
            } 
        }else if($("ul>li").hasClass("edit")){
            $search_frame.blur()
        }

    })

    $(function($){
        loadSite()
    })

    $add_site.on("mousedown",(e)=>{
        e.stopPropagation()
    })

    $search_frame.focus((e)=>{
        if($add_site.hasClass("add-site-animation-display")){
            $search_frame.blur()
        }else{
            $(".searchButton").attr("style", "visibility: visible")
        }

    })
    $search_frame.blur((e)=>{
        if(e.target.value !== ''){
        }else{
            $(".searchButton").attr("style", "visibility: hidden")
        }
        
    })

    $($search_frame).on("keyup", (e) => {
        let val = $search_frame.val()
        let ev = e || window.event || arguments.callee.caller.arguments[0];
            if(ev&&ev.keyCode === 13){
                if(val === ""){
                    location.href = "https://www.baidu.com"
                }
                else if(val.substr(0, 4) === "http"){
                    location.href = val
                }else if(val.substr(0, 3) === "www"){
                    location.href = "https://" + val
                }else{
                    location.href = "https://www.baidu.com/s?wd=" + val
                }
                $search_frame.val("")
                return false;
            }
        
    })

    // TODO 使用location指定 不用表单提交
    $(".searchButton").on("mousedown", (e)=>{
        let val = $search_frame.val()
        if(val === ""){
            $search_frame.blur()
        }
        else if(val.substr(0, 4) === "http"){
            location.href = val
        }else if(val.substr(0, 3) === "www"){
            location.href = "https://" + val
        }else{
            location.href = "https://www.baidu.com/s?wd=" + val
        }
        $search_frame.val("")
        return false;
    })


    $add.on("mousedown",((e) => {
        if(e.button === 0){
            e.stopPropagation()
            if($add.css("opacity") === "0.1"){
                $add.attr("style","opacity: 1;") 
                addSiteAnimation()
            }  
        }
        
    }))


    $cancelButton.on("mousedown", ((e)=>{
        isDispatch = true
        $("ul > li").removeClass()
        $add.css("visibility","visible")
        $add_site.removeClass()
        add_site_format()
        add_format()
        if($(".changeButton") !== undefined){
            setTimeout(() =>{
            $(".changeButton").text("添加").addClass("confirmButton").removeClass("changeButton")   
            },150)
            
        }
    }))

    $site_list.on("mouseup", (e) =>{
        e.preventDefault()
        if(e.target.tagName === "SPAN"){
            if(e.button === 0){
                if(isDispatch){
                   location.href  = getValueAndNameByIndex($(e.target).data("id"))[1] 
                }
            }
        }
        if (e.button === 2) {
            if(!$("ul>li").hasClass("edit")){
                $("ul>li").addClass("selected-site")
                setTimeout(()=>{
                    $("ul>li").addClass("unselected-site delete edit")
                    $add.css("visibility","hidden")
                },50)
            }
        }
    })

    $site_list.on("mousedown" , (e)=>{
        if(e.button === 0){
            if($(".delete")[0] !== null && $(".delete")[0] !== undefined ){
                isDispatch = false
                let deleteScope = {}
                let editScope = {}
                let basePosition = e.target.getBoundingClientRect()
                if(e.target.tagName === "SPAN"){
                    basePosition = e.target.parentNode.getBoundingClientRect()
                }
                deleteScope.top = basePosition.y - 10
                deleteScope.bottom = deleteScope.top + 20
                deleteScope.left = basePosition.x - 10
                deleteScope.right = deleteScope.left + 20
                editScope.top = basePosition.y
                editScope.bottom = basePosition.y + 50
                editScope.left = basePosition.x
                editScope.right = basePosition.x + 50
                if(e.pageX >= deleteScope.left && e.pageX <= deleteScope.right && e.pageY >= deleteScope.top && e.pageY <= deleteScope.bottom){
                    e.stopPropagation()
                    if(!$add_site.hasClass("add-site-animation-display")){
                        removeSite(e)
                        // setTimeout(()=>{$add.css("visibility","visible")},100)
                        add_site_format()
                    }
                }else if(e.pageX >= editScope.left && e.pageX <= editScope.right && e.pageY >= editScope.top && e.pageY <= editScope.bottom){
                    e.stopPropagation()
                    if(e.target.tagName === "LI"){
                        editSite($(e.target.children[0]).data("id"))
                    }else if(e.target.tagName === "SPAN"){
                        editSite($(e.target).data("id"))
                    }
                }
            }
        }

    })

    function removeSite(e){
        delete_list.push(parseInt($(e.target.children[0]).data("id")))
        $(e.target).remove()
        if($site_list.children("li").length === 0){
            add_format()
            removeLocalStorage(delete_list)
        }
    }

    $add_site.on("mousedown",(e)=>{
        if($(e.target).text() === "添加"){
            let site_name = $(".name").val()
            let site_url = $(".url").val()
            if(site_name && site_url){
                addSite()
                add_site_format()
            }

        }
        if($(e.target).text() === "修改"){
            changeSite()
            loadSite()
            $(".changeButton").text("添加").addClass("confirmButton").removeClass("changeButton")
            add_site_format()
        }

    })


    function append_site(siteObjects){
    for(let i = 0; i < siteObjects.length; i += 2){
        let $newLi = $(`
            <li>
                <span data-id=${getSiteIndexByName(siteObjects[i])}>${siteObjects[i]}
                </span>
            </li>
        `)
        $newLi.insertBefore($(".add-container"))
        $newLi.on("contextmenu",(e) => {
            e.preventDefault()
        })
    }

}
}

function loadSite(){
    isDispatch = true
    let siteArrays = []
    $(".add-container").siblings().remove()
    if(localSiteData.length > 0){
        append_site(getSiteObject())  
    }
}

function add_format(){
    $add.css("visibility", "visible")
    $add.attr("style","opacity: .1;")
}

function add_site_format(){
    setTimeout(()=>{
        $(".url").val("")
        $(".name").val("") 
    },150)
    $add_site.removeClass("add-site-animation-display")
    $add_site.addClass("add-site-animation-hidden")
}

function addSiteAnimation(){
    $add_site.css("visibility", "visible")
    $add_site.removeClass()
    $add_site.removeClass("add-site-animation-hidden")
    $add_site.addClass("add-site-animation-display")
    // TODO 添加蒙版效果
}


function addSite(){
    let site_name = $(".name").val()
    let site_url = $(".url").val()
    if(site_name && site_url){
        let siteArray = []
        if($(".url").val().indexOf("http") === -1){
            siteArray = [$(".name").val(), "https://" + $(".url").val()]
        }else{
            siteArray = [$(".name").val(), $(".url").val()]
        }
        addLocalStorage(siteArray)
        append_site(siteArray)
        add_format()
        $(".name").val("")
        $(".url").val("")
        
    }
}
function editSite(dataIndex){
    let siteArray = getValueAndNameByIndex(dataIndex)
    $(".name").val(siteArray[0])
    $(".url").val(siteArray[1])
    $(".confirmButton").text("修改").addClass("changeButton").removeClass("confirmButton")
    addSiteAnimation()
    $add_site.attr("data-id", dataIndex)
}

function changeSite(){
    let site_name = $(".name").val()
    let site_url = $(".url").val()
    if(site_name && site_url){
            let siteArray = []
            if($(".url").val().indexOf("http") === -1){
                siteArray = [$(".name").val(), "https://" + $(".url").val()]
            }else{
                siteArray = [$(".name").val(), $(".url").val()]
            }
            add_format()
            $(".name").val("")
            $(".url").val("")
            editLocalStorage(siteArray, $add_site.data("id"))
        }
}





function getSiteObject(){
    return JSON.parse(localSiteData.getItem("siteData"))
}

function getValueAndNameByIndex(index){
    let siteData = getSiteObject()
    return [siteData[index], siteData[index + 1]]
}


function addLocalStorage(siteArray){
    let siteData = getSiteObject()
    if(siteArray !== null){
        if(siteData !== null){
            siteData.push.apply(siteData,siteArray)
            localSiteData.setItem("siteData", JSON.stringify(siteData)) 
        }else{
            localSiteData.setItem("siteData", JSON.stringify(siteArray))
        }  
    }
}

function getSiteIndexByName(name){
    let siteData = getSiteObject()
    return siteData.lastIndexOf(name)
}

function editLocalStorage(siteArray, index){
    let siteData = getSiteObject()
    siteData[index] = siteArray[0]
    siteData[index + 1] = siteArray[1]
    localSiteData.setItem("siteData" , JSON.stringify(siteData))
}

function removeLocalStorage(deleteArray){
    let siteData = getSiteObject()
    deleteArray.sort((x, y) =>{
        return y - x
    })
    
    for(let i = 0; i < deleteArray.length; i++){
       siteData.splice(deleteArray[i],2) 
    }
    delete_list.length = 0
    localSiteData.setItem("siteData" , JSON.stringify(siteData))
}
},{}]},["5F97s","fH284"], "fH284", "parcelRequire427e")

//# sourceMappingURL=index.beca3f50.js.map
