import { ComponentType, ReactNode, lazy, Suspense } from "react";
import Loading from "../Skeleton/Spinner";

const LoadComponent = <T extends {}>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback: ReactNode = <Loading />
) => {
  const LazyComponent = lazy(importFunc);
  return (props: T) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LoadComponent;
