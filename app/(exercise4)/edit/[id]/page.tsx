import { fetchTodoById } from '../../lib/todo'
import EditTodoForm from '../../components/EditComponent'
interface editTodoPageProps {
  params: {
    id: string;
  };
}
export default async function EditPage({params}:editTodoPageProps){
    const todo=await fetchTodoById(params.id);
    if(!todo) return <p>Todo not found</p>
  return (
    <div className='max-w-md mx-auto mt-10 p-6'>
        <EditTodoForm todo={todo} />
    </div>
  )
}