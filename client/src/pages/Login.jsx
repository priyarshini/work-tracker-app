import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/users/login', data);
      toast.success('Login successful');
      return redirect('/dashboard');
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg);
      return redirect('/login');
      return error;
    }
  };

const Login = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn />
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
