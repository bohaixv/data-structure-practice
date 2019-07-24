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

console.log('前序遍历', preOrderTraveral(tree))
console.log('中序遍历', middleOrderTraveral(tree))
console.log('后序遍历', backOrderTraveral(tree))