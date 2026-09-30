import { useState } from "react";
import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const initialEmployees = [
  {
    name: "Aarav Sharma",
    employeeId: "EMP001",
    department: "IT",
    gender: "Male",
    phone: "9876543210",
    localAddress: "Kolkata, West Bengal",
    permanentAddress: "Siliguri, West Bengal",
  },
  {
    name: "Priya Das",
    employeeId: "EMP002",
    department: "HR",
    gender: "Female",
    phone: "9876543211",
    localAddress: "Salt Lake, Kolkata",
    permanentAddress: "Durgapur, West Bengal",
  },
  {
    name: "Rahul Roy",
    employeeId: "EMP003",
    department: "Finance",
    gender: "Male",
    phone: "9876543212",
    localAddress: "Howrah, West Bengal",
    permanentAddress: "Asansol, West Bengal",
  },
  {
    name: "Sneha Paul",
    employeeId: "EMP004",
    department: "Marketing",
    gender: "Female",
    phone: "9876543213",
    localAddress: "New Town, Kolkata",
    permanentAddress: "Bardhaman, West Bengal",
  },
];

const emptyForm = {
  name: "",
  employeeId: "",
  department: "",
  gender: "",
  phone: "",
  localAddress: "",
  permanentAddress: "",
};

function App() {
  const [employees, setEmployees] = useState(initialEmployees);

  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("All");

  // Add or Update Employee
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.employeeId === editingId
            ? formData
            : employee
        )
      );

      setEditingId(null);
    } else {
      const employeeExists = employees.some(
        (employee) =>
          employee.employeeId.toLowerCase() ===
          formData.employeeId.toLowerCase()
      );

      if (employeeExists) {
        alert("Employee ID already exists!");
        return;
      }

      setEmployees([...employees, formData]);
    }

    setFormData(emptyForm);
  };

  // Delete Employee
  const handleDelete = (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter(
          (employee) => employee.employeeId !== employeeId
        )
      );
    }
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.employeeId);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel Editing
  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  // Search + Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(search) ||
      employee.employeeId.toLowerCase().includes(search);

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      <Header />

      <main className="container">

        {/* Employee Count */}
        <div className="dashboard">
          <div className="stat-card">
            <span>Total Employees</span>
            <strong>{employees.length}</strong>
          </div>

          <div className="stat-card">
            <span>IT Department</span>
            <strong>
              {
                employees.filter(
                  (employee) => employee.department === "IT"
                ).length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>HR Department</span>
            <strong>
              {
                employees.filter(
                  (employee) => employee.department === "HR"
                ).length
              }
            </strong>
          </div>
        </div>

        {/* Add/Edit Form */}
        <EmployeeForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancel={handleCancel}
        />

        {/* Search and Filter */}
        <section className="filter-section">
          <div className="search-box">
            <label htmlFor="search">
              Search Employee
            </label>

            <input
              id="search"
              type="text"
              placeholder="Search by name or employee ID..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="department-box">
            <label htmlFor="department">
              Department
            </label>

            <select
              id="department"
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(event.target.value)
              }
            >
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </section>

        {/* Employee List */}
        <EmployeeList
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </main>
    </div>
  );
}

export default App;