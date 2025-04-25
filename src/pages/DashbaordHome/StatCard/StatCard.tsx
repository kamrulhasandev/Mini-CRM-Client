const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-4 flex items-center gap-4 border border-gray-100">
    <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold">{value}</h3>
    </div>
  </div>
);

export default StatCard;
