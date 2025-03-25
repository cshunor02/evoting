import './../App.css'
import FadeIn from 'react-fade-in';

function NotFound() {

  return (
    <div className="notFound">
      <FadeIn>
        <h1>404</h1>
        <h2>Page not found</h2>
        <h2>The page you are looking for is moved or does not exist!</h2>
      </FadeIn>
    </div>
  )
}

export default NotFound