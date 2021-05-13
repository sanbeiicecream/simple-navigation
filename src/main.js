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