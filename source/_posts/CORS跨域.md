---
title: CORS跨域
date: 2023-08-23 16:21:41
tags: [JavaScript,http,浏览器]
---

## **CORS即Cross Origin Resource Sharing(跨来源资源共享)**

CORS可以分成两种：

### 简单请求
  
  http方法是下列之一
  
    > HEAD
    > GET
    > POST

  HTTP头信息不超出以下几种字段
  
    > Accept
    > Accept-Language
    > Content-Type
    > 但仅能是下列之一
    >> application/x-www-form-urlencoded
    >> multipart/form-data
    >> text/plain
  
  任何一个不满足上述要求的请求，即被认为是复杂请求。一个复杂请求不仅有：包含通信内容的请求，同时也包含预请求。

  简单请求的发送从代码上看和普通的xhr没太大区别，但是HTTP头当中要求总是包含一个域（Origin）的信息。该域包含写一名、地址以及一个可选的端口。不过这一项实际上由浏览器代为发送，并不是开发者代码可以触及到的。

  简单请求的部份响应头及解释：

    > Access-Control-Allow-Origin(必含) - 不可省略，否则请求按失败处理。该项控制数据的可见范围，如果希望数据对任何人都可见，可以填写"*"。
    > Access-Control-Allow-Credentials(可选) - 该项标志请求当中是否包含cookies信息，只有一个可选值：true(必须小写)。如果不包含cookies，略去该项，而不是填false。这一项与XmlHttpRequest2对象当中的withCredentials属性应保持一致，即withCredentials为true时该项也为true，为false时省略该项不写。反之则导致请求失败。
    >
    > Cache-Control
    > Content-Language
    > Content-Type
    > Expires
    > Last-Modified
    >
    > 当你需要访问额外的信息时，就需要在这一项当中填写并以逗号进行分隔

  cors的复杂请求令cors显得更加有用。比如需要**发送PUT、DELETE等HTTP动作，或者发送Content-Type: application/json的内容**

### 复杂请求
  
  复杂请求表面上和简单请求使用上差不多，但实际上浏览器发送了不止一个请求。其中最先发送的是一种“预请求”，服务端也需要返回“预响应”作为响应。预请求实际上是对服务端的一种权限请求，只有当预请求成功返回，实际请求才开始执行。

  **预请求以OPTIONS形式发送**，当中同样包含域，并且还包含了两项cors特有的内容：

    > Access-Control-Request-Method - 实际请求的种类，可以是 GET、POST之类的简单请求，也可以是PUT、DELETE等等。
    > Access-Control-Request-Headers - 以逗号分隔的列表，复杂请求所使用的头部。

    在预响应返回的内容当中，服务端应当对这两项进行回复，以让浏览器确定请求是否能够成功完成。

    复杂请求的部份响应头及解释：

    > Access-Control-Allow-Origin(必含) - 和简单请求一样，必须包含一个域
    > Access-Control-Allow-Methods(必含) - 对预请求当中**Access-Control-Request-Method**的回复，以逗号分隔的列表。服务端可以返回所有允许的方法，以便客户端将其缓存。
    > Access-Control-Allow-Headers(当预请求中包含**Access-Control-Request-Headers**时必须包含) - 对预请求当中**Access-Control-Request-Headers**的回复，以逗号分隔的列表，可以返回所有支持的头部。一时可能不能完全写出来，所以可以通过request的header可以取到Access-Control-Request-Headers，把对应的value设置到Access-Control-Request-Headers即可。
    > Access-Control-Allow-Credentials(可选) - 和简单请求当中作用相同
    > Access-Control-Max-Age(可选) - 以秒为单位的缓存时间。预请求的发送并非免费午餐，允许时应当尽可能缓存。

  一旦预响应如期而至，所请求的权限也满足，则实际请求开始发送。

  目前大部分浏览器已经支持完整的cors，ie直到ie11才完美支持，所以对于pc网站，建议采用其他的解决方案，如果仅仅是移动端，大可放心使用。
