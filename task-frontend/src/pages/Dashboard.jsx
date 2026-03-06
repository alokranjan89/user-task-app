import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const [tasks,setTasks] = useState([]);
  const [user,setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    loadData();
  },[]);

  const loadData = async () => {

    try {

      const userRes = await API.get("/users/me");
      setUser(userRes.data);

      const taskRes = await API.get("/tasks");
      setTasks(taskRes.data);

    } catch {
      navigate("/");
    }

  };

  const addTask = async (e) => {

    e.preventDefault();

    if(!title.trim()) return;

    await API.post("/tasks",{
      title,
      description,
      status:"pending"
    });

    setTitle("");
    setDescription("");

    loadData();

  };

  const updateStatus = async (task,newStatus) => {

    await API.put(`/tasks/${task.id}`,{
      status:newStatus
    });

    loadData();

  };

  const deleteTask = async (id) => {

    await API.delete(`/tasks/${id}`);

    loadData();

  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };


  const pending = tasks.filter(t=>t.status==="pending");
  const progress = tasks.filter(t=>t.status==="inprogress");
  const completed = tasks.filter(t=>t.status==="completed");


  return (

    <div className="min-h-screen bg-slate-950 text-slate-200">

      {/* HEADER */}

      <div className="border-b border-slate-800 px-10 py-5 flex justify-between">

        <h1 className="text-xl font-semibold">
          TaskFlow
        </h1>

        <div className="flex gap-6 items-center">

          <span className="text-sm text-slate-400">
            {user?.email}
          </span>

          <button
            onClick={logout}
            className="border border-slate-700 px-4 py-2 rounded hover:bg-slate-800"
          >
            Logout
          </button>

        </div>

      </div>


      {/* CREATE TASK */}

      <div className="max-w-5xl mx-auto p-8">

        <form
          onSubmit={addTask}
          className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8 space-y-3"
        >

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded"
          />

          <button className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
            Add Task
          </button>

        </form>



        {/* KANBAN BOARD */}

        <div className="grid grid-cols-3 gap-6">

          {/* Pending */}

          <Column
            title="Pending"
            tasks={pending}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            next="inprogress"
          />

          {/* In Progress */}

          <Column
            title="In Progress"
            tasks={progress}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            next="completed"
          />

          {/* Completed */}

          <Column
            title="Completed"
            tasks={completed}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
          />

        </div>

      </div>

    </div>

  );

}



function Column({title,tasks,updateStatus,deleteTask,next}){

  return(

    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">

      <h2 className="text-sm text-slate-400 mb-4">
        {title}
      </h2>

      <div className="space-y-3">

        {tasks.length===0 && (
          <p className="text-slate-500 text-sm">
            No tasks
          </p>
        )}

        {tasks.map(task=>(
          
          <div
            key={task.id}
            className="bg-slate-800 border border-slate-700 p-3 rounded"
          >

            <p className="font-medium">
              {task.title}
            </p>

            <p className="text-sm text-slate-400">
              {task.description}
            </p>

            <div className="flex gap-2 mt-2">

              {next && (
                <button
                  onClick={()=>updateStatus(task,next)}
                  className="text-xs bg-indigo-600 px-2 py-1 rounded"
                >
                  Move
                </button>
              )}

              <button
                onClick={()=>deleteTask(task.id)}
                className="text-xs border border-slate-600 px-2 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Dashboard;