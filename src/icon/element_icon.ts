import * as icons from '@element-plus/icons-vue'
import { markRaw } from 'vue'

export default Object.values(icons).map(item => ({
  icon: markRaw(item),
  key: item.name,
  label: item.name
}))
