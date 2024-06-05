"use client";

import { useEffect, useState } from "react";

export default function SamplePost() {
  const [dashboards, setDashBoards] = useState<any>([]);
  const [num, setNum] = useState<number>(1);
  const color = "#7AC555";

  const handlePost = async () => {
    const title = `dashboard${num}`;
    setNum((prev) => prev + 1);

    const response = await fetch("/api/proxy/dashboards", {
      method: "POST",
      body: JSON.stringify({ title: title, color: color }),
    });

    if (response.ok) {
      getDashBoards();
    }
  };

  const getDashBoards = async () => {
    const response = await fetch("/api/proxy/dashboards", {
      method: "GET",
    });
    const data = await response.json();
    setDashBoards(data.dashboards);
  };
  useEffect(() => {
    getDashBoards();
  }, []);

  return (
    <>
      <div>
        <ul className="flex flex-col gap-5">
          {dashboards.map((dashboard: any) => (
            <li key={dashboard.id}>
              <p>{dashboard.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handlePost}>대시보드추가</button>
    </>
  );
}
