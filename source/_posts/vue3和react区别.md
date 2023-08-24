---
title: vue3和react区别
date: 2023-08-24 15:07:11
tags: [Vue,React]
---

### 响应式数据绑定的实现方式不同
  - vue3使用Proxy api实现，支持动态添加和删除属性，允许开发者在模板中直接使用响应式数据
  - react需要使用setState方法触发视图重新渲染，需要手动将数据传递给组件
  
### 组件渲染方式不同
  - vue3使用template语法
  - react采用jsx语法

### api设计风格不同
  - vue3倾向于提供语法糖和便捷方法
  - react倾向于提供一些基础的api
