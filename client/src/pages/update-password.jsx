import { Helmet } from "react-helmet";
import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import errorToast from "../helpers/errorToast";
import axios from "axios";
import { useDashboardContext } from "../layouts/dashboard-layout";
import filterObjectFields from "../helpers/filterObjectFields";
import { toast } from "react-toastify";

export const updatePasswordAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const url = `/user/profile/${payload.type}`;
  const body = filterObjectFields(payload, "type");

  try {
    await axios.patch(url, body);
    toast.success(
      type.includes("set") ? "password setted" : "password updated"
    );
    return redirect("..");
  } catch (err) {
    errorToast(err);
    return err;
  }
};

const UpdatePassword = () => {
  const { passwordType, setPasswordType } = useDashboardContext();

  console.log(passwordType);
  return (
    <>
      <Helmet>
        <title>Todo Application | Set Password</title>
      </Helmet>
      <div className="flex justify-center">
        <Form className="max-w-[600px] w-full" method="PATCH">
          <h2 className="font-bold  text-[42px] border-b mb-[8px] border-black text-center">
            Update/Set Password
          </h2>
          {passwordType === "set-password" ? (
            <FormInput type="password" name="password" required />
          ) : null}
          {passwordType === "update-password" ? (
            <>
              <FormInput
                type="password"
                name="oldPassword"
                labelText="old password"
                required
              />
              <FormInput
                type="password"
                name="password"
                labelText="new password"
                required
              />
              <FormInput
                type="password"
                name="comfirmPassword"
                labelText="comfirm password"
                required
              />
            </>
          ) : null}
          <div
            className={`flex ${
              !!passwordType ? "justify-end" : "justify-center"
            } gap-[12px]`}
          >
            <select
              className="text-white bg-green-700 border-none px-[11px] py-[6px] rounded-[6px]"
              defaultValue="1"
              name="type"
              required
              onChange={e => setPasswordType(e.target.value)}
            >
              <option value="1" hidden disabled>
                select type
              </option>
              <option value="set-password">set first password</option>
              <option value="update-password">update password</option>
            </select>
            <Link className="btn-blue" to="..">
              back to dashboard
            </Link>
            <SubmitBtn text="update" />
          </div>
        </Form>
      </div>
    </>
  );
};
export default UpdatePassword;
