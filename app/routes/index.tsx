import { Form } from "@remix-run/react";
import { type ActionFunction, redirect } from "@remix-run/node";
import { findUserByPhoneAndVpo } from '../utils/user.server';
import Layout from "~/components/Layout";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const phoneNumber = form.get('phoneNumber') as string;
  const vpoNumber = form.get('vpoNumber') as string;

  const user = await findUserByPhoneAndVpo(phoneNumber, vpoNumber);

  if (!user) {
    return redirect('/register')
  } else {
    return redirect(`/status/${user.id}`);
  }
}

export default function Index() {
  return (
    <Layout>
      <Form method="post">
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Контактний номер телефону</label>
          <input type="text" name="phoneNumber" className="form-control" id="phoneNumber" />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoNumber" className="form-label">Останні 4 цифри довідки ВПО</label>
          <input type="text" name="vpoNumber" className="form-control" id="vpoNumber" />
        </div>
        <button type="submit" className="btn btn-primary">Перевірити заявку</button>
      </Form>
    </Layout>
  );
}
