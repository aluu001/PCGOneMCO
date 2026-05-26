import TaskFilters from '../components/TaskFilters';
import TaskTable from '../components/TaskTable';

export default function MyTasks() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-700">My Tasks</h1>
      </div>
      <TaskFilters />
      <TaskTable />
    </>
  );
}
