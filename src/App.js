import React, { useState } from "react";

export default function AttendanceForm() {
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");

  const submitAttendance = async () => {
    const res = await fetch("PASTE_YOUR_WEB_APP_URL_HERE", {
      method: "POST",
      body: JSON.stringify({
        employee: employee,
        attendance_date: date
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
