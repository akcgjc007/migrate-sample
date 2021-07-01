const {
  LCDClient,
  MsgStoreCode,
  MnemonicKey,
  isTxError,
  StdFee,
  MsgInstantiateContract,
  MsgExecuteContract,
  MsgMigrateContract,
} = require("@terra-money/terra.js");
const fs = require("fs");
require("dotenv").config();

async function test() {
  // test1 key from localterra accounts
  const mk = new MnemonicKey({
    mnemonic: process.env.SEEDPHRASE,
  });

  // connect to localterra
  const terra = new LCDClient({
    URL: process.env.URL,
    chainID: process.env.CHAINID,
  });

  const wallet = terra.wallet(mk);

  // // Storing code
  // const storeCode = new MsgStoreCode(
  //   wallet.key.accAddress,
  //   fs.readFileSync("./artifacts/migrate_sample.wasm").toString("base64")
  // );
  // const storeCodeTx = await wallet.createAndSignTx({
  //   msgs: [storeCode],
  //   gasPrices: "0.15uusd",
  //   fee: new StdFee(2500000, { uusd: "2500000" }),
  // });
  // const storeCodeTxResult = await terra.tx.broadcast(storeCodeTx);
  // if (isTxError(storeCodeTxResult)) {
  //   throw new Error(
  //     `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
  //   );
  // }

  // const {
  //   store_code: { code_id },
  // } = storeCodeTxResult.logs[0].eventsByType;

  // console.log(storeCodeTxResult);
  // console.log("code_id: ", code_id[0]);

  // // Instantiation
  // const instantiate = new MsgInstantiateContract(
  //   wallet.key.accAddress,
  //   // wallet.key.accAddress,
  //   Number(code_id[0]), // code ID
  //   {
  //     count: 12,
  //   }, // InitMsg
  //   { uusd: 1 }, // init coins
  //   true
  // );

  // const instantiateTx = await wallet.createAndSignTx({
  //   msgs: [instantiate],
  //   gasPrices: "0.15uusd",
  //   fee: new StdFee(150000, { uusd: "150000" }),
  // });
  // const instantiateTxResult = await terra.tx.broadcast(instantiateTx);
  // console.log(instantiateTxResult);

  // if (isTxError(instantiateTxResult)) {
  //   throw new Error(
  //     `instantiate failed. code: ${instantiateTxResult.code}, codespace: ${instantiateTxResult.codespace}, raw_log: ${instantiateTxResult.raw_log}`
  //   );
  // }

  // const {
  //   transfer: { recipient },
  // } = instantiateTxResult.logs[0].eventsByType;

  // let terraroll_address = recipient[0];
  // console.log("Contract address:", terraroll_address);


  let terraroll_address = "terra1uh7uun5cm2hs7kktuw008k9y7zpdcvqur5h0rp";


  // const execute = new MsgExecuteContract(
  //   wallet.key.accAddress, // sender
  //   terraroll_address, // contract account address
  //   { roll: { roll_under: "50" } }, // handle msg
  //   { uusd: 1000000 } // coins
  // );

  // const executeTx = await wallet.createAndSignTx({
  //   msgs: [execute],
  //   gasPrices: "0.15uusd",
  //   fee: new StdFee(200000, { uusd: "200000" }),
  // });

  // const executeTxResult = await terra.tx.broadcast(executeTx);

  // console.log(executeTxResult);

  // Trying to migrate
  const migrate = new MsgMigrateContract(
    wallet.key.accAddress, // sender
    terraroll_address, // contract account address
    5573,
    {}
  );

  const executeTx = await wallet.createAndSignTx({
    msgs: [migrate],
    gasPrices: "0.15uusd",
    fee: new StdFee(2000000, { uusd: "2000000" }),
  });

  const executeTxResult = await terra.tx.broadcast(executeTx);
  console.log(executeTxResult);

  // // Trying to change the config
  // const contract_address = "terra14y9aaflde8gmxvx6ys9rdy7ek9ht9ykk0w3mph";
  // const execute = new MsgExecuteContract(
  //   wallet.key.accAddress, // sender
  //   contract_address, // contract account address
  //   {
  //     set_config: {
  //       config: {
  //         admin: "some_new_admin",
  //         denom: "uluna",
  //         min_sent_amount: "1000005",
  //         max_sent_amount: "100000005",
  //       },
  //     },
  //   }, // handle msg
  //   { uusd: 1000000 } // coins
  // );

  // const executeTx = await wallet.createAndSignTx({
  //   msgs: [execute],
  //   gasPrices: "0.15uusd",
  //   fee: new StdFee(500000, { uusd: "500000" }),
  // });

  // const executeTxResult = await terra.tx.broadcast(executeTx);

  // console.log(executeTxResult);
}

test();
