/**
 * 二叉树
 */

/**
 * createBinaryTree    根据数组进行的恢复二叉树
 */

function Node (data) {
  this.value = data
  this.left = null
  this.right = null
}

function createBinaryTree (list) {
  let root = null

  if (list.length === 0) return null

  const data = list.shift()

  if (data !== null) {
    root = new Node(data)
    root.left = createBinaryTree(list)
    root.right = createBinaryTree(list)
  }

  return root
}

function preOrderTraversal (node) {
  if (node === null) return
  console.log(node.value)
  preOrderTraversal(node.left)
  preOrderTraversal(node.right)
}

function middleOrderTraversal (node) {
  if (node === null) return

  middleOrderTraversal(node.left)
  console.log(node.value)
  middleOrderTraversal(node.right)
}

function backOrderTraversal (node) {
  if (node === null) return

  backOrderTraversal(node.left)
  backOrderTraversal(node.right)
  console.log(node.value)
}

const tree = createBinaryTree([3, 2, 9, null, null, 10, null, null, 8, null, 4])

// console.log('前序遍历', preOrderTraversal(tree))
// console.log('中序遍历', middleOrderTraversal(tree))
// console.log('后序遍历', backOrderTraversal(tree))

function preOrderTraversalNotRecur (node) {
  const queue = []

  while (node || queue.length) {
    while (node) {
      queue.push(node)
      node = node.left
    }

    if (queue.length) {
      node = queue.pop()
      console.log(node.value)
      node = node.right
    }

  }
}

// console.log('前序遍历不用递归')
// preOrderTraversalNotRecur(tree)


function preOrderT (tree) {
  const queue = []

  while (tree || queue.length) {
    while (tree) {
      queue.push(tree)
      // pre
      tree = tree.left
    }

    if (queue.length) {
      tree = queue.pop()
      // midd
      tree = tree.right
    }
  }
}
/**
 * 后序遍历的思路： 我们可以利用栈存放一个这样的循序的数据： 左 => 右 => 根  或者  右 => 左 => 根
 * @param {Node} node 
 */
function middleOrderTraversalNotRecur (node) {
  const queue = []
  const backOrderQueue = []
  while (node || queue.length) {   //  我觉得这种写法的有趣的地方在于用了两个while判断条件  然后两个条件搭配执行 得出更牛皮的效果
    while (node) {
      queue.push(node)
      backOrderQueue.push(node)
      node = node.right
    }

    if (queue.length) {
      const currentNode = queue.pop()
      node = currentNode.left
    }
  }

  while (backOrderQueue.length) {
    const current = backOrderQueue.pop()

    console.log(current.value)
  }
}

// console.log('后续遍历不用递归')
// middleOrderTraversalNotRecur(tree)


function backOrder (node) {
  const queue = []
  const backQueue = []

  while (node || queue.length) {
    while (node) {
      queue.push(node)
      backQueue.push(node)
      node = node.left
    }

    if (queue.length) {
      node = queue.pop()
      node = node.left
    }
  }

  // foreach backqueue

}
function layerTraversalNotRecur (node) {
  const queue = []

  queue.push(node)

  while (queue.length) {
    const currentNode = queue.shift()

    console.log(currentNode.value)
    if (currentNode.left) queue.push(currentNode.left)
    if (currentNode.right) queue.push(currentNode.right)
  }
}

// console.log('层序遍历  广度优先')
// layerTraversalNotRecur(tree)

function layerTraverl (node) {
  const queue = []
  queue.push(node)

  while (queue.length) {
    node = queue.pop()
    console.log(node)

    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
}

function layerTraversalRecur () {

  function layer (tree, n) {
    if (!tree) return
    if (n === 0) console.log(tree.value)

    layer(tree.left, n - 1)
    layer(tree.right, n - 1)
  }


  function getDeep (tree, n = 0) {
    if (tree) n += 1
    else return n

    return Math.max(getDeep(tree.left, n), getDeep(tree.right, n))
  }
  const deep = getDeep(tree)

  for (let i = 0; i < deep; i++) {
    layer(tree, i)
  }
}

// console.log('层序遍历 结合递归方式实现')
// layerTraversalRecur(tree)

/**
 * 二叉堆
 */
class DoubleBranchHeap {
  constructor (arr) {
    this.heap = [...arr]
  }

  get size () {
    return this.heap.length
  }

  upAdjust (index) {   // 『上浮操作』  将指定索引进行上浮操作
    if (index > this.size) return

    let childIndex = index
    let parentIndex = Math.floor((childIndex - 1) / 2)

    const tmp = this.heap[index]

    while (childIndex > 0 && tmp > this.heap[parentIndex]) {
      this.heap[childIndex] = this.heap[parentIndex]
      childIndex = parentIndex
      parentIndex = Math.floor((parentIndex - 1) / 2)
    }

    this.heap[childIndex] = tmp
  }

  downAdjust (index) {   //  『下沉操作』 将指定索引的节点下沉
    if (index > this.size) return

    let parentIndex = index
    let childIndex = index * 2 + 1

    const tmp = this.heap[parentIndex]

    while (childIndex < this.size) {
      if (childIndex + 1 < this.size && this.heap[childIndex + 1] > this.heap[childIndex]) {
        childIndex++
      }

      if (tmp > this.heap[childIndex]) break

      this.heap[parentIndex] = this.heap[childIndex]

      parentIndex = childIndex
      childIndex = 2 * childIndex + 1
    }

    this.heap[parentIndex] = tmp
  }

  rebuild () {
    const lastNotLeafIndex = Math.floor(this.size / 2)

    for (let i = lastNotLeafIndex; i >= 0; i--) {
      this.downAdjust(i)
    }
  }

  sort () {   // 利用完整二叉堆的性质 。  不断将更新根元素， 因为根元素是最大or最小的。
    this.rebuild()
    const arr = []
    for (let i = this.size - 1; this.size > 0; i--) {
      this.swap(0, i)
      arr.push(...this.heap.splice(i, 1))
      this.downAdjust(0)
    }
    console.log(arr)

    this.heap = arr
  }

  deleteItem (index) {
    if (index > this.size) return

    this.swap(index, this.size - 1)

    this.heap.splice(this.size - 1, 1)

    this.downAdjust(index)
  }

  insertItem (node) {
    this.heap[this.size] = node
    this.upAdjust(this.size - 1)
  }

  swap (front, back) {
    const temp = this.heap[front]
    this.heap[front] = this.heap[back]
    this.heap[back] = temp
  }
}
