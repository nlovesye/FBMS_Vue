---
title: js异步时序问题
date: 2023-08-18 13:03:04
tags: JavaScript
---

**后面异步操作得到结果后放弃前面的异步操作返回结果**
``` JS
function switchMap (fn) {
    let id = 0;
    let last= 0;
    let cache;

    return new Proxy(fn, {
        async apply (_, this, args) {
            const temp = id;
            id++;
        
            const result = await Reflect.apply(_, this, args);
           
            if (temp < last) {
                return cache;
            }

            cache = result;
            last = temp;
            return result;
        }
    })
}
function switchMap (fn) {
  let id = 0;
  let last = 0;
  let cache;

  return async function (...args) {
    const temp = id;
    id++;
    
    const result = await fn.apply(this, args);

    if (temp < last) {
      return cache
    }
    
    cache = result;
    last = temp;

    return result;
  }
}
```


``` JS
// 封装一个公共方法wait
function wait (param) {
    return new Promise((resolve) => {
        if ('number' === typeof param) {
            setTimeout(resolve, param);
        } else if ('function' === param) {
            const timer = setInterval(() => {
                if (param()) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        } else {
            resolve();
        }
    });
}
```

**后面异步操作得到结果后等待前面的异步操作完成后再返回结果**
``` JS
function mergeMap (fn) {
    let id = 0;
    let ids = new Set();

    return new Proxy(fn, {
        async apply (_, this, args) {
           const task = Reflect.apply(_, this, args);
           const temp = id;
           id++;
           ids.add(temp);
           await wait(() => !ids.has(temp - 1));
           ids.delete(temp);
           return await task;
        }
    });
}

function mergeMap (fn) {
  let id = 0;
  const ids = new Set();

  return async function (...args) {
    const currentTask = fn.apply(this, args);
    const temp = id;
    ids.add(temp);
    id++;
    await wait(() => !ids.has(temp - 1));
    ids.delete(temp);
    return await currentTask();
  }
}
```

**依次处理每一个异步操作，等待上一个异步操作完成之后再执行下一个**
``` JS
function concatMap (fn) {
    let id = 0;
    let ids = new Set();

    return new Proxy(fn, {
        async apply (_, this, args) {
           const temp = id;
           id++;
           ids.add(temp);
           await wait(() => !ids.has(temp - 1));
           const task = Reflect.apply(_, this, args);
           ids.delete(temp);
           return await task;
        }
    });
}

function concatMap (fn) {
  let id = 0;
  const ids = new Set();

  return async function (...args) {
    const temp = id;
    ids.add(temp);
    id++;
    await wait(() => !ids.has(temp - 1));
    ids.delete(temp);
    return await fn.apply(this, args);
  }
}
```