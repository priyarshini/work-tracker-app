import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '../pages/Dashboard';
import LogoutContainer from './LogoutContainer';
const Navbar = () => {
  return (
    <Wrapper>
      <div className='nav-center'>
        <div>
          <Logo /> 
        </div>
        <h1><i>Work Tracker</i></h1>
        <div className='btn-container'>
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
