import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../domain/dtos";
import { UpdateTodoDto } from "../domain/dtos/todos/update-todo.dto";

// const todos = [
//   { id: 1, text: "Buy Milk", completedAt: new Date() },
//   { id: 2, text: "Buy Pan", completedAt: null },
//   { id: 3, text: "Buy butter", completedAt: new Date() },
// ];

export class TodosController {
  //DI* Dependency inyection
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    res.json(todos);
  };

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo =  await prisma.todo.findFirst({
      where : {id : id}
    })

    if (isNaN(id))return res.status(400).json({ error: "ID argument is not a number" });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `No se encontro el TODO con id ${id}` });
  };

  public createTodo = async (req: Request, res: Response) => {
    // const { text } = req.body;

    const [error , createTodoDto] = CreateTodoDto.create(req.body)

    if (error) return res.status(400).json({error})

    const todo = await prisma.todo.create({
      data:  createTodoDto! 
    });

    res.json(todo);
  };

  public updateTodo = async (req : Request , res : Response) => {
    const id = +req.params.id;

    const [error , updateTodoDto] = UpdateTodoDto.create({...req.body , id})
    if(error) return res.status(400).json({error})

    if (isNaN(id))return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findFirst({
      where : {id : id}
    })

    if(!todo) return res.status(404).json({error:`No se encontró el todo con id ${id} `});

    const updateTodo = await prisma.todo.update({
      where : {id : id},
      data : updateTodoDto!.values
    })
    
    res.json(updateTodo)
  };

  public DeleteTodos = async (req: Request, res: Response) => {

    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({
      where : {id : id},
    })

    if(!todo) return res.status(400).json({error: "El id no se encontró"});

    const deleteTodo = await prisma.todo.delete({
      where:{id:id},
    })
    
    res.json({todo , deleteTodo})

  };
}
