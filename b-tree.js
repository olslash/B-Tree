// http://cis.stvincent.edu/html/tutorials/swd/btree/btree.html
// http://www.youtube.com/watch?v=k5J9M5_IMzg

/**  
* A B-tree of order m is a multiway search tree of order m such that:  
* 
* All leaves are on the bottom level.  
* All internal nodes (except perhaps the root node) have at least ceil(m / 2) 
*   (nonempty) children. The root node can have as few as 2 children if it is an 
*   internal node, and can obviously have no children if the root node is a leaf 
*   (that is, the whole tree consists only of the root node).  
* Each leaf node (other than the root node if it is a leaf) must contain at 
*   least ceil(m / 2) - 1 keys.  
*/

/**
 * Each node has at most m children
 * each internal node as at least ceil(m/2) children
 * root has at least 2 children if it is not a leaf
 * a non-leaf node with k children has (k-1) keys
 * All leaves appear on the same level
 */

var BNode = function(order, initial) { 
  //initial like [['a','val a'],['b', 'val b']]
  this.order = order;
  this.keys = initial || [];
  // array to address by index, and because order is significant
  // stores tuples [[a: 'value of a'], [b, 'value of b']];

  this.children = [];
};

/**
 * When inserting an item, first do a search for it in the B-tree. If the item
 * is not already in the B-tree, this unsuccessful search will end at a leaf.
 * If there is room in this leaf, just insert the new item here.
 * Note that this may require that some existing keys be moved one to the right
 * to make room for the new item. If instead this leaf node is full so that
 * there is no room to add the new item, then the node must be "split" with
 * about half of the keys going into a new node to the right of this one.
 * The median (middle) key is moved up into the parent node.
 * (Of course, if that node has no room, then it may have to be split as well.)
 * Note that when adding to an internal node, not only might we have to move
 * some keys one position to the right, but the associated pointers have to be
 * moved right as well. If the root node is ever split, the median key moves up
 * into a new root node, thus causing the tree to increase in height by one.
 */

/**
 * insert an item under this node
 * @param  {object} datum a key-value pair to insert
 * @return {boolean}       true/false succes
 */
BNode.prototype.insert = function(datum) {
  // first search for the key of the datum

  // var datumKey = Object.keys(datum)[0];
  // if(datumKey.length === 0) {
  //   //base case-- adding a root
  //   this.keys.push(datum);
  // } else {
  //   // root node has keys--
  //   // verify root has no more than (order - 1) keys
  // }
  // // this.find(key);

};

/**
 * Look for a specified key in the tree, and return the node 
 * where it exists, or where it should exist.
 * 
 * @param  {string} searchKey  The key to be found in the tree
 * @return {integer}           the leaf node where <searchKey> either exists, 
 *                             or would exist were it entered. 
 */

BNode.prototype.findPositionOfKey = function(searchKey) {
 //look at each of the keys in this node
  var position;
  for (var i = 0; i < this.keys.length; i++) {
    // look in my own keys, to find where this node does or should exist
    if (this.keys[i][0] === searchKey) {
      return this; 
    } else if (searchKey < this.keys[i][0] || this.keys[i][0] === undefined) {
      // if the key I'm looking for is < the key I'm looking at, 
      // or I'm at the last key...
      position = i;
      break;
    }

    // if searchkey < thiskey, look at child at index(thiskey)
    // if there is no child left, and length of children < order,
    //  return this-- we belong here.
    // if there is no child left, and length of children == order,
    //   a split is necessary:
    //     insert searchkey at the correct index, bringing length to order + 1
    //     take the median key, and bring it up into a new node
    //     (either combining with the node above, or becoming the new root node)
    //     
  }

    // need a check for length-- order - 1
    if(this.children[position]) {
      // if we have a child at the necessary position
      return this.children[position].findPositionOfKey(searchKey);
    }

   
};

/**
 * Look for a specified key in the tree, and return its value.
 * 
 * @param  {string} key  The key to be retrieved from the tree
 * @return {any}         The value assocaited with the key
 */
BNode.prototype.locate = function(searchKey) {
  //look at each of the keys in this node
  var position;
  for (var i = 0; i < this.keys.length; i++) {
    if (this.keys[i][0] === searchKey) {
      // We've found it
      return this.keys[i][1];
    } else if (searchKey > this.keys[i][0]) {
      position = i;
    }
  }

  return this.children[position].locate(searchKey);
};