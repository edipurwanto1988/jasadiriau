import MuiLink, { LinkProps } from "@mui/material/Link";
import { Link } from "react-transition-progress/next";

export default function ILink(props: LinkProps<typeof Link>) {
  return <MuiLink component={Link} {...props} />;
}
