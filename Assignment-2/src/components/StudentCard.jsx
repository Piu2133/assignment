
function StudentCard({ student }) {
  return (
    <article className="student-card">
      <img
        className="student-photo"
        src={student.photo}
        alt={student.name}
      />

      <div className="student-details">
        <h2>{student.name}</h2>
        <p><strong>Roll Number:</strong> {student.rollNo}</p>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
        <p className="cgpa">
          <strong>CGPA:</strong> {student.cgpa.toFixed(2)}
        </p>
      </div>
    </article>
  );
}

export default StudentCard;