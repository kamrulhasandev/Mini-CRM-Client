import { FaSpinner } from "react-icons/fa6";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin text-blue-500 text-4xl">
        <FaSpinner />
      </div>
    </div>
  );
};

export default LoadingSpinner;
