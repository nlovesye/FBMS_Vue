---
title: cookies,sessionStorage,localStorage区别
date: 2023-08-24 08:38:08
tags: 浏览器
---

## 共同点

都是保存在浏览器端，且同源的

## 区别

cookies数据始终在同源的http请求中携带，即在浏览器和服务器间来回传递，而sessionStorage
和localStorage不会自动发送给服务器，只在本地保存；cookies还有路径的概念，可以限制只术语某个路径下。存储大小限制也不同，不能超过4k，同时每次http请求都会携带cookie，所以只适合保存很小的数据如会话标识等。

  1. 存储大小不同 - sessionStorage和localStorage也有存储大小限制，单比cookie大得多，可以达到5m或更大。
  2. 数据有效期不同 - sessionStorage在当前会话关闭前有效，localStorage长期有效，浏览器关闭也一直保存，可用作持久数据，cookie只在设置的cookie过期时间之前一直有效，即使浏览器或者窗口关闭
  3. 作用域不同 - sessionStorage不在不同的浏览器窗口共享，即使是同一个页面；localStorage在所有同源窗口中共享；cookie也是在所有同源窗口中共享。webStorage支持时间通知机制，可以将数据更新的通知发送给监听者。

   
  
