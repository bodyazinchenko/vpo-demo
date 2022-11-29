import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import usersMock from "../../mocks/usersMock";

export const loader: LoaderFunction = async ({
  params,
}) => {
  const { userId } = params;
  const user = usersMock.find(item => item.id = userId);

  if (!user) throw new Error("Joke not found");
  return json({ user });
};

export default function CheckStatus() {
  const { user } = useLoaderData();
  return (
    <div className="container">
      <h2>{user.fullName}</h2>
      {user.status === 'pending' && (
        <div className="alert alert-primary" role="alert">
          Ваша заявка прийнята, й обробляється нашим адміністратором.
        </div>
      )}
      {user.status === 'success' && (
        <div className="alert alert-success" role="alert">
          Ваша заявка одобрена, ми з вами звяжемось
        </div>
      )}
      {user.status === 'rejected' && (
        <div className="alert alert-danger" role="alert">
          Ваша заявка відхилена
        </div>
      )}
    </div>
  );
}