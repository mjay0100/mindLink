import { useParams } from "react-router-dom";
import Assessment from "./Assessment";

const AssessmentWrapper = () => {
  const { condition } = useParams();
  return <Assessment condition={condition} />;
};

export default AssessmentWrapper;
