import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import './App.css';

// =====================================================
// CONTEXT
// =====================================================
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  const API_URL = "https://script.google.com/macros/s/AKfycbyjRE5vC0WRnUzulCwQ1JoKYWmcrhWVwFJp1iH756Pe_5-tF5oNni4Lb0hO2YP9ZXHW/exec";

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const userData = JSON.parse(cachedUser);
      setUser(userData);
      setCurrentPage('dashboard');
    }
  }, []);

  const makeRequest = async (payload) => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return await response.json();
  };

  const login = async (movate_id, password) => {
    setLoading(true);
    try {
      const response = await makeRequest({ type: "login", movate_id, password });
      
      if (response.status) {
        const extractedName = password.split("$")[0];
        const userData = { name: extractedName, movate_id };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setCurrentPage('dashboard');
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

const fetchAttendance = async (forceRefresh = false) => {
if (!forceRefresh) {

  const cache = localStorage.getItem('attendance_cache');

  if (cache) {

    const parsed = JSON.parse(cache);

    setAttendanceData(parsed.data);

    return;
  }
}

  if (!user) return;

  setLoading(true);

  try {

    const response = await makeRequest({ 
      type: "getAttendance", 
      movate_id: user.movate_id 
    });

    console.log("Attendance:", response);

    if (response.status) {

    setAttendanceData(response);

      localStorage.setItem('attendance_cache', JSON.stringify({
        data: response,
        timestamp: Date.now()
      }));
    }

  } catch (error) {

    console.error('Failed to fetch attendance:', error);

  } finally {

    setLoading(false);
  }
};


  const markAttendance = async (data) => {
    return await makeRequest(data);
  };

  const logout = () => {
    setUser(null);
    setAttendanceData(null);
    setCurrentPage('login');
    localStorage.removeItem('user');
    localStorage.removeItem('attendance_cache');
  };

  return (
    <AuthContext.Provider value={{
      user, attendanceData, loading, currentPage, setCurrentPage,
      login, logout, fetchAttendance, markAttendance
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// ANALYTICS CALCULATOR (REACT-SIDE ONLY)
// =====================================================
const useAnalytics = (records) => {
  return useMemo(() => {
    if (!records || records.length === 0) {
      return {
        present: 0,
        leaves: 0,
        offs: 0,
        holidays: 0,
        total: 0,
        percentage: 0,
        lastMarked: "N/A"
      };
    }

    let present = 0;
    let leaves = 0;
    let offs = 0;
    let holidays = 0;

    records.forEach(record => {
      const shift = record.shift;
      
      if (shift === "L") {
        leaves++;
      } else if (shift === "OFF") {
        offs++;
      } else if (shift === "H") {
        holidays++;
      } else {
        present++;
      }
    });

    const total = records.length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    const lastMarked = records.length > 0 ? records[records.length - 1].date : "N/A";

    return {
      present,
      leaves,
      offs,
      holidays,
      total,
      percentage,
      lastMarked
    };
  }, [records]);
};

// =====================================================
// NAVBAR
// =====================================================
const Navbar = () => {
  const { user, logout, currentPage, setCurrentPage } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>AttendanceHub</h2>
          <span className="user-badge">{user.name}</span>
        </div>
        <div className="nav-links">
          <button 
            className={currentPage === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={currentPage === 'mark' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('mark')}
          >
            Mark Attendance
          </button>
          <button 
            className={currentPage === 'history' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('history')}
          >
            History
          </button>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
};

// =====================================================
// LOGIN PAGE
// =====================================================
const LoginPage = () => {
  const [movateId, setMovateId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(movateId, password);
    
    if (!result.success) {
      setError(result.message || 'Invalid credentials');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>AttendanceHub</h1>
        <p className="tagline">Employee Attendance Management</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Movate ID</label>
            <input 
              type="text"
              placeholder="Enter your Movate ID"
              value={movateId}
              onChange={(e) => setMovateId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

// =====================================================
// DASHBOARD PAGE
// =====================================================
const DashboardPage = () => {
  const { user, attendanceData, fetchAttendance, loading } = useContext(AuthContext);
  const analytics = useAnalytics(attendanceData?.records);

  useEffect(() => {
  if(user){
    fetchAttendance();
  }
}, [user]);


  if (loading && !attendanceData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const chartData = [
    { name: 'Present', value: analytics.present, color: '#10b981' },
    { name: 'Leave', value: analytics.leaves, color: '#f59e0b' },
    { name: 'Off', value: analytics.offs, color: '#6366f1' },
    { name: 'Holiday', value: analytics.holidays, color: '#ec4899' }
  ];


  const formatDate = (isoDate) => {

  if (!isoDate) return "";

  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear(); // use .slice(-2) if you want 26

  return `${day}-${month}-${year}`;
};
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p className="subtitle">Here's your attendance overview</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card present">
          <div className="card-icon">✓</div>
          <div className="card-content">
            <h3>{analytics.present}</h3>
            <p>Present Days</p>
          </div>
        </div>

        <div className="analytics-card leave">
          <div className="card-icon">⊗</div>
          <div className="card-content">
            <h3>{analytics.leaves}</h3>
            <p>Leaves Taken</p>
          </div>
        </div>

        <div className="analytics-card holiday">
          <div className="card-icon">★</div>
          <div className="card-content">
            <h3>{analytics.holidays}</h3>
            <p>Holidays</p>
          </div>
        </div>

        <div className="analytics-card percentage">
          <div className="card-icon">%</div>
          <div className="card-content">
            <h3>{analytics.percentage}%</h3>
            <p>Attendance Rate</p>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Attendance Distribution</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-card">
          <p><strong>Last Marked:</strong> {formatDate(analytics.lastMarked)}</p>
          {/* <p><strong>Total Entries:</strong> {analytics.total}</p> */}
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MARK ATTENDANCE PAGE (EXISTING FLOW PRESERVED)
// =====================================================
const MarkAttendancePage = () => {
  const { user, fetchAttendance, markAttendance } = useContext(AuthContext);
  
  const [nokiaId, setNokiaId] = useState('');
  const [shift, setShift] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    
    if (!nokiaId || !shift || !fromDate || !toDate) {
      setError('Please fill all fields');
      return;
    }

    const start = new Date(`${fromDate}T00:00`);
    const end = new Date(`${toDate}T00:00`);
    const diff = (end - start) / (1000 * 60 * 60 * 24);

    if (diff < 0) {
      setError('To date must be greater than From date');
      return;
    }

    if (diff > 5) {
      setError('Maximum 5 days allowed');
      return;
    }

    setLoading(true);
    
    let successCount = 0;
    let failedDates = [];

// Build dates array first
const dates = [];

for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {

  dates.push(
    String(d.getDate()).padStart(2, '0') + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    d.getFullYear()
  );
}


    setLoading(false);

    if (successCount > 0) {
      setSuccess(`✅ ${successCount} day(s) marked successfully`);
      localStorage.removeItem('attendance_cache');
      fetchAttendance(true);
      setNokiaId('');
      setShift('');
      setFromDate('');
      setToDate('');
    }

    if (failedDates.length > 0) {
      setError(`Failed: ${failedDates.join(', ')}`);
    }
  };

  const isFormValid = nokiaId && shift && fromDate && toDate;

  return (
    <div className="mark-attendance-page">
      <div className="form-container">
        <h1>Mark Attendance</h1>
        <p className="subtitle">Submit your daily attendance</p>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <div className="form-group">
          <label>Movate ID</label>
          <input type="text" value={user.movate_id} disabled className="input-disabled" />
        </div>

        <div className="form-group">
          <label>Nokia Employee ID *</label>
          <input 
            type="text"
            placeholder="Enter Nokia ID"
            value={nokiaId}
            onChange={(e) => setNokiaId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Shift *</label>
          <select value={shift} onChange={(e) => setShift(e.target.value)}>
            <option value="">Select Shift</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="COB">COB</option>
            <option value="L">L (Leave)</option>
            <option value="OFF">OFF</option>
            <option value="H">H (Holiday)</option>
          </select>
        </div>

        {shift === 'L' && (
          <div className="alert warning">
            ⚠️ Don't forget to mark attendance on GAMS Portal
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>From Date *</label>
            <input 
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>To Date *</label>
            <input 
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <button 
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
        >
          {loading ? 'Submitting...' : 'Submit Attendance'}
        </button>
      </div>
    </div>
  );
};

// =====================================================
// HISTORY PAGE (TABLE WITH FILTERS)
// =====================================================
const HistoryPage = () => {
  const { attendanceData } = useContext(AuthContext);
  const [filterShift, setFilterShift] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

 

  const records = attendanceData?.records || [];


  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredRecords = useMemo(() => {
    let filtered = [...records];

    if (filterShift) {
      filtered = filtered.filter(r => r.shift === filterShift);
    }

    if (filterStatus) {
      filtered = filtered.filter(r => {
        if (filterStatus === 'Present') return !['L', 'OFF', 'H'].includes(r.shift);
        if (filterStatus === 'Leave') return r.shift === 'L';
        if (filterStatus === 'Off') return r.shift === 'OFF';
        if (filterStatus === 'Holiday') return r.shift === 'H';
        return true;
      });
    }

    if (fromDate) {
      const from = new Date(fromDate);
      filtered = filtered.filter(r => parseDate(r.date) >= from);
    }
    
    if (toDate) {
      const to = new Date(toDate);
      filtered = filtered.filter(r => parseDate(r.date) <= to);
    }

    filtered.sort((a, b) => {
      let aVal, bVal;
      
      if (sortConfig.key === 'date') {
        aVal = parseDate(a.date);
        bVal = parseDate(b.date);
      } else {
        aVal = a[sortConfig.key];
        bVal = b[sortConfig.key];
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [records, filterShift, filterStatus, fromDate, toDate, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
 if (!attendanceData || !attendanceData.records) {
    return <div className="empty-state">No attendance records found</div>;
  }
  const getStatusBadge = (shift) => {
    if (shift === 'L') return <span className="badge leave">Leave</span>;
    if (shift === 'OFF') return <span className="badge off">Off</span>;
    if (shift === 'H') return <span className="badge holiday">Holiday</span>;
    return <span className="badge present">Present</span>;
  };

  const clearFilters = () => {
    setFilterShift('');
    setFilterStatus('');
    setFromDate('');
    setToDate('');
  };

  const formatDate = (isoDate) => {

  if (!isoDate) return "";

  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear(); // use .slice(-2) if you want 26

  return `${day}-${month}-${year}`;
};


  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Attendance History</h1>
        <p>View and filter your attendance records</p>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label>Shift</label>
          <select value={filterShift} onChange={(e) => setFilterShift(e.target.value)}>
            <option value="">All Shifts</option>
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
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Leave">Leave</option>
            <option value="Off">Off</option>
            <option value="Holiday">Holiday</option>
          </select>
        </div>

        

        <button className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('date')}>
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => requestSort('shift')}>
                Shift {sortConfig.key === 'shift' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Nokia ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>
                  No records found
                </td>
              </tr>
            ) : (
              filteredRecords.map((record, index) => (
                <tr key={index}>
<td>{formatDate(record.date)}</td>
                  <td><span className="shift-badge">{record.shift}</span></td>
                  <td>{record.nokiaId}</td>
                  <td>{getStatusBadge(record.shift)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div className="table-footer">
          Showing {filteredRecords.length} of {records.length} records
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MAIN APP
// =====================================================
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const AppContent = () => {
  const { currentPage, user } = useContext(AuthContext);

  return (
    <div className="app">
      {user && <Navbar />}
      
      <main className="main-content">
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'mark' && <MarkAttendancePage />}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'history' && <HistoryPage />}
      </main>
    </div>
  );
};

export default App;
