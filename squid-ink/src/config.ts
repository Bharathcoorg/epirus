const fromBlock = parseInt(process.env.FROM_BLOCK || "0", 10);
const toBlock = parseInt(process.env.TO_BLOCK || "", 10);
const config = {
  blockRange: {
    from: Number.isInteger(fromBlock) ? fromBlock : 0,
    to: Number.isInteger(toBlock) ? toBlock : undefined,
  },
  batchSize: parseInt(process.env.BATCH_SIZE || "500", 10),
  dataSource: {
    chain: process.env.WS_ENDPOINT || "wss://edgeware.jelliedowl.net",
    // Lookup archive by the network name in the Subsquid registry
    // archive: lookupArchive("shibuya", { release: "FireSquid" }),
    archive: process.env.ARCHIVE_ENDPOINT || "http://38.242.128.236:8002/graphql",
  },
  sourceCodeEnabled: (process.env.SOURCE_CODE_ENABLED || "false") === "true",
  verifierEndpoint: process.env.VERIFIER_ENDPOINT || "http://127.0.0.1:3001",
};

export { config };
