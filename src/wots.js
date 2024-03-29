import React, { useState, useEffect } from 'react';
import anime from 'animejs';
import CountUp from 'react-countup';
import './wots.css'; // Import your CSS file

function basicHash(input) {
    input = String(input);
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
    }

    hash = hash & 0b111111;
    return hash;
}

function generateRandomArray() {
    const array1 = [];

    for (let i = 0; i < 6; i++) {
        array1.push(Math.floor(Math.random() * 10));
    }
    return array1;
}

function chainHash(input,times){
    let num=input;
   
    for(let i=0;i<times;i++){
        num=basicHash(num);
       
    }
    return num
}

function Wots() {
    const [sk, setSk] = useState([1, 2, 3, 4, 5, 6]);
    const [pk, setPk] = useState([0, 0, 0, 0, 0, 0]);
    const [inputArray, setInputArray] = useState([1, 0, 1, 0, 1, 0]);
    const [signature, setSignature] = useState([]);
    const [recevierSide, setReceiverSide] = useState([]);
    const updateValue = (index, newValue) => {
        const newArray = [...inputArray];
        newArray[index] = newValue;
        setInputArray(newArray);
    };

    useEffect(() => {
        // Calculate the basic hash of sk and set pk
        const hashedSk = sk.map((value) => chainHash(value,10));
        setPk(hashedSk);
    }, [sk]);

    useEffect(() => {
        const newSignaute = sk.map((value, index) => chainHash(value, inputArray[index]));
        setSignature(newSignaute);
    }, [inputArray]);
    
    useEffect(() => {
       // console.log(signature);
    }, [signature]);
    

    useEffect(() => {
        const newSignature = signature.map((value, index) => chainHash(value, 10 - inputArray[index]));
        setReceiverSide(newSignature);
    }, [inputArray, signature]);
   
    
    useEffect(() => {
        //console.log(recevierSide);
    }, [recevierSide]);

    const generateRandomArrays = () => {
        const randomArray1 = generateRandomArray();
        setSk(randomArray1);
    };

    return (
        <div className="wots-container">
            <div className="array-container" style={{ padding: '20px' }}>
                <button className='button-wots' onClick={generateRandomArrays}>Generate keys</button>
            </div>
            <div className="public-key">
                <h1>Private Key</h1>
                <h3>Private key is the sk array</h3>
                <div className="array-container">
                    {sk.map((value, index) =>
                    (
                        <div key={index} className={`array-box`}>
                            <text>sk{index}</text>
                        </div>
                    ))}
                </div>
                <div className="array-container">

                    {sk.map((value, index) => (
                        <div key={index} className={`array-box`}>
                            <text>{value}</text>
                        </div>
                    ))}
                </div>

                <h1>Public Key</h1>
                <h4>Each secret key byte is hashed 256 times in order to obtain its respective public key</h4>
                <h4>sk(i) will be hashed 256 times to get pk(i)</h4>
                <h4>Note: for simplicity sake we have only hashed it 10 times in this code snippet but in practice we hash it 256 times.</h4>
                <div className="array-container">
                    {pk.map((value, index) =>
                    (
                        <div key={index} className={`array-box`}>
                            <text>pk{index}</text>
                        </div>
                    ))}
                </div>
                <div className="array-container">
                    {pk.map((value, index) => (
                        <div key={index} className={`array-box`} style={{ animationDelay: `${index * 1}s` }}>
                            <CountUp end={value} duration={2} />{/* Use CountUp component */}
                        </div>
                    ))}
                </div>



            </div>

            <div className="input-container">
                <h2>Input</h2>
                <h4>Should range from 0-10</h4>
                <div className="array-container">
                    {inputArray.map((value, index) => (
                        <div key={index} className="array-box">
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => updateValue(index, parseInt(e.target.value))}
                            />
                        </div>
                    ))}
                </div>
                <h2>Digital Signature</h2>
                <h4>The ith bit of secret key will be hashed input(i) times in order to generate the digital signature</h4>
                <div className="array-container">
                    {inputArray.map((value, index) => (
                        <div key={index} className={`array-box`} style={{ animationDelay: `${index * 1}s` }}>
                            <text>Hash SK{index}  <CountUp end={inputArray[index]} duration={2} /> Times</text>
                        </div>
                        
                    ))}
                </div>
                <h4>DS array:</h4>
                <div className="array-container">
                    {sk.map((value, index) => (
                        <div key={index} className={`array-box`} style={{ animationDelay: `${index * 1}s` }}>
                           <CountUp end={chainHash(value,inputArray[index])} duration={2} />
                        </div>
                        
                    ))}
                </div>
                <h4>On receiver's side, we hash the ith bit of digital signature array N - input(i) times and compare it with public key in order to verify the signature</h4>
                <h4>Note: In practice N is generally 256, but for simplicity sake we have used N = 10</h4>
                <div className="array-container">
                    {pk.map((value, index) => (
                        <div key={index} className={`array-box`} style={{ animationDelay: `${index * 1}s` }}>
                            <text>Hash DS{index} N- <CountUp end={inputArray[index]} duration={2} /> Times</text>
                        </div>
                    ))}
                </div>

                <div className="array-container">
                    {recevierSide.map((value, index) => (
                        <div key={index} className={`array-box`} style={{ animationDelay: `${index * 1}s` }}>
                           <CountUp end={value} duration={2} />
                        </div>
                        
                    ))}
                </div>


            </div>

        </div>
    );
}

export default Wots;
