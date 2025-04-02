// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CruddappIDL from '../target/idl/cruddapp.json'
import type { Cruddapp } from '../target/types/cruddapp'

// Re-export the generated IDL and type
export { Cruddapp, CruddappIDL }

// The programId is imported from the program IDL.
export const CRUDDAPP_PROGRAM_ID = new PublicKey(CruddappIDL.address)

// This is a helper function to get the Cruddapp Anchor program.
export function getCruddappProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CruddappIDL, address: address ? address.toBase58() : CruddappIDL.address } as Cruddapp, provider)
}

// This is a helper function to get the program ID for the Cruddapp program depending on the cluster.
export function getCruddappProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Cruddapp program on devnet and testnet.
      return new PublicKey('EAZyLg4iFhHxLpKL3dkqXWU3RcTEG2SnS6bJEafJkzqz')
    case 'mainnet-beta':
    default:
      return CRUDDAPP_PROGRAM_ID
  }
}
