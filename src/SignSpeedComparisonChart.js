import React, { useEffect , useRef} from 'react'
import Chart from 'chart.js/auto'
import './ComparisonCharts.css'

export default function SignSpeedComparisonChart() {

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      data:{
        labels: [
          'Intel Core i7-4770K', 
          'Intel Xeon E3-1275', 
          'Intel Core i7-6600U', 
          'Intel Core i5-8600K'
        ],
        datasets: [
          {
            label: 'CRYSTALS-Dilithium',
            data: [789000, 853000, 333000, 313000],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
          },

          {
            label: 'Sphincs+',
            data: [51636000, 52234000, 21045000, 19893000],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Signing speed on different processors',
            font: {size: 16}
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
              text: 'Processors',
              font: {size: 14}
            },
          },
          y: {
            title: {
              display: true,
              text: 'No. of CPU Cycles',
              font: {size: 14}
            },
            ticks: {
              callback: function (value) {
                return value / 1000 + 'k';
              },
            },
          },
        },
      },
    })
    return()=>{
      if(chartInstance.current){
        chartInstance.current.destroy();
      }
    }
  }, [])

  return (
    <div >
      <div className='graph-container'> 
        <canvas ref={chartRef}/>
      </div>
      <div className='text-container'>
          <p> From the above chart, it is evident that CRSYTALS-Dilithium takes LESS time for signing compared to Sphincs+. </p>
      </div>
      <hr></hr>
    </div>
  )
}
