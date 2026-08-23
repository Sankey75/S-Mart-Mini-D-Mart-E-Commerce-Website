import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './AuditLogs.css';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/admin/audit-logs');
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching audit logs", error);
      }
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="audit-logs-container">
      <h1 className="audit-logs-title">System Audit Logs</h1>
      
      {loading ? (
        <div className="audit-logs-empty">Loading logs...</div>
      ) : (
        <div className="audit-logs-table-wrapper">
          <table className="audit-logs-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style={{fontWeight: '600'}}>
                    {log.user ? log.user.email : 'System'}
                  </td>
                  <td>
                    <span className="audit-action-badge">
                      {log.action}
                    </span>
                  </td>
                  <td>
                    {log.entityType} ({log.entityId})
                  </td>
                  <td>
                    {log.description}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="5" className="audit-logs-empty" style={{border: 'none'}}>
                    No audit logs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
