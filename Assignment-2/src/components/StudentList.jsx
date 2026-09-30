
import StudentCard from "./StudentCard";

function StudentList({ students }) {
  if (students.length === 0) {
    return <p className="empty-message">No students found.</p>;
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.rollNo}
          student={student}
        />
      ))}
    </div>
  );
}

export default StudentList;