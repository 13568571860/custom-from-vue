import type Components from './type'

let imports: Record<string, any> = import.meta.glob('@/components/*.ts', { eager: true })
const compoents: Components = {}
Object.keys(imports).forEach(item => {
  if(item === '/src/components/type.ts') return
  const component = imports[item]
  if(typeof component.default !== 'function') return console.warn(`This must is a function, but ${item} is a ${typeof component.default}`)
  if(!component.default.componentType) return console.warn(`${item} is not classified.`)
  if(compoents[component.default.componentType]) compoents[component.default.componentType].push(component.default)
  else compoents[component.default.componentType] = [component.default]
  // compoennts.push(component.default)
})

export default compoents
