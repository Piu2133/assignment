
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="brand">
          <span className="brand-icon">E</span>
          <div>
            <h1>EmployHub</h1>
            <p>Employee Management System</p>
          </div>
        </div>
        <span className="header-badge">Admin Dashboard</span>
      </div>
    </header>
  );
}

export default Header;