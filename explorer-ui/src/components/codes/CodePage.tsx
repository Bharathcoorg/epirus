import React, { useMemo } from "react"

import { useParams } from "react-router-dom"
import useSquid from "../../hooks/useSquid"
import Box, { BoxHead } from "../commons/Box"
import Segment from "../commons/Segment"
import AccountLink from "../accounts/AccountLink"
import Breadcrumbs from "../navigation/Breadcrumbs"
import Tag from "../commons/Tag"
import Tabs, { TabItem } from "../navigation/Tabs"
import { Definition, DefinitionList } from "../commons/Definitions"
import { ContractCode } from "../../types/codes"
import { useChainProperties } from "../../contexts/ChainContext"
import ContractTab, { contractByCodeHash } from "../contracts/ContractTab"
import BinaryTab from "./BinaryTab"
import Copy from "../commons/Copy"
import { CodeIcon } from "@heroicons/react/outline"
import ExtrinsicSummary from "../commons/ExtrinsicSummary"
import { AddressText, HexText } from "../commons/Text"
import { getArg } from "../commons/Args"

const QUERY = `
query($id: ID!) {
  contractCodes(where: {id_eq: $id}) {
    id
    createdAt
    createdFrom {
      blockNumber
      id
      hash
      name
      signer
      signature
      tip
      versionInfo
      args
    }
    owner {
      id,
      contract {
        id
      }
    }
    contractsDeployed {
      id
    }
    removedOn
  }
}
`

export default function CodePage () {
  const { token } = useChainProperties()
  const params = useParams()
  const [result] = useSquid({
    query: QUERY,
    variables: { id: params.id }
  })

  const { data, fetching } = result

  const tabs : TabItem[] = useMemo(() => {
    if (params.id) {
      return [
        {
          label: "Instances",
          to: "",
          element: <ContractTab
            currentId={params.id}
            where={contractByCodeHash(params.id)}
          />
        },
        {
          label: "Bytecode",
          to: "bytecode",
          element: <BinaryTab id={params.id} />
        }
      ]
    }
    return []
  }, [params.id, fetching])

  if (fetching) {
    return null
  }

  const { id, createdAt, owner, createdFrom } = data?.contractCodes[0] as ContractCode
  const depositLimit = getArg(createdFrom.args, "storageDepositLimit")
  const salt = getArg(createdFrom.args, "salt")

  return (
    <>
      <Breadcrumbs/>
      <div className="content">
        <Box className="divide-y">
          <BoxHead
            title={
              <Copy text={id}>
                <div className="flex gap-2 items-center text-sm">
                  <span className="bg-lime-200 rounded-full p-1.5">
                    <CodeIcon width={21} height={21} />
                  </span>
                  <AddressText address={id} />
                </div>
              </Copy>
            }
            tag={<Tag label="wasm" />}
          />
          <Segment>
            <DefinitionList>
              <Definition label="Time" term={
                <span>{createdAt.toString()}</span>
              }/>
              <Definition label="Owner" term={
                <AccountLink account={owner} size={21} />
              }/>
            </DefinitionList>
          </Segment>

          <ExtrinsicSummary extrinsic={createdFrom} token={token} isOpen={false} />

          <Segment title="Additional details" collapsable={true} isOpen={false}>
            <DefinitionList>
              <Definition label="Deposit Limit" term={
                <span className="font-mono">
                  {depositLimit || "unlimited"}
                </span>
              }/>
              <Definition label="Salt" term={
                <HexText>
                  {typeof salt === "string" ? salt : undefined}
                </HexText>
              }/>
            </DefinitionList>
          </Segment>
        </Box>

        <Box className="mt-2">
          <Tabs items={tabs} />
        </Box>
      </div>
    </>
  )
}
