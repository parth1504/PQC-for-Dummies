import React, { useState,useRef,useEffect } from 'react';
import { SHA256 } from 'crypto-js';
import { MerkleTree } from 'merkletreejs';

class ClickableMerkleTreeViz extends window.MerkleTreeViz {
  constructor(htmlSelector, onNodeClick) {
    super(htmlSelector);
    this.onNodeClick = onNodeClick;
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleNodeClick(event) {
    const nodeElement = event.currentTarget;
    const nodeIndex = Array.from(nodeElement.parentElement.children).indexOf(nodeElement);

    if (this.onNodeClick) {
      const nodeInfo = this.getNodeInfoFromHTML(nodeIndex);
      this.onNodeClick(nodeInfo);
    }
  }

  getNodeInfoFromHTML(index) {
    // This is a hacky solution, and it relies on the structure of the rendered HTML.
    // You may need to adapt this based on the actual structure of the rendered nodes.

    const nodeElements = document.querySelectorAll(`${this.htmlSelector} .node`);
    const nodeElement = nodeElements[index];
    
    // Extract information from the node's text content, class names, or any other relevant attributes.
    const nodeInfo = {
      index,
      label: nodeElement.textContent.trim(),
      className: nodeElement.className,
      // Add more properties as needed based on your specific case.
    };

    return nodeInfo;
  }

  renderLayersAsObject(layers, depth, proof) {
    const viz = super.renderLayersAsObject(layers, depth, proof);

    // Attach click event listener to nodes
    const nodes = document.querySelectorAll(`${this.htmlSelector} .node`);
    nodes.forEach((node) => {
      node.addEventListener('click', this.handleNodeClick);
    });

    return viz;
  }
}



const MerkleTreeComponent = () => {

  const handleNodeClick = (nodeInfo) => {
    console.log('Clicked Node Info:', nodeInfo);
    // Add your logic to handle the clicked node information
  };
  
  
  const [leafValues, setLeafValues] = useState(['', '', '', '', '', '', '', '']);

  const updateLeafValue = (index, value) => {
    const updatedLeaves = [...leafValues];
    updatedLeaves[index] = value;
    setLeafValues(updatedLeaves);
  };

  const generateTree = () => {
    const leaves = leafValues.map(value => SHA256(value).toString());
    const newTree = new MerkleTree(leaves, SHA256);
    const viz = new ClickableMerkleTreeViz('#viz', handleNodeClick);

    viz.renderTree(newTree)
    // const info= newTree.getNodeInfo(2);
    // console.log(info);
  };
 

  return (
    <div>
      <h2>Merkle Tree Visualization</h2>
      <div>
        {leafValues.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => updateLeafValue(index, e.target.value)}
          />
        ))}
      </div>
      <button onClick={generateTree}>Generate Tree</button>
      <div id="viz"  ></div>
    </div>
  );
};

export default MerkleTreeComponent;
