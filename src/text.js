import React, { useRef, useState, useEffect } from "react";
import anime from "animejs";
import CountUp from "react-countup";

const Tile = ({ value }) => {
  return (
    <div className="tile">
      <CountUp end={value} />
    </div>
  );
};

const CasinoTiles = ({ onTileValuesChange }) => {
  const [keyArray, setKeyArray] = useState([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newValues = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 2)
      );
      setKeyArray(newValues);
    }, 100); // Adjust speed as needed
    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (onTileValuesChange) {
      onTileValuesChange(keyArray);
    }
  }, [keyArray, onTileValuesChange]);

  return (
    <div 
      className="casino-tiles"
      style={{ display: "flex", justifyContent: "space-around" ,margin:"20px"}}
    >
      {keyArray.map((value, index) => (
        <Tile key={index} value={value} />
      ))}
    </div>
  );
};
const BitAnimation = () => {
  const [key, setKey] = useState([]);
  const [showKey, setShowKey] = useState(false);
  const [input, setInput] = useState("");
  const [inputArray, setInputArray] = useState([]);
  const [hash, setHash] = useState("");
  const [sections, setSections] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [signature, setSignature] = useState([]);
  const s = ["K[", "K[", "K[", "K["];
  const [showInput, setShowInput] = useState(false);
  const [showIndexes, setShowIndexes] = useState(false);
  const [showS, setShowS] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const generateKey = () => {
    setShowKey(true);
  };

  const handleTileValuesChange = (values) => {
    setKey(values);
  };

  const basicHash = (input) => {
    input = String(input);
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
    }
    hash = hash & 0b1111111111111111;
    const binaryHash = hash.toString(2).padStart(16, "0");
    const binaryHashArray = [];
    for (const element of binaryHash) {
      if (element == "1") {
        binaryHashArray.push(1);
      } else {
        binaryHashArray.push(0);
      }
    }
    return binaryHashArray;
  };

  const splitBinary = (binary, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < binary.length; i += chunkSize) {
      chunks.push(binary.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleSubmit = async () => {
    const hash = basicHash(input);
    setHash(hash);
    const binarySections = splitBinary(hash, 4);
    setSections(binarySections);
    const inputArray = [];
    for (let i of input) {
      inputArray.push(i);
    }
    setInputArray(inputArray);
    setShowInput(true);
  };

  const startAnimation = () => {
    const spread = 100;
    const bitsArray = Array.from({ length: 16 }, (_, index) => index);
    const parts = [];
    const partSize = bitsArray.length / 4;
    for (let i = 0; i < 4; i++) {
      parts.push(bitsArray.slice(i * partSize, (i + 1) * partSize));
    }
    const animations = parts.map((part, index) => {
      const targets = part.map((bit) => `#bit-${bit}`);
      return anime({
        targets,
        translateX: spread * index,
        translateY: "100px",
        delay: 100 * index, // Delay for smooth animation
        duration: 1000, // Animation duration
        easing: "easeOutQuad",
        elasticity: 400, // Adding a bit of bounce
      });
    });

    const timeline = anime.timeline({});
    animations.forEach((animation) => {
      timeline.add(animation);
    });

    timeline.finished.then(() => {
      const decimalSections = sections.map((binary) =>
        parseInt(binary.join(""), 2)
      );
      setIndexes(decimalSections);
      const signature = sections.map(
        (binary) => key[parseInt(binary.join(""), 2)]
      );
      setSignature(signature);
      console.log(signature);
      setShowIndexes(true);
      setShowS(true);
      setShowSignature(true);
    });
  };

  useEffect(() => {
    const indexArray = Array.from({ length: 4 }, (_, index) => index);

    const animations2 = indexArray.map((index) => {
      const spread = -25;

      const targets = `#ind-${index}`;
      return anime({
        targets,
        translateX: spread * index + 21,
        translateY: "120px",
        delay: 100 * index,
        duration: 1000,
        easing: "easeOutQuad",
        elasticity: 400,
      });
    });
    const timeline = anime.timeline({});
    animations2.forEach((animation) => {
      timeline.add(animation);
    });

    const animations3 = indexArray.map((index) => {
      const spread = 150;

      const targets = `#s-${index}`;
      return anime({
        targets,
        translateX: spread * index + 24,
        translateY: "87px",
        delay: 100 * index,
        duration: 1000,
        easing: "easeOutQuad",
        elasticity: 400,
      });
    });
    animations3.forEach((animation) => {
      timeline.add(animation);
    });

    timeline.finished.then(() => {});
  }, [showIndexes]);

  useEffect(() => {
    const indexArray = Array.from({ length: 4 }, (_, index) => index);

    const animations = indexArray.map((index) => {
      const spread = 1;

      const targets = `#sign-${index}`;
      return anime({
        targets,
        translateX: spread * index + 320,
        translateY: "150px",
        delay: 100 * index,
        duration: 1000,
        endDelay: 1000,
        easing: "easeOutQuad", // Animation easing
        elasticity: 400,
      });
    });
    const timeline = anime.timeline({});
    animations.forEach((animation) => {
      timeline.add(animation);
    });
  }, [showSignature]);

  return (
    
    <div>
      
    <div
      style={{
        width: "700px",
        height: "500px",
      }}
    >
       
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft:"50%"
        }}
      >
        <button className="button-54" onClick={generateKey}>
          Generate Secret Key
        </button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center", marginLeft:"10%",marginTop:"10px"}}>
          <div>
            K
          </div>
        {showKey && <CasinoTiles onTileValuesChange={handleTileValuesChange} />}
        </div>
        <div class="form__group" style={{ height: "1px", margin: "15px" }}>
          <input
            type="text"
            class="form__input"
            id="name"
            placeholder="Enter message"
            required=""
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button className="button-86" style={{marginTop: "30px"}} onClick={handleSubmit}>Let's see how Hors works</button>
        <button className="button-60"onClick={startAnimation}>Start Animation</button>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {showInput &&
          inputArray.map((section, index) => (
            <div
              key={index}
              style={{ margin: "5px", fontSize: "20px", left: "0px" }}
            >
              {section}
            </div>
          ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        Hashing it gives:
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {hash &&
          hash.map((_bit, index) => (
            <div
              key={index}
              id={`bit-${index}`}
              style={{ margin: "5px", fontSize: "20px" }}
            >
              {hash[index]}
            </div>
          ))}
      </div>

      <div style={{ display: "flex", justifyItems: "center" }}>
        {showIndexes &&
          indexes.map((section, index) => (
            <div
              key={index}
              id={`ind-${index}`}
              style={{
                margin: "5px",
                fontSize: "20px",
                left: "0px",
                paddingLeft: "200px",
              }}
            >
              {section + `]`}
            </div>
          ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyItems: "flex-start",
          paddingLeft: "150px",
        }}
      >
        {showS &&
          s.map((section, index) => (
            <div
              key={index}
              id={`s-${index}`}
              style={{ margin: "5px", fontSize: "20px", left: "0px" }}
            >
              {section}
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyItems: "flex-start",
          paddingLeft: "150px",
        }}
      >
        {showSignature &&
          signature.map((section, index) => (
            <div
              key={index}
              id={`sign-${index}`}
              style={{ margin: "5px", fontSize: "20px", left: "0px" }}
            >
              {section}
            </div>
          ))}
      </div>
      <div
        style={{
          marginTop: "160px",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "330px",
        }}
      >
        This is your Digital Signature!
      </div>
    </div>
    <div className="textfield">
                <p>
                    The Main limitation of Lamport OTS and WOTS was that they were One time Signatures, i.e. they aren't safe to use after one use.
                    <br></br>
                    HORS is a FTS or Few-Time Signature Scheme. That means it can be used to sign messages more than once.
                    <br></br>
                    Why? Since it uses a subset of keys based on the input, as you can see above.
                    Multiple subsets are used to sign a message here.
                    <br></br>
                    Bonus point: HORST is the combination of using HORS with <a href="/merkletree">Merkle Trees.</a>
                </p>

            </div>
    </div>
  );
};

export default BitAnimation;
