function Skills() {
  const skills = [
    "C",
    "C++",
    "Python",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "DBMS",
    "R",
    "Operating Systems",
    "Computer Networks"
  ];

  return (
    <section id="skills" className="section">
      <h2>My Skills</h2>

      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;