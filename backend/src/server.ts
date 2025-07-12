import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

// USERS CRUD

// CREATE
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email },
  });
  res.json(user);
});

// READ ALL
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// READ ONE
app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
  });
  res.json(user);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id },
    data: { name, email },
  });
  res.json(user);
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.user.delete({
    where: { id },
  });
  res.json({ message: "User deleted" });
});

// ITEMS CRUD

// CREATE
app.post("/items", async (req, res) => {
  const { name, description } = req.body;
  const item = await prisma.item.create({
    data: { name, description }
  });
  res.json(item);
});

// READ ALL
app.get("/items", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

// READ ONE
app.get("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.item.findUnique({
    where: { id },
  });
  res.json(item);
});

// UPDATE
app.put("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, description } = req.body;
  const item = await prisma.item.update({
    where: { id },
    data: { name, description },
  });
  res.json(item);
});

// DELETE
app.delete("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.item.delete({
    where: { id },
  });
  res.json({ message: "Item deleted" });
});

// Server listen
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
