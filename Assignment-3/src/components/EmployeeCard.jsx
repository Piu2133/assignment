
function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="employee-card">
      <div className="employee-info">
        <h2>{employee.name}</h2>
        <p><strong>ID:</strong> {employee.employeeId}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Gender:</strong> {employee.gender}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Local Address:</strong> {employee.localAddress}</p>
        <p><strong>Permanent Address:</strong> {employee.permanentAddress}</p>
      </div>

      <div className="card-buttons">
        <button onClick={() => onEdit(employee)}>Edit</button>
        <button onClick={() => onDelete(employee.employeeId)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;