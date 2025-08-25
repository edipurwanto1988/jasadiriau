import NotificationResource from "@/http/resources/notification.resource";
import {
  getNotification,
  updateRead,
} from "@/http/services/notification.service";
import { verifySession } from "@/lib/session";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const session = await verifySession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const results = await getNotification(session.userId);
  return NextResponse.json(NotificationResource.collection(results, true));
});

export const PUT = api(async (req) => {
  const payload = await req.json();
  const result = await updateRead(payload.id);
  return new NextResponse(null, { status: 204 });
});
