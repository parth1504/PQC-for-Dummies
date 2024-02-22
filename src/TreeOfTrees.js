import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { SHA256 } from "crypto-js";
import { MerkleTree } from "merkletreejs";

const TreeOfTrees = () => {
  const svgRef = useRef();
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState(0);
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

  const handleInput = (e) => {
    setInput(parseInt(e.target.value));
  };

  const handleIndex = async () => {
    const index = input % 8;
    console.log(index);
    setIndex(index);
  };

  const generateTree = () => {
    const leaves = leafValues.map((value) => SHA256(value).toString());
    const newTree = new MerkleTree(leaves, SHA256);
    const viz = new window.MerkleTreeViz("#viz");

    viz.renderTree(newTree);
  };

  useEffect(() => {
    const treeData = {
      name: "",
      children: [
        {
          name: "",
          children: [
            {
              name: "",
              children: [{ name: "T1" }, { name: "T2" }],
            },
            {
              name: "",
              children: [{ name: "T3" }, { name: "T4" }],
            },
          ],
        },
        {
          name: "",
          children: [
            {
              name: "",
              children: [{ name: "T5" }, { name: "T6" }],
            },
            {
              name: "",
              children: [{ name: "T7" }, { name: "T8" }],
            },
          ],
        },
      ],
    };

    const width = 800;
    const height = 280;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(500,20)");

    const root = d3.hierarchy(treeData);

    const maxDepth = d3.max(root.descendants(), (d) => d.depth);

    const nodeWidth = 80;
    const nodeHeight = 55;
    const nodeSize = [nodeHeight + maxDepth, nodeWidth];
    const treeLayout = d3.tree().size([height, width]).nodeSize(nodeSize);
    treeLayout(root);

    svg
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y)
      )
      .attr("fill", "none")
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("shape-rendering", "crispEdges");

    const nodes = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodes.append("circle").attr("r", 10);

    nodes
      .append("text")
      .attr("dy", "0.35em")
      .attr("x", (d) => (d.children ? -13 : 13))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);

    generateTree();
  }, [index]);

  const rec1 = (index) => {
    if (index === 0) return 452;
    else if (index % 2 === 0) return rec1(index - 1) + 113;
    else if (index % 2 !== 0) return rec1(index - 1) + 61;
  };
  const rec2 = (index) => {
    if (index === 0) return 5;
    else if (index % 2 === 0) return rec2(index - 1) + 113;
    else if (index % 2 !== 0) return rec2(index - 1) + 61;
  };

  const marginLeft = rec2(index);

  const marginLeftArrow = rec1(index);

  return (
    <>
      <h2>Hypertrees</h2>
      <div className="textfield">
        <p>
          Here instead of storing the state like in merkle tree we compute it
          based on the input <br></br>
          Therefore index= f(input)
          <br></br>
          here t1, t2, t3 ... are merkle trees
        </p>
      </div>
      <div>
        <input
          type="number"
          value={input}
          onChange={handleInput}
          id="input"
          required=""
        />
      </div>
      <button onClick={handleIndex}>submit</button>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <svg
          ref={svgRef}
          style={{ overflow: "visible", marginLeft: "250px" }}
        ></svg>
        <div class="arrow-box" style={{ marginLeft: `${marginLeftArrow}px` }}>
          {console.log(index)}
        </div>
        <div
          id="viz"
          style={{
            maxWidth: "907px",
            maxHeight: "300px",
            fontSize: "10px",
            marginLeft: `${marginLeft}px`,
          }}
        >
          Visualization Div
        </div>
      </div>
      <div className="textfield">
        <p>
          Try input 0 and the 8<br></br>
          Did it give the same tree to sign?
          <br></br>
          This is the collison resistance property of hashing to know more click
          on <a href="/_256bit">HyperTrees</a>.<br></br>
          To decrease the chance collision we can increase the height of the
          tree but that increases the signature size and signing speed.
          <br></br>
          <br></br>
          Hence a tradeoff between signature size and security is observed.{" "}
          <br></br>
          Choosing h as 128 instead of 256 saves a factor of 2 in signature size
          and signing speed, if it is acceptable to have probability roughly 2
          −30 of OTS reuse.
        </p>
      </div>
    </>
  );
};

export default TreeOfTrees;
