import {
  CreateEtchOrderRequest,
  CreateMintOrderRequest,
  EstimateEtchOrderRequest,
  EstimateMintOrderRequest,
  EstimateOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  RBFOrderRequest,
  RBFOrderResponse,
} from '../../runes/types';
import { BitcoinNetworkType, MethodParamsAndResult } from '../../types';

export interface EstimateRunesMintParams extends EstimateMintOrderRequest {
  network?: BitcoinNetworkType;
}

export type EstimateRunesMintResult = EstimateOrderResponse;

export type EstimateRunesMint = MethodParamsAndResult<
  EstimateRunesMintParams,
  EstimateRunesMintResult
>;

export interface MintRunesParams extends CreateMintOrderRequest {
  network?: BitcoinNetworkType;
}

export type MintRunesResult = {
  orderId: string;
  fundTransactionId: string;
  fundingAddress: string;
};

export type MintRunes = MethodParamsAndResult<MintRunesParams, MintRunesResult>;

export interface EstimateRunesEtchParams extends EstimateEtchOrderRequest {
  network?: BitcoinNetworkType;
}

export type EstimateRunesEtchResult = EstimateOrderResponse;

export type EstimateRunesEtch = MethodParamsAndResult<
  EstimateRunesEtchParams,
  EstimateRunesEtchResult
>;

export interface EtchRunesParams extends CreateEtchOrderRequest {
  network?: BitcoinNetworkType;
}

export type EtchRunesResult = {
  orderId: string;
  fundTransactionId: string;
  fundingAddress: string;
};

export type EtchRunes = MethodParamsAndResult<EtchRunesParams, EtchRunesResult>;

interface GetOrderParams extends GetOrderRequest {
  network?: BitcoinNetworkType;
}

export type GetOrder = MethodParamsAndResult<GetOrderParams, GetOrderResponse>;

interface EstimateRbfOrderParams extends RBFOrderRequest {
  network?: BitcoinNetworkType;
}

export type EstimateRbfOrder = MethodParamsAndResult<EstimateRbfOrderParams, RBFOrderResponse>;

interface RbfOrderParams extends RBFOrderRequest {
  network?: BitcoinNetworkType;
}

interface RbfOrderResult {
  orderId: string;
  fundRBFTransactionId: string;
  fundingAddress: string;
}

export type RbfOrder = MethodParamsAndResult<RbfOrderParams, RbfOrderResult>;

type GetRunesBalanceParams = null;
interface GetRunesBalanceResult {
  balances: {
    runeName: string;
    amount: string;
    divisibility: number;
    symbol: string;
    inscriptionId: string | null;
  }[];
}

export type GetRunesBalance = MethodParamsAndResult<GetRunesBalanceParams, GetRunesBalanceResult>;
