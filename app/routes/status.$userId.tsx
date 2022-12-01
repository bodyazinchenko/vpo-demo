import { type User, ApplicationStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import Layout from "~/components/Layout";
import { findUserById } from '../utils/user.server';

export const loader: LoaderFunction = async ({
  params,
}) => {
  const { userId } = params;

  try {
    const user = await findUserById(userId as string);
    return user ? json({ user }) : json({ userNotFound: true });
  } catch (err) {
    return json({ userNotFound: true })
  }
}

export default function CheckStatus() {
  const { user, userNotFound } = useLoaderData<{ user: User, userNotFound: boolean }>();

  if (userNotFound) {
    return (
      <Layout>
        <h3>Ми не змогли знайти данні по вашій заявці. Будь ласка, перевірте заявку ще раз</h3>

        <Link to="/check-status">
          <button type="button" className="btn btn-outline-secondary btn-lg px-4 gap-3">Перевірити статус заявки</button>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>{user.fullName}</h2>
      {user.applicationStatus === ApplicationStatus.PENDING && (
        <div className="alert alert-primary" role="alert">
          Ваша заявка прийнята, й обробляється нашим адміністратором.
        </div>
      )}
      {user.applicationStatus === ApplicationStatus.SUCCESS && (
        <div className="alert alert-success" role="alert">
          Ваша заявка одобрена, ми з вами звяжемось
        </div>
      )}
      {user.applicationStatus === ApplicationStatus.REJECTED && (
        <div className="alert alert-danger" role="alert">
          Ваша заявка відхилена
        </div>
      )}
    </Layout>
  );
}