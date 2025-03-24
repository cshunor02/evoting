import './../App.css'
import Layout from './Layout'

function Home() {
  return (
    <div className='page'>
        <Layout />
        <h2>Available Elections</h2>
        <div className='electionPanel'>
            <div className='election'>
                <h3>Presidental Election 2024</h3>
                <p>BLABLA</p>
                <p className='status'>Active</p>
                <input type='button' onClick={(event) => event.preventDefault()} value='Vote now'></input>
            </div>
            <div className='election'>
                <h3>Local Council Election 2024</h3>
                <p>BLABLA</p>
                <p className='status'>Active</p>
                <input type='button' onClick={(event) => event.preventDefault()} value='Coming soon'></input>
            </div>
        </div>

        <div className='activeElection'>
            <h1 className='title'>Presidental Election 2024</h1>
        </div>
    </div>
  )
}

export default Home