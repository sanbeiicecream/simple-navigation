function addFormat(){
    $(".add").css("visibility", "visible")
    $(".add").attr("style","opacity: .3;")
}
function addSiteFormat(){
    setTimeout(()=>{
        $(".url").val("")
        $(".name").val("")
    },150)
    $(".add").removeClass("add-window-animation-display")
    $("#add-window").addClass("add-window-animation-hidden")
}

function addSiteAnimation(){
    $("#add-window").css("visibility", "visible")
    $("#add-window").removeClass()
    $("#add-window").removeClass("add-window-animation-hidden")
    $("#add-window").addClass("add-window-animation-display")
    // TODO 添加蒙版效果
}
function editSite(dataIndex){
    let siteArray = getValueAndNameByIndex(dataIndex)
    $(".name").val(siteArray[0])
    $(".url").val(siteArray[1])
    $(".confirmButton").text("修改").addClass("changeButton").removeClass("confirmButton")
    addSiteAnimation()
    $("#add-window").attr("data-id", dataIndex)
}

function changeSite(){
    let siteName = $(".name").val()
    let siteUrl = $(".url").val()
    if(siteName && siteUrl){
        let siteArray = []
        if($(".url").val().indexOf("http") === -1){
            siteArray = [$(".name").val(), "https://" + $(".url").val()]
        }else{
            siteArray = [$(".name").val(), $(".url").val()]
        }
        addFormat()
        $(".name").val("")
        $(".url").val("")
        editLocalStorage(siteArray, $("#add-window").data("id"))
    }
}

function getValueAndNameByIndex(index){
    let siteData = JSON.parse(localStorage.getItem("siteData"))
    return [siteData[index], siteData[index + 1]]
}


function addLocalStorage(siteArray){
    let siteData = JSON.parse(localStorage.getItem("siteData"))
    if(siteArray !== null){
        if(siteData !== null){
            siteData.push.apply(siteData,siteArray)
            localStorage.setItem("siteData", JSON.stringify(siteData))
        }else{
            localStorage.setItem("siteData", JSON.stringify(siteArray))
        }
    }
}

function getSiteIndexByName(name){
    let siteData = JSON.parse(localStorage.getItem("siteData"))
    return siteData.lastIndexOf(name)
}

function editLocalStorage(siteArray, index){
    let siteData = JSON.parse(localStorage.getItem("siteData"))
    siteData[index] = siteArray[0]
    siteData[index + 1] = siteArray[1]
    localStorage.setItem("siteData" , JSON.stringify(siteData))
}

function removeLocalStorage(deleteArray) {
    let siteData = JSON.parse(localStorage.getItem("siteData"))
    deleteArray.sort((x, y) => {
        return y - x
    })
    
    for (let i = 0; i < deleteArray.length; i++) {
        siteData.splice(deleteArray[i], 2)
    }
    localStorage.setItem("siteData", JSON.stringify(siteData))
}

export {addFormat,addSiteFormat,addSiteAnimation,editSite, changeSite, addLocalStorage,getSiteIndexByName, editLocalStorage,removeLocalStorage,getValueAndNameByIndex }