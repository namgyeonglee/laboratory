"use client";

import { useState } from "react";

export default function UserGetButton() {
  const [user, setUser] = useState<any>();
  const hanldeClick = async () => {
    try {
      const response = await fetch("/api/proxy/user", { method: "GET" });
      const data = await response.json();
      setUser(data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <div className="text-3xl text-white bg-green-300">
          {JSON.stringify(user)}
        </div>
      )}
      <button onClick={hanldeClick} className="border-2 border-indigo-300">
        GetUserData
      </button>
    </>
  );
}
