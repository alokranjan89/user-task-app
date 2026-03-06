const prisma = require("../config/prisma");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (status && !["pending", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Status must be pending or completed"
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "pending",
        userId: req.user.id
      }
    });

    res.status(201).json(task);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// GET TASKS
exports.getTasks = async (req, res) => {
  try {

    let tasks;

    if (req.user.role === "admin") {
      tasks = await prisma.task.findMany({
        include: {
          user: true
        }
      });
    } else {
      tasks = await prisma.task.findMany({
        where: { userId: req.user.id }
      });
    }

    res.json(tasks);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {

    const id = parseInt(req.params.id);
    const { title, description, status } = req.body;

    if (status && !["pending", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Status must be pending or completed"
      });
    }

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status
      }
    });

    res.json(updatedTask);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};