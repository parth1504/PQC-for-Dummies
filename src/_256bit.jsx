import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import "./_256bit.css";

const VisualizeComponent = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        setStep(step + 1)
      if (step === 0) {
        anime({
          targets: ".grain",
          r: [0, 5],
          duration: 1000,
          easing: "easeInOutQuad",
        });
      } else if (step === 1) {
        anime({
          targets: ".box",
          width: ["0%", "100%"],
          height: ["0%", "100%"],
          duration: 1000,
          easing: "easeInOutQuad",
          complete: () => {
            // Filling the box with grains
            const grains = Array.from({ length: 100 }, (_, i) => {
              return `<circle class="grain-in-box" cx="${10 + (i % 10) * 10}" cy="${10 + Math.floor(i / 10) * 10}" r="0" />`;
            });
            document.querySelector(".box").innerHTML = grains.join("");
            anime({
              targets: ".grain-in-box",
              r: [0, 2],
              delay: anime.stagger(10),
              easing: "easeInOutQuad",
            });
          }
        });
        anime.timeline({

        }).add({
            targets: ".grain",
            opacity: 0,
            duration: 4000,
            easing: "easeInOutQuad"
          })
      }else if (step === 2) {
        anime.timeline({

        })
        .add({
            targets: ".box",
            opacity: 0,
            duration: 1000,
            easing: "easeInOutQuad"
          })
        anime({
          targets: ".room",
          width: ["0%", "100%"],
          height: ["0%", "100%"],
          duration: 1000,
          easing: "easeInOutQuad",
          complete: () => {
            // Filling the room with boxes
            const boxes = Array.from({ length: 100 }, (_, i) => {
              return `<rect class="box-in-room" x="${10 + (i % 10) * 10}" y="${10 + Math.floor(i / 10) * 10}" width="0" height="0" />`;
            });
            document.querySelector(".room").innerHTML = boxes.join("");
            anime({
              targets: ".box-in-room",
              width: [0, 8],
              height: [0, 8],
              delay: anime.stagger(10),
              easing: "easeInOutQuad",
            });
          }
        });
      } else if (step === 3) {
        anime.timeline({

        })
        .add({
            targets: ".room",
            opacity: 0,
            duration: 1000,
            easing: "easeInOutQuad"
          })
        anime({
          targets: ".skyscraper",
          width: ["0%", "100%"],
          height: ["0%", "100%"],
          duration: 1000,
          easing: "easeInOutQuad",
          complete: () => {
            // Filling the skyscraper with rooms
            const rooms = Array.from({ length: 50 }, (_, i) => {
              return `<rect class="room-in-skyscraper" x="${5 + (i % 5) * 40}" y="${5 + Math.floor(i / 5) * 40}" width="0" height="0" />`;
            });
            document.querySelector(".skyscraper").innerHTML = rooms.join("");
            anime({
              targets: ".room-in-skyscraper",
              width: [0, 35],
              height: [0, 35],
              delay: anime.stagger(100),
              easing: "easeInOutQuad",
            });
          }
        });
      }else if (step === 4) {
        anime.timeline({
            
          })
          .add({
            targets: ".skyscraper",
            scale: 0.5,
            duration: 1000,
            easing: "easeInOutQuad",
          })
          .add({
            targets: ".cityscape",
            opacity: [0, 1],
            duration: 1000,
            easing: "easeInOutQuad",
          }, '-=1000');
        }else if (step === 5) {
            anime.timeline({
              complete: () => setStep(step + 1)
            })
            .add({
                targets: ".room-in-skyscraper",
                opacity: 0,
                scale: 0.5,
                duration: 1500,
                easing: "easeInOutQuad",
                delay: anime.stagger(100, {start: 500})
            })
            .add({
                targets: ".planet",
                opacity: [0, 1],
                scale: [0.01, 1],
                duration: 3000,
                easing: "easeInOutQuad"
            });
        }else if (step === 6) {
            anime.timeline({
              complete: () => setStep(step + 1)
            })
            .add({
              targets: ".planet",
              scale: 0.01,
              opacity: 0.5,
              duration: 1500,
              easing: "easeInOutQuad",
            })
            .add({
              targets: ".galaxy",
              opacity: [0, 1],
              scale: [0.1, 1],
              duration: 3000,
              easing: "easeInOutQuad"
            });
        }
    };
  
    return (
        <div className="App">
            
            <svg className="visualization" viewBox="0 0 200 200">
            <circle className="grain" cx="100" cy="100" r="0" />
            <g className="box" x="50" y="50" width="0" height="0"></g>
            <g className="room" x="25" y="25" width="0" height="0"></g>
            <g className="skyscraper" x="10" y="10" width="0" height="0"></g>
            </svg>
            <div className="city-view">
        <div className="skyscraper"></div>
        <div className="cityscape">
          {Array(10).fill().map((_, i) => (
            <div key={i} className={`building building-${i}`}></div>
          ))}
        </div>
      </div>
      <div className="planet"></div>
      <div className="galaxy">
        {Array(200).fill().map((_, i) => (
          <div key={i} className="star" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `scale(${Math.random() * 1.5})`
          }}></div>
        ))}
      </div>
      {step==8 && 
        <div> This is still far off 2^256. An attacker would need a few galaxies worth of computational power and would still need an enormous time to guess </div>
      }

          <div className="description">
            {stepDescriptions[step]}
          </div>
          <div className="multiplication">
            {stepMultiplications[step]}
          </div>
          <div className="power-of-two">
            {`This represents: 2^${stepPowers[step]}`}
          </div>
          <button onClick={nextStep}>Next</button>
        </div>
      );
  }
  const stepDescriptions = [
    "Start",
    "Imagine a grain of sand.",
    "This box can hold a million grains of sand.",
    "This room can contain a thousand boxes.",
    "A skyscraper has ten thousand rooms.",
    "Imagine a cityscape. Each city comprises a hundred skyscrapers.",
    "Now, envision an entire planet. This planet has ten thousand cities.",
    "Now, if every planet is a star in our galaxy, this is the vastness of the Milky Way."
  ];
  
  const stepMultiplications = [
    "",
    "",
    "2^1 x 10^6 = 2^20",
    "2^20 x 10^3 = 2^30",
    "2^30 x 10^4 = 2^44",
    "2^44 x 10^2 = 2^54",
    "2^54 x 10^4 = 2^68",
    ""
  ];
  
  const stepPowers = [0,1, 20, 30, 44, 54, 68,76,76 ];
const _256bit = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <VisualizeComponent />
        </div>
    );
}
export default _256bit;
