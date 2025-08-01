import React from "react";
import { NavigateOptions, useNavigate } from "react-router";

type useLinkTabsProps = {
  defaultValue?: string;
  options?: NavigateOptions;
  on?: (value: string) => void;
};

const useLinkTabs = (props?: useLinkTabsProps) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(props?.defaultValue || "");

  const onChange = (_: React.SyntheticEvent, v: string) => {
    if (props?.on) props.on(v);
    setValue(v);
    navigate(v, props?.options);
  };

  React.useEffect(() => {
    if (!props?.defaultValue) return;
    if (props?.on) props.on(props.defaultValue);
    navigate(props.defaultValue, props?.options);
  }, []);

  return { value, onChange };
};

export default useLinkTabs;
