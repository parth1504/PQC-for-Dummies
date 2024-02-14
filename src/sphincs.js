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

const initialNodes=[
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
    id: 'WOTS1.1',
    type: 'customTriangleNode',
    position: { x: 423, y: 340 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
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
    id: 'WOTS2.1',
    type: 'customTriangleNode',
    position: { x: 266, y: 675 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
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
    position: { x: 800, y:800  },
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
    id: 'WOTS3.1',
    type: 'customTriangleNode',
    position: { x: 790, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
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
    id: 'WOTS4.1',
    type: 'customTriangleNode',
    position: { x: 616, y: 675 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 100, height: 100 },
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
    id: 'WOTS5.1',
    type: 'customTriangleNode',
    position: { x: 150, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
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
    id: 'WOTS6.1',
    type: 'customTriangleNode',
    position: { x: 370, y: 950 },
    data: { text: 'Hello' }, 
    style: { width: 50, height: 50 },
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
    id: 'WOTS7.1',
    type: 'customTriangleNode',
    position: { x: 610, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
  },
  {
    id: 'WOTS7.2',
    type: 'customTriangleNode',
    position: { x: 685, y: 950 },
    data: { text: 'Hello' }, // Provide the text prop here
    style: { width: 50, height: 50 },
  },
  {
    id: 'HORST1',
    type: 'customTriangleNode2',
    position: { x: 790, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: 'HORST2',
    type: 'customTriangleNode2',
    position:{ x: 890, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: 'HORST3',
    type: 'customTriangleNode2',
    position: { x: 150, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: 'HORST4',
    type: 'customTriangleNode2',
    position: { x: 250, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: 'HORST5',
    type: 'customTriangleNode2',
    position: { x: 370, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: 'HORST6',
    type: 'customTriangleNode2',
    position: { x: 470, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
  },
  {
    id: 'HORST7',
    type: 'customTriangleNode2',
    position: { x: 600, y: 1000 },
    data: { text: 'Hello' }, // Provide the text prop here
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
const defaultEdges=[
  {
    id: "4",
    source: "WOTS1.1",
    target: "child2.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
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
    target: "WOTS1.1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
]
export default function Sphincs() {
  return (
    <ReactFlow defaultNodes={[...initialNodes]} defaultEdges={[...defaultEdges]} nodeTypes={nodeTypes}>
      <Background
        id="1"
        gap={10}
        color="#f1f1f1"
        variant={BackgroundVariant.Lines}
      />
 
      <Background
        id="2"
        gap={100}
        color="#ccc"
        variant={BackgroundVariant.Lines}
      />
    </ReactFlow>
  );
}