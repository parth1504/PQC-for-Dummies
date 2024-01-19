import React, { useState, useEffect } from 'react';
import './lamport.css'; // Import your CSS file

function decimalToBinary(decimalNumber) {
    if (isNaN(decimalNumber) || decimalNumber < 0 || !Number.isInteger(decimalNumber)) {
        return "Invalid input";
    }

    return decimalNumber.toString(2);
}

function basicHash(input) {
    // Ensure input is a string
    input = String(input);

    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        // XOR operation to mix the characters
        hash ^= input.charCodeAt(i);
    }

    // Ensure the hash is within a 6-bit range (0 to 63)
    hash = hash & 0b111111;

    return hash;
}

function generateRandomArray() {
    const array1 = [];
    const array2 = [];

    for (let i = 0; i < 6; i++) {
        array1.push(Math.floor(Math.random() * 10)); // Generate random integers between 0 and 99
        array2.push(Math.floor(Math.random() * 10));
    }

    return [array1, array2];
}


function Lamport() {
    const [array, setArray] = useState([1, 2, 3, 4, 5, 6]);
    const [y, setY] = useState([5, 5, 15, 21, 40, 62]);
    const [inputArray, setInputArray] = useState([1, 0, 1, 0, 1, 0]);
    const [signature, setSignature] = useState('');

    const [xPk, setxPk] = useState([0, 0, 0, 0, 0, 0]);
    const [yPk, setyPk] = useState([0, 0, 0, 0, 0, 0]);

    const [digitalSignature, setDigitalSignature] = useState([0, 0, 0, 0, 0, 0]);
    const [Receiversignature, setReceiverSignature] = useState('');

    const [privateKey, setPrivateKey] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [isSignatureValid, setIsSignatureValid] = useState(false);
    const [interceptIndex, setInterceptIndex] = useState('');
    const [interceptedIndex, setInterceptedIndex] = useState(-1);




    async function verifySignature(digitalSignature, Receiversignature) {
        // Remove spaces from the digitalSignature string
        let digitalSignatureWithoutSpaces = digitalSignature.map(value => basicHash(value)).join(' ');
        console.log(digitalSignatureWithoutSpaces);
        console.log(Receiversignature);
        //return [digitalSignatureWithoutSpaces,Receiversignature]

        // Remove spaces from the Receiversignature string
        digitalSignatureWithoutSpaces = digitalSignatureWithoutSpaces.replace(/ /g, '');
        let ReceiversignatureWithoutSpaces = Receiversignature.replace(/ /g, '');

        console.log(digitalSignatureWithoutSpaces == ReceiversignatureWithoutSpaces)
        await setIsSignatureValid(digitalSignatureWithoutSpaces == ReceiversignatureWithoutSpaces);
        console.log(isSignatureValid)
    }
    const verifyAndSetSignature = () => {
        verifySignature(digitalSignature, Receiversignature);
    };

    function intercept() {
        if (interceptIndex === '' || isNaN(interceptIndex)) {
            alert('Please enter a valid index.');
            return;
        }

        const index = parseInt(interceptIndex);
        if (index >= 0 && index < digitalSignature.length) {
            let fakeDigitalSignature = [...digitalSignature];
            fakeDigitalSignature[index] = Math.floor(Math.random() * 10);
            setDigitalSignature(fakeDigitalSignature);
            setInterceptedIndex(index); // Set the intercepted index here
        } else {
            alert('Index is out of range.');
        }
    }


    // Use the useEffect hook to update isSignatureValid when digitalSignature or Receiversignature changes
    useEffect(() => {
        verifySignature(digitalSignature, Receiversignature);
    }, [inputArray, xPk, yPk, array, y, digitalSignature, Receiversignature]);


    const updateValue = (index, newValue) => {
        const newArray = [...inputArray];
        newArray[index] = newValue;
        setInputArray(newArray);
    };
    const generateRandomArrays = () => {
        const [randomArray1, randomArray2] = generateRandomArray();
        setArray(randomArray1);
        setY(randomArray2);
    };


    useEffect(() => {
        let sig = "";
        for (let i = 0; i < 6; i++) {
            if (inputArray[i] === 0) {
                sig += decimalToBinary(array[i]) + " \t\t";
                digitalSignature[i] = array[i];
            } else if (inputArray[i] === 1) {

                sig += decimalToBinary(y[i]) + " \t\t";
                digitalSignature[i] = y[i];
            } else {
                sig += "Wrong input ";
            }
        }
        setSignature(sig);
    }, [inputArray, array, y]);
    useEffect(() => {
        let sig = "";
        for (let i = 0; i < 6; i++) {
            if (inputArray[i] === 0) {
                sig += xPk[i] + " ";
                // digitalSignature[i] = decimalToBinary(array[i]);
            } else {
                sig += yPk[i] + " ";
                //digitalSignature[i] = decimalToBinary(array[i]);
            }
        }
        setReceiverSignature(sig);
    }, [inputArray, xPk, yPk]);
    useEffect(() => {
        const newXpk = array.map((value) => basicHash(value));
        setxPk(newXpk);
    }, [array]);

    useEffect(() => {
        const newYpk = y.map((value) => basicHash(value));
        setyPk(newYpk);
    }, [y]);



    return (
        <div>
            <div className="array-container" style={{ padding: '20px' }}>
                <button onClick={generateRandomArrays}>Generate keys</button>
            </div>
            <div className="key-container">
                <div className="public-key-container">
                    <div className="private-key">
                        <h1>Private Key</h1>
                        <h2>x</h2>
                        <div className="array-container">
                            {array.map((value, index) => (
                                <div key={index}
                                    className={`array-box ${inputArray[index] === 0 ? 'selected-from-privateKey' : ''}`} >
                                    <text>{value}</text>
                                </div>
                            ))}
                        </div>
                        <h2>y</h2>
                        <div className="array-container">
                            {y.map((value, index) => (
                                <div key={index}
                                    className={`array-box ${inputArray[index] === 1 ? 'selected-from-privateKey' : ''}`} >
                                    <text>{value}</text>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div >

                        <h2>Input</h2>
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

                        <div className="array-container" style={{ padding: '20px' }}>
                            <text>Digital Signature: </text>
                        </div>

                        <div className="array-container">
                            {digitalSignature.map((value, index) => (
                                <div key={index} className={`array-box ${interceptedIndex === index ? 'intercepted-element' : ''}`}>
                                    <text>{value}</text>
                                </div>
                            ))}
                        </div>

                        <p>Digital signature in Binary form: {signature}</p>
                    </div>


                </div>
                <div className="arrow" style={{ padding: '20px' }}>
                    <text>ONE WAY HASH</text>
                    <p>&#8594;</p> {/* Unicode arrow character (right arrow) */}
                </div>
                <div className="public-key-container">
                    <div className="public-key"><h2>Public key</h2>
                        <div className="array-container">
                            <h2>X'</h2>
                            {xPk.map((value, index) => (
                                <div key={index} className={`array-box ${inputArray[index] === 0 ? 'selected-from-publicKey' : ''}`}>
                                    <text>{value}</text>
                                </div>
                            ))}
                        </div>
                        <div className="array-container">
                            <h2>Y'</h2>
                            {yPk.map((value, index) => (
                                <div key={index} className={`array-box ${inputArray[index] === 1 ? 'selected-from-publicKey' : ''}`}>
                                    <text>{value}</text>
                                </div>
                            ))}
                        </div>
                        <div className="signature">
                            <h2>Signature formed using public key: </h2>
                            <text>{Receiversignature}</text>
                        </div>
                    </div>
                    <div>

                        <div className="array-container">
                            <h2>Hash the digital signature with one-way hash:</h2>
                            <text>{digitalSignature.map(value => basicHash(value)).join(' ')}</text>

                        </div>

                        <div style={{ padding: '20px' }}>
                            <text>{digitalSignature.map(value => basicHash(value)).join(' ')}</text>
                            <input
                                type="number"
                                value={interceptIndex}
                                onChange={(e) => setInterceptIndex(e.target.value)}
                                placeholder="Enter Index to Intercept"
                            />
                            <div >
                                <button onClick={intercept}>Intercept</button>
                            </div>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <button onClick={verifyAndSetSignature}>
                                Signature Match:   
                            </button>
                            <text>{isSignatureValid ? '    Yes' : '    No'}</text>

                        </div>

                    </div>

                </div>
            </div>







        </div>
    );
}

export default Lamport;
