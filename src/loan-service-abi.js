export const loanABI = [
  {
    constant: false,
    inputs: [{ name: "index", type: "uint256" }],
    name: "fundDeposit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "lendingPoolAddr",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "tokenAddr", type: "address" },
      { name: "aTokenAddr", type: "address" },
      { name: "beneficiary", type: "address" },
      { name: "riskTolerance", type: "uint256" },
      { name: "reward", type: "uint256" }
    ],
    name: "create",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "index", type: "uint256" }],
    name: "exit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "index", type: "uint256" }],
    name: "fundWithdrawal",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "numLoans",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "loans",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "index", type: "uint256" },
      { indexed: false, name: "addr", type: "address" }
    ],
    name: "ManagedLoanCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "index", type: "uint256" },
      { indexed: false, name: "relayer", type: "address" }
    ],
    name: "ManagedLoanDeposited",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "index", type: "uint256" },
      { indexed: false, name: "relayer", type: "address" }
    ],
    name: "ManagedLoanWithdrawn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "index", type: "uint256" }],
    name: "ManagedLoanExited",
    type: "event"
  }
];
