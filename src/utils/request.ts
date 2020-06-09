import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { merge, isError } from 'lodash';
import EventEmitter from '@/utils/event-emitter';

import axios from '@/utils/axios';

/**
 * shouldReturnRawResponse 为 true 时, 返回值类型
 */
export type RawResponse<T> = AxiosResponse<T>;

export enum Event {
  Error = 'error',
}

export const eventEmitter = new EventEmitter();

export interface NormalServerResponse {
  code: number;
}

export function isNormalServerResponseError(
  data: unknown
): data is NormalServerResponse {
  const { code } = data as NormalServerResponse;
  return code !== undefined && code !== 200;
}

export function isRequestError(data: unknown) {
  if (!data) {
    return false;
  }
  return isError(data) || isNormalServerResponseError(data);
}

export type RequestAPIConfig<T> = AxiosRequestConfig & {
  data?: T;
  params?: T;
  shouldEmitErrorEvent?: boolean;
  shouldReturnRawResponse?: boolean;
};

export type RequestAPI<T, R> = (config?: RequestAPIConfig<T>) => Promise<R>;

// 这里 R = any, 可以自己指定请求返回值的类型
export function createRequestAPI<T = unknown, R = any>(
  outsideConfig: RequestAPIConfig<T>
): RequestAPI<T, R> {
  return function requestAPI(config) {
    const mergedConfig = merge(
      {
        shouldEmitErrorEvent: true,
      },
      outsideConfig,
      config
    );

    const { shouldReturnRawResponse } = mergedConfig;

    return axios.request(mergedConfig).then(
      (resp) => {
        const { data } = resp;
        if (isRequestError(data)) {
          if (mergedConfig.shouldEmitErrorEvent) {
            eventEmitter.emit(Event.Error, data);
          }
          return Promise.reject(data);
        }
        return shouldReturnRawResponse ? resp : data;
      },
      (err) => {
        if (mergedConfig.shouldEmitErrorEvent) {
          eventEmitter.emit(Event.Error, err);
        }
        throw err;
      }
    );
  };
}
