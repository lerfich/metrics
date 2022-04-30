import React from "react";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback: React.FC<FallbackProps> = ({
  resetErrorBoundary,
}) => (
  <React.Fragment>
    <div>Something went wrong</div>
    <div>
      <button type="button" onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  </React.Fragment>
);
