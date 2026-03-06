const prisma = require("../config/prisma");

exports.getProfile = async (req, res) => {

  try {

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        role: true
      }
    });

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};

exports.getAllUsers = async (req, res) => {

  try {

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true
      }
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};

exports.deleteUser = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    await prisma.user.delete({
      where: { id }
    });

    res.json({
      message: "User deleted"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};