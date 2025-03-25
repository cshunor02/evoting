import './../App.css'
import FadeIn from 'react-fade-in';
import Elections from './Elections';
import Results from './Results';

function Home() {
/*
    const [data, setData] = useState({})

    useEffect(() => {
        setData(() => defaultData)
      }, []);
*/
  return (
      <div className='page'>
        
        <FadeIn>
            <Elections />

            <div className='activeElection'>
                <h1 className='title'>Presidental Election 2024</h1>
                <p>Some options here</p>
            </div>
            
            <Results />

            <div className='activeElection'>
                <h1 className='title'>Admin dashboard</h1>
                <p>New values</p>
            </div>
        </FadeIn>
    </div>
  )
}

export default Home