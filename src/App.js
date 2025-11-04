import React, { useState } from "react";

function App() {
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");

  const submitAttendance = async () => {
    if (!employee || !date) {
      alert("Please enter name & date");
      return;
    }

    // 3 day validation
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);

    const diffDays = (today - selectedDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 3) {
      alert("❌ Attendance cannot be submitted older than 3 days!");
      return;
    }

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxqrUvgWoARkAkbdDZufAVMpRN2oCoRcgtk39ukui-JumifXD2B33bZY08QwzALTnJ7/exec",
      {
        method: "POST",
        body: JSON.stringify({ employee, date }),
      }
    );

    const data = await res.json();
    alert("✅ Attendance saved successfully!");

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
          Submit Attendance
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#f6f7fb",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    width: 350,
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: 25,
    fontSize: 24,
    fontWeight: 700,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    border: "1px solid #ddd",
    borderRadius: 8,
    fontSize: 15,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#4a6cf7",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default App;
