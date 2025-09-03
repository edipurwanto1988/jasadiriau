import dynamic from "next/dynamic";

const AccountSidebarMenu = dynamic(
  () => import("@/views/components/base/Sidebar/AccountSidebarMenu")
);

export default function Default() {
  return <AccountSidebarMenu />;
}
