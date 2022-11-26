const { ethers, network } = require("hardhat")

const CHANNEL_ADDRESS = "0xe17263B99183dD0F0519F435Ec3260751452c7e3"
const CHANNEL_NAME = "First test channel"
const CHANNEL_DESCRIPTION = "Test channel to check graph functioning"

async function createChannel() {
    const notificationService = await ethers.getContract("NotificationService")
    console.log("Creating channel")
    const createTx = await notificationService.createChannel(
        CHANNEL_ADDRESS,
        CHANNEL_NAME,
        CHANNEL_DESCRIPTION
    )
    const createTxReceipt = await createTx.wait(1)
    const admin = createTxReceipt.events[0].args.admin
    console.log(`${admin} has created a new channel`)
}

createChannel()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
