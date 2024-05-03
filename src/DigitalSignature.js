import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  MarkerType,
} from "reactflow";
import CryptoJS from "crypto-js";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "digital Signature outer",
    data: { label: "Digital Signature" },
    position: { x: 0, y: 920 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 150,fontSize: "20px" },
  },

  {
    id: "digital signature inner",
    data: { label: "sign" },
    position: { x: 10, y: 50 },
    parentNode: "digital Signature outer",
  },
  {
    id: "text1",
    data: { label: "Message", value: "123" },
    position: { x: 250, y: 200 },
    className: "light",
  },

  {
    id: "encrypt",
    data: { label: "Encrypt", value: "123" },
    position: { x: 0, y:700  },
    className: "light",
  },
  {
    id: "decrypt",
    data: { label: "Decrypt", value: "123" },
    position: { x: 950, y: 800 },
    className: "light",
  },
  {
    id: "private key",
    data: { label: "Private key", value: "123" },
    position: { x: 10, y: 50 },
    className: "light",
    parentNode: "private key outer",
  },
  {
    id: "private key outer",
    data: { label: "Private key", value: "123" },
    position: { x: 0, y: 200 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 100 },
  },
  {
    id: "public key",
    data: { label: "public key", value: "123" },
    position: { x: 10, y: 50 },
    className: "light",
    parentNode: "public key outer",
  },
  {
    id: "public key outer",
    data: { label: "public key", value: "123" },
    position: { x: 950, y: 600 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 100 },
  },
  {
    id: "hash1 label",
    data: { label: "Hashing Algorithm (SHA256)", value: "123" },
    position: { x: 250, y: 400 },
    className: "light",
  },
  {
    id: "hash2 label",
    data: { label: "Hashing Algorithm (SHA256)", value: "123" },
    position: { x: 1250, y: 500 },
    className: "light",
  },
  {
    id: "hash value",
    data: { label: "Hashing Value", value: "123" },
    position: { x: 20, y: 50 },
    parentNode: "hash value outer",
  },
  {
    id: "hash value receiver's side",
    data: { label: "Hashing Value", value: "123" },
    position: { x: 20, y: 50 },
    parentNode: "hash value outer receiver",
  },
  {
    id: "hash value outer",
    data: { label: "Hashing Value", value: "123" },
    position: { x: 250, y: 500 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 100 },
  },
  {
    id: "hash value outer receiver",
    data: { label: "Hashing Value", value: "123" },
    position: { x: 1250, y: 600 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 100 },
  },
  {
    id: "Receiver's side",
    data: { label: "Receiver's side" },
    position: { x: 550, y: 500 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 300, height: 300 },
  },
  {
    id: "message in receiver's side",
    data: { label: "Message" },
    position: { x: 15, y: 65 },
    className: "light",
    parentNode: "Receiver's side",
    extent: "parent",
  },
  {
    id: "Digital signature in receiver's side",
    data: { label: "Digital signature" },
    position: { x: 15, y: 120 },
    className: "light",
    style: {
      backgroundColor: "rgba(255, 0, 255, 0.2)",
      height: 150,
      width: 270,
    },
    parentNode: "Receiver's side",
  },
  {
    id: "ds in receiver's side",
    data: { label: "sign" },
    position: { x: 20, y: 40 },
    className: "light",
    parentNode: "Digital signature in receiver's side",
  },
  {
    id: "compare",
    data: { label: "compare " },
    position: { x: 1050, y: 900 },
    className: "light",
  },
  {
    id: "verify",
    data: { label: "verify (correct)" },
    position: { x: 1050, y: 1000 },
    backgroundColor: "green",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "", animated: true },
  { id: "1", source: "text1", target: "hash1 label", type: "arrow" },
  {
    id: "2",
    source: "hash1 label",
    target: "hash value outer",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "3",
    source: "hash value outer",
    target: "encrypt",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "4",
    source: "private key outer",
    target: "encrypt",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "5",
    source: "encrypt",
    target: "digital signature inner",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "6",
    source: "hash2 label",
    target: "hash value outer receiver",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "7",
    source: "hash2 value",
    target: "public key outer",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "8",
    source: "digital signature outer",
    target: "ds in receiver's side",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  { id: "9", source: "text1", target: "message in receiver's side" },
  { id: "10", source: "message in receiver's side" ,target:"hash2 label"},
  {
    id: "11",
    source: "digital Signature outer",
    target: "ds in receiver's side",
  },
  {
    id: "12",
    source: "public key",
    target: "decrypt",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "13",
    source: "ds in receiver's side",
    target: "decrypt",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "14",
    source: "decrypt",
    target: "compare",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "15",
    source: "compare",
    target: "verify",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
  {
    id: "16",
    source: "hash value outer receiver",
    target: "compare",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: "#000000",
    },
  },
];
const Page = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [inputValue, setInputValue] = useState("");
  const [privateKey, setPrivateKey] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [signature, setSignature] = useState("");
  const [hashedMessage, setHashedMessage] = useState("");
  const [hashedMessageReceiver, setHashedMessageReceiver] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [ decryptedSign,setDecrpytedSign] = useState("");
  const [elements, setElements] = useState(initialNodes);
  const [compare, setCompare]= useState(true)
  const [interceptedMessage, setInterceptedMessage]= useState("")

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);
  

  
  const generateKeyPair = async () => {
    const randomPrivateKey = CryptoJS.lib.WordArray.random(32);
    const privateKeyString = randomPrivateKey.toString(CryptoJS.enc.Hex);
    setPrivateKey(privateKeyString);
    console.log(privateKey)
    const hashedPublicKey = CryptoJS.SHA256(privateKeyString);
    setPublicKey(hashedPublicKey.toString(CryptoJS.enc.Hex));
    setShowPrivateKey(true);
  };



  const handleButtonClick = async () => {
      const privateKeyString = privateKey.toString(CryptoJS.enc.Hex);
      const hashedMessage = CryptoJS.SHA256(inputValue).toString(CryptoJS.enc.Hex);

      const hashedMessageReceiver = hashedMessage.toString(CryptoJS.enc.Hex);
      const signature =
        privateKeyString + hashedMessage.toString(CryptoJS.enc.Hex);
    const decryptedSign=signature.substring(privateKey.toString(CryptoJS.enc.Hex).length)
    const compare=hashedMessage==decryptedSign
    setHashedMessageReceiver(interceptedMessage)

    const updatedElements = elements.map((element) => {
      if (element.id === "text1") {
        return {
          ...element,
          data: { ...element.data, label: inputValue }, // Update the value of the node
        };
      }
      if (element.id === "text2") {
        return {
          ...element,
          data: { ...element.data, label: inputValue }, // Update the value of the node
        };
      }
      if (element.id === "message in receiver's side") {
        return {
          ...element,
          data: { ...element.data, label: inputValue },
        };
      }
      if (element.id === "private key") {
        let truncatedLabel =
          privateKey.length > 15
            ? privateKey.substring(0, 15) + "..."
            : privateKey;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel },
        };
      }
      if (element.id === "public key") {
        let truncatedLabel =
          publicKey.length > 15
            ? publicKey.substring(0, 15) + "..."
            : publicKey;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel },
        };
      }
      if (element.id === "digital signature inner") {
        let truncatedLabel =
          signature.length > 15
            ? signature.substring(0, 15) + "..."
            : signature;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel },
        };
      }
      if (element.id === "ds in receiver's side") {
        let truncatedLabel =
          signature.length > 15
            ? signature.substring(0, 15) + "..."
            : signature;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
      if (element.id === "hash value") {
        console.log(hashedMessage)
        let truncatedLabel =
          hashedMessage.length > 15
            ? hashedMessage.substring(0, 15) + "..."
            : hashedMessage;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
      if (element.id === "hash value receiver's side") {
        let truncatedLabel =
          hashedMessageReceiver.length > 15
            ? hashedMessageReceiver.substring(0, 15) + "..."
            : hashedMessageReceiver;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
      if (element.id === "verify") {
        // Update the style based on the condition
        const updatedStyle = {
          ...element.style,
          backgroundColor: compare ? "green" : "red", // Set the background color based on the condition
        };
    
        // Return the updated element with the new style
        return {
          ...element,
          style: updatedStyle,
        };
      }
    
      // Return the original element if the condition doesn't match
      return element;

    });

    setNodes(updatedElements);
  };

  const handleButtonClick2 = async () => {
    const privateKeyString = privateKey.toString(CryptoJS.enc.Hex);
      const hashedMessageSender = CryptoJS.SHA256(inputValue).toString(CryptoJS.enc.Hex);
    const hashedMessage = CryptoJS.SHA256(interceptedMessage).toString(CryptoJS.enc.Hex);

    const signature =
        privateKeyString + hashedMessageSender.toString(CryptoJS.enc.Hex);
    const decryptedSign=signature.substring(privateKey.toString(CryptoJS.enc.Hex).length)
    const compare=hashedMessage==decryptedSign
    const updatedElements = elements.map((element) => {
      if (element.id === "text1") {
        return {
          ...element,
          data: { ...element.data, label: inputValue }, // Update the value of the node
        };
      }
      if (element.id === "text2") {
        return {
          ...element,
          data: { ...element.data, label: inputValue }, // Update the value of the node
        };
      }
      
      if (element.id === "private key") {
        let truncatedLabel =
          privateKey.length > 15
            ? privateKey.substring(0, 15) + "..."
            : privateKey;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
      if (element.id === "public key") {
        let truncatedLabel =
          publicKey.length > 15
            ? publicKey.substring(0, 15) + "..."
            : publicKey;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
      if (element.id === "digital signature inner") {
        let truncatedLabel =
          signature.length > 15
            ? signature.substring(0, 15) + "..."
            : signature;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
      if (element.id === "ds in receiver's side") {
        let truncatedLabel =
          signature.length > 15
            ? signature.substring(0, 15) + "..."
            : signature;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
      if (element.id === "message in receiver's side") {

        const updatedStyle = {
          ...element.style,
        };
        return {
          ...element,
          data: { ...element.data, label: interceptedMessage },
          style: updatedStyle, // Update the value of the node
        };
      }
      if (element.id === "hash value") {
        let truncatedLabel =
          hashedMessageSender.length > 15
            ? hashedMessageSender.substring(0, 15) + "..."
            : hashedMessageSender;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
     

      if (element.id === "hash value receiver's side") {
        let truncatedLabel =
          hashedMessage.length > 15
            ? hashedMessage.substring(0, 15) + "..."
            : hashedMessage;
        return {
          ...element,
          data: { ...element.data, label: truncatedLabel }, // Update the value of the node
        };
      }
      if (element.id === "verify") {
        // Update the style based on the condition
        const updatedStyle = {
          ...element.style,
          backgroundColor: compare ? "green" : "red", // Set the background color based on the condition
        };
    
        return {
          ...element,
          style: updatedStyle,
        };
      }
      return element;
    });
    setNodes(updatedElements);

  }

  return (
    <div style={{ height: "85%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button className="button-56" onClick={generateKeyPair}>
          Generate Random Key
        </button>
        {showPrivateKey && <div style={{ margin: "20px" }}>{privateKey}</div>}
        <div style={{ display: "flex" }}>
          <div className="form__group" style={{ height: "10px", margin: "15px" }}>
            <input
              type="text"
              className="form__input"
              id="name"
              placeholder="Enter message"
              required=""
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <button className="button-52" onClick={handleButtonClick}>
            Lets see how digital signatures work{" "}
          </button>

          <div className="form__group" style={{ height: "10px", margin: "15px" }}>
            <input
              type="text"
              className="form__input"
              id="name"
              placeholder={inputValue}
              required=""
              value={interceptedMessage}
              onChange={(e) => setInterceptedMessage(e.target.value)}
            />
          </div>
          <button className="button-52" onClick={handleButtonClick2}>
            Lets Intercept the message{" "}
          </button>


        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="react-flow-subflows-example"
        fitView
        width={1000}
        height={1000}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <div className="textfield">
        <p>
          Try intercepting the message that is being sent on the receiver's side<br></br>
          Digital signatures help verify the sender and ensure the message is not tampered with.
          <br></br>
          In traditional digital signature schemes, if a signer's 
          private key is compromised at any point, all signatures made with that key become vulnerable to forgery. 
          However, with One Time Signatures (OTS), each signature uses a unique key pair, so even if one key is compromised, 
          only the corresponding signature is affected. Past signatures remain secure, providing forward security.
          <br />
          Click here to know more about <a href="/lamport">OTS</a>.
        </p>
      </div>
    </div>
  );
};

export default Page;
