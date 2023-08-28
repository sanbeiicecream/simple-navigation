function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function addProtocolToURL(url, protocol = 'http') {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `${protocol}://${url}`;
  }
  return url;
}

function generateUUID() {
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return uuid;
}

function debounce(fn, time = 500, immediate = false) {
  let flag = true;
  let first = true
  return (...arg) => {
    if (immediate && first) {
      fn.apply(this, arg)
      first = false
    }
    if (flag) {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        fn.apply(this, arg)
        flag = true
      }, time)
      flag = false
    }
  }
}

// ⬇️ siteData数据操作
let updateFlag = false

function getSiteData() {
  let siteData = null
  return (() => {
    if (siteData && !updateFlag) {
      return siteData
    } else {
      siteData = JSON.parse(localStorage.getItem('siteData') || '[]')
      updateFlag = false
      return siteData
    }
  })()
}

function getValueAndNameById(id) {
  let siteData = getSiteData()
  return siteData.find(item => item.id === id)
}

function getSiteIndexByName(name) {
  let siteData = getSiteData()
  return siteData.lastIndexOf(name)
}

function addData(siteObj) {
  const siteData = getSiteData()
  siteData.push(siteObj)
  localStorage.setItem('siteData', JSON.stringify(siteData))
  updateFlag = true
}

function resetData(data) {
  let cacheData
  if (typeof data === 'object' && data.toString() === '[object Object]') {
    cacheData = Object.values(data).map(item => item.data)
  } else if (Array.isArray(data)) {
    cacheData = data
  } else {
    return
  }
  localStorage.setItem('siteData', JSON.stringify(cacheData))
  updateFlag = true
}

function updateData(siteObj) {
  let siteData = getSiteData()
  if (!Object.keys(siteData).some(item => siteData[item] !== siteObj[item])) {
    return
  }
  const index = siteData.findIndex(item => item.id === siteObj.id)
  siteData.splice(index, 1, siteObj)
  localStorage.setItem('siteData', JSON.stringify(siteData))
  updateFlag = true
}

function removeById(id) {
  let siteData = getSiteData()
  const index = siteData.findIndex(item => item.id === id)
  siteData.splice(index, 1)
  localStorage.setItem('siteData', JSON.stringify(siteData))
  updateFlag = true
}

function findMaxId() {
  let maxId = null
  return (() => {
    if (maxId !== null && !updateFlag) {
      return maxId
    } else {
      maxId = getSiteData().sort((a, b) => (b.id - a.id))?.[0]?.id || -1
      return maxId
    }
  })()
}


export default {
  validateUrl, getSiteData, getValueAndNameById, addData, getSiteIndexByName,
  updateData, removeById, generateUUID, findMaxId, addProtocolToURL, resetData, debounce
}