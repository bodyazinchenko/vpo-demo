import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Отримання допомоги для ВПО</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Для отримання допомоги треба подати заявку. Ви можете перевірити свою заявку якщо ви її вже подавали. Або подати нову.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/check-status">
            <button type="button" className="btn btn-outline-secondary btn-lg px-4 gap-3">Перевірити статус заявки</button>
          </Link>
          <Link to="/register">
            <button type="button" className="btn btn-primary btn-lg px-4">Подати нову заявку</button>
          </Link>
        </div>
      </div>
    </div>
  )
}