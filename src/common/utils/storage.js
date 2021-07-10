// 本地存储

// 存储数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 对数据进行转换，转换成JSON成功返回转换后的数据，转换失败返回原数据
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
