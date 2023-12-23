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
          <div className="py-[10px] flex justify-center items-center gap-[12px]">
            <img
              className="aspect-square object-cover h-auto w-[100px] lg:w-[80px] md:w-[65px] rounded-full"
              src={user.picture}
              alt={user.name}
              title={user.name}
            />
            <div>
              <p className="font-bold text-[26px] lg:text-[24px] md:text-[20px] lowercase">
                {user.email}
              </p>
              <p className="font-medium text-[18px] lg:text-[16px] md:text-[15px]">
                you can change the profile
              </p>
            </div>
          </div>
          <FormInput
            name="name"
            labelText="Full Name"
            defaultValue={user.name}
            required
          />
          <FormInput name="email" defaultValue={user.email} required />
          <div className="flex gap-[12px] justify-end">
            <button className="btn-orange" type="button" onClick={signOutUser}>
              sign out
            </button>
            <Link className="btn-teal" to="../update-password">
              set password
            </Link>
            <SubmitBtn className="btn-indigo" text="comfirm" />
          </div>
        </Form>
      </section>
    </>
  );
};
export default SettingsPage;
