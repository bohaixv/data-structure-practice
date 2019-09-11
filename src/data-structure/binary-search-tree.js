/**
 * 二叉搜索树
 */

function Node (value) {
  this.key = value
  this.left = this.right = null
}

class BinarySearchTree {
  constructor (key) {
    this.root = new Node(key)
  }

  insertNode (key, node = this.root) {
    if (key > node.key) {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(key, node.right)
      }
    } else {
      if (node.left === null) {
        node.left = new Node(key)
      } else {
        this.insertNode(key, node.left)
      }
    }
  }

  delete (key) {
    let current = this.root
    let parent = null
    let position

    while (current) {
      if (current.key === key) {
        parent[position] = current.left || current.right

        return true
      }

      if (current.key > key) {
        position = 'left'
        parent = current
        current = current.left
      }

      if (current.key < key) {
        position = 'right'
        parent = current
        current = current.right
      }
    }

    return false
  }
}


const binarySearchTree = new BinarySearchTree(8)

binarySearchTree.insertNode(5)
binarySearchTree.insertNode(6)

binarySearchTree.insertNode(9)
binarySearchTree.insertNode(10)
console.log('binary search tree:', binarySearchTree)