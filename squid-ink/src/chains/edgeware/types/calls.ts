import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result, Option} from './support'
import * as v31 from './v31'
import * as v45 from './v45'
import * as v53 from './v53'

export class ContractsCallCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Contracts.call')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     *  Makes a call to an account, optionally transferring some balance.
     * 
     *  * If the account is a smart-contract account, the associated code will be
     *  executed and any value will be transferred.
     *  * If the account is a regular account, any value will be transferred.
     *  * If no account exists and the call value is not less than `existential_deposit`,
     *  a regular account will be created and any value will be transferred.
     */
    get isV31(): boolean {
        return this._chain.getCallHash('Contracts.call') === 'af45f705198ff82e3e09862f6f50900a5141146883571290aa31dd62f1200860'
    }

    /**
     *  Makes a call to an account, optionally transferring some balance.
     * 
     *  * If the account is a smart-contract account, the associated code will be
     *  executed and any value will be transferred.
     *  * If the account is a regular account, any value will be transferred.
     *  * If no account exists and the call value is not less than `existential_deposit`,
     *  a regular account will be created and any value will be transferred.
     */
    get asV31(): {dest: v31.LookupSource, value: bigint, gasLimit: bigint, data: Uint8Array} {
        assert(this.isV31)
        return this._chain.decodeCall(this.call)
    }

    /**
     *  Makes a call to an account, optionally transferring some balance.
     * 
     *  * If the account is a smart-contract account, the associated code will be
     *  executed and any value will be transferred.
     *  * If the account is a regular account, any value will be transferred.
     *  * If no account exists and the call value is not less than `existential_deposit`,
     *  a regular account will be created and any value will be transferred.
     */
    get isV45(): boolean {
        return this._chain.getCallHash('Contracts.call') === '34b416e9bf55e07f9fe3c984903d31f6ca7a5d4217946970ee70a0808ef819d8'
    }

    /**
     *  Makes a call to an account, optionally transferring some balance.
     * 
     *  * If the account is a smart-contract account, the associated code will be
     *  executed and any value will be transferred.
     *  * If the account is a regular account, any value will be transferred.
     *  * If no account exists and the call value is not less than `existential_deposit`,
     *  a regular account will be created and any value will be transferred.
     */
    get asV45(): {dest: v45.LookupSource, value: bigint, gasLimit: bigint, data: Uint8Array} {
        assert(this.isV45)
        return this._chain.decodeCall(this.call)
    }

    /**
     * Makes a call to an account, optionally transferring some balance.
     * 
     * # Parameters
     * 
     * * `dest`: Address of the contract to call.
     * * `value`: The balance to transfer from the `origin` to `dest`.
     * * `gas_limit`: The gas limit enforced when executing the constructor.
     * * `storage_deposit_limit`: The maximum amount of balance that can be charged from the
     *   caller to pay for the storage consumed.
     * * `data`: The input data to pass to the contract.
     * 
     * * If the account is a smart-contract account, the associated code will be
     * executed and any value will be transferred.
     * * If the account is a regular account, any value will be transferred.
     * * If no account exists and the call value is not less than `existential_deposit`,
     * a regular account will be created and any value will be transferred.
     */
    get isV53(): boolean {
        return this._chain.getCallHash('Contracts.call') === 'b1999c3164727b906cc424a2e07d27f8143eaba50777afd24a205fad27e05ea1'
    }

    /**
     * Makes a call to an account, optionally transferring some balance.
     * 
     * # Parameters
     * 
     * * `dest`: Address of the contract to call.
     * * `value`: The balance to transfer from the `origin` to `dest`.
     * * `gas_limit`: The gas limit enforced when executing the constructor.
     * * `storage_deposit_limit`: The maximum amount of balance that can be charged from the
     *   caller to pay for the storage consumed.
     * * `data`: The input data to pass to the contract.
     * 
     * * If the account is a smart-contract account, the associated code will be
     * executed and any value will be transferred.
     * * If the account is a regular account, any value will be transferred.
     * * If no account exists and the call value is not less than `existential_deposit`,
     * a regular account will be created and any value will be transferred.
     */
    get asV53(): {dest: v53.MultiAddress, value: bigint, gasLimit: bigint, storageDepositLimit: (bigint | undefined), data: Uint8Array} {
        assert(this.isV53)
        return this._chain.decodeCall(this.call)
    }
}
