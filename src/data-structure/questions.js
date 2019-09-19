/**
 * 链表是否为环   快慢指针   slowPoint 速度为1 fastPoint 速度为2  肯定会相遇的
 */

function Node (value) {
  this.value = value
  this.next = null
}

function isCycle (link) {
  let fastPoint = link
  let slowPoint = link

  while (fastPoint && fastPoint.next) {
    fastPoint = fastPoint.next.next
    slowPoint = slowPoint.next
    if (fastPoint === slowPoint) {
      return true
    }
  }

  return false
}

const linkList = new Node(1)
const node1 = new Node(2)
const node2 = new Node(3)
const node3 = new Node(4)
const node4 = new Node(5)
const node5 = new Node(6)
const node6 = new Node(7)
const node7 = new Node(8)
const node8 = new Node(9)

linkList.next = node1
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node6
node6.next = node7
node7.next = node8
node8.next = node4

// console.log('is cycle link list :', isCycle(linkList))

/**
 * 判断链表环的长度   追击问题
 */

function getLinkCycleLength (link) {
  let fast = link
  let slow = link
  let length = 0
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        length++
        if (slow === fast) return length
      }
    }
  }

  return length
}

// console.log('link cycle length :', getLinkCycleLength(linkList))

/**
 * 获取链表环的重复节点   追击问题  通过画图可以得出相关的结论
 */

function getCycleRepeatNode (link) {
  let fast = link
  let slow = link

  let encounter
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next

    if (slow === fast) {
      encounter = fast
      break
    }
  }

  slow = link

  while (encounter !== slow) {
    encounter = encounter.next
    slow = slow.next
  }

  return encounter
}

// console.log('出入节点为：', getCycleRepeatNode(linkList))


/**
 * 定义一个栈，入栈和出栈的时间复杂度是O(1)，同时拥有一个getMin函数，该函数的时间复杂度也是1
 */

class MinStack {
  constructor () {
    this.stack = []
    this.minStack = []
  }

  push (value) {
    this.stack.push(value)

    if (this.minStack.length && this.minStack[this.minStack.length - 1] > value || !this.minStack.length) {
      this.minStack.push(value)
    }
  }

  pop () {
    const value = this.stack.pop()
    if (value === this.minStack[this.minStack.length - 1]) this.minStack.pop()
  }

  getMin () {
    return this.minStack[this.minStack.length - 1]
  }
}


const stack = new MinStack()
stack.push(10)
stack.push(6)
stack.push(3)
stack.push(5)
stack.push(8)

stack.pop()
stack.pop()
stack.pop()

// console.log('最小栈的最小值是', stack.getMin())


/**
 * 求最大公约数
 */

function getMaxConventionNumber (num1, num2) {
  let big, small
  if (num1 > num2) {
    big = num1
    small = num2
  } else {
    big = num2
    small = num1
  }

  for (let i = Math.floor(small / 2); i <= small / 2; i--) {
    if (big % i === 0 && small % i === 0) {
      return i
    }
  }

  return false
}

// console.log('max convention number: ', getMaxConventionNumber(33, 77))

/**
 * 欧几里得最大公约数
 */
function euclidMaxConventionNumber (num1, num2) {
  if (num1 === 1 || num2 === 1) return 1

  const flag = num1 > num2

  let remainder
  if (flag) {
    remainder = num1 % num2
  } else {
    remainder = num2 % num1
  }

  if (remainder === 0) return flag ? num2 : num1
  return euclidMaxConventionNumber(flag ? num2 : num1, remainder)
}

// console.log('euclid max convention number:', euclidMaxConventionNumber(9, 12))


/**
 * 更相减损术  和欧几里得类似   就是互相想减 直到为0 时的结果为最大公约数
 */
function subtraction (num1, num2) {
  if (num1 === num2) return num1
  const max = num1 > num2 ? num1 : num2
  const min = num1 > num2 ? num2 : num1

  return subtraction(max - min, min)
}

// console.log('更相相减求最大公约数', subtraction(88, 72))


/**
 * 判断一个数字是否是2的n次幂   这里考虑一下位运算  与或非
 */

function isBinaryPower (n) {
  return (n & (n - 1)) === 0
}


/**
 *  寻找无序数组中排序之后相邻元素的最大值  采用的是桶排序算法实现的
 */
