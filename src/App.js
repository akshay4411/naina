import React, { useState } from "react";

export default function AttendanceForm() {
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");

  const submitAttendance = async () => {
    // 3 day validation here in REACT
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);

    const diffDays = (today - selectedDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 3) {
      alert("You cannot mark attendance older than 3 days!");
      return;
    }

    const res = await fetch("https://script.google.com/macros/s/AKfycbwZDdxKTV3NIzowmitohhZjeP7HgmUrinABezjnBp4dM0GlQPaorPUcr4g0OW_n_n-E/exec", {
      method: "POST",
      body: JSON.stringify({
        employee: employee,
        date: date
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Employee Attendance</h2>

      <input
        type="text"
        placeholder="Employee Name"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      /><br/><br/>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      /><br/><br/>

      <button onClick={submitAttendance}>Submit Attendance</button>
    </div>
  );
}
