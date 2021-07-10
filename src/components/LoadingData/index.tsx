import React, { ReactElement } from "react";
import NetworkErrorMAWN from "./network-error-mawn";
import Spin from "./Spin";

interface LoadingDataProps {
  loading: boolean;
  dataValid: () => boolean;
  customError?: ReactElement;
}

const LoadingData: React.FC<LoadingDataProps> = ({ loading, children, dataValid, customError = <NetworkErrorMAWN /> }) => {
  return loading ? <Spin /> : dataValid() ? <React.Fragment>{children}</React.Fragment> : customError;
};
export default LoadingData;
