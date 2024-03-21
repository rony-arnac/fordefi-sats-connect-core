import { BtcRequests, Params, Requests, StxRequests } from '../request';
import { SatsConnectAdapter } from './satsConnectAdapter';
import { request } from '../request';
import { RpcResult } from '../types';
import { Provider, getProviderById } from '../provider';

class BaseAdapter extends SatsConnectAdapter {
  id = '';
  name = '';
  url = '';

  supportedMethods: (keyof StxRequests | keyof BtcRequests)[] = [];

  constructor(providerInfo: Provider) {
    super();
    this.id = providerInfo.id;
    this.name = providerInfo.name;
    this.url = providerInfo.webUrl || '';
    this.supportedMethods = providerInfo.methods || [];
  }

  request = async <Method extends keyof Requests>(
    method: Method,
    params: Params<Method>
  ): Promise<RpcResult<Method> | undefined> => {
    if (!this.supportedMethods.includes(method)) {
      console.error('Method not supported by the selected wallet');
    }

    return request(method, params, this.id);
  };
}

export { BaseAdapter };
