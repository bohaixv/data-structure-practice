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
 * 加法运算   // 优化方式： 我们没有必要将每个数字挨个拆分出来。可以将找出当前程序可以存储的最大位数。按照该位数进行拆分
 * javascript中最大安全整数是 2^53 - 1  这个数
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

/**
 * 金矿问题 动态规划
 * w 总共有多少人
 * p[] 金矿所需人
 * g[] 金矿对应kg
 * n 可选金矿数量
 */
function makeMoreGold (w, p, g, n) {
  if (w === 0 || n === 0) return 0
  if (w < p[n - 1]) return makeMoreGold(w, p, g, n - 1)

  return Math.max(makeMoreGold(w, p, g, n - 1), makeMoreGold(w - p[n - 1], p, g, n - 1) + g[n - 1])
}
/**
 * 因为递归的话会做很多无用的计算，所以有了一个带有缓存的版本 cache version
 */
function makeMoreGoldCache (personCount, goldNeedPeoples, goldValues, goldCount) {
  const result = new Array(goldCount + 1)
    .fill(null)
    .map(item => new Array(personCount + 1).fill(0))

  for (let i = 1; i <= goldCount; i++) {
    for (let j = 1; j <= personCount; j++) {
      if (j < goldNeedPeoples[i - 1]) {
        result[i][j] = result[i - 1][j]
      } else {
        result[i][j] = Math.max(result[i - 1][j], result[i - 1][j - goldNeedPeoples[i - 1]] + goldValues[i - 1])
      }
    }
  }

  return result[goldCount][personCount]
}

/**
 * 进一步优化上部分的动态规划阿  
 * 这个就很有灵性了啊。  
 * 因为我们在求下一个状态的时候都是依赖着上一层的状态，只是依赖上一层的状态，所以没必要保持整个的数据结构
 * 所以我们只保证一层数据就ok了  
 */
function makeMoreGoldCacheOptimazition (personCount, goldNeedPeoples, goldValues, goldCount) {
  const result = new Array(personCount + 1).fill(0)

  for (let i = 1; i <= goldCount; i++) {
    for (let j = personCount; j >= 1; j--) {
      if (j >= goldNeedPeoples[i - 1]) {
        result[j] = Math.max(result[j], result[j - goldNeedPeoples[i - 1]] + goldValues[i - 1])
      }
    }
  }

  return result[personCount]
}

const goldNeedPeople = [5, 5, 3, 4, 3]
const goldStack = [400, 500, 200, 300, 350]
const peopleCount = 10
console.log(makeMoreGoldCacheOptimazition(peopleCount, goldNeedPeople, goldStack, goldStack.length))

/**
 * 动态规划
 * 将一个数组分成两部分，两部分的sum 相等   // 存在问题
 */
function splitArrayIntoTwoPartion (array) {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }
  if (sum % 2 !== 0) return false


  return equalitable(array, sum / 2)
}

/**
 * array 包含的数字
 * sum 限制量
 * n 可以放的数量
 */
function equalitable (array, sum, n = array.length) {
  if (sum === 0) return true
  if (n === 0) return false

  if (sum < array[n - 1]) return equalitable(array, sum, n - 1)

  return equalitable(array, sum, n - 1) || equalitable(array, sum - array[n - 1], n - 1)
}
// console.log(splitArrayIntoTwoPartion([10, 20, 30, 40, 50]))

/**
 * 例子： 给出一个字符串'ababd'  output ：aba || bab  找出字符串中最长的回文
 */
function longestPalindrome (str, left, right, result) {
  if (left === right) return
  const subStr = str.slice(left, right)
  if (validPalind(subStr)) {
    if (subStr.length === 1 || subStr.length === 0) return
    result.push(str.slice(left, right))
  }

  longestPalindrome(str, left + 1, right, result)
  longestPalindrome(str, left, right - 1, result)
}

function validPalind (str) {
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str.charAt(i) !== str.charAt(str.length - 1 - i)) return false
  }
  return true
}


// const result = []
// const str = 'abacdfgdcaba'
// longestPalindrome(str, 0, str.length, result)

/**
 * 判断字符串是否是回文
 * 动态规划版
 */
function dynamicPalindrome (strs, si, sj) {
  if (si === sj) return true
  if (si + 1 === sj) {
    return strs[si] === strs[sj]
  }

  return dynamicPalindrome(strs, si + 1, sj - 1) && strs[si] === strs[sj]
}

// console.log(result)

/**
 * 给出一个数组，有一个数字只重复一次，其他数字都是重复了两次。 找出重复一次的数字
 */
function findUniqueRepeatOnce (array) {
  return array.reduce((pre, next) => pre ^ next)
}

/**
 * 给出一个数字，有两个数字只重复一次，其他数字都是重复了两次，找出这两个数字
 */
function findUniqueRepeatTwice (array) {
  let diffOr = array.reduce((pre, next) => pre ^ next)

  diffOr = diffOr
    .toString(2)
    .split('')
    .reverse()

  const index = diffOr.indexOf('1')
  let one
  let two
  array.forEach(item => {
    item
      .toString(2)
      .split('')
      .reverse()[index] === '1'
      ? one ? one = one ^ item : one = item
      : two ? two = two ^ item : two = item
  })

  return [one, two]
}


