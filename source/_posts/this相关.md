---
title: this相关
date: 2023-08-18 13:03:04
tags:
---
1.运行时确定，绝大多数情况函数的调用方式决定了this的值
2.this关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象
3.通过new实例构造函数，此时this指向new构造函数生成的实例对象；
4.在严格模式和非严格模式有区别

默认绑定：浏览器中默认指向window

隐式绑定：
``
var msg = "global msg";
function test () {
    console.log(this.msg)
}
const obj = {
    msg: "obj msg";
}
obj.test = test;
test(); // "global msg"
obj.test(); // "obj msg"
``

new绑定：
通过new实例构造函数，此时this指向new构造函数生成的实例对象；

如果构造函数返回一个对象，则this指向返回的对象
如果构造函数返回一个简单类型数据或者null，则this指向实例对象

显式绑定:
call、apply、bind

es6提供了箭头函数，使我们在书写代码的时候就能确定this指向

优先级：new绑定>显式绑定>隐式绑定>默认绑定