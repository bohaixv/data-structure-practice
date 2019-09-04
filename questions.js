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

console.log('更相相减求最大公约数', subtraction(88, 72))