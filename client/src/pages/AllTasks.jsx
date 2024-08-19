import { toast } from 'react-toastify';
import { TasksContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async () => {
    try {
      const { data } = await customFetch.get('/tasks');
      return data;
    }
    catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error)
  };
}

const AllTasksContext = createContext();
const AllTasks = () => {
  const  tasks  = useLoaderData().data;
  console.log("all task:", tasks)
  return (
    <AllTasksContext.Provider value={{ tasks }}>
      
      <TasksContainer />
    </AllTasksContext.Provider>
  );
};

export const useAllTasksContext = () => useContext(AllTasksContext);

export default AllTasks;
