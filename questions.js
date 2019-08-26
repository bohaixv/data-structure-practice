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

console.log('link cycle length :', getLinkCycleLength(linkList))

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

console.log('出入节点为：', getCycleRepeatNode(linkList))
