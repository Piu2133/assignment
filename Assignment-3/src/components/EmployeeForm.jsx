import { useState, useEffect } from "react";

function EmployeeForm({ onSubmit, editingEmployee, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    } else {
      setFormData({
        name: "",
        employeeId: "",
        department: "",
        gender: "",
        phone: "",
        localAddress: "",
        permanentAddress: "",
      });
    }
  }, [editingEmployee]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.employeeId ||
      !formData.department ||
      !formData.gender ||
      !formData.phone ||
      !formData.localAddress ||
      !formData.permanentAddress
    ) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit(formData);

    if (!editingEmployee) {
      setFormData({
        name: "",
        employeeId: "",
        department: "",
        gender: "",
        phone: "",
        localAddress: "",
        permanentAddress: "",
      });
    }
  }

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="employeeId"
        placeholder="Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
        disabled={Boolean(editingEmployee)}
      />

      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
      >
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
      </select>

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      <textarea
        name="localAddress"
        placeholder="Local Address"
        value={formData.localAddress}
        onChange={handleChange}
      />

      <textarea
        name="permanentAddress"
        placeholder="Permanent Address"
        value={formData.permanentAddress}
        onChange={handleChange}
      />

      <div className="form-buttons">
        <button type="submit">
          {editingEmployee ? "Update Employee" : "Add Employee"}
        </button>

        {editingEmployee && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;