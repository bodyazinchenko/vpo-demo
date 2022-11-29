import { type User, ApplicationStatus } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { findUserById } from '../utils/user.server';

export const loader: LoaderFunction = async ({
  params,
}) => {
  const { userId } = params;
  const user = await findUserById(userId as string);

  if (!user) throw new Error("User not found");
  return json({ user });
};

export default function CheckStatus() {
  const { user } = useLoaderData<{ user: User }>();
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