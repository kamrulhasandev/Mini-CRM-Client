/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaBell } from "react-icons/fa";

const ReminderList = ({ reminders }: { reminders: any[] }) => {
  const today = new Date();

  if (!reminders || reminders.length === 0) {
    return <p className="text-gray-500 text-sm">No reminders due this week.</p>;
  }

  return (
    <div className="space-y-4">
      {reminders.map((reminder) => {
        const dueDate = new Date(reminder.dueDate);
        const daysLeft = Math.ceil(
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        let urgencyColor = "bg-green-100 text-green-700";
        if (daysLeft <= 1) urgencyColor = "bg-red-100 text-red-700";
        else if (daysLeft <= 3) urgencyColor = "bg-yellow-100 text-yellow-700";

        return (
          <div
            key={reminder.id}
            className="bg-white border border-gray-100 rounded-xl shadow-md p-4 flex items-start gap-4 hover:shadow-lg transition"
          >
            <div
              className={`h-10 w-10 flex items-center justify-center rounded-full shadow-inner ${urgencyColor}`}
            >
              <FaBell className="text-xl" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${urgencyColor}`}
                >
                  Due: {dueDate.toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-500">
                  {daysLeft} day{daysLeft !== 1 && "s"} left
                </span>
              </div>
              <h4 className="text-base font-semibold text-gray-800">
                {reminder.message}
              </h4>
              {reminder.Client && (
                <p className="text-sm text-gray-500 mt-1">
                  Client: {reminder.Client?.name}
                </p>
              )}
              {reminder.project && (
                <p className="text-sm text-gray-500 mt-1">
                  Project: {reminder.project.title}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReminderList;
