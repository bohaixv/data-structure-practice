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

function preOrderTraveral (node) {
  if (node === null) return
  console.log(node.value)
  preOrderTraveral(node.left)
  preOrderTraveral(node.right)
}

function middleOrderTraveral (node) {
  if (node === null) return

  middleOrderTraveral(node.left)
  console.log(node.value)
  middleOrderTraveral(node.right)
}

function backOrderTraveral (node) {
  if (node === null) return

  backOrderTraveral(node.left)
  backOrderTraveral(node.right)
  console.log(node.value)
}

const tree = createBinaryTree([3, 2, 9, null, null, 10, null, null, 8, null, 4])

// console.log('前序遍历', preOrderTraveral(tree))
// console.log('中序遍历', middleOrderTraveral(tree))
// console.log('后序遍历', backOrderTraveral(tree))

function preOrderTraveralNotRecur (node) {
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
// preOrderTraveralNotRecur(tree)

function middleOrderTraveralNotRecur (node) {
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
// middleOrderTraveralNotRecur(tree)

function layerTraveralNotRecur (node) {
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
// layerTraveralNotRecur(tree)

function layerTraveralRecur () {

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

console.log('层序遍历 结合递归方式实现')
layerTraveralRecur(tree)
