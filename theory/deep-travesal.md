## 深度优先

> 深度优先是一种思维，即从某个状态开始，不断的转移状态直到无法转移为止，然后退回到前一步的状态继续转移到其他状态，如此不断重复

下面我将从两种方式实现深度优先的概念，分别通过循环还有递归的方式。讲道理，深度优先递归更容易实现和理解

> 题目：给定整数a1、a2、a3、... an，判断是否可以从中寻出若干数，使它们的和恰好为k

1. 循环
循环的方式其实很有意思，我们可以利用栈的先入后出的特性，能够帮我们记住上一步是什么东西
```js
function isExist(elements, target) {
  const queue = []
}
```

2. 递归
递归就很简单了
```js
function isExist(elements, target) {
  function recur(index, sum = 0) {
    if(index === elements.length - 1) return sum === target

    return recur(index + 1, sum + elements[index])
     || recur(index + 1, sum)
     || false
  }

  return recur(0 , 0)
}
```