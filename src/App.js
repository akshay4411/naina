import React, { useState } from "react";

function App() {
  const [employee, setEmployee] = useState("");
  const [movateId, setMovateId] = useState("");
  const [nokiaId, setNokiaId] = useState("");
  const [shift, setShift] = useState("");
  const [date, setDate] = useState("");

  const submitAttendance = async () => {
    if (!employee || !movateId || !nokiaId || !shift || !date) {
      alert("Please fill all fields");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);

    const diffDays = (today - selectedDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 3) {
      alert("❌ Attendance cannot be submitted older than 3 days!");
      return;
    }

    const res = await fetch("https://script.google.com/macros/s/AKfycbxqrUvgWoARkAkbdDZufAVMpRN2oCoRcgtk39ukui-JumifXD2B33bZY08QwzALTnJ7/exec", {
      method: "POST",
      body: JSON.stringify({ employee, movateId, nokiaId, shift, date }),
    });

    const data = await res.json();
    alert("✅ Attendance saved!");

    setEmployee("");
    setMovateId("");
    setNokiaId("");
    setShift("");
    setDate("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Daily Attendance</h2>

      <input placeholder="Employee Name" value={employee} onChange={(e)=>setEmployee(e.target.value)} /><br/><br/>

      <input placeholder="Movate Employee ID" value={movateId} onChange={(e)=>setMovateId(e.target.value)} /><br/><br/>

      <input placeholder="Nokia Employee ID" value={nokiaId} onChange={(e)=>setNokiaId(e.target.value)} /><br/><br/>

      <select value={shift} onChange={(e)=>setShift(e.target.value)}>
        <option value="">Select Shift</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="COB">COB</option>
        <option value="L">L</option>
        <option value="OFF">OFF</option>
        <option value="H">H</option>
      </select><br/><br/>

      <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /><br/><br/>

      <button onClick={submitAttendance}>Submit Attendance</button>
    </div>
  );
}

export default App;
