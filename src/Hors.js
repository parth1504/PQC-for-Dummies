import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
} from "reactflow";
import CryptoJS from 'crypto-js';
const initialNodes = [
  {
    id: "Secret key",
    data: { label: "Secret Key" },
    position: { x: 255, y: -50 },
    className: "light",
  },
  {
    id: "Input",
    data: { label: "Input" },
    position: { x: 255, y: 10 },
    className: "light",
  },
  {
    id: "BinaryOutput",
    data: { label: "Binary Output" },
    position: { x: 255, y: 60 },
    className: "light",
  },
  {
    id: "b1",
    data: { label: "" },
    position: { x: 0, y: 120 },
    className: "light",
  },
  {
    id: "b2",
    data: { label: "" },
    position: { x: 170, y: 120 },
    className: "light",
  },
  {
    id: "b3",
    data: { label: "" },
    position: { x: 340, y: 120 },
    className: "light",
  },
  {
    id: "b4",
    data: { label: "" },
    position: { x: 510, y: 120 },
    className: "light",
  },
  {
    id: "d1",
    data: { label: "" },
    parentNode: "outer d1",
    extent: "parent",
    position: { x: 15, y: 40 },
    style: { width: 120, height: 40 },
  },
  {
    id: "outer d1",
    data: { label: "" },
    position: { x: 0, y: 180 },
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 150, height: 90 },

  },
  {
    id: "d2",
    data: { label: "" },
    position: { x: 15, y: 40 },
    style: { width: 120, height: 40 },
    className: "light",
    extent: "parent",

    parentNode: "outer d2",
  },
  {
    id: "outer d2",
    data: { label: "" },
    position: { x: 170, y: 180 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 150, height: 90 },

  },
  {
    id: "d3",
    data: { label: "" },
    position: { x: 15, y: 40 },
    style: { width: 120, height: 40 },
    className: "light",
    parentNode: "outer d3",

  },
  {
    id: "outer d3",
    data: { label: "" },
    position: { x: 340, y: 180 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 150, height: 90 },

  },
  {
    id: "d4",
    data: { label: "" },
    position: { x: 15, y: 40 },
    style: { width: 120, height: 40 },
    className: "light",
    parentNode: "outer d4",

  },
  {
    id: "outer d4",
    data: { label: "" },
    position: { x: 510, y: 180 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 150, height: 90 },

  },
  {
    id: "final",
    data: { label: "" },
    position: { x: 255, y: 400 },
    className: "light",
  },

]
const initialEdges = [
  { id: "1", source: "Input", target: "BinaryOutput" },
  { id: "2", source: "BinaryOutput", target: "b1" },
  { id: "3", source: "BinaryOutput", target: "b2" },
  { id: "4", source: "BinaryOutput", target: "b3" },
  { id: "5", source: "BinaryOutput", target: "b4" },
  { id: "6", source: "b1", target: "outer d1" },
  { id: "7", source: "b2", target: "outer d2" },
  { id: "8", source: "b3", target: "outer d3" },
  { id: "9", source: "b4", target: "outer d9" },
  { id: "10", source: "d1", target: "final" },
  { id: "11", source: "d2", target: "final" },
  { id: "12", source: "d3", target: "final" },
  { id: "13", source: "d4", target: "final" },

];
const Hors = () => {
  const [inputValue, setInputValue] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [elements, setElements] = useState(initialNodes);
  const onConnect = useCallback((connection) => {
    onEdgesChange((eds) => addEdge(connection, eds));
  }, []);

  const basicHash = (input) => {
    input = String(input);
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
    }

    hash = hash & 0b1111111111111111;
    const binaryHash = hash.toString(2).padStart(16, "0");
    return binaryHash;
  }

  const splitBinary = (binary, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < binary.length; i += chunkSize) {
      chunks.push(binary.slice(i, i + chunkSize));
    }
    return chunks;
  };


  const handleButtonClick = async () => {
    const hash = basicHash(inputValue);
    const keyArray = [];
    const decimalKey = Math.floor(Math.random() * 65536); // Generates a random number between 0 and 65535
    const binaryKey = decimalKey.toString(2).padStart(16, '0');

    for (const element of binaryKey) {
      keyArray.push(element.toString(2));
    }
    console.log(binaryKey);
    console.log(keyArray);
    const binarySections = splitBinary(hash, 4);
    console.log(binarySections);
    const decimalSections = binarySections.map((binary) => keyArray[parseInt(binary, 2)]);
    console.log(decimalSections);
    let final = "";
    for (const element of decimalSections) {
      final += element;
    }
    const updatedElements = elements.map((element) => {
      if (element.id === "Secret key") {
        return {
          ...element,
          data: {
            ...element.data,
            label: binaryKey,
          },
        };
      }
      else if (element.id === "Input") {
        return {
          ...element,
          data: {
            ...element.data,
            label: inputValue,
          },
        };
      }
      else if (element.id === "BinaryOutput") {

        return {
          ...element,
          data: {
            ...element.data,
            label: hash,
          },
        };
      }
      else if (element.id.startsWith("b")) {
        const sectionIndex = parseInt(element.id.slice(1)) - 1;
        return {
          ...element,
          data: {
            ...element.data,
            label: binarySections[sectionIndex],
          },
        };
      }
      else if (element.id.startsWith("d")) {
        const sectionIndex = parseInt(element.id.slice(1)) - 1;
        return {
          ...element,
          data: {
            ...element.data,
            label: decimalSections[sectionIndex],
          },
        };
      }
      else if (element.id.startsWith("outer d")) {
        const sectionIndex = parseInt(element.id.slice(7)) - 1;
        const binarySection = binarySections[sectionIndex];
        if (binarySection !== undefined) {
          const decimalValue = parseInt(binarySection, 2);
          const label = "s" + decimalValue.toString();

          return {
            ...element,
            data: {
              ...element.data,
              label: label,
            },
          };
        }
      }
      else if (element.id === "final") {
        return {
          ...element,
          data: {
            ...element.data,
            label: final,
          },
        };
      }
      return element;
    });
    setNodes(updatedElements);
  };

  return (
    <div style={{ height: "80%" }}>
      <div className="textfield">
        <p>
          Try inputs 10101 and then 01010
          <br></br>
          This will give you the entire secret key and you can forge somebody's message
          <br></br>
          This is what an OTS or One Time Signature means, here as soon as you tried 2 different inputs you got access to the entire set of keys.
          This makes Lamport OTS unsafe to use more than once.
          <br></br>
          We also need to store large arrays as keys in lamport OTS, if we wanted to sign a byte instead of a bit, we would have to store 8 arrays instead of 2.
          since each value from 0 to 7 would have required a different array.
          <br></br>
          In order to solve the problem of Storage, we use WOTS, which is another OTS method. So let us move on to <a href="/wots">WOTS</a>

        </p>

      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={handleButtonClick}>Submit</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="react-flow-subflows-example"
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Hors;
