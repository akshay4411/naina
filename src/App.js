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

  const URL = "https://script.google.com/macros/s/AKfycbwRcFPnYQ0-wv0fSbEwYYxZPL6PKbvFsh0qVAJW0WTLGPlhevQ07qdnybfWygQ23Mjb/exec"; // <--- IMPORTANT

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
    today.setHours(0, 0, 0, 0);

    const diff = (today - selectedDate) / (1000 * 60 * 60 * 24);
    if (diff > 3) {
      alert("Attendance cannot be older than 3 days!");
      return;
    }

    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        type: "mark",
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
            <input className="input-field" placeholder="Movate ID" value={movate_id} onChange={(e) => setMovateId(e.target.value)} />
            <input className="input-field" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn" onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <h2>Daily Attendance</h2>

            <input className="input-field" value={movate_id} readOnly />

            <input className="input-field" placeholder="Nokia Employee ID" value={nokiaId} onChange={(e) => setNokiaId(e.target.value)} />

            <select className="select-field" value={shift} onChange={(e) => setShift(e.target.value)}>
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

            <input className="input-field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <button className="btn" onClick={submitAttendance}>Submit Attendance</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
