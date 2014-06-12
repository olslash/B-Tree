/* global b-tree, describe, it, expect, should */

describe('b-tree()', function() {
  // 'use strict';

  var node;
  beforeEach(function() {
    node = new BNode(5, [
      ['b', 'val of b'],
      ['c', 'val of c'],
      ['d', 'val of d']
    ]);
  });

  describe('nodes', function() {


    it('has order, keys, and children properties', function() {
      expect(node.order).to.eql(5);
      expect(node.keys).to.eql([
        ['b', 'val of b'],
        ['c', 'val of c'],
        ['d', 'val of d']
      ]);
      expect(node.children).to.eql([]);
    });
  });

  describe('findPositionOfKey', function() {
    it('finds the node where the specified key exists, or should exist',
      function() {
        expect(node.findPositionOfKey('d')).to.equal(node);
        expect(node.findPositionOfKey('a')).to.equal(node);

      });
  });

  describe('locate', function() {

    beforeEach(function() {
      node.children = [new BNode(5), new BNode(5), new BNode(5), new BNode(5)];
    });

    it('finds the correct position when there is only a single node',
      function() {
        expect(node.locate('b')).to.equal('val of b');
      });

    it('finds the correct position when there are multiple nodes',
      function() {
        node.children[2].keys = [
          ['d', 'val of d'],
          ['e', 'val of e'],
          ['f', 'val of f']
        ];

        expect(node.locate('e')).to.equal('val of e');
      });
  });

  describe('insert', function() {
    beforeEach(function() {

    });

    it('inserts a key into a root node with space available', function() {
      var aval = ['a', 'val of a'];
      var fval = ['f', 'val of f'];

      node.insert(fval);
      node.insert(aval);

      expect(node.keys[0]).to.eql(aval);
    });
  });
  // Add more assertions here
});