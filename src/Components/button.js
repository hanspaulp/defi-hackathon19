import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { loanABI } from "../loan-service-abi.js";
import { erc20ABI } from "../erc20-abi.js";

const classes = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

class MyButton extends React.Component {
  constructor(props) {
    super(props);

    this.setDeployedAddr = this.setDeployedAddr.bind(this);
  }

  setDeployedAddr = val => {
    this.props.handler(val);
  };

  buttonClick = () => {
    const Tx = require("ethereumjs-tx");
    const Web3 = require("web3");
    window.web3 = new Web3(window.web3.currentProvider);

    console.log("button click");
    const daiAddr = "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd";
    const aTokenAddr = "0x8Ac14CE57A87A07A2F13c1797EfEEE8C0F8F571A";
    const loanServiceAddr = "0x0030e0AE39ECD843e8fDea7ddE88827198A19208";
    const beneficiary = "0x6c2f337ec299B40955C6A8f90Bda30396F68487f";

    let daiContract = new window.web3.eth.Contract(erc20ABI, daiAddr);
    let loanServiceContract = new window.web3.eth.Contract(
      loanABI,
      loanServiceAddr
    );

    loanServiceContract.once("ManagedLoanCreated", {}, (error, event) => {
      console.log("ManagedLoanCreated");
      console.log(event);
      let index = event.returnValues[0];
      let deployedAddr = event.returnValues[1];
      this.setDeployedAddr(deployedAddr);
      alert(
        "ManagedLoan created at index " +
          index +
          " in the ManagedLoanRegistry!\nNow transferring DAI in..."
      );

      window.web3.eth.getTransactionCount(beneficiary, function(err, daiNonce) {
        var daiData = daiContract.methods
          .transfer(
            deployedAddr,
            window.web3.utils.toHex("100000000000000000000")
          )
          .encodeABI();

        var daiTx = new Tx({
          nonce: daiNonce,
          gasPrice: window.web3.utils.toHex(
            window.web3.utils.toWei("20", "gwei")
          ),
          gasLimit: 200000,
          to: daiAddr,
          value: 0,
          data: daiData
        });
        daiTx.sign(
          new Buffer(
            "a2077e5bf43595f9ac0e6fd3c68556c5640c8c670b567fa98cae0a869b98690e",
            "hex"
          )
        );

        var daiRaw = "0x" + daiTx.serialize().toString("hex");
        window.web3.eth
          .sendSignedTransaction(daiRaw)
          .on("receipt", function(result) {
            console.log("dai receipt");
            console.log(result);
            alert(
              "100 DAI transferred to the Loan Registry. You are now done! Profit-seeking market participants will manage your investment for you!"
            );
          });
      });
    });

    window.web3.eth.getTransactionCount(beneficiary, function(err, nonce) {
      var data = loanServiceContract.methods
        .create(
          daiAddr,
          aTokenAddr,
          beneficiary,
          window.web3.utils.toHex("10000000000000000000000000"),
          window.web3.utils.toHex("1000000000000000000")
        )
        .encodeABI();

      var tx = new Tx({
        nonce: nonce,
        gasPrice: window.web3.utils.toHex(
          window.web3.utils.toWei("20", "gwei")
        ),
        gasLimit: 2000000,
        to: loanServiceAddr,
        value: 0,
        data: data
      });
      tx.sign(
        new Buffer(
          "a2077e5bf43595f9ac0e6fd3c68556c5640c8c670b567fa98cae0a869b98690e",
          "hex"
        )
      );

      var raw = "0x" + tx.serialize().toString("hex");
      window.web3.eth
        .sendSignedTransaction(raw)
        .on("receipt", function(result) {});
    });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.buttonClick}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default MyButton;
