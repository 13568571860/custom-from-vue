import { createApp } from 'vue'
import App from './CustomFrom.vue'
import 'element-plus/dist/index.css'
import './style/index.scss'

createApp(App).mount('#customForm')
// window.b = createApp(App, { readonly: true }).mount('#customForm')

window.CustomForm = App

// window.b.setData({"components":[{"type":"upload","componentType":"表单组件","children":[],"value_modelValue":"upload","value_label":"上传附件","value_isRequired":true,"value_vaild":"","value_listType":"text","value_action":"/fileservice/api/fileUp","value_method":"POST","value_name":"file","value_http_value":"","value_http_header_list":[{"http_header_key":"device","http_header_value":"HL-2M"},{"http_header_key":"X-Authorization-With","http_header_value":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkb21haW4iOiIxNzIuMTcuMjU0LjQ6ODAiLCJleHAiOjE2ODYwNzA5NzQsInVzZXJuYW1lIjoibGl1a2UifQ.1gEjcxfQpia7jdTBRnBZZM1Jh9DBK2AqB12-W4NfUX0"}],"value_http_data_list":[{"http_data_key":"","http_data_value":""}],"value_multiple":false,"value_limit":null,"value_withCredentials":false,"value_showFileList":true,"value_drag":false,"value_accept":null,"value_disabled":false,"value_validateEvent":true}],"common":{"labelWidthModel":"auto","labelWidth":100,"labelPosition":"right","size":"default","padding":"10","componentMargin":10}})

// window.a.setUserData({a: ['选项2'], b: '#AE1B1B', d: 'testtt'})