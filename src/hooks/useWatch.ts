import React from "react";
import { useApp } from "@contexts/AppContext";

const useWatch = (path: string, id?: number) => {
  const app = useApp();

  const timestamp = React.useMemo(() => {
    if (path && !id) {
      return app.watch.filter((f) => f.path === path);
    }
    const find = app.watch.find((f) => f.id === id && f.path === path);
    return find?.timestamp;
  }, [app.watch, path, id]);

  return timestamp;
};

export default useWatch;
