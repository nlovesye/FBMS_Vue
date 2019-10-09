<template>
  <div id="app">
    <router-view class="root-view" />
  </div>
</template>

<script>
import source from './source.json'
import { arrToTree } from './utils'
export default {
  data () {
    return {}
  },
  methods: {
    format (data) {
      let parents = data.filter(item => !item.parent).map(item => ({ parent: item.parent || null, label: item.name, value: item.value }))
      let children = data.filter(item => item.parent).map(item => ({ parent: item.parent || null, label: item.name, value: item.value }))
      let translator = (parents, children) => {
        parents.forEach((parent) => {
          children.forEach((current, index) => {
            if (current.parent === parent.value) {
              let temp = JSON.parse(JSON.stringify(children))
              temp.splice(index, 1)
              translator([current], temp)
              typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
            }
          }
          )
        }
        )
      }
      translator(parents, children)
      return parents
    }
  },
  mounted () {
    // console.log('app实例：', this)
    // console.log('source', source)
    const result = arrToTree(source)
    console.log('result', result)
    // const result2 = this.format(source)
    // console.log('result2', result2)
  }
}
</script>

<style lang="less" src="@style/common.less"></style>
