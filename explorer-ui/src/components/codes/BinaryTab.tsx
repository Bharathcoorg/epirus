import React from "react"
import useSquid from "../../hooks/useSquid"
import { ContractCode } from "../../types/codes"
import { hexToBytes } from "../../utils/hex"
import { PageLoading } from "../loading/Loading"
import { HexView } from "./HexView"

const QUERY = `
query($id: String!) {
  contractCodes(where: {id_eq: $id}) {
    code
  }
}
`

export default function BinaryTab ({ id }:{id: string}) {
  const [result] = useSquid({
    query: QUERY,
    variables: { id }
  })

  const { data, fetching } = result

  if (fetching) return <PageLoading loading={fetching} />

  if (data?.contractCodes[0] === undefined) {
    return <span>Contract code not found</span>
  }

  const codeHash = data?.contractCodes[0] as ContractCode

  return (
    <div className="mx-4 my-5">
      <HexView bytes={hexToBytes(codeHash.code.slice(2))}/>
    </div>
  )
}
