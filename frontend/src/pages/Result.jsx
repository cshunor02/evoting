import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './../App.css';
import { PieChart } from '@mui/x-charts/';
import { pieArcLabelClasses } from '@mui/x-charts/PieChart/PieArcLabel';
import FadeIn from 'react-fade-in';

const Result = () => {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState([])
    const [colors, setColors] = useState()

    function summarizeVotes(data) {
        let sum = 0
        for (let i = 0; i < data.length; i++) {
            sum += data[i].votes_count
        }
        for (let i = 0; i < data.length; i++) {
            data[i].votes_count = Math.round((data[i].votes_count / sum) * 100)
        }

        const new_list = []
        for (let i = 0; i < data.length; i++) {
            const new_obj = {}
            new_obj['label'] = data[i].candidate_name
            new_obj['value'] = data[i].votes_count
            new_obj['id'] = data[i].id
            new_list.push(new_obj)
        }
        return new_list
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8080/result/' + id)
        .then(response => response.json()) 
        .then(data => {
            if (data['error'] === 'Poll not found') {
                return
            } else {
                const obj = summarizeVotes(data)
                setData(() => obj)
                console.log(obj)
            }
        })
        .catch(error => {
          console.error('Error:', error)
        })
      }, [id])

    useEffect(() => {
        const randomColors = Array.from({ length: 100 }, () => {
            return '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
        });
        setColors(randomColors);
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

export default Result;