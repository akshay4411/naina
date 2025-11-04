import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, CheckCircle, XCircle, Clock, Users } from 'lucide-react';

const AttendanceTracker = () => {
  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'John Doe', movateId: 'MOV001', nokiaId: 'NOK001', shift: 'A' },
    { id: 'EMP002', name: 'Jane Smith', movateId: 'MOV002', nokiaId: 'NOK002', shift: 'B' },
    { id: 'EMP003', name: 'Mike Johnson', movateId: 'MOV003', nokiaId: 'NOK003', shift: 'C' }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [absentRecords, setAbsentRecords] = useState([]);
  const [stats, setStats] = useState({ present: 0, absent: 0, pending: 0 });

  // Simulate checking attendance and marking absent after 3 days
  useEffect(() => {
    checkAndMarkAbsent();
    const interval = setInterval(checkAndMarkAbsent, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [attendanceRecords]);

  const checkAndMarkAbsent = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newAbsentRecords = [];
    const updatedAttendanceRecords = [...attendanceRecords];

    employees.forEach(emp => {
      // Check last 30 days
      for (let i = 0; i <= 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        
        const dateStr = checkDate.toISOString().split('T')[0];
        const bufferDate = new Date(checkDate);
        bufferDate.setDate(bufferDate.getDate() + 3);
        
        // If buffer period has passed and no attendance record exists
        if (today > bufferDate) {
          const hasRecord = attendanceRecords.some(
            record => record.employeeId === emp.id && record.date === dateStr
          );
          
          const alreadyMarkedAbsent = absentRecords.some(
            record => record.employeeId === emp.id && record.date === dateStr
          );

          if (!hasRecord && !alreadyMarkedAbsent) {
            newAbsentRecords.push({
              employeeId: emp.id,
              employeeName: emp.name,
              date: dateStr,
              status: 'ABSENT',
              reason: 'Auto-marked: No attendance submitted within 3-day buffer',
              markedOn: today.toISOString()
            });
          }
        }
      }
    });

    if (newAbsentRecords.length > 0) {
      setAbsentRecords(prev => [...prev, ...newAbsentRecords]);
      updateStats([...updatedAttendanceRecords, ...newAbsentRecords]);
    }
  };

  const handleAttendanceSubmit = (employeeId, date) => {
    const employee = employees.find(e => e.id === employeeId);
    const newRecord = {
      employeeId,
      employeeName: employee.name,
      date,
      status: 'PRESENT',
      submittedOn: new Date().toISOString()
    };

    setAttendanceRecords(prev => [...prev, newRecord]);
    updateStats([...attendanceRecords, newRecord]);
  };

  const updateStats = (records) => {
    const allRecords = [...records, ...absentRecords];
    const present = allRecords.filter(r => r.status === 'PRESENT').length;
    const absent = allRecords.filter(r => r.status === 'ABSENT').length;
    
    // Calculate pending (dates within buffer period without records)
    const today = new Date();
    let pending = 0;
    
    employees.forEach(emp => {
      for (let i = 0; i <= 3; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        const hasRecord = allRecords.some(
          record => record.employeeId === emp.id && record.date === dateStr
        );
        
        if (!hasRecord) pending++;
      }
    });

    setStats({ present, absent, pending });
  };

  const getBufferStatus = (date) => {
    const recordDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today - recordDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return { status: 'current', days: 0, color: 'text-green-600' };
    if (diffDays <= 3) return { status: 'buffer', days: 3 - diffDays, color: 'text-yellow-600' };
    return { status: 'expired', days: diffDays - 3, color: 'text-red-600' };
  };

  const simulateAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
    handleAttendanceSubmit(randomEmployee.id, today);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Calendar className="text-indigo-600" size={36} />
                Attendance Tracker with Auto-Absence
              </h1>
              <p className="text-gray-600 mt-2">
                Employees have 3 days to submit attendance. After that, they're automatically marked absent.
              </p>
            </div>
            <button
              onClick={simulateAttendance}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Simulate Attendance
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Present</p>
                <p className="text-3xl font-bold text-green-600">{stats.present}</p>
              </div>
              <CheckCircle size={48} className="text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Auto-Marked Absent</p>
                <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <XCircle size={48} className="text-red-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending (Buffer)</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock size={48} className="text-yellow-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Recent Attendance Records */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            Recent Attendance Submissions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Employee</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Submitted On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendanceRecords.slice(-10).reverse().map((record, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{record.employeeName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.date}</td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(record.submittedOn).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {attendanceRecords.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                      No attendance records yet. Click "Simulate Attendance" to add records.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Auto-Marked Absent Records */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="text-red-600" />
            Auto-Marked Absent Records
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Employee</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reason</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Marked On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {absentRecords.map((record, idx) => {
                  const buffer = getBufferStatus(record.date);
                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{record.employeeName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.date}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.reason}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(record.markedOn).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
                {absentRecords.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No auto-marked absent records yet. Records older than 3 days without attendance will appear here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-start">
            <AlertCircle className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-1">How it works:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Employees must submit attendance through the Google Form</li>
                <li>• They have a 3-day buffer period to submit attendance for any date</li>
                <li>• After 3 days, if no attendance is submitted, the system automatically marks them as ABSENT</li>
                <li>• This encourages regular attendance marking and maintains accurate records</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
