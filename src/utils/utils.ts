export function delObjectFromArray(arr: any[], obj: any, children = 'children', id?: string) {
  arr = arr.filter(r => {
    if(r[children]) r[children] = delObjectFromArray(r[children], obj, children, id)
    if(id) return r[id] !== obj[id]
    else return r !== obj
  })
  return arr
}

export function computedUserData(data: { [key:string]: any }, values: { [key:string]: string }) {
  const exp = values.formula.replace(/\{[^}]+\}/g, function(reg) {
    const key = reg.replace(/\{([^}]+)\}/, '$1')
    return data[key]
  })
  return data[values.bindKey] = eval(exp)
}

// 格式化时间2016-01-02 00:00:00
export function formatDateShow(date: string | number | Date, showTime: string): string
export function formatDateShow(date: string | number | Date, showTime: boolean): string
export function formatDateShow(date: string | number | Date, showTime: undefined): string
export function formatDateShow(date: string | number | Date, showTime?: string | boolean): string {
  const th:Date = new Date(date)
  const year:number = th.getFullYear()
  let month:number | string = th.getMonth() + 1
  let day:number | string = th.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (showTime) {
    if (showTime == 'HH:MM') {
      let hours:number | string = th.getHours()
      let minu:number | string = th.getMinutes()
      let sec:number | string = th.getSeconds()
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minu < 10) {
        minu = '0' + minu
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      return `${year}-${month}-${day} ${hours}:${minu}`
    } else {
      let hours:number | string = th.getHours()
      let minu:number | string = th.getMinutes()
      let sec:number | string = th.getSeconds()
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minu < 10) {
        minu = '0' + minu
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      return `${year}-${month}-${day} ${hours}:${minu}:${sec}`
    }
  } else {
    return `${year}-${month}-${day}`
  }
}

export function getValue<T, K extends keyof T>(o: T, k: K): T[K] {
  return o[k]
}
