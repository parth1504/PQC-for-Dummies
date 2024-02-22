import React, { useState, useEffect } from "react";
import { SHA256 } from "crypto-js";
import { MerkleTree } from "merkletreejs";
import Draggable from "react-draggable";
class ClickableMerkleTreeViz extends window.MerkleTreeViz {
  constructor(htmlSelector, onNodeClick) {
    super(htmlSelector);
    this.onNodeClick = onNodeClick;
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleNodeClick(index, nodes) {
    this.onNodeClick(index, nodes);
  }

  renderLayersAsObject(layers, depth, proof) {
    const viz = super.renderLayersAsObject(layers, depth, proof);

    // Attach click event listener to nodes
    const nodes = document.querySelectorAll(`${this.htmlSelector} .node`);
    Array.from(nodes).forEach((node, index) => {
      node.addEventListener("click", () => {
        this.handleNodeClick(index, nodes);
      });

      // Add outer label to the node
      const outerLabel = document.createElement("div");
      outerLabel.className = "outer-label";
      outerLabel.textContent = index; // Start from 1
      node.appendChild(outerLabel);
    });

    return viz;
  }
}

const MerkleTreeComponent = () => {
  const [clickedNode, setClickedNode] = useState(null);
  const [information, setInforation] = useState("");
  const [treeVisible, setTreeVisible] = useState(false);
  const [visibleViz, setVisibleViz] = useState(true);
  const [newTree, setNewTree] = useState(null);
  const [viz, setViz] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const getChildren = (index, nodes) => {
    if (index === 2) {
      setInforation(`by hash(${0})+ hash(${1})`);
    } else if (index === 5) {
      setInforation(`by hash(${3})+ hash(${4})`);
    } else if (index === 6) {
      setInforation(`by hash(${2})+ hash(${5})`);
    } else if (index === 9) {
      setInforation(`by hash(${7})+ hash(${8})`);
    } else if (index === 12) {
      setInforation(`by hash(${10})+ hash(${11})`);
    } else if (index === 13) {
      setInforation(`by hash(${9})+ hash(${12})`);
    } else if (index === 14) {
      setInforation(`by hash(${6})+ hash(${13})`);
    }
  };
  const handleNodeClick = (index, nodes) => {
    setClickedNode({ index, nodes });
    getChildren(index, nodes);
  };
  const handleClosePopup = () => {
    setClickedNode(null);
  };
  const [leafValues, setLeafValues] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  const [input, setInput] = useState("");
  const [inputArray, setInputArray] = useState([]);
  const [currentState, setCurrentState] = useState(1);
  // const updateLeafValue = (index, value) => {
  //   const updatedLeaves = [...leafValues];
  //   updatedLeaves[index] = value;
  //   setLeafValues(updatedLeaves);
  // };

  const updateInput = (value) => {
    setInput(value);
  };
  const submitInput = () => {
    setInputArray([...inputArray, input]);
    setInput("");
    setCurrentState(currentState + 1);
    console.log(currentState);
    // Clear input after submission
  };

  const getProof = (index) => {
    setVisibleViz(false);
    const leaves = leafValues.map((value) => SHA256(value).toString());
    const newTree = new MerkleTree(leaves, SHA256);
    const viz1 = new ClickableMerkleTreeViz("#viz1", handleNodeClick);
    viz1.renderTree(newTree);

    viz1.renderProof(newTree.getHexProof(leaves[index]));
  };

  const generateTree = () => {
    const leaves = leafValues.map((value) => SHA256(value).toString());
    const newTree = new MerkleTree(leaves, SHA256);
    const viz = new ClickableMerkleTreeViz("#viz", handleNodeClick);

    viz.renderTree(newTree);
    setTreeVisible(true);
  };

  // useEffect(() => {
  //   if (currentState <= 8) {
  //     highlightNode();
  //   }
  // }, [inputArray, currentState]);

  return (
    <div>
      <h2>Merkle Tree Visualization</h2>
      <div className="textfield">
        <p>
          A leaf node is the hash of an OTS key pair <br></br>
          The root of the merkle tree is used as a public key to sign messages{" "}
          <br></br>
          Click on the non-leaf nodes to see how they are generated
        </p>
      </div>
      {visibleViz && <div id="viz"></div>}
      <div id="viz1"></div>
      {!treeVisible && (
        <button onClick={generateTree} className="button-33">
          Generate Tree
        </button>
      )}

      {treeVisible && (
        <div className="mt-div">
          {inputArray &&
            inputArray.map((value, index) => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div class="arrow-box-mt">{console.log(index)}</div>
                <div
                  className="mt-div-individual"
                  key={index}
                  style={{ borderWidth: "10px" }}
                  onClick={() => getProof(index)}
                >
                  {value}
                </div>
              </div>
            ))}
        </div>
      )}
      {currentState <= 8 ? (
        treeVisible && (
          <div>
            <input
              type="text"
              value={input}
              className="mt-input"
              onChange={(e) => updateInput(e.target.value)}
            />
            <button onClick={submitInput}>Submit</button>
          </div>
        )
      ) : (
        <div className="textfield">
          <p>
            Oops no more OTS key pairs to sign messages!<br></br>A OTS key pair
            can be used to sign 1 message and the tree in total can sign 2 ^h
            messages, where h is the height of the tree. <br></br>
            This is a stateful process in which the the index of the choosen OTS
            key pair to sign the message is stored.
            <br></br>
            The signature of this scheme consists of the index of the leaf value
            here 0 ,the leaf value hash and the authentication path (click on
            the message) and the root of the merkle tree.<br></br>
            <br></br>
            To see the stateless version click here{" "}
            <a href="/treeofTrees">Collision resistance</a>.
          </p>
        </div>
      )}

      {clickedNode && (
        <Draggable>
          <div className="popup">
            <div className="popup-content">
              <p>Clicked Node Index: {clickedNode.index}</p>
              <p>Node generated: {information}</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default MerkleTreeComponent;
