import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import "./App.css";

const starterTasks = [
  {
    id: "1",
    title: "Complete React Assignment",
    description: "Finish the React Router task manager.",
    priority: "High",
    category: "Academic",
    dueDate: "2026-10-05",
    raisedAt: new Date().toLocaleString(),
    status: "Pending",
  },
  {
    id: "2",
    title: "Organize study notes",
    description: "Arrange notes for the next class.",
    priority: "Medium",
    category: "Personal",
    dueDate: "2026-10-10",
    raisedAt: new Date().toLocaleString(),
    status: "Closed",
  },
];

function ProtectedRoute() {
  return localStorage.getItem("taskManagerLoggedIn") === "true"
    ? <Outlet />
    : <Navigate to="/login" replace />;
}

function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    localStorage.setItem("taskManagerLoggedIn", "true");
    navigate("/");
  }

  return (
    <div className="login-page">
      <form className="form-card" onSubmit={handleLogin}>
        <h1>Task Manager</h1>
        <p>Sign in to open your dashboard.</p>
        <label>Name</label>
        <input placeholder="Enter your name" required />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter any password"
          required
        />
        <button type="submit">Sign In</button>
        <small>This is a demo login for the assignment.</small>
      </form>
    </div>
  );
}

function Layout() {
  const [tasks, setTasks] = useState(starterTasks);
  const navigate = useNavigate();

  function addTask(task) {
    setTasks((previous) => [
      ...previous,
      {
        ...task,
        id: Date.now().toString(),
        raisedAt: new Date().toLocaleString(),
        status: "Raised",
      },
    ]);
    navigate("/tasks");
  }

  function updateTask(id, changes) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, ...changes } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  function logout() {
    localStorage.removeItem("taskManagerLoggedIn");
    navigate("/login");
  }

  return (
    <div className="app">
      <header className="header">
        <Link className="brand" to="/">Task Manager</Link>
        <button className="logout" onClick={logout}>Log Out</button>
      </header>

      <div className="layout">
        <nav className="sidebar">
          <Link to="/">Dashboard</Link>
          <Link to="/tasks">All Tasks</Link>
          <Link to="/add-task">Add Task</Link>
          <Link to="/completed">Completed Tasks</Link>
        </nav>

        <main className="content">
          <Outlet context={{ tasks, addTask, updateTask, deleteTask }} />
        </main>
      </div>
    </div>
  );
}

function Dashboard() {
  const { tasks } = useOutletContext();
  const completed = tasks.filter((t) => t.status === "Closed").length;
  const pending = tasks.filter((t) => t.status !== "Closed").length;

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to your task management dashboard.</p>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Tasks</h3><strong>{tasks.length}</strong>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3><strong>{pending}</strong>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3><strong>{completed}</strong>
        </div>
      </div>
      <h2>Recent Tasks</h2>
      <TaskList tasks={tasks.slice(-3)} />
    </>
  );
}

function TaskList({ tasks, updateTask, deleteTask }) {
  if (tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="task-card" key={task.id}>
          <div className="task-top">
            <h3>{task.title}</h3>
            <span className={task.status === "Closed" ? "status closed" : "status"}>
              {task.status}
            </span>
          </div>
          <p>{task.description}</p>
          <p>
            <b>Priority:</b> {task.priority} &nbsp;|&nbsp;
            <b>Category:</b> {task.category}
          </p>
          <p><b>Due:</b> {task.dueDate || "Not set"}</p>
          <div className="actions">
            <Link className="button-link" to={`/tasks/${task.id}`}>
              View Details
            </Link>
            {updateTask && (
              <button
                onClick={() => updateTask(task.id, {
                  status: task.status === "Closed" ? "Pending" : "Closed",
                })}
              >
                {task.status === "Closed" ? "Reopen" : "Complete"}
              </button>
            )}
            {updateTask && (
              <Link className="button-link secondary"
                to={`/tasks/${task.id}/edit`}>Edit</Link>
            )}
            {deleteTask && (
              <button className="danger"
                onClick={() => deleteTask(task.id)}>Delete</button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function Tasks() {
  const { tasks, updateTask, deleteTask } = useOutletContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || task.category === category;
    const matchesStatus = status === "All" || task.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <h1>All Tasks</h1>
      <div className="filters">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Academic</option>
          <option>Personal</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Raised</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
      </div>
      <TaskList tasks={filtered} updateTask={updateTask} deleteTask={deleteTask} />
    </>
  );
}

function TaskForm({ existingTask, onSave, heading }) {
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [priority, setPriority] = useState(existingTask?.priority || "Medium");
  const [category, setCategory] = useState(existingTask?.category || "Academic");
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");

  function submit(e) {
    e.preventDefault();
    onSave({ title, description, priority, category, dueDate });
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <h1>{heading}</h1>
      <label>Task Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Task Description</label>
      <textarea value={description}
        onChange={(e) => setDescription(e.target.value)} required />

      <label>Priority</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option><option>Medium</option><option>Low</option>
      </select>

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Academic</option><option>Personal</option>
      </select>

      <label>Due Date</label>
      <input type="date" value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} required />

      <button type="submit">Save Task</button>
    </form>
  );
}

function AddTask() {
  const { addTask } = useOutletContext();
  return <TaskForm heading="Add New Task" onSave={addTask} />;
}

function TaskDetails() {
  const { id } = useParams();
  const { tasks, updateTask, deleteTask } = useOutletContext();
  const task = tasks.find((t) => t.id === id);
  const navigate = useNavigate();

  if (!task) return <><h1>Task Not Found</h1><Link to="/tasks">Back to Tasks</Link></>;

  return (
    <>
      <h1>Task Details</h1>
      <TaskList tasks={[task]} updateTask={updateTask} deleteTask={deleteTask} />
      <p><b>Raised Date:</b> {task.raisedAt}</p>
      <button onClick={() => navigate("/tasks")}>Back to Tasks</button>
    </>
  );
}

function EditTask() {
  const { id } = useParams();
  const { tasks, updateTask } = useOutletContext();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === id);

  if (!task) return <h1>Task Not Found</h1>;

  return (
    <TaskForm
      heading="Edit Task"
      existingTask={task}
      onSave={(changes) => {
        updateTask(id, changes);
        navigate(`/tasks/${id}`);
      }}
    />
  );
}

function CompletedTasks() {
  const { tasks, updateTask, deleteTask } = useOutletContext();
  const completed = tasks.filter((t) => t.status === "Closed");
  return (
    <>
      <h1>Completed Tasks</h1>
      <TaskList tasks={completed} updateTask={updateTask} deleteTask={deleteTask} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="tasks/:id" element={<TaskDetails />} />
          <Route path="tasks/:id/edit" element={<EditTask />} />
          <Route path="completed" element={<CompletedTasks />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}