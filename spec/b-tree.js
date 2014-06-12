/* global b-tree, describe, it, expect, should */

describe('b-tree()', function() {
  // 'use strict';

  var node;
  beforeEach(function() {
    node = new BNode(4, [
      ['b', 'val of b'],
      ['c', 'val of c'],
      ['e', 'val of e']
    ]);
  });

  describe('nodes', function() {


    it('has order, keys, and children properties', function() {
      expect(node.order).to.eql(4);
      expect(node.keys).to.eql([
        ['b', 'val of b'],
        ['c', 'val of c'],
        ['e', 'val of e']
      ]);
      expect(node.children).to.eql([]);
    });
  });

  describe('findPositionOfKey', function() {
    it('finds the node where the specified key exists, or should exist',
      function() {
        expect(node.findPositionOfKey('e')).to.equal(node);
        expect(node.findPositionOfKey('a')).to.equal(node);

        node.keys.unshift(['a', 'val of a']);
        node.children.push(new BNode(4));
        expect(node.findPositionOfKey('a')).to.equal(node);
        // node.keys.unshift(['a', 'val of a']);


      });
  });

  describe('locate', function() {

    beforeEach(function() {
      node.children = [new BNode(4), new BNode(4), new BNode(4), new BNode(4)];
    });

    it('finds the correct position when there is only a single node',
      function() {
        expect(node.locate('b')).to.equal('val of b');
      });

    it('finds the correct position when there are multiple nodes',
      function() {
        node.children[2].keys = [['d', 'val of d']];

        expect(node.findPositionOfKey('d')).to.equal(node.children[2]);
        // expect(node.locate('e')).to.equal('val of e');
      });
  });

  describe('insert', function() {
    beforeEach(function() {

    });

    it('fails to insert a key that already exists in the tree', function() {
      expect(node.insert('b')).to.equal(false);
    });

    it('inserts a key into a tree with a non-full, leaf root node', function() {
      expect(node.insert(['d', 'val of d'])).to.equal(true);
      expect(node.keys[2][1]).to.equal('val of d')
    });    
  });
  // Add more assertions here
});