/**
 * This utility function is responsible for shortening the address length.
 * @param {string} address Currently connected metamask wallet
 * @returns {string} Formatted metamask address.
 */
export const shortenAddress = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
