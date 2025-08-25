import UserList from "@/views/pages/user/UserList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengguna",
};

export default async function Page() {
  return <UserList />;
}
