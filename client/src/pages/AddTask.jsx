import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { TASK_STATUS } from '../../../utils/constants';
import { Form, redirect,useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

var userList;

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users');
    return data;
  }
  catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log(error)
};
}

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const userIdObj = userList.find(x=>x.name == data.userName)
    console.log(userIdObj)
    data.userId = userIdObj.id
    try {
      await customFetch.post('/tasks', data);
      toast.success('Task added successfully ');
      return redirect('all-tasks');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddTask = () => {
  const { user }  = useOutletContext();
  userList  = useLoaderData().data;
  let  userNames  = userList.map(x=>x.name);
  userNames = [...new Set(userNames)]

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Task</h4>
        <div className='form-center'>
          <FormRow type='text' name='title' />
          <FormRow type='text' name='description' />
          <FormRowSelect
            labelText='Assignee'
            name='userName'
            list={userNames}
          />
          <FormRowSelect
            labelText='task status'
            name='status'
            defaultValue={TASK_STATUS.PENDING}
            list={Object.values(TASK_STATUS)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddTask;
