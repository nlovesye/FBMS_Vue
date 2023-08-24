---
title: forin和forof
date: 2023-08-24 15:19:47
tags: JavaScript
---

**for in遍历的是数组的索引，for of遍历的是数组的元素值。所以for in更适合遍历对象**

for in遍历的是对象的属性名，再是对象原型中的属性和方法。

for of遍历的是数组的元素值，不包括数组原型上的属性和方法，不能遍历对象，适用遍历数组对象，字符串，map，set等有迭代器对象的集合。