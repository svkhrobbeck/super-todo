import { Helmet } from "react-helmet";
import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import errorToast from "../helpers/errorToast";
import axios from "axios";
import filterObjectFields from "../helpers/filterObjectFields";
import { toast } from "react-toastify";
import { useState } from "react";

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
  const [passwordType, setPasswordType] = useState("set-password");

  return (
    <>
      <Helmet>
        <title>Todo Application | Set Password</title>
      </Helmet>
      <div className="flex justify-center">
        <Form className="max-w-[600px] w-full" method="PATCH">
          <h3 className="font-medium text-center text-[28px]">
            you can {passwordType.includes("set") ? "set new" : "update the"}{" "}
            password
          </h3>
          {passwordType === "set-password" ? (
            <FormInput type="password" name="password" required />
          ) : null}
          {passwordType === "update-password" && (
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
          )}
          <div
            className={`flex ${
              !!passwordType ? "justify-end" : "justify-center"
            } gap-[12px]`}
          >
            <Link className="btn-teal" to="..">
              back to dashboard
            </Link>
            <select
              className="text-white bg-teal-600 border-none px-[11px] py-[6px] rounded-[6px]"
              onChange={e => setPasswordType(e.target.value)}
              defaultValue={passwordType}
              name="type"
              required
            >
              <option value="set-password">set password</option>
              <option value="update-password">update password</option>
            </select>
            {passwordType && <SubmitBtn className="btn-indigo" text="comfirm" />}
          </div>
        </Form>
      </div>
    </>
  );
};
export default UpdatePassword;
