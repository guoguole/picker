import area from './area'

export const addressOptions = () => {
  let areas = JSON.parse(JSON.stringify(area))
  let province = areas[0]
  province.forEach((item) => {
    item.text = item.name
    delete item.name
  })
  let city = areas[1]
  let cityData = {}
  city.forEach((item) => {
    if (cityData[item.parent]) {
      cityData[item.parent].push({
        value: item.value,
        text: item.name
      })
    } else {
      cityData[item.parent] = [{
        value: item.value,
        text: item.name
      }]
    }
  })
  return {province, cityData}
}
// 年月日
export const yearOptions = () => {
  const date = new Date()
  const year = date.getFullYear()
  let yearsData = []
  for (let i = 83; i > 0; i--) {
    yearsData.push({
      value: (year - i) % 4 === 0 ? '1' : '0',
      text: (year - i) + '年'
    })
  }
  return yearsData
}
const addZero = (num) => num.toString().length === 1 ? '0' + num : num
export const monthOptions = () => {
  let monthData = {'0': [], '1': []}
  for (let i = 1; i < 13; i++) {
    let value = 30
    switch (i) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        value = 31
        break
      case 2:
        value = 28
        break
    }
    monthData['0'].push({
      value,
      text: addZero(i) + '月'
    })
    let data = {
      value,
      text: addZero(i) + '月'
    }
    if (i === 2) data.value = 29
    monthData['1'].push(data)
  }
  return monthData
}
export const dayOptions = () => {
  let dayData = {
    '28': [],
    '29': [],
    '30': [],
    '31': []
  }
  for (let i = 1; i < 32; i++) {
    for (let item in dayData) {
      if (i <= Number(item)) {
        dayData[item].push({
          value: i,
          text: addZero(i) + '日'
        })
      }
    }
  }
  return dayData
}
