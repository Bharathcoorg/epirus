import type {Result, Option} from './support'

export interface PrefabWasmModule {
    scheduleVersion: number
    initial: number
    maximum: number
    refcount: bigint
    reserved: boolean
    code: Uint8Array
    originalCodeLen: number
}

export type ContractInfo = ContractInfo_Alive | ContractInfo_Tombstone

export interface ContractInfo_Alive {
    __kind: 'Alive'
    value: AliveContractInfo
}

export interface ContractInfo_Tombstone {
    __kind: 'Tombstone'
    value: Uint8Array
}

export interface AccountInfo {
    nonce: number
    refcount: number
    data: AccountData
}

export interface AliveContractInfo {
    trieId: Uint8Array
    storageSize: number
    pairCount: number
    codeHash: Uint8Array
    rentAllowance: bigint
    rentPaid: bigint
    deductBlock: number
    lastWrite: (number | undefined)
    reserved: boolean
}

export interface AccountData {
    free: bigint
    reserved: bigint
    miscFrozen: bigint
    feeFrozen: bigint
}
