import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "";

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          // fontSize: "24px",
          color: "black",
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      [
        React.createElement("img", {
          key: "image",
          src: "https://www.kwkang.net/images/logo.png", // 원하는 이미지 URL로 변경
          alt: "logo",
          style: {
            width: "180px",
            height: "180px",
            backgroundColor: "white",
            marginBottom: "32px",
            borderRadius: "20%",
            padding: "50px",
          },
        }),
        React.createElement(
          "h1",
          {
            key: "title",
            style: {
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            },
          },
          title
        ),
      ]
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
