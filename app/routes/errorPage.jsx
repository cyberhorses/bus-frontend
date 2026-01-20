import { Link } from 'react-router';
import '../styles/errorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oops, something went wrong!</h1>
      <p>We apologize for the inconvenience. Please try refreshing the page or come back later.</p>
      <Link to="/login">Go to Login Page</Link>
    </div>
  );
};

export default ErrorPage;