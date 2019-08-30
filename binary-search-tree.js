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

}


const binarySearchTree = new BinarySearchTree(8)

binarySearchTree.insertNode(5)
binarySearchTree.insertNode(6)
binarySearchTree.insertNode(9)
binarySearchTree.insertNode(10)

console.log('binary search tree:', binarySearchTree)