// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';

contract BettingPool is ERC721Holder {
  using SafeERC20 for IERC20;

  event MomentPurchased(address indexed contractAddress, uint256 momentID);
  event NewUser(uint256 userID);
  event Deposit(uint256 userID, uint256 amount);
  event Withdrawal(uint256 userID, uint256 amount);
  event AccruedFeesWithdrawn(uint256 amount);
  IERC20 public flowToken;
  uint256 public accruedFees;
  address public commissionsAddress;
  uint256 public commission = 5;
  struct User {
    uint256 owedValue;
    uint256 uuid;
  }

  mapping(address => User) public users;
  mapping(address => uint) public userBalance;
  mapping(uint256 => uint256) public poolAmount;

  constructor(address _flowToken, address _commissionsAddress) {
    flowToken = IERC20(_flowToken);
    commissionsAddress = _commissionsAddress;
  }

  function createUser() external returns (uint256) {
    User storage user = users[msg.sender];
    user.owedValue = 0;
    user.uuid = uint256(
      keccak256(abi.encodePacked(msg.sender, block.timestamp))
    );
    emit NewUser(user.uuid);
    return user.uuid;
  }

  function deposit(uint256 amount, uint poolId) external {
    require(amount > 0, 'Amount must be greater than zero');

    User storage user = users[msg.sender];

    flowToken.safeTransferFrom(msg.sender, address(this), amount);
    user.owedValue += (amount * (100 - commission)) / 100;
    poolAmount[poolId] += amount;
    userBalance[msg.sender] += amount;

    emit Deposit(user.uuid, amount);
  }

  function withdraw(uint256 amount, uint256 poolId) external {
    User storage user = users[msg.sender];
    require(user.owedValue >= amount, 'Requested amount greater than owed!');
    flowToken.safeTransfer(msg.sender, amount);
    user.owedValue -= amount;
    poolAmount[poolId] -= amount;
    userBalance[msg.sender] -= amount;
    emit Withdrawal(user.uuid, amount);
  }

  function purchaseMoment(
    uint256 momentID,
    address[] calldata affectedUsers
  ) external {
    uint256 totalOwed = 0;
    for (uint256 i = 0; i < affectedUsers.length; i++) {
      User storage user = users[affectedUsers[i]];
      totalOwed += user.owedValue;
    }
    for (uint256 i = 0; i < affectedUsers.length; i++) {
      User storage user = users[affectedUsers[i]];
    }
  }

  function withdrawAccruedFees() external {
    require(accruedFees > 0, 'No fees to withdraw');

    flowToken.safeTransfer(commissionsAddress, accruedFees);
    emit AccruedFeesWithdrawn(accruedFees);
    accruedFees = 0;
  }
}
