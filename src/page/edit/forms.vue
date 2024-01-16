<template>
  <ul class="forms">
    <li class="drap" v-for="(value, key) in myComponents" :key="key" >
      <h3>{{key}}</h3>
      <div class="components">
        <div class="component" v-for="item in value" :key="item.type" draggable="true" @dragstart="dragstart(item)" @dragend="dragend">
          <p class="img" v-html="renderIcon(item)"></p>
          <p class="title">{{item.title}}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="tsx">
import * as uuid from 'uuid'
import myComponents from '@/components'
import type { ComponentClass } from '@/components/type'

const emit = defineEmits(['dragstart', 'dragend'])

function renderIcon(data: ComponentClass) {
  return `<i class="iconfont">${data.icon}</i>`
}
function dragstart(data: ComponentClass) {
  // @ts-ignore
  const component = new data()
  component.id = uuid.v1()
  component.toggleDrag(true)
  emit('dragstart', component)
}
function dragend() {
  emit('dragend')
}

</script>

<style>
@import url('@/icon/index');
</style>
<style lang="scss" scoped>
.forms {
  height: 100%;
  width: 200px;
  border-right: 1px solid $border;
  li {
    width: 200px;
    padding: 10px;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    h3 {
      margin-bottom: 10px;
    }
    .components {
      display: grid;
      grid-template-columns: repeat(2, 50%);
      .component {
        p {
          text-align: center;
        }
        .img {
          font-size: 28px;
          line-height: 1.5;
        }
      }
      .component:hover {
        background: $theme;
        color: #fff;
      }
    }
  }
}
</style>