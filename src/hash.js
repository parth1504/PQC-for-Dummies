import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

const VIBGYOR_COLORS = [
    '9400D3', // Violet
    '4B0082', // Indigo
    '0000FF', // Blue
    '008000', // Green
    'FFFF00', // Yellow
    'FF7F00', // Orange
    'FF0000'  // Red
];

const getRandomRGB = () => {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8).toUpperCase();
};

const getRandomVIBGYOR = () => {
    const index = Math.floor(Math.random() * VIBGYOR_COLORS.length);
    return '#' + VIBGYOR_COLORS[index];
};

const vibgyorHashFunction = (input) => {
    const sum = Array.from(input).reduce((acc, curr) => acc + curr.charCodeAt(0), 0);
    const index = sum % VIBGYOR_COLORS.length;
    return '#' + VIBGYOR_COLORS[index];
};

const rgbHashFunction = (str) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;
    return `rgb(${r}, ${g}, ${b})`;
};

const AnimationComponent = () => {
    const inputs = ["hi", "there","world"];
    const boxRef = useRef(null);
    const inputRef = useRef([]);
    const outputRef = useRef([]);

    useEffect(() => {
        runAnimation();
    }, []);

    const runAnimation = () => {
        const tl = anime.timeline({
            easing: 'linear',
            complete: runAnimation // loop the animation once it completes
        });
    
        inputs.forEach((input, idx) => {
            // Reset input and output to starting position and appearance before animating
            anime.set(inputRef.current[idx], { translateX: 0, opacity: 1 });
            anime.set(outputRef.current[idx], { translateX: 0, opacity: 0, backgroundColor: 'grey' });
            
            // Input moves to the black box
            tl.add({
                targets: inputRef.current[idx],
                translateX: [0, 80],
                duration: 500
            })
            .add({
                targets: inputRef.current[idx],
                opacity: 0,
                duration: 500
            })
            .add({
                targets: boxRef.current,
                scale: [1, 1.2],
                rotate: '1turn',
                duration: 800,
                easing: 'easeOutExpo'
            })
            .add({
                targets: outputRef.current[idx],
                translateX: [0, 160],
                duration: 300
            })
            .add({
                targets: outputRef.current[idx],
                backgroundColor: rgbHashFunction(input),
                opacity: 1,
                duration: 200
            })
            .add({
                targets: boxRef.current,
                scale: 1,
                rotate: 0,
                opacity: 1,
                duration: 500
            });
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                {inputs.map((input, idx) => (
                    <div ref={el => inputRef.current[idx] = el} key={idx} style={{ backgroundColor: 'white', width: '50px', height: '50px' }} className='form__input'>
                        {input}
                    </div>
                ))}
            </div>

            <div ref={boxRef} style={{ backgroundColor: 'black', width: '100px', height: '150px' }}>
                Black Box
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                {inputs.map((_, idx) => (
                    <div ref={el => outputRef.current[idx] = el} key={idx} style={{ backgroundColor: 'grey', width: '50px', height: '50px' }}>
                    </div>
                ))}
            </div>
        </div>
    );
}




const ChallengeComponent = ({ handleUserInput, targetColor, userColor, vibgyorColor, userVibgyor }) => {
    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            <h2>Interactive Challenge 1:</h2>
            <p>Now, given an RGB color, can you find an input that gives this color?</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ background: targetColor, width: '100px', height: '100px' }}></div>
                <input type="text" onChange={(e) => handleUserInput(e, 'RGB')} placeholder="Enter your guess" />
                <div style={{ background: userColor, width: '100px', height: '100px' }}></div>
            </div>

            <p>There are 16,777,216 RGB colors present. If you were to try each input, it would take some time.</p>

            <h2>Interactive Challenge 2:</h2>
            <p>What if the output space was just VIBGYOR? It would be significantly easier.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ background: vibgyorColor, width: '100px', height: '100px' }}></div>
                <input type="text" onChange={(e) => handleUserInput(e, 'VIBGYOR')} placeholder="Enter your guess" />
                <div style={{ background: userVibgyor, width: '100px', height: '100px' }}></div>
            </div>
            <p>this is called collision. When 2 different inputs give same hash value.</p>
        </div>
    );
}

