import { Form } from "@remix-run/react";
import { redirect, json, type ActionFunction } from "@remix-run/node";
import type { RegisterFormData } from '../types/RegisterForm';
import { createUser } from '../utils/user.server';
import Layout from "~/components/Layout";

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData()) as unknown as RegisterFormData;
  // @TODO: add validate to formData fields
  const user = await createUser(formData);

  if (!user) {
    return json(
      {
        error: `Something went wrong trying to create a new user.`,
     },
     { status: 400 },
    )
  } else {
    return redirect(`/status/${user.id}`);
  }
}

export default function Register() {
  return (
    <Layout>
      Вашої заявки не було знайдено, тому ви можете подати нову:

      <Form method="post">
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Контактний номер телефону</label>
          <input type="text" name="phone" className="form-control" id="phone" />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoLastFour" className="form-label">Останні 4 цифри довідки ВПО</label>
          <input type="text" name="vpoLastFour" className="form-control" id="vpoLastFour" />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">ПІБ</label>
          <input type="text" name="fullName" className="form-control" id="fullName" />
        </div>
        <div className="mb-3">
          <label htmlFor="birthday" className="form-label">Дата народження</label>
          <input type="date" name="birthday" className="form-control" id="birthday" />
        </div>
        <hr />
        <h3>Зареєстроване місце проживання (прописка)</h3>
        <div className="mb-3">
          <label htmlFor="passportCity" className="form-label">Місто</label>
          <input type="text" name="passportCity" className="form-control" id="passportCity" />
        </div>
        <div className="mb-3">
          <label htmlFor="passportStreet" className="form-label">Вулиця</label>
          <input type="text" name="passportStreet" className="form-control" id="passportStreet" />
        </div>
        <div className="mb-3">
          <label htmlFor="passportHouse" className="form-label">Будинок</label>
          <input type="text" name="passportHouse" className="form-control" id="passportHouse" />
        </div>
        <div className="mb-3">
          <label htmlFor="passportCourpus" className="form-label">Корпус</label>
          <input type="text" name="passportCourpus" className="form-control" id="passportCourpus" />
        </div>
        <div className="mb-3">
          <label htmlFor="passportApt" className="form-label">Квартира</label>
          <input type="text" name="passportApt" className="form-control" id="passportApt" />
        </div>
        <hr />
        <h3>Фактичне місце перебування (як у довідці)</h3>
        <div className="mb-3">
          <label htmlFor="vpoCity" className="form-label">Місто</label>
          <input type="text" name="vpoCity" className="form-control" id="vpoCity" />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoStreet" className="form-label">Вулиця</label>
          <input type="text" name="vpoStreet" className="form-control" id="vpoStreet" />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoHouse" className="form-label">Будинок</label>
          <input type="text" name="vpoHouse" className="form-control" id="vpoHouse" />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoCourpus" className="form-label">Корпус</label>
          <input type="text" name="vpoCourpus" className="form-control" id="vpoCourpus" />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoApt" className="form-label">Квартира</label>
          <input type="text" name="vpoApt" className="form-control" id="vpoApt" />
        </div>
        <hr />
        <h3>Стан родини</h3>
        <div className="mb-3">
          <label htmlFor="spousesFullName" className="form-label">ПІБ (чоловіка/дружини)</label>
          <input type="text" name="spousesFullName" className="form-control" id="spousesFullName" />
        </div>
        <div className="mb-3">
          <label htmlFor="personsCount" className="form-label">Кількість людей в родині</label>
          <input type="text" name="personsCount" className="form-control" id="personsCount" />
        </div>
        <button type="submit" className="btn btn-primary">Подати заявку</button>
      </Form>
    </Layout>
  );
}