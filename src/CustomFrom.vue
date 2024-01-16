<template>
  <div id="customForm_app">
    <formView v-if="props.readonly" ref="formViewRef"></formView>
    <formEdit v-else ref="formEditRef"></formEdit>
  </div>
</template>

<script setup lang="ts">
import formEdit from '@/page/edit/customFormEdit.vue'
import formView from '@/page/views/customFormView.vue'
import { ref, onMounted } from 'vue'
import type { ComponnetsData } from './components/type'

const emit = defineEmits(['load'])

const formEditRef = ref<InstanceType<typeof formEdit> | null>(null)
const formViewRef = ref<InstanceType<typeof formView> | null>(null)

defineExpose({
  exportJSON,
  setData,
  setUserData
})

onMounted(() => {
  emit('load')
})

function exportJSON(): {
  components: ComponnetsData[];
  common: {
    [key: string]: any;
  };
}
function exportJSON(): {[key:string]: string}
function exportJSON() {
  if(props.readonly) return formViewRef.value!.userData
  else return formEditRef.value!.exportJSON()
}
function setData(data: { common: {[key:string]: any}, components: ComponnetsData[] }) {
  formEditRef.value?.setData(data)
  formViewRef.value?.setData(data)
}
function setUserData(data: {[key:string]: any}) {
  formViewRef.value?.setUserData(data)
}

interface Props {
  readonly: boolean
}
const props = withDefaults(defineProps<Props>(), {
  readonly: () => false
})

</script>

<style lang="scss" scoped>
#customForm_app {
  height: 100%;
  // display: flex;
  background: #fff;
}
</style>

<style>#customForm{height:100%;}</style>