const NaiveHash = () => {
    const [inputValue, setInputValue] = useState('');
    const [input1Value, setInput1Value] = useState('');

    const xorHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
        }
        return hash;
    };

    const sumMod5Hash = (str) => {
        return Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 5;
    };

    return (
        <div>
            <div>
                <p>There can be many such naive hash functions</p>
                <div>
                <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
                    {`
                        const sumMod5Hash = (str) => {
                        return Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 5;
                        };`
                    }
                </pre>
                <input type="text" onChange={(e) => setInputValue(e.target.value)} placeholder="Enter your string" />
                <div>Sum Mod 5: {sumMod5Hash(inputValue)}</div>
                </div>
                <div>
                <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
                    {`
                        const xorHash = (str) => {
                            let hash = 0;
                            for (let i = 0; i < str.length; i++) \{
                                hash ^= str.charCodeAt(i);
                            }
                            return hash;
                        };`
                    }
                </pre>
                </div>
                <input type="text" onChange={(e) => setInput1Value(e.target.value)} placeholder="Enter your string" />
                <div>XOR Hash: {xorHash(input1Value)}</div>
            </div>
        </div>
    );
};

const SHA256Hash = () => {
    const [inputValue, setInputValue] = useState('');
    const [hashValue, setHashValue] = useState('');
    const [randomHash, setrandomHash] = useState('');
    

    const shahash = async (str) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    };

    const handleInputChange = async (e) => {
        setInputValue(e.target.value);
        const hash = await shahash(e.target.value);
        setHashValue(hash);
    };

    const generateRandomHash = async () => {
        const randomString = Math.random().toString(36).slice(2) + Date.now().toString();
        const randomhash = await shahash(randomString);
        setrandomHash(randomhash);  // set the state directly here
    };

    useEffect(() => {
        generateRandomHash();  // call the function when the component mounts
    }, []);

    return (
        <div>
            <div>
                <p>Hashing is used for a multitude of things like checking if two large data are same, ensuring data transferred on net isnt tampered with or is authenticated </p>
                <p>Now such naive functions which easily give collisions would not be sufficient</p>
                <p>RThere comes in cryptographic hash functions:</p>
                <p>1. Any input gives fixed size output</p>
                <p>2. It is easy to compute the hash from input but very difficult to compute input from hash</p>
                <p>3. Finding 2 inputs giving same hash should be very difficult</p>
                <p>Currently there exists an algorithm called SHA256 which satisfies all this and is used extensively</p>
                <div>
                <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
                    {`
                        const shahash = async (str) => {
                            const encoder = new TextEncoder(); // Use TextEncoder to convert string to Uint8Array
                            const data = encoder.encode(str);
                            const hashBuffer = crypto.subtle.digest('SHA-256', data); // Compute the SHA-256 hash
                            const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
                            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convert bytes to hexadecimal string
                            return hashHex;
                        };`
                    }
                </pre>
                <div>
                    <p>Now try to find 2 inputs giving same hash</p>
                    <p>{randomHash}</p>
                    <input type="text" onChange={handleInputChange} placeholder="Enter your string" />
                    <div>SHA256: {hashValue}</div>
                </div>
                </div>
            </div>
        </div>
    );
};

const _256bitSecurity = () => {
    
    return (
        <div>
            <p>Well it is highly unlikely that you would be able to find any. This is called 256 bit security. To be able to find another input you would have to try 2^256 combinations since sha256 gives a fixed size 256 bit output and each bit can possess two values-0 or 1</p>
            <p>but just how much is 2^256</p>  
        </div>
    );
};

