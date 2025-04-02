import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Cruddapp } from '../target/types/cruddapp'

describe('cruddapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Cruddapp as Program<Cruddapp>

  const cruddappKeypair = Keypair.generate()

  it('Initialize Cruddapp', async () => {
    await program.methods
      .initialize()
      .accounts({
        cruddapp: cruddappKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([cruddappKeypair])
      .rpc()

    const currentCount = await program.account.cruddapp.fetch(cruddappKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Cruddapp', async () => {
    await program.methods.increment().accounts({ cruddapp: cruddappKeypair.publicKey }).rpc()

    const currentCount = await program.account.cruddapp.fetch(cruddappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Cruddapp Again', async () => {
    await program.methods.increment().accounts({ cruddapp: cruddappKeypair.publicKey }).rpc()

    const currentCount = await program.account.cruddapp.fetch(cruddappKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Cruddapp', async () => {
    await program.methods.decrement().accounts({ cruddapp: cruddappKeypair.publicKey }).rpc()

    const currentCount = await program.account.cruddapp.fetch(cruddappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set cruddapp value', async () => {
    await program.methods.set(42).accounts({ cruddapp: cruddappKeypair.publicKey }).rpc()

    const currentCount = await program.account.cruddapp.fetch(cruddappKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the cruddapp account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        cruddapp: cruddappKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.cruddapp.fetchNullable(cruddappKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
