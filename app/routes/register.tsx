import { Form } from "@remix-run/react";

export default function Register() {
  return (
    <div className="container">
      Вашої заявки не було знайдено, тому ви можете подати нову:

      <Form method="post">
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Контактний номер телефону</label>
          <input type="text" name="phoneNumber" className="form-control" id="phoneNumber" />
        </div>
        <div className="mb-3">
          <label htmlFor="vpoNumber" className="form-label">Останні 4 цифри довідки ВПО</label>
          <input type="text" name="vpoNumber" className="form-control" id="vpoNumber" />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">Місто</label>
          <input type="text" name="city" className="form-control" id="city" />
        </div>
        <button type="submit" className="btn btn-primary">Подати заявку</button>
      </Form>
    </div>
  );
}