import React, { useState } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movate_id, setMovateId] = useState("");
  const [password, setPassword] = useState("");

  const [nokiaId, setNokiaId] = useState("");
  const [shift, setShift] = useState("");
  const [date, setDate] = useState("");

  const [employee, setEmployee] = useState("");

  const URL = "https://script.google.com/macros/s/AKfycbyBUbTIAxxhRqFC-_ASa2v6qEe8ieMFHk0EgcTn6WzSat3SEYEZPGJHDS_sSzpYrYN-/exec"; // <--- IMPORTANT

  const handleLogin = async () => {
    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        type: "login",
        movate_id,
        password
      }),
    });

    const data = await res.json();

    if (data.status) {
      const extractedName = password.split("$")[0]; // get name before $
      setEmployee(extractedName);
      setLoggedIn(true);
    } else {
      alert("Invalid ID or Password!");
    }
  };

  const submitAttendance = async () => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);

    const diff = (today - selectedDate) / (1000*60*60*24);
    if (diff > 3) {
      alert("Attendance cannot be older than 3 days!");
      return;
    }

    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        type:"mark",
        employee,
        movateId: movate_id,
        nokiaId,
        shift,
        date
      })
    });
    const data = await res.json();
    alert("Attendance saved ✅");
  };

  return (
    <div className="container">
      <div className="card">
        {!loggedIn ? (
          <>
            <h2>Login</h2>
            <input className="input-field" placeholder="Movate ID" value={movate_id} onChange={(e)=>setMovateId(e.target.value)} />
            <input className="input-field" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button className="btn" onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <h2>Daily Attendance</h2>

            <input className="input-field" value={movate_id} readOnly />

            <input className="input-field" placeholder="Nokia Employee ID" value={nokiaId} onChange={(e)=>setNokiaId(e.target.value)} />

            <select className="select-field" value={shift} onChange={(e)=>setShift(e.target.value)}>
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
            </select>

            <input className="input-field" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />

            <button className="btn" onClick={submitAttendance}>Submit Attendance</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState } from "react";
import "./App.css"; // <=== Import CSS file
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

    const res = await fetch("https://script.google.com/macros/s/AKfycbwvrC03rryAf5Wp_8KIJQos3SYsk8qUNCb2hrlwT_bBemeaKp1YgURCC6WCDssZItHJ/exec", {
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
