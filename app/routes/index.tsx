import { Form, useActionData } from "@remix-run/react";
import { phone } from 'phone'
import { type ActionFunction, redirect, json } from "@remix-run/node";
import { findUserByPhoneAndVpo } from '../utils/user.server';
import Layout from "~/components/Layout";
import FormCheckStatusSchema from '../schemas/FormCheckStatusSchema';
import getValidationErrors from "~/schemas/getValidationErrors";
import type { CheckStatusForm } from "~/types/CheckStatusForm";

type ActionData = {
  err?: any;
  formData?: CheckStatusForm;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData()) as unknown as CheckStatusForm;
  const { phoneNumber } = phone(formData.phoneNumber as string, { country: 'UA' });

  try {
    // First validate form inputs
    await FormCheckStatusSchema.validate(formData, { abortEarly: false });
    const user = await findUserByPhoneAndVpo(phoneNumber as string, formData.vpoLastFour);
    if (!user) {
      return redirect('/register')
    } else {
      return redirect(`/status/${user.id}`);
    }
  } catch (err) {
    return json({ err, formData })
  }
}

export default function Index() {
  const actionData = useActionData<ActionData>();
  const validationErrors = getValidationErrors(actionData?.err);

  return (
    <Layout>
      <Form method="post">
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Контактний номер телефону</label>
          <input type="text" name="phoneNumber" className="form-control" id="phoneNumber" />
          {validationErrors?.phoneNumber && (
            <div className="alert alert-danger">
              {validationErrors?.phoneNumber}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="vpoLastFour" className="form-label">Останні 4 цифри довідки ВПО</label>
          <input type="text" name="vpoLastFour" className="form-control" id="vpoLastFour" />
          {validationErrors?.vpoLastFour && (
            <div className="alert alert-danger">
              {validationErrors?.vpoLastFour}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Перевірити заявку</button>
      </Form>
    </Layout>
  );
}
