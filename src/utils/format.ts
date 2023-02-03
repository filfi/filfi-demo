import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js';

// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

export function formatAddr(addr?: unknown) {
  if (typeof addr === 'string') {
    return addr.slice(0, 6) + '......' + addr.slice(-4);
  }

  return '';
}


export function formatEther(amount?: ethers.BigNumber | string | number, decimalPlaces = 4) {
  return new BigNumber(ethers.utils.formatEther(amount ?? 0)).toFormat(decimalPlaces);
}

export function toNumber(amount?: ethers.BigNumber | string | number) {
  return new BigNumber(ethers.utils.formatEther(amount ?? 0)).toNumber();
}

export function formatAmount(amount?: BigNumber.Value, decimalPlaces = 4) {
  return new BigNumber(amount ?? 0).toFormat(decimalPlaces);
}

export function formatRate(rate: number | string) {
  const v = +rate;

  if (!Number.isNaN(v)) {
    return Math.round(v * 100 * 100) / 100;
  }

  return 0;
}
