import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { BaseApiResponse } from "@/interfaces";

export async function POST(request: Request) {
  const cookie = await cookies();
  const token = cookie.get("access_token")?.value;

  try {
    const { device } = await request.json();

    if (!device || typeof device !== "string") {
      return NextResponse.json(
        { success: false, info: "`device` must be provided as a string" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/security/logout/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          device: device,
        }),
      },
    );

    const data = (await response.json()) as BaseApiResponse<string>;
    if (data.success) {
      const res = NextResponse.json({ success: true, info: data.info });
      res.cookies.set("access_token", "", { expires: new Date(0) });

      return res;
    }
    return NextResponse.json(
      { success: false, info: data.info },
      { status: 400 },
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, info: "Logout failed" },
      { status: 500 },
    );
  }
}
