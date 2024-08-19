import { BsFillPersonCheckFill } from 'react-icons/bs';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Task';

const Task = ({
  id,
  title,
  description,
  status
}) => {
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='info'>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <div className={`status ${status.split(" ").join("-")}`}>{status}</div>
        </div>
        <footer className='actions'>
          <Link to={`../edit-task/${id}`} className='btn edit-btn'>
            Edit
          </Link>
          <Form method='post' action={`../delete-task/${id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Task;
