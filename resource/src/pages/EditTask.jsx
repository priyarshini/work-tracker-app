import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { TASK_STATUS } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

// const singleJobQuery = (id) => {
//   return {
//     queryKey: ['task', id],
//     queryFn: async () => {
//       const { data } = await customFetch.get(`/tasks/${id}`);
//       return data;
//     },
//   };
// };

export const loader =
  async ({ params }) => {
    try {
      const { data } = await customFetch.get(`/tasks/${params.id}`);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-tasks');
    }
  };
export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/tasks/${params.id}`, data);
      // queryClient.invalidateQueries(['jobs']);

      toast.success('Task edited successfully!');
      return redirect('/dashboard/all-tasks');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditTask = () => {
  const task = useLoaderData().data[0];
  console.log(task.status)

  // const {
  //   data: { task },
  // } = useQuery(singleJobQuery(id));

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Task</h4>
        <div className='form-center'>
          <FormRow type='text' name='title' defaultValue={task.title} />
          <FormRow type='text' name='description' defaultValue={task.description} />
          <FormRowSelect
            name='status'
            defaultValue={task.status}
            list={Object.values(TASK_STATUS)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditTask;
