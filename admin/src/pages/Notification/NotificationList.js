import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const NotificationList = () => {
  const {
    notifications,
    markAsRead,
    handleDeleteNotification,
    handleDeleteAll,
    unreadCount,
  } = useContext(AppContext);

  return (
    <div className="right-content">
      <div className="card shadow border-0 p-3 mt-3">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Header */}
            <div className="d-flex justify-content-between items-center mb-4 border-b pb-3 border-gray-300 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Notification List
                </h2>

                <div className="ml-4 text-gray-700 dark:text-gray-300 font-medium">
                  {notifications.length > 0
                    ? `${unreadCount} Unread | Total ${notifications.length} Notifications`
                    : "No Notifications"}
                </div>
              </div>

              {/* Button on the right */}
              <div>
                <button
                  onClick={handleDeleteAll}
                  className="btn btn-danger px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete All
                </button>
              </div>
            </div>

            {/* Notifications */}
            {notifications.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center">
                You don’t have any notifications.
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`d-flex justify-content-between align-items-center bg-white dark-bg p-3 rounded shadow mb-3 ${
                    !n.isRead
                      ? "border-start border-primary"
                      : "border border-secondary"
                  }`}
                >
                  {/* Left Side: Text */}
                  <div className="d-flex flex-column flex-grow-1 me-3">
                    <h5 className="fw-semibold text-dark dark-text">
                      {n.user?.username || "No Name"}
                    </h5>
                    <p className="text-muted mb-1">{n.message}</p>
                    <small className="text-secondary">
                      {new Date(n.createdAt).toLocaleString()}
                    </small>
                  </div>

                  {/* Right Side: Buttons */}
                  <div className="d-flex gap-2">
                    {!n.isRead && (
                      <button
                        onClick={() => markAsRead(n._id)}
                        className="btn btn-primary"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteNotification(n._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
