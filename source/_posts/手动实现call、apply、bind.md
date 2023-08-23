---
title: 手动实现call、apply、bind
date: 2023-08-18 13:03:04
tags: JavaScript
---

``` JS
  Function.prototype.myCall = function myCall(context, ...args) {
      context = context || window;
      const symbol = Symbol();
      context[symbol] = this;
      const result = context[symbol](...args);
      delete context[symbol];
      return result;
  }

  Function.prototype.myApply = function myApply(context, args) {
      context = context || window;
      const symbol = Symbol();
      context[symbol] = this;
      const result = context[symbol](...args);
      delete context[symbol];
      return result;
  }

  Function.prototype.myBind = function myBind(context, ...args) {
      context = context || window;
      context.fn = this;
    
      return function bd () {
          if (this instanceof newFn) {
              return new context.fn(...args, ...argument);
          }
          return context.fn(...args, ...argument);
      }
  }
```
