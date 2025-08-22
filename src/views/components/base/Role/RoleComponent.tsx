import React from "react";

type Props = {
  role?: RoleType;
  permission?: RoleType[];
  then: React.ReactNode;
  otherwise?: React.ReactNode;
};
const RoleComponent = ({ role, permission, then, otherwise }: Props) => {
  if (permission && role) {
    if (permission.includes(role)) {
      return then;
    } else if (otherwise) {
      return otherwise;
    } else {
      return null;
    }
  }

  return null;
};

export default RoleComponent;
