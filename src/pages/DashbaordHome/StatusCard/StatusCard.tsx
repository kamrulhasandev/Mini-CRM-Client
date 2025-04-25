import {
  FaChartBar,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";

const StatusCard = ({ status, count }: { status: string; count: number }) => {
  let icon;
  let iconColor = "";
  let bgColor = "";

  switch (status.toLowerCase()) {
    case "in_progress":
      icon = <FaHourglassHalf className="text-orange-500 text-2xl" />;
      iconColor = "text-orange-500";
      bgColor = "bg-orange-50";
      break;
    case "completed":
      icon = <FaCheckCircle className="text-green-600 text-2xl" />;
      iconColor = "text-green-600";
      bgColor = "bg-green-50";
      break;
    case "cancelled":
      icon = <FaTimesCircle className="text-red-500 text-2xl" />;
      iconColor = "text-red-500";
      bgColor = "bg-red-50";
      break;
    default:
      icon = <FaChartBar className="text-purple-500 text-2xl" />;
      iconColor = "text-purple-500";
      bgColor = "bg-purple-50";
  }

  return (
    <div
      className={`shadow-md hover:shadow-lg transition rounded-xl p-4 flex items-center gap-4 border border-gray-100 ${bgColor}`}
    >
      <div className={`p-2 rounded-full bg-white shadow-inner ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 capitalize">{status}</p>
        <h4 className="text-xl font-semibold">{count}</h4>
      </div>
    </div>
  );
};

export default StatusCard;
