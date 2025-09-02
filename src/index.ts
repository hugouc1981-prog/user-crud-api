import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

interface User {
  id: number;
  name: string;
  email: string;
}

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// In-memory store
let users: User[] = [];
let nextId = 1;

// Routes

// GET all users
app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

// GET user by ID
app.get("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// CREATE user
app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser: User = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user
app.put("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.idm as string);
  const { name, email } = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = { id, name, email };
  res.json(users[index]);
});

// DELETE user
app.delete("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
