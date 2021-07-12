import React, { ReactElement } from 'react';
import NetworkErrorDTIC from './network-error-dtic';
import Spin from './Spin';

interface LoadingDataProps {
  loading: boolean;
  dataValid: () => boolean;
  customError?: ReactElement;
}

const LoadingData: React.FC<LoadingDataProps> = ({
  loading,
  children,
  dataValid,
  customError = <NetworkErrorDTIC />,
}) => {
  return loading ? (
    <Spin />
  ) : dataValid() ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    customError
  );
};
export default LoadingData;
