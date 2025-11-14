import { NextResponse } from "next/server";

export function apiResponse(status: number, message: string, data?: object | null) {
  return NextResponse.json({ status, message, data }, { status });
}