// 昨天看到一个面试题：
// 在数组中找到 数组中两个值等于目标值的组合，返回数组，数组中包含其对应的的索引
// 示例：
// let arr = [1,2,3,4];
// 结果：
// target : 5
// [[0,3],[1,2],[4,0]]


/***
 * KMP问题   link: https://mp.weixin.qq.com/s/kCjRuY6ygYJWWX5HPVLa5A
 */

class KMP {
  constructor (pattern) {
    this.pat = new Array(pattern.length)
      .fill(null)
      .map(item => new Array(256).fill(0))

    this.pat[0][pattern[0].charCodeAt()] = 1
    let X = 0

    for (let i = 1; i < pattern.length; i++) {
      for (let c = 0; c < 256; c++) {
        if (pattern[i].charCodeAt() === c) this.pat[i][c] = i + 1
        else this.pat[i][c] = this.pat[X][c]
      }

      X = this.pat[X][pattern[i].charCodeAt()]  // 点睛之笔  我没看懂   因为X是后续的状态跟进。 然后保持和当前状态后置的一个时序进行跟进。
    }
  }

  search (string) {
    let j = 0
    for (let i = 0; i < string.length; i++) {
      j = this.pat[j][string[i].charCodeAt()]

      if (j === this.pat.length) return i - this.pat.length + 1
    }

    return -1
  }
}

// const k = new KMP('ababc')

// console.log(k.search('ccdsfsaaaababcppp'))



/***
 * bitmap
 * 
 * 
 */

class Bitmap {
  constructor (size) {
    this.size = size
    this.words = new Array(this.getWordIndex(size - 1) + 1).fill(0)
  }

  getWordIndex (index) {
    return index >> 6
  }

  getBit (index) {
    if (index < 0 || index > this.size) throw new Error('超过bitmap最大有效范围')

    const wordIndex = this.getWordIndex(index)
    return (this.words[wordIndex] & (1 << index)) !== 0
  }

  setBit (index) {
    if (index < 0 || index > this.size) throw new Error('超过bitmap最大有效范围')

    const wordIndex = this.getWordIndex(index)
    this.words[wordIndex] |= (1 << index)
  }
}

// const bit = new Bitmap(128)

// bit.setBit(128)
// bit.setBit(122)
// bit.setBit(1)
// bit.setBit(37)

// console.log(bit.getBit(1))
// console.log(bit.getBit(128))
// console.log(bit.getBit(32))
// console.log(bit.getBit(37))
// console.log(bit.getBit(122))


/**
 * LRU least recently used 原理
 * 双向链表存储数据
 * 只存储limit个数据，有用到的时候就会将数据置前这样被用到的话就不会被会替换掉
 * 也正是lru的意思啊。经常被用到的就会被缓存，经常不被用到就不会被缓存
 */

class HashMapNode {
  constructor (key, value) {
    this.key = key
    this.value = value
    this.pre = this.next = null
  }
}
class LRU {
  constructor (limit) {
    this.limit = limit
    this.hashMap = new Map()
    this.head = this.end = null
  }

  get (key) {
    const node = this.hashMap.get(key)
    if (!node) return null

    this.refreshNode(node)
    return node
  }

  put (key, value) {
    const node = this.hashMap.get(key)
    if (!node) {
      if (this.hashMap.size >= this.limit) {
        const oldKey = this.removeNode(this.head)
        this.hashMap.delete(oldKey)
      }
      const newNode = new HashMapNode(key, value)
      this.addNode(newNode)
      this.hashMap.set(key, newNode)
    } else {
      node.value = value
      this.refreshNode(node)
    }
  }

  remove (key) {
    const node = this.hashMap.get(key)
    this.removeNode(node)
    this.hashMap.delete(key)
  }

  refreshNode (node) {
    if (node === this.end) return

    this.removeNode(node)
    this.addNode(node)
  }

  removeNode (node) {
    if (node === this.head && node === this.end) {
      this.head = null
      this.end = null
    } else if (node === this.end) {
      this.end = this.end.pre
      this.end.next = null
    } else if (node === this.head) {
      this.head = this.head.next
      this.head.pre = null
    } else {
      node.pre.next = node.next
      node.next.pre = node.pre
    }
    return node.key
  }

  addNode (node) {
    if (this.end !== null) {
      this.end.next = node
      node.pre = this.end
      node.next = null
    }
    this.end = node
    if (this.head === null) this.head = node
  }
}

const lruCache = new LRU(5)
lruCache.put('001', '用户1')
lruCache.put('002', '用户2')
lruCache.put('003', '用户3')
lruCache.put('004', '用户4')
lruCache.put('005', '用户5')
lruCache.get('002')
lruCache.put('004', '用户4更新')
lruCache.put('006', '用户6')
console.log(lruCache.get('001'))
console.log(lruCache.get('006'))
