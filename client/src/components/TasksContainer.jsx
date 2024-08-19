import Task from './Task';
import Wrapper from '../assets/wrappers/TasksContainer';
import { useAllTasksContext } from '../pages/AllTasks';
import { Link } from 'react-router-dom';

const TasksContainer = () => {
  const { tasks } = useAllTasksContext();
  console.log("task: "+tasks)
  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No Tasks to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
     <div className="bar-center">
      <h4>
        {tasks.length} Task{tasks.length > 1 && 's'} found
      </h4> 
      <Link to={`../`} className='btn add-btn'>
            Add
          </Link>
     </div>
      <div className='tasks'>
        {tasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};
export default TasksContainer;
