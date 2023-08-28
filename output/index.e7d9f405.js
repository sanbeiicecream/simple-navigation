!function(){function e(){let e=null;return JSON.parse(localStorage.getItem("siteData")||"[]")}var t={validateUrl:function(e){try{return new URL(e),!0}catch(e){return!1}},getSiteData:e,getValueAndNameById:function(t){return e().find(e=>e.id===t)},addData:function(t){let a=e();a.push(t),localStorage.setItem("siteData",JSON.stringify(a))},getSiteIndexByName:function(t){return e().lastIndexOf(t)},updateData:function(t){let a=e();if(!Object.keys(a).some(e=>a[e]!==t[e]))return;let n=a.findIndex(e=>e.id===t.id);a.splice(n,1,t),localStorage.setItem("siteData",JSON.stringify(a))},removeById:function(t){let a=e(),n=a.findIndex(e=>e.id===t);a.splice(n,1),localStorage.setItem("siteData",JSON.stringify(a))},generateUUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})},findMaxId:function(){return e().sort((e,t)=>t.id-e.id)?.[0]?.id||-1},addProtocolToURL:function(e,t="http"){return e.startsWith("http://")||e.startsWith("https://")?e:`${t}://${e}`},resetData:function(e){let t;if("object"==typeof e&&"[object Object]"===e.toString())t=Object.values(e).map(e=>e.data);else{if(!Array.isArray(e))return;t=e}localStorage.setItem("siteData",JSON.stringify(t))},debounce:function(e,t=500,a=!1){let n=!0,i=!0;return(...r)=>{if(a&&i&&(e.apply(this,r),i=!1),n){let a=setTimeout(()=>{clearTimeout(a),e.apply(this,r),n=!0},t);n=!1}}}};class a{static container=void 0;static startDragEvent=null;static listCount=0;static previewDropNode=null;static editStatus=!1;static labelList=new Proxy([],{deleteProperty(e,n){1===Object.keys(e).length&&a.setEditAnimation(!1);let i=e.splice(n,1);return t.resetData(e.map?.(e=>e?.data)),i}});static setEditAnimation=e=>{e?($(a.container).children().filter("li").children().filter("div").css("visibility","visible"),$(a.container).children().filter("div").css("visibility","hidden"),$(a.container).find("li").addClass(["animate__animated","animate__pulse"]),a.editStatus=!0):($(a.container).children().filter("li").children().filter("div").css("visibility","hidden"),$(a.container).children().filter("div").css("visibility","visible"),$(a.container).find("li").removeClass(["animate__animated","animate__pulse"]),a.editStatus=!1)};static clearAnimation=e=>{let t=e?$(e):$(a.container).children();t.removeClass(["animate__animated","animate__wobble","animate__repeat-1"])};static getCurrentLabelIndex=e=>a.labelList.findIndex(t=>t.data.id===e+"");static mouseUp=e=>{if("LI"!==e.target.nodeName&&!e.target.className.includes("icon")&&"SPAN"!==e.target.nodeName)return;let t=$(e.target).data("id")??$(e.target).parent().data("id"),n=a.labelList[a.getCurrentLabelIndex(t)];n&&(0===e.button?a.editStatus?"edit-icon"===e.target.className?document.dispatchEvent(new CustomEvent("globalEvent",{detail:{showWindow:!0,instance:n}})):"delete-icon"===e.target.className&&(a.labelList.splice(a.getCurrentLabelIndex(t),1),$(e.target).parent().remove()):window.location.href=n.data.url:2===e.button&&(a.editStatus?(a.setEditAnimation(!1),document.dispatchEvent(new CustomEvent("globalEvent",{detail:{showWindow:!1}}))):a.setEditAnimation(!0)),e.target.draggable=!1)};static mouseDown=e=>{e.stopPropagation(),!a.editStatus&&["LI","SPAN"].includes(e.target.nodeName)&&0===e.button&&("SPAN"===e.target.nodeName?e.target.parentNode.draggable=!0:e.target.draggable=!0)};static drop_handler(e){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect="move";let i=n.startDragEvent.target,r="SPAN"===e.target.nodeName?e.target.parentElement:e.target;if(["LI","SPAN"].includes(e.target.nodeName)&&i!==e.target){let e=$("<div></div>").hide();$(i).before(e),$(r).before(i),$(e).replaceWith(r);let l=$(i).data("id"),d=$(r).data("id");n.clearAnimation(r),[a.labelList[l],a.labelList[d]]=[a.labelList[d],a.labelList[l]],t.resetData(a.labelList.map?.(e=>e?.data))}i.draggable=!1}static dragover_handler(e){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect="move"}static dragleave_handler(e){e.preventDefault(),e.stopPropagation(),"SPAN"!==e.target.nodeName&&(e.dataTransfer.dropEffect="move","LI"!==e.target.nodeName&&n.clearAnimation())}static dragenter_handler(e){e.preventDefault(),e.stopPropagation(),"LI"===e.target.nodeName&&"SPAN"!==e.target.nodeName&&(console.log(e.target.nodeName),n.previewDropNode&&n.previewDropNode!==e.target&&n.clearAnimation(),n.previewDropNode=e.target,"LI"===e.target.nodeName&&n.startDragEvent.target!==e.target&&$(e.target).addClass(["animate__animated","animate__wobble","animate__repeat-1"]),e.dataTransfer.dropEffect="move")}static dragstart_handler(e){e.stopPropagation(),n.startDragEvent=e,e.dataTransfer.effectAllowed="move"}}class n extends a{static className=[];static width=0;static height=0;data={name:"",url:"",icon:"",id:"",delete:0};element=void 0;constructor(e){for(let t in super(e),e)t&&(this[t]=e[t]);this.element=document.createElement("li"),this.init()}init(){this.element.draggable=!1,this.element.classList.add(["draggable-element"]),this.data.icon,$(this.element).append(`<span>${this.data.name}</span>`),$(this.element).append('<div class="edit-icon" style="visibility: hidden;"></div>'),$(this.element).append('<div class="delete-icon" style="visibility: hidden;"></div>'),this.element.dataset.id=this.data.id,document.documentElement.style.setProperty("--labelWidth",n.width),document.documentElement.style.setProperty("--labelHeight",n.height),this.element.classList.add(`${n.className}`.replace(","," ")),this.element.addEventListener("dragstart",n.dragstart_handler),a.container?$(a.container).children().last().before(this.element):document.body.appendChild(this.element),this.element.ondrop=n.drop_handler,this.element.ondragover=n.dragover_handler,this.element.ondragenter=n.dragenter_handler,this.element.ondragleave=n.dragleave_handler,a.labelList.push(this)}update(e){e.icon?console.log("icon"):($(this.element).children().filter("span").text(e.name),this.data=e)}}var i={create:e=>{new n({...e})},init:e=>{for(let t in e){if("container"===t){a.container=e[t];continue}t&&(n[t]=e[t])}e.container.ondrop=n.drop_handler,e.container.ondragover=n.dragover_handler,e.container.ondragenter=n.dragenter_handler,e.container.onmouseup=a.mouseUp,e.container.onmousedown=a.mouseDown,e.container.oncontextmenu=e=>{e.preventDefault(),e.stopPropagation()}},Label:n};let r=$(".add-button"),l=$(".edit-window"),d=$(".cancelBtn"),o=$(".confirmBtn"),s=$(".changeBtn"),c=$(".search-frame"),m=l.children().find("input"),u=null;l.addClass("animate__animated");let g=()=>{m.each((e,t)=>{t.value=""})};function p(){r.show(),l.removeClass("animate__backInLeft").addClass("animate__backOutLeft")}r.on("click",()=>{r.hide(),o.show(),s.hide(),g(),l.removeClass("animate__backOutLeft").addClass("animate__backInLeft")}),d.on("click",()=>{p()}),o.on("click",()=>{p();let e={delete:0,id:parseInt(t.findMaxId())+1+""};i.Label.listCount++,m.each((t,a)=>{e[a.name]=a.value}),e.name&&e.url&&(e.url=t.addProtocolToURL(e.url),t.validateUrl(e.icon)||(e.icon=""),t.addData(e),i.create({data:e}))}),s.on("click",()=>{p();let e={};m.each((t,a)=>{e[a.name]=a.value}),e.url=t.addProtocolToURL(e.url);let a={...u?.data,...e};u?.update?.(a),t.updateData(a),g()}),document.addEventListener("globalEvent",function(e){e.stopPropagation(),u=e.detail.instance,e.detail.showWindow?(m.each((t,a)=>{a.value=e.detail.instance.data?.[a.name]||""}),o.hide(),s.show(),l.removeClass("animate__backOutLeft").addClass("animate__backInLeft")):l.hasClass("animate__backInLeft")&&d.click()}),window.addEventListener("keyup",e=>{e.preventDefault(),e.stopPropagation(),"Enter"===e.code&&c.val()&&(window.location.href=`https://www.baidu.com/s?&wd=${c.val()}`)}),t.getSiteData()?.length||t.resetData([{name:"哔哩哔哩~",url:"https://www.bilibili.com",icon:"",id:"0",delete:0},{name:"AcFun",url:"https://www.acfun.cn/",icon:"",id:"1",delete:0}]);let h=t.getSiteData();i.init({container:document.querySelector(".label-list"),width:"80px",height:"80px",className:["label"]}),h.forEach(e=>{i.Label.listCount++,i.create({data:e})})}();