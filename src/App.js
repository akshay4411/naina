import React, { useState } from "react";

export default function AttendanceForm() {
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");

  const submitAttendance = async () => {
    if (!employee || !date) {
      alert("Please enter name & date");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);

    const diffDays = (today - selectedDate) / (1000 * 60 * 60 * 24);

    if (diffDays > 3) {
      alert("You cannot submit attendance older than 3 days!");
      return;
    }

    const res = await fetch("PASTE_WEB_APP_URL_HERE", {
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