// const SecurityVisualization = () => {
//     const [blackDotCount, setBlackDotCount] = useState(1);
//     const [redSquareCount, setRedSquareCount] = useState(0);
//     const [blueCircleCount, setBlueCircleCount] = useState(0);
//     const [yellowTriangleCount, setYellowTriangleCount] = useState(0);
//     const [greenPentagonCount, setGreenPentagonCount] = useState(0);
//     const [purpleHexagonCount, setPurpleHexagonCount] = useState(0);
//     const [power, setPower] = useState(1);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             if (blackDotCount < 16) {
//                 setBlackDotCount(blackDotCount * 2);
//             } else if (redSquareCount < 16) {
//                 setRedSquareCount(redSquareCount * 2 + 1);
//             } else if (blueCircleCount < 16) {
//                 setBlueCircleCount(blueCircleCount * 2 + 1);
//             } else if (yellowTriangleCount < 16) {
//                 setYellowTriangleCount(yellowTriangleCount * 2 + 1);
//             } else if (greenPentagonCount < 16) {
//                 setGreenPentagonCount(greenPentagonCount * 2 + 1);
//             } else {
//                 setPurpleHexagonCount(purpleHexagonCount * 2 + 1);
//             }
//             setPower(power + 1);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, [blackDotCount, redSquareCount, blueCircleCount, yellowTriangleCount, greenPentagonCount, purpleHexagonCount, power]);

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <div style={{ width: '500px', height: '500px', backgroundColor: '#eee', position: 'relative' }}>
//                 {Array.from({ length: blackDotCount }).map((_, idx) => (
//                     <div key={`dot-${idx}`} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '2px', height: '2px', backgroundColor: 'black' }} />
//                 ))}
//                 {Array.from({ length: redSquareCount }).map((_, idx) => (
//                     <div key={`square-${idx}`} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '10px', height: '10px', backgroundColor: 'red' }} />
//                 ))}
//                 {Array.from({ length: blueCircleCount }).map((_, idx) => (
//                     <div key={`circle-${idx}`} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '20px', height: '20px', backgroundColor: 'blue', borderRadius: '50%' }} />
//                 ))}
//                 {Array.from({ length: yellowTriangleCount }).map((_, idx) => (
//                     <div key={`triangle-${idx}`} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '25px solid yellow' }} />
//                 ))}
//                 {Array.from({ length: greenPentagonCount }).map((_, idx) => (
//                     <div key={`pentagon-${idx}`} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '30px', height: '30px', backgroundColor: 'green', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
//                 ))}
//                 {Array.from({ length: purpleHexagonCount }).map((_, idx) => (
//                     <div key={`hexagon-${idx}`} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '40px', height: '40px', backgroundColor: 'purple', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
//                 ))}
//             </div>
//             <p>2^{power}</p>
//             <div>
//                 <span style={{ margin: '5px' }}><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'black' }}></span> = 1</span>
//                 <span style={{ margin: '5px' }}><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'red' }}></span> = 16 dots</span>
//                 <span style={{ margin: '5px' }}><span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'blue', borderRadius: '50%' }}></span> = 16 squares</span>
//                 <span style={{ margin: '5px' }}><span style={{ display: 'inline-block', width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '25px solid yellow' }}></span> = 16 circles</span>
//                 <span style={{ margin: '5px' }}><span style={{ display: 'inline-block', width: '30px', height: '30px', backgroundColor: 'green', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></span> = 16 triangles</span>
//                 <span style={{ margin: '5px' }}><span style={{ display: 'inline-block', width: '40px', height: '40px', backgroundColor: 'purple', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></span> = 16 pentagons</span>
//             </div>
//         </div>
//     );
// };



const Hash = () => {
    const [targetColor, setTargetColor] = useState(getRandomRGB);
    const [userColor, setUserColor] = useState('#FFFFFF');
    const [vibgyorColor, setVibgyorColor] = useState(getRandomVIBGYOR);
    const [userVibgyor, setUserVibgyor] = useState('#FFFFFF');

    const handleUserInput = (e, setType) => {
        const hashedColor = setType === 'RGB' ? rgbHashFunction(e.target.value) : vibgyorHashFunction(e.target.value);

        if (setType === 'RGB') {
            setUserColor(hashedColor);
        } else {
            setUserVibgyor(hashedColor);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1>Understanding Hash Functions</h1>
            <p>Hash functions take any input and transform it into a fixed-size output. In this demonstration, our input values are transformed into RGB colors.</p>
            
            <AnimationComponent />

            <ChallengeComponent 
                handleUserInput={handleUserInput} 
                targetColor={targetColor} 
                userColor={userColor} 
                vibgyorColor={vibgyorColor} 
                userVibgyor={userVibgyor} 
            />
            <NaiveHash />
            <SHA256Hash />
            <_256bitSecurity />
            
            
        </div>
    );
}
export default Hash;
