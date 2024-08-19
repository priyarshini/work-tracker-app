import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      
      <div className='container page'>
        <div className='info'>
          <Logo />
          <h1>
         Work Tracker
          </h1>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login
          </Link>
        </div>
        <img src={main} alt='task management' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
