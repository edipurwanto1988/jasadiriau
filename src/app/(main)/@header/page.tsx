import { verifySession } from "@/lib/session";
import MainHeader from "@/views/components/base/Header/MainHeader";

export default async function Page() {
  const session = await verifySession()
  return <MainHeader isLogin={session?.isAuth} role={session?.role} />;
}
