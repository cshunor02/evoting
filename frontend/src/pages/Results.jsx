import { useState, useEffect } from 'react';
import './../App.css';
import { PieChart } from '@mui/x-charts/';
import { pieArcLabelClasses } from '@mui/x-charts/PieChart/PieArcLabel';
import FadeIn from 'react-fade-in';

const Results = () => {

    useEffect(() => {
        const randomColors = Array.from({ length: 10 }, () => {
            return '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
        });
        setColors(randomColors);
    }, [])

    const [data, setData] = useState([])
    const [colors, setColors] = useState()

    useEffect(() => {
        setData([
                { id: 0, value: 17, label: 'A' },
                { id: 1, value: 16, label: 'B' },
                { id: 3, value: 43, label: 'C' },
                { id: 4, value: 22, label: 'D' },
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
                    cornerRadius: 20,
                    startAngle: 0,
                    arcLabel: (item) => `${item.value}%`,
                    arcLabelMinAngle: 35,
                    arcLabelRadius: '60%',
                    endAngle: 360,
                    cx: 200,
                    cy: 200,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 45, additionalRadius: 0, color: 'gray' },
                    }
                    
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                  }}
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

export default Results;