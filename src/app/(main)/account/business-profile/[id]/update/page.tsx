import AccountCreateBusiness from "@/views/pages/busines-profile/AccountCreateBusiness";
import Template from "../../create/template";
import { businessUrl } from "@/views/services/business-profile.service";

export default async function Page({ params }: { params: Promise<{ id }> }) {
  const id = (await params).id;
  const req = await fetch(`${businessUrl.business}/${id}`);
  const resp = await req.json();
  const current = resp.data;

  console.log(current, '--current')
  return (
    <Template>
      <AccountCreateBusiness id={+id} current={current} />
    </Template>
  );
}
