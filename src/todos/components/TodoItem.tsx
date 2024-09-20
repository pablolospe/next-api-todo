import { Todo } from "@prisma/client"

interface Props {
    todo: Todo;
    //Acciones que quiero llamar
}

export const TodoItem = ({todo}: Props) => {
  return (
    
    <div >{todo.description}</div>
    
    
  )
}
