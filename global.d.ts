import '@umijs/max/typings'

declare global {
  interface Window {
    web3?: typeof web3;
    ethereum?: Record<string, any>;
  }
}

// export {}
