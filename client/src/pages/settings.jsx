import { Helmet } from "react-helmet";
import { useDashboardContext } from "../layouts/dashboard-layout";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import errorToast from "../helpers/errorToast";
import axios from "axios";
import storage from "../helpers/storage";
import { toast } from "react-toastify";

export const settingsAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    await axios.patch("/user/profile", payload);
    toast.success("user profile updated");
    return redirect("..");
  } catch (err) {
    errorToast(err);
    return err;
  }
};

const SettingsPage = () => {
  const { user } = useDashboardContext();
  const navigate = useNavigate();

  const signOutUser = () => {
    storage.remove("access_token");
    navigate("/sign-in");
    toast.success("signing out...");
  };

  return (
    <>
      <Helmet>
        <title>Todo Application | Settings</title>
      </Helmet>
      <section className="flex justify-center">
        <Form className="p-[10px] max-w-[700px] w-full" method="PATCH">
          <h2 className="font-bold text-[42px] text-center">Update Profile</h2>
          <div className="pt-[10px] flex justify-center items-center gap-[12px]">
            <img
              className="w-[100px] rounded-full"
              src={user.picture}
              alt={user.name}
            />
            <div>
              <p className="font-bold text-[26px] lowercase">{user.email}</p>
              <p className="font-medium text-[18px] capitalize">{user.name}</p>
            </div>
          </div>
          <FormInput name="email" defaultValue={user.email} required />
          <FormInput name="name" defaultValue={user.name} required />
          <div className="flex gap-[12px] justify-end">
            <Link className="btn-teal" to="../update-password">
              update/set password
            </Link>
            <Link className="btn-blue" to="..">
              back to dashboard
            </Link>
            <SubmitBtn text="update profile" />
            <button className="btn-red" type="button" onClick={signOutUser}>
              sign out
            </button>
          </div>
        </Form>
      </section>
    </>
  );
};
export default SettingsPage;
