import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import usersMock from '../../mocks/usersMock';

// Add validate 
export const validate = () => true; 

export const action = async ({ request }) => {
  const form = await request.formData();
  const phoneNumber = form.get('phoneNumber');
  const vpoNumber = form.get('vpoNumber');

  const user = usersMock.find(item => item.phoneNumber === phoneNumber && item.vpoNumber === vpoNumber);

  if (!user) {
    return redirect('/register')
  } else {
    return redirect(`/status/${user.id}`);
  }
}

export default function Index() {
  return (
    <div className="container">
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
    </div>
  );
}
