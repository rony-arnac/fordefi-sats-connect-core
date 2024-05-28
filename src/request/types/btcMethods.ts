/**
 * Represents the types and interfaces related to BTC methods.
 */

import { z } from 'zod';
import { Address, AddressPurpose, addressSchema } from '../../addresses';
import { MethodParamsAndResult, rpcRequestMessageSchema } from '../../types';

export const getInfoMethodName = 'getInfo';
export const getInfoParamsSchema = z.undefined();
export const getInfoResultSchema = z.object({
  version: z.union([z.number(), z.string()]),
  methods: z.array(z.string()).optional(),
  supports: z.array(z.string()),
});
export const getInfoSchema = rpcRequestMessageSchema.extend({
  method: z.literal(getInfoMethodName),
  params: getInfoParamsSchema,
  id: z.string(),
});
export type GetInfo = MethodParamsAndResult<
  z.infer<typeof getInfoParamsSchema>,
  z.infer<typeof getInfoResultSchema>
>;

export const getAddressesMethodName = 'getAddresses';
export const getAddressesParamsSchema = z.object({
  /**
   * The purposes for which to generate addresses.
   * possible values are "payment", "ordinals", ...
   */
  purposes: z.array(z.nativeEnum(AddressPurpose)),
  /**
   * A message to be displayed to the user in the request prompt.
   */
  message: z.string().optional(),
});
export const getAddressesResultSchema = z.object({
  /**
   * The addresses generated for the given purposes.
   */
  addresses: z.array(addressSchema),
});
export const getAddressesRequestMessageSchema = rpcRequestMessageSchema.extend({
  method: z.literal(getAddressesMethodName),
  params: getAddressesParamsSchema,
  id: z.string(),
});
export type GetAddresses = MethodParamsAndResult<
  z.infer<typeof getAddressesParamsSchema>,
  z.infer<typeof getAddressesResultSchema>
>;

export type SignMessageParams = {
  /**
   * The address used for signing.
   **/
  address: string;
  /**
   * The message to sign.
   **/
  message: string;
};

type SignMessageResult = {
  /**
   * The signature of the message.
   */
  signature: string;
  /**
   * hash of the message.
   */
  messageHash: string;
  /**
   * The address used for signing.
   */
  address: string;
};

export type SignMessage = MethodParamsAndResult<SignMessageParams, SignMessageResult>;

type Recipient = {
  /**
   * The recipient's address.
   **/
  address: string;
  /**
   * The amount to send to the recipient in satoshis.
   */
  amount: number;
};

export type SendTransferParams = {
  /**
   * Array of recipients to send to.
   * The amount to send to each recipient is in satoshis.
   */
  recipients: Array<Recipient>;
};
type SendTransferResult = {
  /**
   * The transaction id as a hex-encoded string.
   */
  txid: string;
};

export type SendTransfer = MethodParamsAndResult<SendTransferParams, SendTransferResult>;

export type SignPsbtParams = {
  /**
   * The base64 encoded PSBT to sign.
   */
  psbt: string;
  /**
   * The inputs to sign.
   * The key is the address and the value is an array of indexes of the inputs to sign.
   */
  signInputs: Record<string, number[]>;
  /**
   * the sigHash type to use for signing.
   * will default to the sighash type of the input if not provided.
   **/
  allowedSignHash?: number;
  /**
   * Whether to broadcast the transaction after signing.
   **/
  broadcast?: boolean;
};

export type SignPsbtResult = {
  /**
   * The base64 encoded PSBT after signing.
   */
  psbt: string;
  /**
   * The transaction id as a hex-encoded string.
   * This is only returned if the transaction was broadcast.
   **/
  txid?: string;
};

export type SignPsbt = MethodParamsAndResult<SignPsbtParams, SignPsbtResult>;

export const getAccountsMethodName = 'getAccounts';
export const getAccountsParamsSchema = getAddressesParamsSchema;
export const getAccountsResultSchema = z.array(addressSchema);
export const getAccountsRequestMessageSchema = rpcRequestMessageSchema.extend({
  method: z.literal(getAccountsMethodName),
  params: getAccountsParamsSchema,
  id: z.string(),
});
export type GetAccounts = MethodParamsAndResult<
  z.infer<typeof getAccountsParamsSchema>,
  z.infer<typeof getAccountsResultSchema>
>;
