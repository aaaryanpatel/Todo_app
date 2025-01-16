import Todo from "../model/todo.js";
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body); // debugging statement

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const todo = new Todo({
      title: title,
      description: description,
    });
    await todo.save();

    return res.status(201).json({
      success: true,
      message: "Todo created",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
    return res.status(200).json({
        success:true,
        todos
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};
