---
title: JS判断类型
date: 2023-08-23 08:41:51
tags: JavaScript
---

1. typeof
  返回的结果：number,boolean,symbol,string,object,undefined,function
  - 对于基本类型，除null外，均可返回正确的结果
  - 对于引用类型，除function外，一律返回object类型
  - 对于null，返回object类型
  - 对于function返回function类型

2. instanceof
  检测的是原型，判断A是否是B的实例，表达式为 A instanceof B，针对准确判断数组问题，es5提供了Array.isArray()方法用以确认某个对象是否是Array类型。
  ``` JS
  // 模拟instanceof执行过程
  instanceof (a, b) {
    const left = a.__proto__;
    const right = b.prototype;
    if (left === right) {
      return true;
    }
    return false;
  }
  ```

3. Object.prototype.toString.call
  ``` JS
   Object.prototype.toString.call('') ;   // [object String]
   Object.prototype.toString.call(1) ;    // [object Number]
   Object.prototype.toString.call(true) ; // [object Boolean]
   Object.prototype.toString.call(Symbol()); //[object Symbol]
   Object.prototype.toString.call(undefined) ; // [object Undefined]
   Object.prototype.toString.call(null) ; // [object Null]
   Object.prototype.toString.call(new Function()) ; // [object Function]
   Object.prototype.toString.call(new Date()) ; // [object Date]
   Object.prototype.toString.call([]) ; // [object Array]
   Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
   Object.prototype.toString.call(new Error()) ; // [object Error]
   Object.prototype.toString.call(document) ; // [object HTMLDocument]
   Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
  ```

1. constructor
  ``` JS
  var f = new F();
  console.log(f.constructor == F); // true
  ```
