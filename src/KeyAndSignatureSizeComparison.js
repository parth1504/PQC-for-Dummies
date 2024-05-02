import React, { useEffect , useRef} from 'react'
import Chart from 'chart.js/auto'
import './ComparisonCharts.css'


export default function KeyAndSignatureSizeComparison() {

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "scatter",
      data:{
        datasets:[
          {
            label: "CRYSTALS-Dilithium",
            data: [
              {x: 2701, y: 1472},
              {x: 2420, y: 1312},
              {x: 2449, y: 1375},
              {x: 3293, y: 1952},
              {x: 4595, y: 2592}
            ],
            backgroundColor: 'rgba(255, 205, 86, 0.4)',
            borderColor: 'rgb(255, 205, 86)'
          },
          {
            label: "Sphincs+",
            data: [
              {x: 41000, y: 1056},
              {x: 38538, y: 990},
              {x: 42080, y: 1071},
              {x: 39203, y: 1002},
              {x: 40123, y: 1050}
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.4)',
            borderColor: 'rgb(153, 102, 255)'
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Signature Size VS Public Key Size',
            font: { size: 16 }
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Signature Size (in bytes)',
              font: { size: 14 }
            },
          },
          y: {
            title: {
              display: true,
              text: 'Public Key Size (in bytes)',
              font: { size: 14 }
            },
          },
        },
      }
    })
    return()=>{
      if(chartInstance.current){
        chartInstance.current.destroy();
      }
    }
  }, [])

  return (
    <div>
      <div className='graph-container'>
        <canvas ref={chartRef}/>
      </div>
      <div className='text-container'>
          <p> From the above scatter plot, we can see that the signature size and thus the overall size of 'Public Key + Signature' of Sphincs+ is very large compared to CRYSTALS-Dilithium. </p>
      </div>
      <hr></hr>
    </div>
  )
}
