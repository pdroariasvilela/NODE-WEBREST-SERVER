import { Request, Response } from "express";
import { text } from "stream/consumers";

const todos = [
  { id: 1, text: "Buy Milk", createdAd: new Date() },
  { id: 2, text: "Buy Pan", createdAd: null },
  { id: 3, text: "Buy butter", createdAd: new Date() },
];

export class TodosController {
  //DI* Dependency inyection
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodosById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);

    if (isNaN(id))return res.status(400).json({ error: "ID argument is not a number" });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `No se encontro el TODO con id ${id}` });
  };

  public createTodo = (req: Request, res: Response) => {
    const {text} = req.body;
    if(!text) return res.status(400).json({error: "Text property required"})
    
    const newTodo = {
      id: todos.length + 1,
      text : text,
      createdAd: null
    }
    todos.push(newTodo)
    res.json(newTodo);
  };

  public updateTodo = (req : Request , res : Response) => {
    const id = +req.params.id;

    if (isNaN(id))return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find(todo=> todo.id === id);
    if(!todo) return res.status(404).json({error:`No se encontró el todo con id ${id} `});

    const {text , createdAd} = req.body
    
    todo.text = text || todo.text;
    (createdAd === "null") 
    ? todo.createdAd = null
    : todo.createdAd = new Date(createdAd || todo.createdAd)

    res.json(todo)
  };

  public DeleteTodos = (req: Request, res: Response) => {

    const id = +req.params.id;

    const todo = todos.find((todo) => todo.id === id);
    if(!todo) return res.status(400).json({error: "El id no se encontró"});

    todos.splice(todos.indexOf(todo) , 1)  
    res.json(todo)
    
    // todos.filter((todo) => todo.id !== id);
    // res.json(todos)

  };
}
