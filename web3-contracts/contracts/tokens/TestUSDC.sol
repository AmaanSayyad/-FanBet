// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.16;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract TestUSDC is ERC20, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
  address owner = 0x8bffbd0C80b289aC038B8dF9280b16D7Bae08a29;

  constructor() ERC20('FanBet-Token', 'FBT') {
    _mint(msg.sender, 10000000000 * (10 ** uint256(decimals())));
    _grantRole(DEFAULT_ADMIN_ROLE, owner);
    _grantRole(MINTER_ROLE, owner);
  }

  function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
    _mint(to, amount);
  }
}
