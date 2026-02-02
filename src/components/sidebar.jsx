function Sidebar({ currentPage, setCurrentPage }) {
    return (
        <div className="sidebar">
            <h2>🥇Streakly</h2>
            <p className="tagline">Build habits. Stay consistent.</p>

            <ul>
                <li
                    className={currentPage === "dashboard" ? "active" : ""}
                    onClick={() => setCurrentPage("dashboard")}
                >
                    Dashboard
                </li>

                <li
                    className={currentPage === "tasks" ? "active" : ""}
                    onClick={() => setCurrentPage("tasks")}
                >
                    Tasks
                </li>

                <li
                    className={currentPage === "habits" ? "active" : ""}
                    onClick={() => setCurrentPage("habits")}
                >
                    Habits
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;
