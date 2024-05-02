import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  MarkerType,
  BackgroundVariant
} from "reactflow";

import 'reactflow/dist/style.css';
import CustomTriangleNode from './triangle';
import CustomTriangleNode2 from "./triangle2";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const initialNodes = [
  {
    id: "ROOT1",
    data: { label: "Private key", value: "123" },
    position: { x: 500, y: 200 },
    className: "light",
    style: { width: 150, height: 75 },
  },
  {
    id: "child1.1",
    data: { label: "Message", value: "123" },
    position: { x: 400, y: 300 },
    className: "light",
  },
  {
    id: "child1.2",
    data: { label: "Message", value: "123" },
    position: { x: 600, y: 300 },
    className: "light",
  },
  {
    id: "wots1.1box",
    data: { label: "wots", value: "123" },
    position: { x: 463, y: 380 },
    className: "light",
    style: { width: 25, height: 25 },
  },
  {
    id: 'WOTS1.1',
    type: 'customTriangleNode',
    position: { x: 423, y: 340 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
  },
  {
    id: "wots1.2box",
    data: { label: "wots", value: "123" },
    position: { x: 663, y: 380 },
    className: "light",
    style: { width: 25, height: 25 },
  },
  {
    id: 'WOTS1.2',
    type: 'customTriangleNode',
    position: { x: 623, y: 340 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
  },
  {
    id: "ROOT2",
    data: { label: "Private key", value: "123" },
    position: { x: 323, y: 540 },
    className: "light",
    style: { width: 150, height: 75 },
  },
  {
    id: "child2.1",
    data: { label: "Message", value: "123" },
    position: { x: 243, y: 640 },
    className: "light",
  },
  {
    id: "child2.2",
    data: { label: "Message", value: "123" },
    position: { x: 403, y: 640 },
    className: "light",
  },
  {
    id: "wots2.1box",
    data: { label: "wots", value: "123" },
    position: { x: 306, y: 705 },
    className: "light",
    style: { width: 25, height: 25 },
  },
  {
    id: 'WOTS2.1',
    type: 'customTriangleNode',
    position: { x: 266, y: 675 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
  },
  {
    id: "wots2.2box",
    data: { label: "wots", value: "123" },
    position: { x: 466, y: 705 },
    className: "light",
    style: { width: 25, height: 25 },
  },
  {
    id: 'WOTS2.2',
    type: 'customTriangleNode',
    position: { x: 426, y: 675 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
  },
  {
    id: "ROOT3",
    data: { label: "Private key", value: "123" },
    position: { x: 800, y: 800 },
    className: "light",
    style: { width: 150, height: 75 },
  },
  {
    id: "child3.1",
    data: { label: "Message", value: "123" },
    position: { x: 775, y: 900 },
    className: "light",
    style: { width: 70, height: 35 },
  },
  {
    id: "child3.2",
    data: { label: "Message", value: "123" },
    position: { x: 875, y: 900 },
    className: "light",
    style: { width: 70, height: 35 },
  },
  {
    id: "wots3.1box",
    data: { label: "3.1", value: "123" },
    position: { x: 805, y: 970 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'WOTS3.1',
    type: 'customTriangleNode',
    position: { x: 790, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
  },
  {
    id: "wots3.2box",
    data: { label: "3.2", value: "123" },
    position: { x: 905, y: 970 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'WOTS3.2',
    type: 'customTriangleNode',
    position: { x: 890, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
  },
  {
    id: "ROOT4",
    data: { label: "Private key", value: "123" },
    position: { x: 673, y: 540 },
    className: "light",
    style: { width: 150, height: 75 },
  },
  {
    id: "child4.1",
    data: { label: "Message", value: "123" },
    position: { x: 593, y: 640 },
    className: "light",

  },
  {
    id: "child4.2",
    data: { label: "Message", value: "123" },
    position: { x: 753, y: 640 },
    className: "light",

  },
  {
    id: "wots4.1box",
    data: { label: "wots", value: "123" },
    position: { x: 656, y: 705 },
    className: "light",
    style: { width: 25, height: 25 },
  },
  {
    id: 'WOTS4.1',
    type: 'customTriangleNode',
    position: { x: 616, y: 675 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
  },
  {
    id: "wots4.2box",
    data: { label: "wots", value: "123" },
    position: { x: 816, y: 705 },
    className: "light",
    style: { width: 25, height: 25 },
  },
  {
    id: 'WOTS4.2',
    type: 'customTriangleNode',
    position: { x: 776, y: 675 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
  },
  {
    id: "ROOT5",
    data: { label: "Private key", value: "123" },
    position: { x: 175, y: 800 },
    className: "light",
    style: { width: 150, height: 75 },
  },
  {
    id: "child5.1",
    data: { label: "Message", value: "123" },
    position: { x: 150, y: 900 },
    className: "light",
    style: { width: 70, height: 35 },
  },
  {
    id: "child5.2",
    data: { label: "Message", value: "123" },
    position: { x: 250, y: 900 },
    className: "light",
    style: { width: 70, height: 35 },
  },
  {
    id: "wots5.1box",
    data: { label: "5.1", value: "123" },
    position: { x: 165, y: 970 },
    className: "light",
    style: { width: 10, height: 10 },
  },
  {
    id: 'WOTS5.1',
    type: 'customTriangleNode',
    position: { x: 150, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
  },
  {
    id: "wots5.2box",
    data: { label: "5.2", value: "123" },
    position: { x: 265, y: 970 },
    className: "light",
    style: { width: 10, height: 10 },
  },
  {
    id: 'WOTS5.2',
    type: 'customTriangleNode',
    position: { x: 250, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
  },
  {
    id: "ROOT6",
    data: { label: "Private key", value: "123" },
    position: { x: 420, y: 800 },
    className: "light",
    style: { width: 150, height: 75 },
  },
  {
    id: "child6.1",
    data: { label: "Message", value: "123" },
    position: { x: 370, y: 900 },
    className: "light",
    style: { width: 70, height: 35 },
  },
  {
    id: "child6.2",
    data: { label: "Message", value: "123" },
    position: { x: 470, y: 900 },
    className: "light",
    style: { width: 70, height: 35 },
  },
  {
    id: "wots6.1box",
    data: { label: "6.1", value: "123" },
    position: { x: 385, y: 970 },
    className: "light",
    style: { width: 10, height: 10 },
  },
  {
    id: 'WOTS6.1',
    type: 'customTriangleNode',
    position: { x: 370, y: 950 },
    data: { text: 'Hello' },
    style: { width: 50, height: 50 },
  },
  {
    id: "wots6.2box",
    data: { label: "6.2", value: "123" },
    position: { x: 485, y: 970 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'WOTS6.2',
    type: 'customTriangleNode',
    position: { x: 470, y: 950 },
    style: { width: 50, height: 50 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: "ROOT7",
    data: { label: "Private key", value: "123" },
    position: { x: 600, y: 800 },
    className: "light",
    style: { width: 150, height: 75 },
  },
  {
    id: "child7.1",
    data: { label: "Message", value: "123" },
    position: { x: 600, y: 900 },
    className: "light",
    style: { width: 70, height: 35 },
  },
  {
    id: "child7.2",
    data: { label: "Message", value: "123" },
    position: { x: 675, y: 900 },
    className: "light",
    style: { width: 70, height: 35 },
  },
  {
    id: "wots7.1box",
    data: { label: "7.1", value: "123" },
    position: { x: 625, y: 970 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'WOTS7.1',
    type: 'customTriangleNode',
    position: { x: 610, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
  },
  {
    id: "wots7.2box",
    data: { label: "7.2", value: "123" },
    position: { x: 700, y: 970 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'WOTS7.2',
    type: 'customTriangleNode',
    position: { x: 685, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
  },
  {
    id: "horst1box",
    data: { label: "7.2", value: "123" },
    position: { x: 805, y: 1020 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'HORST1',
    type: 'customTriangleNode2',
    position: { x: 790, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: "horst2box",
    data: { label: "7.2", value: "123" },
    position: { x: 905, y: 1020 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'HORST2',
    type: 'customTriangleNode2',
    position: { x: 890, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: "horst3box",
    data: { label: "7.2", value: "123" },
    position: { x: 165, y: 1020 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'HORST3',
    type: 'customTriangleNode2',
    position: { x: 150, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: "horst4box",
    data: { label: "7.2", value: "123" },
    position: { x: 265, y: 1020 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'HORST4',
    type: 'customTriangleNode2',
    position: { x: 250, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: "horst5box",
    data: { label: "7.2", value: "123" },
    position: { x: 385, y: 1020 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'HORST5',
    type: 'customTriangleNode2',
    position: { x: 370, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: "horst6box",
    data: { label: "7.2", value: "123" },
    position: { x: 485, y: 1020 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'HORST6',
    type: 'customTriangleNode2',
    position: { x: 470, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: "horst7box",
    data: { label: "7.2", value: "123" },
    position: { x: 615, y: 1020 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'HORST7',
    type: 'customTriangleNode2',
    position: { x: 600, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: "horst8box",
    data: { label: "7.2", value: "123" },
    position: { x: 690, y: 1020 },
    className: "light",
    style: { width: 5, height: 5 },
  },
  {
    id: 'HORST8',
    type: 'customTriangleNode2',
    position: { x: 675, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
]


const nodeTypes = {

  customTriangleNode: CustomTriangleNode,
  customTriangleNode2: CustomTriangleNode2,
  // Add other custom node types here
};
const defaultEdges = [

  {
    id: "1",
    source: "ROOT1",
    target: "child1.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "2",
    source: "ROOT1",
    target: "child1.2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "3",
    source: "child1.1",
    target: "wots1.1box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "4",
    source: "child1.2",
    target: "wots1.2box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "5",
    source: "wots1.1box",
    target: "ROOT2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "6",
    source: "wots1.2box",
    target: "ROOT4",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "7",
    source: "ROOT2",
    target: "child2.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "8",
    source: "ROOT2",
    target: "child2.2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "9",
    source: "ROOT4",
    target: "child4.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "10",
    source: "ROOT4",
    target: "child4.2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "11",
    source: "wots2.1box",
    target: "ROOT5",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "12",
    source: "wots2.2box",
    target: "ROOT6",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "13",
    source: "wots4.1box",
    target: "ROOT7",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "14",
    source: "wots4.2box",
    target: "ROOT3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "15",
    source: "ROOT5",
    target: "child5.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "16",
    source: "ROOT5",
    target: "child5.2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "17",
    source: "ROOT6",
    target: "child6.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "18",
    source: "ROOT6",
    target: "child6.2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "19",
    source: "ROOT7",
    target: "child7.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "20",
    source: "ROOT7",
    target: "child7.2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "21",
    source: "ROOT3",
    target: "child3.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "22",
    source: "ROOT3",
    target: "child3.2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "23",
    source: "child5.1",
    target: "wots5.1box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "24",
    source: "child5.2",
    target: "wots5.2box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "25",
    source: "child6.1",
    target: "wots6.1box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "26",
    source: "child6.2",
    target: "wots6.2box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "27",
    source: "child7.1",
    target: "wots7.1box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "28",
    source: "child7.2",
    target: "wots7.2box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "29",
    source: "child3.1",
    target: "wots3.1box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "30",
    source: "child3.2",
    target: "wots3.2box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "31",
    source: "child2.1",
    target: "wots2.1box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "32",
    source: "child2.2",
    target: "wots2.2box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "33",
    source: "child4.1",
    target: "wots4.1box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "34",
    source: "child4.2",
    target: "wots4.2box",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
]
export default function Sphincs() {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleNodeMouseEnter = (event) => {
    // Set tooltip position and show tooltip
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  const handleNodeMouseLeave = () => {
    // Hide tooltip on mouse leave
    setShowTooltip(false);
  };
  return (
    <div style={{ height: 1500 }}>
      <p>
        The following is a Flowchart of how sphincs works<br></br>
        A message is signed by a HORST(which is basically Hors with trees) key.
        <br></br>
         A wots key is used to sign the HORST public key. Now this WOTS public key will be sign signed by another WOTS key and so on until the root node of the tree.
        <br></br>
         The <a href="/treeoftrees">Hyper Tree </a> Page helps build an intuition of how this chaining would work.
        <br></br>
  
        <br></br>
      
      </p>
      <ReactFlow defaultNodes={[...initialNodes]} defaultEdges={[...defaultEdges]} nodeTypes={nodeTypes} onNodeMouseEnter={handleNodeMouseEnter} onMouseLeave={handleNodeMouseLeave}>
      </ReactFlow>

    </div>
  );
}