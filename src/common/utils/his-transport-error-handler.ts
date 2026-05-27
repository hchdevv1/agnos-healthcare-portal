import {
  BadGatewayException,
  GatewayTimeoutException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

import axios, {
  AxiosError,
} from 'axios';

export function handleHisTransportError(
  error: unknown,
  logger: Logger,
  context: string,
): never {
  /*
   * Unknown non-axios error
   */
  if (!axios.isAxiosError(error)) {
    logger.error(
      `${context} unexpected transport error`,
    );

    throw new BadGatewayException({
      message:
        'Unexpected external HIS transport error',
    });
  }

  const axiosError =
    error as AxiosError;

  logger.error(
    `${context} transport failure: ${axiosError.message}`,
  );

  /*
   * Request timeout
   */
  if (
    axiosError.code ===
    'ECONNABORTED'
  ) {
    throw new GatewayTimeoutException({
      message:
        'External HIS service timeout',
    });
  }

  /*
   * HIS unavailable
   */
  if (
    axiosError.code ===
      'ECONNREFUSED' ||
    axiosError.code ===
      'ENOTFOUND'
  ) {
    throw new ServiceUnavailableException({
      message:
        'External HIS service unavailable',
    });
  }

  /*
   * HIS endpoint not found
   */
  if (
    axiosError.response?.status ===
    404
  ) {
    throw new BadGatewayException({
      message:
        'External HIS endpoint not found',
    });
  }

  /*
   * HIS authentication failure
   */
  if (
    axiosError.response?.status ===
      401 ||
    axiosError.response?.status ===
      403
  ) {
    throw new BadGatewayException({
      message:
        'External HIS authentication failed',
    });
  }

  /*
   * HIS internal server error
   */
  if (
    axiosError.response?.status ===
      500 ||
    axiosError.response?.status ===
      502 ||
    axiosError.response?.status ===
      503 ||
    axiosError.response?.status ===
      504
  ) {
    throw new ServiceUnavailableException({
      message:
        'External HIS service unavailable',
    });
  }

  /*
   * Generic gateway error
   */
  throw new BadGatewayException({
    message:
      'Unable to connect to external HIS service',
  });
}