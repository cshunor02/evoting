import { useState, useEffect } from 'react';
import './../App.css';
import { PieChart } from '@mui/x-charts/';
import FadeIn from 'react-fade-in';

const ResultsAAA = () => {

    const [data, setData] = useState([])
    const [colors, setColors] = useState(['#92C5F9', '#AFDC8F', '#F99D9C', '#EB9AFA', '#876FD4', '#FFD966', '#B6A6E9'])

    useEffect(() => {
        /*
        fetch('http://localhost:8000/polls/')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
        */
        setData([
                { id: 0, value: 10, label: 'A' },
                { id: 1, value: 10, label: 'B' },
                { id: 3, value: 20, label: 'C' },
            ])
    }, [])

    return (
        <FadeIn>
        <div className="App">
            <h1>Election Results</h1>
            <div className='activeElection'>
                <h2>Pie chart of the results</h2>
                <h3>Question</h3>
                <PieChart colors={colors}
                    series={[
                    {
                        data: data,
                    innerRadius: 45,
                    outerRadius: 200,
                    paddingAngle: 3,
                    cornerRadius: 10,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 200,
                    cy: 200,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 45, additionalRadius: 0, color: 'gray' },
                    }

                ]}
                    width={550}
                    height={450}
                    margin={{ right: 0, top: 0}}
                    slotProps={{
                        legend: { hidden: true },
                      }}
                className='pieChart' />
                <div className='pieLabels'>
                    {Object.keys(data).map((i,key) => (
                        <div key={key} className='pieLabelElem'>
                            <div className='pieMiniBox' style={{backgroundColor: colors[i] }}>
                            </div>
                            <span>{data[key].label}</span>
                        </div>
                    ))}
            </div>

            <hr className='resultsDivider' />


        </div>
        </div>
        </FadeIn>
    );
};

export default ResultsAAA;