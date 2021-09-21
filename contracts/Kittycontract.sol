// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./IERC721.sol";
import "./ownable.sol";

contract Kittycontract is IERC721, Ownable {
    string private constant _name = "CS_CK";
    string private constant _symbol = "CK";
    uint256 private constant CREATION_LIMIT_GEN0 = 10;
    uint256 private gen0Counter = 0;

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
    event Birth(
        address owner,
        uint256 kittenId,
        uint256 mumId,
        uint256 dadId,
        uint256 genes
    );

    Kitty[] private _kitties;
    mapping(uint256 => address) private _kittyIndexToOwner;
    mapping(address => uint256) private _ownershipTokenCount;

    function createKittyGen0(uint256 genes)
        external
        onlyOwner
        returns (uint256)
    {
        require(gen0Counter < CREATION_LIMIT_GEN0);
        gen0Counter++;
        return _createKitty(0, 0, 0, genes, msg.sender);
    }

    function getKitty(uint256 id)
        external
        view
        returns (
            uint256 mumId,
            uint256 dadId,
            uint256 generation,
            uint256 genes,
            uint256 birthTime
        )
    {
        require(_kitties.length > id);

        Kitty storage k = _kitties[id];

        mumId = uint256(k.mumId);
        dadId = uint256(k.dadId);
        generation = uint256(k.generation);
        birthTime = uint256(k.birthTime);
        genes = k.genes;
    }

    function _createKitty(
        uint256 mum,
        uint256 dad,
        uint256 generation,
        uint256 genes,
        address owner
    ) private returns (uint256) {
        Kitty memory kitty = Kitty(
            genes,
            uint64(block.timestamp),
            uint32(mum),
            uint32(dad),
            uint16(generation)
        );

        _kitties.push(kitty);
        uint256 id = _kitties.length - 1;
        _transfer(address(0), owner, id);

        emit Birth(owner, id, mum, dad, genes);

        return id;
    }

    function balanceOf(address owner) external view returns (uint256 balance) {
        return _ownershipTokenCount[owner];
    }

    function totalSupply() external view returns (uint256 total) {
        return _kitties.length;
    }

    function name() external view returns (string memory tokenName) {
        return _name;
    }

    function symbol() external view returns (string memory tokenSymbol) {
        return _symbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        return _kittyIndexToOwner[tokenId];
    }

    function transfer(address to, uint256 tokenId) external {
        require(to != address(0));
        require(to != address(this));
        require(_owns(msg.sender, tokenId));

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) private {
        _ownershipTokenCount[to]++;
        _kittyIndexToOwner[tokenId] = to;

        if (from != address(0)) {
            _ownershipTokenCount[from]--;
        }

        emit Transfer(from, to, tokenId);
    }

    function _owns(address claimant, uint256 tokenId)
        private
        view
        returns (bool)
    {
        return _kittyIndexToOwner[tokenId] == claimant;
    }
}
