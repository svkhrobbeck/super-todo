import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text = "submit", className = "btn-navy" }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button className={className} disabled={isSubmitting}>
      {isSubmitting ? "loading..." : text}
    </button>
  );
};
export default SubmitBtn;
