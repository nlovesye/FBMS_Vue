---
title: JS继承
date: 2023-08-19 09:12:21
tags: JavaScript
---

**原型链继承**
重写原型对象，代之以一个新类型的实例
缺点：无法传参继承父类的构造函数成员属性，多个实例对引用类型的操作会相互影响

``` JS
function SuperType () {
  this.superProperty = 'super'
}
SuperType.prototype.getSuperProperty = function () {
  return this.superProperty;
}

function SubType () {
  this.subProperty = 'sub'
}

// 关键步骤，创建一个新类型实例，并将该实例赋值给prototype
SubType.prototype = new SuperType();

const subInstance = new SubType();

console.log(subInstance.getSuperProperty()); // 'super'
```

**构造函数继承**
借用构造函数，使用父类的构造函数来增强子类实例，相当于复制父类的实例给子类（不使用原型）
缺点：只能继承父类的实例属性/方法，无法继承父类的原型属性/方法。无法实现复用，每个子类都包含父类实例函数的副本，影响性能。

``` JS
function SuperType () {
  this.colors = ['red', 'blue'];
}

SuperType.prototype.getSuperColors = function () {
  return this.colors;
}

function SubType () {
  // 借用构造函数，可传参
  SuperType.call(this);
}

const ins1 = new SubType();
ins1.colors.push("black");
console.log(ins1.colors); // ['red', 'blue', 'black']

const ins2 = new SubType();
console.log(ins2.colors); // ['red', 'blue']
```

**组合继承**
将原型链继承和构造函数继承组合使用的继承方式

``` JS
function SuperType () {
  this.colors = ['red', 'blue'];
}

SuperType.prototype.getSuperColors = function () {
  return this.colors;
}

function SubType () {
  // 构造函数继承
  SuperType.call(this);
}

// 原型链继承
SubType.prototype = new SuperType();

const ins1 = new SubType();
ins1.colors.push("black");
console.log(ins1.getSuperColors()); // ['red', 'blue', 'black']

const ins2 = new SubType();
console.log(ins2.getSuperColors()); // ['red', 'blue']
```

**原型式继承**

``` JS
function object (o) {
  function F () {}
  F.prototype = o;
  return new F();
}

var person = {
  name: "hello",
  friends: ["heihei", "huanghuang"]
}

var anotherPerson = object(person); // var anotherPerson = Object.create(person);
anotherPerson.name = "nihao";
anotherPerson.friends.push("honghong");

var yetAnotherPerson = object(person); // var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "hi";
yetAnotherPerson.friends.push("baibai");

console.log(person.friends); // ['heihei','huanghuang','honghong','baibai']

// 在不传入第二个参数的情况下，其行为与 object 相同
Object.create(o)
```

**寄生式继承**
和构造函数继承模式类似，由于不能做到函数复用而降低效率

``` JS
function createAnotherPerson (origin) {
  var clone = object(origin); // 通过调用函数创建一个新对象
  clone.sayYes = function () { // 以某种方式增强这个对象
    console.log('yes');
  }
  return clone; // 返回这个对象
}
```

**寄生组合式继承**
只调用了一次父类构造函数，避免在子类prototype上创建不必要的、多余的属性

``` JS
// 原型寄生式继承
function inheritPrototype (subType, superType) {
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function SuperType () {
  this.colors = ['red'];
}
SuperType.prototype.sayColor = function () {
  return this.colors;
}

function SubType () {
  // 构造函数继承
  SuperType.call(this);
  this.name = 'subType';
}
// 原型寄生式继承
inheritPrototype(SubType, SuperType);
SubType.prototype.sayName = function () {
  return this.name;
}
```