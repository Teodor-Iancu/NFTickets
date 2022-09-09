pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact https://discord.com/invite/stakeborgdao
contract StakeborgNFT-Ticket is ERC721URIStorage, Ownable {
    using Roles for Roles.Role;
    Roles.Role private _eventVolunteer;


    using Counters for Counters.Counter;
    Counters.Counter private currentId;

    bool public saleIsActive = false;
    uint256 public totalTickets = 127;
    uint256 public availableTickets = 127;
    uint256 public mintPrice = 10000000000000000;

    mapping(address => uint256[]) public ticketHolderTokenIDs;
    mapping(address => bool) public checkIns;
    mapping(address => address[]) public eventVolunteers;

    constructor() ERC721("StakeBorg Talks Ticket", "SBTT") {
        currentId.increment();
        console.log(currentId.current());
    }

    function checkIn(address addr) public {
        checkIns[addr] = true;
        uint256 tokenId = ticketHolderTokenIDs[addr][0];

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{ "name": "The StakeBorg Talks Check-in #',
                        Strings.toString(tokenId),
                        '", "description": "The StakeBorg Talks NFTickets from @StakeBorg, the Blockchain Educational Hub", ',
                        //'"traits": [{ "trait_type": "Checked In", "value": "true" }, { "trait_type": "Purchased", "value": "true" }], ',
                        '"traits": [{ "trait_type": "Checked In", "value": "false" }, { "trait_type": "Diamond hands", "value": "false" }, { "trait_type": "Stacker", "value": "false" }, { "trait_type": "Holder", "value": "false" }, { "trait_type": "Doer", "value": "false" }], ',
                        '"image": "ipfs://Qmahy2EgtjdsxNfPzo75QjbpgjANRdmyApr3qY5QTLodcK" }'
                    )
                )
            )
        );

        string memory tokenURI = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        _setTokenURI(tokenId, tokenURI);
    }

    function mint() public payable {
        require(availableTickets > 0, "Not enough tickets");
        require(msg.value >= mintPrice, "Not enough ETH!");
        require(saleIsActive, "Tickets are not on sale!");

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{ "name": "The StakeBorg Talks NFT-Ticket #',
                        Strings.toString(currentId.current()),
                        '", "description": "The StakeBorg Talks NFT-Tickets from @StakeBorg, the Blockchain Educational Hub", ',
                        '"traits": [{ "trait_type": "Checked In", "value": "false" }, { "trait_type": "Purchased", "value": "true" }], ',
                        '"image": "ipfs://QmbZuUkMKyXra5U2TVqCTapS3jsTgvcxuGYLGfDF99GSuj" }'
                    )
                )
            )
        );

        string memory tokenURI = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, currentId.current());
        _setTokenURI(currentId.current(), tokenURI);

        ticketHolderTokenIDs[msg.sender].push(currentId.current());
        currentId.increment();
        availableTickets = availableTickets - 1;
    }

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return currentId.current();
    }

    function availableTicketCount() public view returns (uint256) {
        return availableTickets;
    }

    function totalTicketCount() public view returns (uint256) {
        return totalTickets;
    }

    function openSale() public onlyOwner {
        saleIsActive = true;
    }

    function closeSale() public onlyOwner {
        saleIsActive = false;
    }

    function confirmTicketOwnership(address addr) public view returns (bool) {
        return ticketHolderTokenIDs[addr].length > 0;
    }

    function addVolunteer(address addr)  public{
         eventVolunteers[].push(addr);
    }

        function removeVolunteer() {
        
    }

}
