const debounce = (fn, time = 500, immediate = false) => {
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


export { debounce }