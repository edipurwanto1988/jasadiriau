import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import Box, { BoxProps } from "@mui/material/Box";
import { Outlet, OutletProps } from "react-router";

export type LinkTabProps = {
  tab: TabProps[];
  outletProps?: OutletProps;
  wrapperProps?: BoxProps;
  boxProps?: BoxProps;
} & TabsProps;

const LinkTab = ({
  tab,
  outletProps,
  wrapperProps,
  boxProps,
  ...props
}: LinkTabProps) => {
  return (
    <Box width={"100%"} {...wrapperProps}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} {...boxProps}>
        <Tabs {...props}>
          {tab.map((_tab, i) => (
            <Tab key={i} {..._tab} />
          ))}
        </Tabs>
      </Box>

      <Outlet {...outletProps} />
    </Box>
  );
};

export default LinkTab;
