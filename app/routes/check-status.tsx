import { Form, useActionData, useTransition, Link } from "@remix-run/react";
import { phone } from 'phone'
import { type ActionFunction, redirect, json } from "@remix-run/node";
import { findUserByPhoneAndVpo } from '../utils/user.server';
import Layout from "~/components/Layout";
import FormCheckStatusSchema from '../schemas/FormCheckStatusSchema';
import getValidationErrors from "~/schemas/getValidationErrors";
import type { CheckStatusForm } from "~/types/CheckStatusForm";

type ActionData = {
  validationErr?: any;
  formData?: CheckStatusForm;
  notFoundUser?: boolean;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData()) as unknown as CheckStatusForm;
  const { phoneNumber } = phone(formData.phoneNumber as string, { country: 'UA' });

  try {
    // First validate form inputs
    await FormCheckStatusSchema.validate(formData, { abortEarly: false });
    const user = await findUserByPhoneAndVpo(phoneNumber as string, formData.vpoLastFour);
    if (!user) {
      return json({ formData, notFoundUser: true })
    } else {
      return redirect(`/status/${user.id}`);
    }
  } catch (err) {
    return json({ validationErr: err, formData })
  }
}

export default function CheckStatus() {
  const transition = useTransition();
  const actionData = useActionData<ActionData>();
  const validationErrors = getValidationErrors(actionData?.validationErr);

  return (
    <Layout>
      <Form method="post">
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Контактний номер телефону</label>
          <input type="text" name="phoneNumber" className="form-control" id="phoneNumber" required />
          {validationErrors?.phoneNumber && (
            <div className="alert alert-danger">
              {validationErrors?.phoneNumber}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="vpoLastFour" className="form-label">Останні 4 цифри довідки ВПО</label>
          <input type="text" name="vpoLastFour" className="form-control" id="vpoLastFour" required />
          {validationErrors?.vpoLastFour && (
            <div className="alert alert-danger">
              {validationErrors?.vpoLastFour}
            </div>
          )}
        </div>
        {transition.state === 'submitting' ? (
          <button type="submit" className="btn btn-primary">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            Перевіряємо...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">Перевірити статус заявки</button>
        )}
        <Link to="/register">
          <button type="button" className="btn btn-outline-secondary mx-2">Подати нову заявку</button>
        </Link>
      </Form>
      {actionData?.notFoundUser && (
        <div className="mt-4">
          <div className="alert alert-danger">
            Ми не знайшли вашої заявки
          </div>
        </div>
      )}
    </Layout>
  );
}
