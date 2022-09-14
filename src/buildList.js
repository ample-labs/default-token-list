const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");
const ropsten = require("./tokens/ropsten.json");
const polygon = require("./tokens/polygon.json");
const mumbai = require("./tokens/mumbai.json");
const bridgeUtils = require('@uniswap/token-list-bridge-utils');

module.exports = function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "Ample Labs Default",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "https://ample.im/logo.png",
    keywords: ["ample", "default"],
    tokens: [...mainnet, ...ropsten, ...polygon, ...mumbai]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
  return bridgeUtils.chainify(l1List);
};
