// SPDX-License-Identifier: MIT  
pragma solidity ^0.7.4;  
  
contract Test {  
  function withdraw() public{
    msg.sender.transfer(100000000000000000);
  }
}