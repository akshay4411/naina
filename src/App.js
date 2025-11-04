import React, { useState } from "react";

export default function AttendanceForm() {
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");

  const submitAttendance = async () => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);

    const diffDays = (today - selectedDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 3) {
      alert("⛔ You cannot mark attendance older than 3 days!");
      return;
    }

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbwZDdxKTV3NIzowmitohhZjeP7HgmUrinABezjnBp4dM0GlQPaorPUcr4g0OW_n_n-E/exec",
      {
        method: "POST",
        body: JSON.stringify({ employee, date }),
      }
    );

    const data = await res.json();
    alert("✅ Attendance saved!");
    setEmployee("");
    setDate("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Employee Attendance</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />

        <input
          style={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button style={styles.button} onClick={submitAttendance}>
          Submit
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f5f7"
  },
  card: {
    width: 350,
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 5px 25px rgba(0,0,0,0.08)",
    textAlign: "center"
  },
  title: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "600",
    color: "#333"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 600
  }
};
