// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

/// @title Web3 NFT Ticket system
/// @custom:experimental THIS CONTRACT IS FOR PROOF OF CONCEPT AND TESTING PURPOSES ONLY.
/// @notice You can use this contract for prototype simulation only.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";
/// @dev ToDo: Remove before fly!
import "hardhat/console.sol";

contract StakeborgNFTTicket is AccessControlEnumerable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private counter;

    bool public ticketSaleIsActive = false;
    uint256 public totalTickets = 127;
    uint256 public availableTickets = 127;
    uint256 public mintPrice = 100000000000000; // 0.0001 Ether

    struct Event {
        uint256 date; // 1665849600 --> October 15, 2022 5:00:00 PM
        string name;
        string imageURI;
        uint256 totalNrOfTickets;
        /// @dev ToDo:
        //uint256 mintPrice;
    }

    struct Ticket {
        uint256 id;
        bool isChecked;
        /// @dev ToDo:
        // uint256 row;
        // uint256 seat;
    }

    mapping(address => Ticket[]) public ticketsHolders;
    mapping(uint256 => bool) public checkIns;

    ////////////// *** Constructor *** ////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    constructor() ERC721("StakeBorg NFT Ticket", "SBNFTT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Grant the contract deployer the default admin role: it will be able to grant and revoke any roles
        _setRoleAdmin(EVENT_ADMIN_ROLE, DEFAULT_ADMIN_ROLE); // EVENT_ADMIN_ROLE can be added and removed only by DEFAULT_ADMIN_ROLE withch is added once by the dev in constuctor
        _setRoleAdmin(VOLUNTEER_ROLE, EVENT_ADMIN_ROLE); // VOLUNTEER_ROLE can be added and removed by EVENT_ADMIN_ROLE, DEFAULT_ADMIN_ROLE, root

        counter.increment();
        /// @dev ToDo: Remove before fly!
        console.log("Debug --> counter.current():", counter.current());
    }

    ////////////// *** Set AccessControl functions *** ////////////////
    ///////////////////////////////////////////////////////////////////////
    bytes32 public constant VOLUNTEER_ROLE = keccak256("VOLUNTEER");
    bytes32 public constant EVENT_ADMIN_ROLE = keccak256("EVENT_ADMIN");
    event AdminRoleSet(bytes32 roleId, bytes32 adminRoleId);

    /// @dev Restricted to members of the admin role.
    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Restricted to admins.");
        _;
    }

    /// @dev Restricted to members of the user role.
    modifier onlyEventAdmin() {
        require(isEventAdmin(msg.sender), "Restricted to eventAdmins.");
        _;
    }

    /// @dev Restricted to members of the user role.
    modifier onlyVolunteer() {
        require(isVolunteer(msg.sender), "Restricted to volunteers.");
        _;
    }

    /// @dev Return `true` if the account belongs to the admin role.
    function isAdmin(address account) public view virtual returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /// @dev Return `true` if the account belongs to the EventAdmins role.
    function isEventAdmin(address account) public view virtual returns (bool) {
        return hasRole(EVENT_ADMIN_ROLE, account);
    }

    /// @dev Return `true` if the account belongs to the Volunteers role.
    function isVolunteer(address account) public view virtual returns (bool) {
        return hasRole(VOLUNTEER_ROLE, account);
    }

    /// @dev Add an account to the admin role. Restricted to admins.
    function addAdmin(address account) public virtual onlyAdmin {
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    /// @dev Add an account to the EventAdmin role. Restricted to admins.
    function addEventAdmin(address account) public virtual onlyAdmin {
        grantRole(EVENT_ADMIN_ROLE, account);
    }

    /// @dev Add an account to the Volunteer role. Restricted to EventAdmins.
    function addVolunteer(address account) public virtual onlyEventAdmin {
        grantRole(VOLUNTEER_ROLE, account);
    }

    /// @dev Remove oneself from the admin role.
    function renounceAdmin() public virtual {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// @dev Remove an account from the EventAdmin role. Restricted to admins.
    function removeEventAdmin(address account) public virtual onlyAdmin {
        revokeRole(EVENT_ADMIN_ROLE, account);
    }

    /// @dev Remove an account from the Volunteer role. Restricted to EventAdmins.
    function removeVolunteer(address account) public virtual onlyEventAdmin {
        revokeRole(VOLUNTEER_ROLE, account);
    }

    //////////////////////// *** Override Interfaces functions *** ////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// @dev ToDo: if (( now > (event.date + 24 hours)) && ticket.isChecked === false) {burnTicket()}
    function _burn(uint256 ticketId) internal override(ERC721URIStorage) {
        super._burn(ticketId);
    }

    function tokenURI(uint256 ticketId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(ticketId);
    }

    ///@dev See {IERC721Enumerable-totalSupply}.
    function totalSupply() public view virtual returns (uint256) {
        return counter.current();
    }

    //////////////////////// *** checkIn *** ///////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    /// @dev ToDo - if the address own more than one ticket, iterate over all tickets and set isChecked to true.
    function checkIn(address _addr) public onlyVolunteer {
        Ticket storage tickets = ticketsHolders[_addr][0];
        checkIns[tickets.id] = true;
    }

    //////////////////////// *** mint *** //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    /// @dev ToDo - if the address own more than one ticket, iterate over all reserved seats and mint the tickets
    function mint() public payable {
        require(availableTickets > 0, "Sorry, we are sold out!");
        require(msg.value >= mintPrice, "Not enough ETH!");
        require(ticketSaleIsActive, "Sales tickets, currently not started!");

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{ "name": "StakeBorg Talks NFT-Ticket #',
                        Strings.toString(counter.current()),
                        '", "description": "StakeBorg Talks NFT-Ticket", ',
                        '"traits": [{ "trait_type": "Checked In", "value": "false" }, { "trait_type": "Purchased", "value": "true" }], ',
                        '"image": "ipfs://QmbZuUkMKyXra5U2TVqCTapS3jsTgvcxuGYLGfDF99GSuj" }'
                    )
                )
            )
        );
        string memory token_URI = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        _safeMint(msg.sender, counter.current());
        _setTokenURI(counter.current(), token_URI);

        ticketsHolders[msg.sender].push(Ticket(counter.current(), false));
        counter.increment();
        availableTickets = availableTickets - 1;
    }

    //////////////////////// *** Tickets stuff *** ///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
    function availableTicketCount() public view returns (uint256) {
        return availableTickets;
    }

    function totalTicketCount() public view returns (uint256) {
        return totalTickets;
    }

    function openSale() public onlyEventAdmin {
        ticketSaleIsActive = true;
    }

    function closeSale() public onlyEventAdmin {
        ticketSaleIsActive = false;
    }

    function confirmOwnership(address checkThisAddress)
        public
        view
        returns (bool)
    {
        return ticketsHolders[checkThisAddress].length > 0;
    }

    /// @dev ToDo: Remove before fly!
    function destroySmartContract(address payable _to) public onlyAdmin {
        selfdestruct(_to);
    }
}
