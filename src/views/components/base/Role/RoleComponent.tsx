import { useAuth } from "@/views/contexts/AuthContext";
import React from "react";

type Props = {
  permission?: RoleType[];
  then: React.ReactNode;
  otherwise?: React.ReactNode;
};
const RoleComponent = ({ permission, then, otherwise }: Props) => {
  const auth = useAuth();
  if (permission && auth.role) {
    if (permission.includes(auth.role)) {
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
