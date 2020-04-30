const ContractKit = require('@celo/contractkit')
const contractKit = ContractKit.newKit('https://alfajores-forno.celo-testnet.org')
const recipient = '0xB9727f7f1e1f4a5229a49E260fBBBD410d10f2Ff'
const transferAmount = '0.10' // in cUSD
const weiTransferAmount = contractKit.web3.utils.toWei(transferAmount, 'ether')
const bankPrivateKey = '0x51788d6e1eae7c73e1663d63404f8633ceffb3543005e6ab3509129caeb483d7'
const bankAddress = '0xFAfD7d820bf9294d344393A43cDB0F693e91Cfab'
// If you want to create a new account: const account = kit.web3.eth.accounts.create();
// You can faucet your new account here: https://celo.org/build/faucet
contractKit.addAccount(bankPrivateKey)
async function transferStableToken() {
  const stableToken = await contractKit.contracts.getStableToken();
  const balance = await stableToken.balanceOf(bankAddress);
  console.log(`Stable Token balance of ${bankAddress}: ${balance}`)
  const tx = await stableToken.transfer(recipient, weiTransferAmount).send({
    from: bankAddress,
  })
  const hash = await tx.getHash()
  console.log(`Transaction hash`,hash)
  const receipt = await tx.waitReceipt()
  console.log(`Tranaction receipt`, receipt)
  const newBalance = await stableToken.balanceOf(bankAddress);
  console.log(`Stable Token balance of ${bankAddress}: ${newBalance}`)
}
transferStableToken()