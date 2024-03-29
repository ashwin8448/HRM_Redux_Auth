import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.tsx";
import { toast } from "react-toastify";
import { getData } from "../../core/api/functions.ts";
import { IAppEmployee } from "../../core/interfaces/interface.ts";
import { convertIGetEmployeeToIAppEmployee } from "../../utils/helper.ts";
import EmployeeView from "./EmployeeView.tsx";
import Button from "../../components/Button/Button.tsx";
import { Helmet } from "react-helmet";
import { AES, enc } from "crypto-js";

function EmployeeViewLayout() {
  const { employeeId } = useParams();
  const decryptedId = AES.decrypt(
    `${employeeId}`,
    import.meta.env.VITE_ENCRYPTION_SECRET
  ).toString(enc.Utf8);
  const [employeeData, setEmployeeData] = useState<{
    loading: boolean;
    employee: IAppEmployee | null;
  }>({
    loading: true,
    employee: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!employeeId) {
      // Display error toast after initial render
      toast.error("No employee Id was provided", {
        toastId: "employee-not-found",
      });
      setEmployeeData({ ...employeeData, loading: false });
      navigate("/");
    } else {
      setEmployeeData((prev) => ({ ...prev, loading: true }));
      getData("/employee/" + decodeURIComponent(decryptedId))
        .then((response) => {
          if (!response.data) {
            throw new Response("Employee Not Found", { status: 404 });
          } else
            setEmployeeData((prev) => ({
              ...prev,
              employee: convertIGetEmployeeToIAppEmployee(response.data.data),
            }));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() =>
          setEmployeeData((prev) => ({ ...prev, loading: false }))
        );
    }
  }, [employeeId]);

  const { loading, employee } = employeeData;

  if (loading)
    return (
      <div className="center-loader">
        <Loader />
      </div>
    );
  return (
    employee && (
      <>
        <Helmet>
          <title>View Employee</title>
          <meta
            name="description"
            content={`You are currently viewing employee ${employee.id}.`}
          />
        </Helmet>
        <Button
          className="back-btn"
          icon="arrow_back_ios"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <EmployeeView employee={employee} />
      </>
    )
  );
}

export default EmployeeViewLayout;
