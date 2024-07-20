import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("요청함?");

  if (req.method === "GET") {
    const surveys = [
      { id: 1, title: "Survey 1" },
      { id: 2, title: "Survey 2" },
    ];

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // JSON 응답
    res.status(200).json(surveys);
  } else {
    // 허용되지 않은 메소드에 대한 처리
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
