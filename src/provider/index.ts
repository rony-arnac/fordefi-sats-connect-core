import { type SupportedWallet, type BitcoinProvider, type Provider } from './types';

export async function getProviderOrThrow(
  getProvider?: () => Promise<BitcoinProvider | undefined>
): Promise<BitcoinProvider> {
  const provider =
    (await getProvider?.()) || window.XverseProviders?.BitcoinProvider || window.BitcoinProvider;

  if (!provider) {
    throw new Error('No Bitcoin wallet installed');
  }

  return provider;
}

export function getProviders(): Provider[] {
  if (!window.btc_providers) window.btc_providers = [];
  return window.btc_providers;
}

export function getProviderById(providerId: string) {
  return providerId?.split('.').reduce((acc: any, part) => acc?.[part], window);
}

export function isProviderInstalled(providerId: string) {
  return !!getProviderById(providerId);
}

export function getSupportedWallets(): SupportedWallet[] {
  const btc_providers = getProviders();
  // const adaptedWallets = [

  // ];
  const unisat = {
    id: 'unisat',
    name: 'Unisat',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE4MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTAwNTBfNDE3MSkiPgo8cGF0aCBkPSJNMTEzLjY2IDI5LjI4OTdMMTQzLjk3IDU5LjMwOTdDMTQ2LjU1IDYxLjg1OTcgMTQ3LjgyIDY0LjQzOTcgMTQ3Ljc4IDY3LjAzOTdDMTQ3Ljc0IDY5LjYzOTcgMTQ2LjYzIDcyLjAwOTcgMTQ0LjQ2IDc0LjE1OTdDMTQyLjE5IDc2LjQwOTcgMTM5Ljc0IDc3LjU0OTcgMTM3LjEyIDc3LjU5OTdDMTM0LjUgNzcuNjM5NyAxMzEuOSA3Ni4zNzk3IDEyOS4zMiA3My44Mjk3TDk4LjMxOTkgNDMuMTI5N0M5NC43OTk5IDM5LjYzOTcgOTEuMzk5OSAzNy4xNjk3IDg4LjEyOTkgMzUuNzE5N0M4NC44NTk5IDM0LjI2OTcgODEuNDE5OSAzNC4wMzk3IDc3LjgxOTkgMzUuMDM5N0M3NC4yMDk5IDM2LjAyOTcgNzAuMzM5OSAzOC41Nzk3IDY2LjE4OTkgNDIuNjc5N0M2MC40Njk5IDQ4LjM0OTcgNTcuNzM5OSA1My42Njk3IDU4LjAxOTkgNTguNjM5N0M1OC4yOTk5IDYzLjYwOTcgNjEuMTM5OSA2OC43Njk3IDY2LjUyOTkgNzQuMDk5N0w5Ny43Nzk5IDEwNS4wNkMxMDAuMzkgMTA3LjY0IDEwMS42NyAxMTAuMjIgMTAxLjYzIDExMi43OEMxMDEuNTkgMTE1LjM1IDEwMC40NyAxMTcuNzIgOTguMjU5OSAxMTkuOTFDOTYuMDU5OSAxMjIuMDkgOTMuNjI5OSAxMjMuMjMgOTAuOTg5OSAxMjMuMzJDODguMzQ5OSAxMjMuNDEgODUuNzE5OSAxMjIuMTYgODMuMTE5OSAxMTkuNThMNTIuODA5OSA4OS41NTk3QzQ3Ljg3OTkgODQuNjc5NyA0NC4zMTk5IDgwLjA1OTcgNDIuMTI5OSA3NS42OTk3QzM5LjkzOTkgNzEuMzM5NyAzOS4xMTk5IDY2LjQwOTcgMzkuNjg5OSA2MC45MDk3QzQwLjE5OTkgNTYuMTk5NyA0MS43MDk5IDUxLjYzOTcgNDQuMjI5OSA0Ny4yMTk3QzQ2LjczOTkgNDIuNzk5NyA1MC4zMzk5IDM4LjI3OTcgNTUuMDA5OSAzMy42NDk3QzYwLjU2OTkgMjguMTM5NyA2NS44Nzk5IDIzLjkxOTcgNzAuOTM5OSAyMC45Nzk3Qzc1Ljk4OTkgMTguMDM5NyA4MC44Nzk5IDE2LjQwOTcgODUuNTk5OSAxNi4wNjk3QzkwLjMyOTkgMTUuNzI5NyA5NC45ODk5IDE2LjY2OTcgOTkuNTk5OSAxOC44ODk3QzEwNC4yMSAyMS4xMDk3IDEwOC44OSAyNC41Njk3IDExMy42NSAyOS4yODk3SDExMy42NloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMDA1MF80MTcxKSIvPgo8cGF0aCBkPSJNNjYuMTA5OSAxNTAuNDJMMzUuODA5OSAxMjAuNEMzMy4yMjk5IDExNy44NCAzMS45NTk5IDExNS4yNyAzMS45OTk5IDExMi42N0MzMi4wMzk5IDExMC4wNyAzMy4xNDk5IDEwNy43IDM1LjMxOTkgMTA1LjU1QzM3LjU4OTkgMTAzLjMgNDAuMDM5OSAxMDIuMTYgNDIuNjU5OSAxMDIuMTFDNDUuMjc5OSAxMDIuMDcgNDcuODc5OSAxMDMuMzIgNTAuNDU5OSAxMDUuODhMODEuNDQ5OSAxMzYuNThDODQuOTc5OSAxNDAuMDcgODguMzY5OSAxNDIuNTQgOTEuNjM5OSAxNDMuOTlDOTQuOTA5OSAxNDUuNDQgOTguMzQ5OSAxNDUuNjYgMTAxLjk2IDE0NC42N0MxMDUuNTcgMTQzLjY4IDEwOS40NCAxNDEuMTMgMTEzLjU5IDEzNy4wMkMxMTkuMzEgMTMxLjM1IDEyMi4wNCAxMjYuMDMgMTIxLjc2IDEyMS4wNkMxMjEuNDggMTE2LjA5IDExOC42NCAxMTAuOTMgMTEzLjI1IDEwNS41OUw5Ni41OTk5IDg5LjI0MDFDOTMuOTg5OSA4Ni42NjAxIDkyLjcwOTkgODQuMDgwMSA5Mi43NDk5IDgxLjUyMDFDOTIuNzg5OSA3OC45NTAxIDkzLjkwOTkgNzYuNTgwMSA5Ni4xMTk5IDc0LjM5MDFDOTguMzE5OSA3Mi4yMTAxIDEwMC43NSA3MS4wNzAxIDEwMy4zOSA3MC45ODAxQzEwNi4wMyA3MC44OTAxIDEwOC42NiA3Mi4xNDAxIDExMS4yNiA3NC43MjAxTDEyNi45NiA5MC4xMzAxQzEzMS44OSA5NS4wMTAxIDEzNS40NSA5OS42MzAxIDEzNy42NCAxMDMuOTlDMTM5LjgzIDEwOC4zNSAxNDAuNjUgMTEzLjI4IDE0MC4wOCAxMTguNzhDMTM5LjU3IDEyMy40OSAxMzguMDYgMTI4LjA1IDEzNS41NCAxMzIuNDdDMTMzLjAzIDEzNi44OSAxMjkuNDMgMTQxLjQxIDEyNC43NiAxNDYuMDRDMTE5LjIgMTUxLjU1IDExMy44OSAxNTUuNzcgMTA4LjgzIDE1OC43MUMxMDMuNzcgMTYxLjY1IDk4Ljg3OTkgMTYzLjI5IDk0LjE0OTkgMTYzLjYzQzg5LjQxOTkgMTYzLjk3IDg0Ljc1OTkgMTYzLjAzIDgwLjE0OTkgMTYwLjgxQzc1LjUzOTkgMTU4LjU5IDcwLjg1OTkgMTU1LjEzIDY2LjA5OTkgMTUwLjQxTDY2LjEwOTkgMTUwLjQyWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzEwMDUwXzQxNzEpIi8+CjxwYXRoIGQ9Ik04NS4wMDk5IDcyLjk1OTJDOTEuMTU2OCA3Mi45NTkyIDk2LjEzOTkgNjcuOTc2MSA5Ni4xMzk5IDYxLjgyOTJDOTYuMTM5OSA1NS42ODIzIDkxLjE1NjggNTAuNjk5MiA4NS4wMDk5IDUwLjY5OTJDNzguODYzIDUwLjY5OTIgNzMuODc5OSA1NS42ODIzIDczLjg3OTkgNjEuODI5MkM3My44Nzk5IDY3Ljk3NjEgNzguODYzIDcyLjk1OTIgODUuMDA5OSA3Mi45NTkyWiIgZmlsbD0idXJsKCNwYWludDJfcmFkaWFsXzEwMDUwXzQxNzEpIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xMDA1MF80MTcxIiB4MT0iMTM4Ljk4NSIgeTE9IjQ2Ljc3OTUiIHgyPSI0NS4wNTI5IiB5Mj0iODguNTIzMyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMjAxQzFCIi8+CjxzdG9wIG9mZnNldD0iMC4zNiIgc3RvcC1jb2xvcj0iIzc3MzkwRCIvPgo8c3RvcCBvZmZzZXQ9IjAuNjciIHN0b3AtY29sb3I9IiNFQTgxMDEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjRCODUyIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8xMDA1MF80MTcxIiB4MT0iNDMuMzgxMiIgeTE9IjEzNC4xNjciIHgyPSIxNTIuMjMxIiB5Mj0iMTAxLjc3MSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMUYxRDFDIi8+CjxzdG9wIG9mZnNldD0iMC4zNyIgc3RvcC1jb2xvcj0iIzc3MzkwRCIvPgo8c3RvcCBvZmZzZXQ9IjAuNjciIHN0b3AtY29sb3I9IiNFQTgxMDEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjRGQjUyIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQyX3JhZGlhbF8xMDA1MF80MTcxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDg1LjAwOTkgNjEuODM5Mikgc2NhbGUoMTEuMTMpIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Y0Qjg1MiIvPgo8c3RvcCBvZmZzZXQ9IjAuMzMiIHN0b3AtY29sb3I9IiNFQTgxMDEiLz4KPHN0b3Agb2Zmc2V0PSIwLjY0IiBzdG9wLWNvbG9yPSIjNzczOTBEIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzIxMUMxRCIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEwMDUwXzQxNzEiPgo8cmVjdCB3aWR0aD0iMTE1Ljc3IiBoZWlnaHQ9IjE0Ny43IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIgMTYpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==',
    url: 'https://unisat.io',
  };
  btc_providers.push(unisat);
  const wallets: SupportedWallet[] = btc_providers.map((provider) => {
    {
      return {
        id: provider.id,
        name: provider.name,
        icon: provider.icon,
        webUrl: provider.webUrl,
        chromeWebStoreUrl: provider.chromeWebStoreUrl,
        isInstalled: isProviderInstalled(provider.id),
      };
    }
  });
  return wallets;
}

export * from './types';
