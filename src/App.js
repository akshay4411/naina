import React, { useState } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movate_id, setMovateId] = useState("");
  const [password, setPassword] = useState("");

  const [nokiaId, setNokiaId] = useState("");
  const [shift, setShift] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [employee, setEmployee] = useState("");

  const URL =
    "https://script.google.com/macros/s/AKfycbxUnjEwkt5w7EH7EbhWG82sFZEa0-Hy6wmUzNLCLZzIafJAmd0aKf9wRe1ITjs2lcEP/exec";

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        type: "login",
        movate_id,
        password,
      }),
    });

    const data = await res.json();

    if (data.status) {
      const extractedName = password.split("$")[0]; // Get employee name
      setEmployee(extractedName);
      setLoggedIn(true);
    } else {
      alert("Invalid ID or Password!");
    }
  };

  // ---------------- ATTENDANCE SUBMIT ----------------
  const submitAttendance = async () => {
    // Validate all fields
    if (!movate_id || !nokiaId || !shift || !fromDate || !toDate) {
      alert("Please fill all fields before submitting!");
      return;
    }

    // Create date objects without timezone issues
    const start = new Date(`${fromDate}T00:00`);
    const end = new Date(`${toDate}T00:00`);

    const diff = (end - start) / (1000 * 60 * 60 * 24);

    if (diff < 0) {
      alert("To date must be greater than From date!");
      return;
    }

    if (diff > 5) {
      alert("Max 5 days allowed!");
      return;
    }

    // Loop through date range
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const formatted = d.toISOString().split("T")[0];

      await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          type: "mark",
          employee,
          movateId: movate_id,
          nokiaId,
          shift,
          date: formatted,
        }),
      });
    }

    alert("Attendance saved ✅");
  };

  // Disable button unless form valid
  const isFormValid =
    movate_id && nokiaId && shift && fromDate && toDate;

  return (
    <div className="container">
      <div className="card">

        {/* ---------------- LOGIN SCREEN ---------------- */}
        {!loggedIn ? (
          <>
            <h2>Login</h2>

            <input
              className="input-field"
              placeholder="Movate ID"
              value={movate_id}
              onChange={(e) => setMovateId(e.target.value)}
            />

            <input
              className="input-field"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </>
        ) : (
        /* ---------------- ATTENDANCE FORM ---------------- */
          <>
            <h2>Daily Attendance</h2>

            <input className="input-field" value={movate_id} readOnly />

            <input
              className="input-field"
              placeholder="Nokia Employee ID"
              value={nokiaId}
              onChange={(e) => setNokiaId(e.target.value)}
            />

            <select
              className="select-field"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
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

            {(shift === "L" || shift === "OFF") && (
              <p style={{ color: "red" }}>
                ⚠ Don't forget to mark attendance on GAMS Portal
              </p>
            )}

            {/* DATE ONLY - No time */}
            <input
              className="input-field"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />

            <input
              className="input-field"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />

            <button
              className="btn"
              onClick={submitAttendance}
              disabled={!isFormValid}
              style={{ opacity: isFormValid ? 1 : 0.5 }}
            >
              Submit Attendance
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
