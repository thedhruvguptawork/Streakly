import { useState } from "react";

function Dashboard({ tasks }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "done").length;
    const pendingTasks = tasks.filter(t => t.status === "pending").length;

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="dashboard-hero">
                <p className="hero-line">
                    Build your life, one day at a time. 🚀
                </p>

                <p className="hero-sub">
                    Small actions done daily create massive results.
                    This dashboard helps you stay focused, build habits,
                    and maintain momentum without burnout.
                </p>

                <div className="hero-points">
                    <p>✅ Organize tasks and track progress</p>
                    <p>🔥 Build habits and maintain streaks</p>
                    <p>📈 Stay consistent without relying on motivation</p>
                </div>

                <p className="hero-footer">
                    Consistency beats motivation. Every single time.
                </p>
            </div>



            <div className="cards">
                <div className="card">Total: {totalTasks}</div>
                <div className="card">Completed: {completedTasks}</div>
                <div className="card">Pending: {pendingTasks}</div>
            </div>
        </div>
    );
}

export default Dashboard;
