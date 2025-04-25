import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useGetAllProjectsQuery } from "../../redux/features/project/projectApi";

const Project = () => {
  const { data, isLoading } = useGetAllProjectsQuery(undefined);

  const projectData = data?.data;
  console.log(projectData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>This is Project component</h1>
    </div>
  );
};

export default Project;
