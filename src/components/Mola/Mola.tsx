import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Button from "../button";

async function getData(accessToken: string) {
  const res = await fetch("https://sp-taskify-api.vercel.app/5-3/users/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function putData(accessToken: any) {
  const res = await fetch("https://sp-taskify-api.vercel.app/5-3/users/me", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "nickname": "하이루망고망고",
      "profileImageUrl": "string"
    }),
  });
}

const Mola = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    // 서버 컴포넌트에서는 useRouter를 사용할 수 없으므로, 데이터를 반환하여 클라이언트에서 리다이렉션 처리
    return (
      <div>
        <p>Redirecting...</p>
        <script
          dangerouslySetInnerHTML={{
            __html: 'window.location = "/auth/signin"',
          }}
        />
      </div>
    );

  }
  if (!session.accessToken) return null;
  const data = await getData(session.accessToken);

  const data2 = await putData(session.accessToken);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Data: {JSON.stringify(data)}</p>
      <p>email: {data.email}</p>
      <p>Data2: {JSON.stringify(data2)}</p>
      {/* <Button onClick={() => putData(session.accessToken)}>버튼</Button> */}
    </div>
  );
};

export default Mola;

