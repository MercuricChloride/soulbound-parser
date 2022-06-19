import axios from "axios";

// @notice function to filter only the events from an ABI
// @param abi JSON-String, this is the contract abi
// @returns event parsed abi for use in the frontEnd;
export function parse(abi) {
  // returns an array of ab objects
  // each obj contains
  // {
  //   inputs: [] // array of values for the event
  //   name: // name duh
  //   type: // can probably be ignored
  // }
  if (typeof abi === "string") {
    abi = JSON.parse(abi);
  }
  return abi.filter((item) => item.type === "event");
}

export function getEtherscanLikeAPIUrl(network) {
  switch (network) {
    case 1:
      return `https://api.etherscan.io/api`;
    case 42161:
      return `https://api.arbiscan.io/api`;
    case 56:
      return `https://api.bscscan.com/api`;
    case 137:
      return `https://api.polygonscan.com/api`;
    case 80001:
      return `https://api-testnet.polygonscan.com/api`;
    case 10:
      return `https://api-optimistic.etherscan.io/api`;
    case 43114:
      return `https://api.snowtrace.io/api`;
    default:
      console.error("unsupported network");
  }
}

// @notice function to fetch the abi from etherscan
// @param address String, this is the contract address
// @returns event parsed abi for use in the frontEnd;
export async function fetchAbi(address, chainId) {
  return await axios
    .get(
      `${getEtherscanLikeAPIUrl(
        chainId
      )}?module=contract&action=getabi&address=${address}`
    )
    .then((res) => {
      return parse(res.data.result);
    });
}

// @notice function to call to handle proxies and their ABIs
// @param addr String, this is the proxy address that the user interacts with
// @returns [event parsed abi for use in the frontEnd, address of the proxy];
export async function handleContract(addr) {
  const abi = await fetchAbi(addr);
  return [abi, addr];
}

// @notice function to call to handle proxies and their ABIs
// @param addr String, this is the proxy address that the user interacts with
// @param impl String, this is the current proxy implimentation
// @returns [event parsed abi for use in the frontEnd, address of the Proxy];
export async function handleProxy(addr, impl) {
  const abi = await fetchAbi(impl);
  return [abi, addr];
}
