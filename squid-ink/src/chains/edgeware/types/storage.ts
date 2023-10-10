import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v31 from './v31'
import * as v38 from './v38'
import * as v53 from './v53'

export class BalancesAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
     *  is ever zero, then the entry *MUST* be removed.
     */
    get isV31(): boolean {
        return this.getTypeHash() === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
     *  is ever zero, then the entry *MUST* be removed.
     */
    get asV31(): BalancesAccountStorageV31 {
        assert(this.isV31)
        return this as any
    }
}

/**
 *  The balance of an account.
 * 
 *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
 *  is ever zero, then the entry *MUST* be removed.
 */
export interface BalancesAccountStorageV31 {
    get(key: Uint8Array): Promise<v31.AccountData>
    getAll(): Promise<v31.AccountData[]>
    getMany(keys: Uint8Array[]): Promise<v31.AccountData[]>
}

export class ContractsCodeStorageStorage extends StorageBase {
    protected getPrefix() {
        return 'Contracts'
    }

    protected getName() {
        return 'CodeStorage'
    }

    /**
     *  A mapping between an original code hash and instrumented wasm code, ready for execution.
     */
    get isV38(): boolean {
        return this.getTypeHash() === '5dc755c41b6d54076cd2dd814924d60471cb6c06ff73ffc3a1e7a1562b00c121'
    }

    /**
     *  A mapping between an original code hash and instrumented wasm code, ready for execution.
     */
    get asV38(): ContractsCodeStorageStorageV38 {
        assert(this.isV38)
        return this as any
    }

    /**
     *  A mapping between an original code hash and instrumented wasm code, ready for execution.
     */
    get isV53(): boolean {
        return this.getTypeHash() === '1d41f869264eec7411828c1a845cdbad1a39455691f254f6bfead6b3102145ab'
    }

    /**
     *  A mapping between an original code hash and instrumented wasm code, ready for execution.
     */
    get asV53(): ContractsCodeStorageStorageV53 {
        assert(this.isV53)
        return this as any
    }
}

/**
 *  A mapping between an original code hash and instrumented wasm code, ready for execution.
 */
export interface ContractsCodeStorageStorageV38 {
    get(key: Uint8Array): Promise<(v38.PrefabWasmModule | undefined)>
    getAll(): Promise<v38.PrefabWasmModule[]>
    getMany(keys: Uint8Array[]): Promise<(v38.PrefabWasmModule | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v38.PrefabWasmModule][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v38.PrefabWasmModule][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v38.PrefabWasmModule][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v38.PrefabWasmModule][]>
}

/**
 *  A mapping between an original code hash and instrumented wasm code, ready for execution.
 */
export interface ContractsCodeStorageStorageV53 {
    get(key: Uint8Array): Promise<(v53.PrefabWasmModule | undefined)>
    getAll(): Promise<v53.PrefabWasmModule[]>
    getMany(keys: Uint8Array[]): Promise<(v53.PrefabWasmModule | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v53.PrefabWasmModule][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v53.PrefabWasmModule][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v53.PrefabWasmModule][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v53.PrefabWasmModule][]>
}

export class ContractsContractInfoOfStorage extends StorageBase {
    protected getPrefix() {
        return 'Contracts'
    }

    protected getName() {
        return 'ContractInfoOf'
    }

    /**
     *  The code associated with a given account.
     * 
     *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
     */
    get isV38(): boolean {
        return this.getTypeHash() === '6b0433f17edee496fd43b3c7afcbb7891c2e518f9bb14ebca03255bd363f58e3'
    }

    /**
     *  The code associated with a given account.
     * 
     *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
     */
    get asV38(): ContractsContractInfoOfStorageV38 {
        assert(this.isV38)
        return this as any
    }

    /**
     *  The code associated with a given account.
     * 
     *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
     */
    get isV53(): boolean {
        return this.getTypeHash() === 'ca1ad2ae4b550883411d45c2158af4f3e2a0bde306e44674a586527ce222bcf3'
    }

    /**
     *  The code associated with a given account.
     * 
     *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
     */
    get asV53(): ContractsContractInfoOfStorageV53 {
        assert(this.isV53)
        return this as any
    }
}

/**
 *  The code associated with a given account.
 * 
 *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
 */
export interface ContractsContractInfoOfStorageV38 {
    get(key: Uint8Array): Promise<(v38.ContractInfo | undefined)>
    getAll(): Promise<v38.ContractInfo[]>
    getMany(keys: Uint8Array[]): Promise<(v38.ContractInfo | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v38.ContractInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v38.ContractInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v38.ContractInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v38.ContractInfo][]>
}

/**
 *  The code associated with a given account.
 * 
 *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
 */
export interface ContractsContractInfoOfStorageV53 {
    get(key: Uint8Array): Promise<(v53.RawContractInfo | undefined)>
    getAll(): Promise<v53.RawContractInfo[]>
    getMany(keys: Uint8Array[]): Promise<(v53.RawContractInfo | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v53.RawContractInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v53.RawContractInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v53.RawContractInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v53.RawContractInfo][]>
}

export class ContractsOwnerInfoOfStorage extends StorageBase {
    protected getPrefix() {
        return 'Contracts'
    }

    protected getName() {
        return 'OwnerInfoOf'
    }

    /**
     *  A mapping between an original code hash and its owner information.
     */
    get isV53(): boolean {
        return this.getTypeHash() === '76689686c73821ee740f33d092a38a05de83a2833f6c8857baa886203c5bf939'
    }

    /**
     *  A mapping between an original code hash and its owner information.
     */
    get asV53(): ContractsOwnerInfoOfStorageV53 {
        assert(this.isV53)
        return this as any
    }
}

/**
 *  A mapping between an original code hash and its owner information.
 */
export interface ContractsOwnerInfoOfStorageV53 {
    get(key: Uint8Array): Promise<(v53.OwnerInfo | undefined)>
    getAll(): Promise<v53.OwnerInfo[]>
    getMany(keys: Uint8Array[]): Promise<(v53.OwnerInfo | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v53.OwnerInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v53.OwnerInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v53.OwnerInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v53.OwnerInfo][]>
}

export class SystemAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV38(): boolean {
        return this.getTypeHash() === 'eb40f1d91f26d72e29c60e034d53a72b9b529014c7e108f422d8ad5f03f0c902'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV38(): SystemAccountStorageV38 {
        assert(this.isV38)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV53(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV53(): SystemAccountStorageV53 {
        assert(this.isV53)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV38 {
    get(key: Uint8Array): Promise<v38.AccountInfo>
    getAll(): Promise<v38.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v38.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v38.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v38.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v38.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v38.AccountInfo][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV53 {
    get(key: Uint8Array): Promise<v53.AccountInfo>
    getAll(): Promise<v53.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v53.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v53.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v53.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v53.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v53.AccountInfo][]>
}
