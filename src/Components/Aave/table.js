import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import RefreshIcon from "@material-ui/icons/Refresh";
import Input from "../input";
import MyButton from "../button";
import connect from "../connect";
import { aTokenABI } from "../../atoken-abi.js";
import { lastContract } from "../../store.js";

const classes = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daiBalance: 0,
      deployedContract: ""
    };
    this.handler = this.handler.bind(this);
    this.daiBalanceHandler = this.daiBalanceHandler.bind(this);
  }

  handler(someValue) {
    this.setState({
      deployedContract: someValue
    });
  }

  daiBalanceHandler(newDaiBalance) {
    this.setState({
      daiBalance: newDaiBalance
    });
  }

  refreshClick = () => {
    const Web3 = require("web3");
    window.web3 = new Web3(window.web3.currentProvider);

    console.log("refresh click");
    const aTokenAddr = "0x8Ac14CE57A87A07A2F13c1797EfEEE8C0F8F571A";
    const beneficiary = "0x6c2f337ec299B40955C6A8f90Bda30396F68487f";

    let aTokenContract = new window.web3.eth.Contract(aTokenABI, aTokenAddr);
    console.log(this.state.deployedContract);

    aTokenContract.methods
      .balanceOfUnderlying(this.state.deployedContract)
      .call({ from: beneficiary })
      .then(result => {
        console.log("here");
        console.log(result);
        result = result / 1000000000000000000;
        console.log(result);
        this.daiBalanceHandler(result);
      });
  };

  render() {
    return (
      <Paper className={classes.root}>
        <Fab
          onClick={this.refreshClick}
          color="primary"
          aria-label="refresh"
          className={classes.fab}
        >
          <RefreshIcon />
        </Fab>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="center">Your deposit balance</TableCell>
              <TableCell align="center">APR</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">StopLending&nbsp;(APR)</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {"DAI"}
              </TableCell>
              <TableCell align="center" value={this.state.daiBalance}>
                {this.state.daiBalance}
              </TableCell>
              <TableCell align="center">6.1</TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell>
                <MyButton handler={this.handler} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                {"ETH"}
              </TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">9.4</TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell>
                <MyButton handler={this.handler} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                {"XRP"}
              </TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">0.76</TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell>
                <MyButton handler={this.handler} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                {"EOS"}
              </TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">3.7</TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell>
                <MyButton handler={this.handler} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                {"TST"}
              </TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">1.2</TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell align="center">
                <Input align="center" />
              </TableCell>
              <TableCell>
                <MyButton handler={this.handler} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default MyTable;
