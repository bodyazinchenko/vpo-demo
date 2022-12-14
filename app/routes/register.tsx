import { Form, useTransition } from "@remix-run/react";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { phone } from 'phone';
import { redirect, json, type ActionFunction, } from "@remix-run/node";
import type { RegisterFormData } from '../types/RegisterForm';
import { createUser } from '../utils/user.server';
import { uploadHandler } from '../utils/cloudinary.server';
import Layout from "~/components/Layout";

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const formDataEntries = Object.fromEntries(formData) as unknown as RegisterFormData;
  // Need to format phone to unified view
  const { phoneNumber } = phone(formDataEntries.phone as string, { country: 'UA' });
  // @TODO: add validate to formData fields
  const user = await createUser({ ...formDataEntries, phone: phoneNumber as string });

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
  const transition = useTransition();

  return (
    <Layout>
      <Form method="post" encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Контактний номер телефону</label>
          <input type="text" name="phone" className="form-control" id="phone" required />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoLastFour" className="form-label">Останні 4 цифри довідки ВПО</label>
          <input type="text" name="vpoLastFour" className="form-control" id="vpoLastFour" required />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">ПІБ</label>
          <input type="text" name="fullName" className="form-control" id="fullName" required />
        </div>
        <div className="mb-3">
          <label htmlFor="birthday" className="form-label">Дата народження</label>
          <input type="date" name="birthday" className="form-control" id="birthday" required />
        </div>
        <hr />
        <h3>Зареєстроване місце проживання (прописка)</h3>
        <div className="mb-3">
          <label htmlFor="passportCity" className="form-label">Місто</label>
          <input type="text" name="passportCity" className="form-control" id="passportCity" required />
        </div>
        <div className="mb-3">
          <label htmlFor="passportStreet" className="form-label">Вулиця</label>
          <input type="text" name="passportStreet" className="form-control" id="passportStreet" required />
        </div>
        <div className="mb-3">
          <label htmlFor="passportHouse" className="form-label">Будинок</label>
          <input type="text" name="passportHouse" className="form-control" id="passportHouse" required />
        </div>
        <div className="mb-3">
          <label htmlFor="passportCourpus" className="form-label">Корпус</label>
          <input type="text" name="passportCourpus" className="form-control" id="passportCourpus" required />
        </div>
        <div className="mb-3">
          <label htmlFor="passportApt" className="form-label">Квартира</label>
          <input type="text" name="passportApt" className="form-control" id="passportApt" required />
        </div>
        <hr />
        <h3>Фактичне місце перебування (як у довідці)</h3>
        <div className="mb-3">
          <label htmlFor="vpoCity" className="form-label">Місто</label>
          <input type="text" name="vpoCity" className="form-control" id="vpoCity" required />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoStreet" className="form-label">Вулиця</label>
          <input type="text" name="vpoStreet" className="form-control" id="vpoStreet" required />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoHouse" className="form-label">Будинок</label>
          <input type="text" name="vpoHouse" className="form-control" id="vpoHouse" required />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoCourpus" className="form-label">Корпус</label>
          <input type="text" name="vpoCourpus" className="form-control" id="vpoCourpus" required />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoApt" className="form-label">Квартира</label>
          <input type="text" name="vpoApt" className="form-control" id="vpoApt" required />
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
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Загрузіть фото довідки ВПО</label>
          <input type="file" accept="image/png, image/jpeg" name="img" className="form-control" id="img" required />
        </div>
          <button type="submit" className="btn btn-primary">
            {transition.state === 'submitting' ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                Завантажуємо...
              </>
            ) : (
              <>Подати заявку</>
            )}
          </button>
      </Form>
    </Layout>
  );
}