function findBigDiffer (array) {
  class bucketItem {
    constructor () {
      this.min = void 0
      this.max = void 0
      this.hasNothing = true
    }

    add (value) {
      this.hasNothing = false
      if ((this.max === undefined ? this.max = value : this.max) < value) this.max = value
      if ((this.min === undefined ? this.min = value : this.min) > value) this.min = value
    }
  }

  let min, max

  for (let i = 0; i < array.length; i++) {
    if ((max === undefined ? max = array[i] : max) < array[i]) max = array[i]
    if ((min === undefined ? min = array[i] : min) > array[i]) min = array[i]
  }

  const differ = max - min
  const bucketCapacity = array.length
  const bucket = []

  for (let i = 0; i < bucketCapacity; i++) {
    bucket.push(new bucketItem())
  }

  for (let i = 0; i < array.length; i++) {
    const index = Math.floor((array[i] - min) / differ * (bucketCapacity - 1))
    bucket[index].add(array[i])
  }

  let diff = 0
  for (let i = 0; i < bucket.length - 1; i++) {
    while (bucket[i].hasNothing) {
      i++
    }

    const min = bucket[i]

    while (bucket[i + 1].hasNothing) {
      i++
    }
    const max = bucket[i + 1]

    const diffTmp = max.min - min.max

    diff = diffTmp > diff ? diffTmp : diff
  }

  return diff

}

findBigDiffer([6, 3, 9, 34, 78, 6, 10])


/*
 * 栈实现队列
 */
class queueBaseOnStack {
  constructor () {
    this.forwardStack = []
    this.reverseStack = []
  }

  pushQueue (value) {
    this.forwardStack.push(value)
  }

  outQueue () {
    while (this.forwardStack.length) {
      this.reverseStack.push(this.forwardStack.pop())
    }

    return this.reverseStack.pop()
  }
}

const a = new queueBaseOnStack()


/**
 * 找出一个数字的重排的下一位数字  // 未完成。  以后完善。  没有耐心了。 抱歉
 * 
 */
function getNextReorderNumber (number) {
  function valid (strs) {
    let i = 0

    while (i < strs.length - 1) {
      if (strs[i] < strs[i + 1]) return false
      i++
    }

    return true
  }

  function convert (array) {
    let sample = array[0]
    let tmp
    let index

    for (let i = 1; i < array.length; i++) {
      if (tmp !== undefined) {
        if (sample < array[i] && array[i] < tmp) {
          tmp = array[i]
          index = i
        }
      } else {
        if (sample < array[i]) {
          tmp = array[i]
          index = i
        }
      }
    }

    tmp = array[index]
    array[index] = array[0]
    array[0] = tmp

    return array
  }



  const arr = String(number).split('')
  let index = -2

  while (index + arr.length !== 0) {
    const subArr = arr.slice(index)

    if (!valid(subArr)) break

    index--
  }
}


/**
 * 数字n 去掉k个数字保证最终数字尽量小
 */
function getMinNumber (n, k = 1) {
  const strs = String(n).split('')
  let mutateIndex
  for (let i = 0; i < strs.length; i++) {
    mutateIndex = i

    if (strs[i] > strs[i + 1]) break
  }

  const result = (strs.splice(mutateIndex, 1), strs).join('')
  return k === 1
    ? result
    : getMinNumber(result, k - 1)
}

function getMinNumberQueue (n, k = 1) {
  const strs = String(n).split('')
  const queue = []

  const count = countGenarator(k)

  for (let i = 0; i < strs.length; i++) {
    queue.push(strs[i])
    while (queue[queue.length - 1] > strs[i + 1] && count()) {
      queue.pop()
    }
  }

  while (count()) {
    queue.pop()
  }

  const result = queue.join('')
  return result
}

function countGenarator (n = 1) {
  let number = n
  return function _count () {
    number--
    if (number >= 0) return true
    return false
  }
}

/**
 * 加法运算
 */
function addition (a, b) {
  const numberOne = String(a).split('')
  const numberTwo = String(b).split('')

  const result = []
  let additive = 0

  while (numberOne.length || numberTwo.length) {
    const one = numberOne.pop() || 0
    const two = numberTwo.pop() || 0
    const sum = +one + +two + additive
    const currentNumber = sum % 10

    additive = sum >= 10 ? 1 : 0
    result.unshift(currentNumber)
  }

  if (additive) result.unshift(additive)

  return result.join('')
}

console.log(addition('99999', '11118645431'))
