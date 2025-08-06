import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import Box, { BoxProps } from "@mui/material/Box";

export type LinkTabProps = {
  tab: TabProps[];
  wrapperProps?: BoxProps;
  boxProps?: BoxProps;
} & TabsProps;

const LinkTab = ({
  tab,
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
      {props.children}
    </Box>
  );
};

export default LinkTab;
