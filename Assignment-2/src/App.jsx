
import { useState } from "react";
import Header from "./components/Header";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";

const studentData = [
  {
    name: "Aarav Sharma",
    rollNo: "BCA001",
    department: "Computer Applications",
    semester: 3,
    cgpa: 8.7,
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Das",
    rollNo: "BCA002",
    department: "Computer Applications",
    semester: 3,
    cgpa: 9.2,
    photo: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Rahul Roy",
    rollNo: "BCA003",
    department: "Computer Applications",
    semester: 3,
    cgpa: 7.8,
    photo: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "Sneha Paul",
    rollNo: "BCA004",
    department: "Computer Applications",
    semester: 3,
    cgpa: 8.9,
    photo: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Arjun Sen",
    rollNo: "BCA005",
    department: "Computer Applications",
    semester: 3,
    cgpa: 8.1,
    photo: "https://i.pravatar.cc/150?img=14",
  },
  {
    name: "Ananya Ghosh",
    rollNo: "BCA006",
    department: "Computer Applications",
    semester: 3,
    cgpa: 9.5,
    photo: "https://i.pravatar.cc/150?img=45",
  },
];

function App() {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedStudents = [...studentData].sort((a, b) => {
    if (sortOrder === "high") {
      return b.cgpa - a.cgpa;
    }

    if (sortOrder === "low") {
      return a.cgpa - b.cgpa;
    }

    return a.rollNo.localeCompare(b.rollNo);
  });

  return (
    <div className="app">
      <Header />

      <main className="container">
        <div className="section-heading">
          <div>
            <h2>Student Directory</h2>
            <p>View student details and academic performance.</p>
          </div>

          <div className="sort-control">
            <label htmlFor="sort">Sort by CGPA:</label>

            <select
              id="sort"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value)
              }
            >
              <option value="default">Roll Number</option>
              <option value="high">Highest First</option>
              <option value="low">Lowest First</option>
            </select>
          </div>
        </div>

        <StudentList students={sortedStudents} />
      </main>

      <Footer />
    </div>
  );
}

export default App;