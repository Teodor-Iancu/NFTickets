import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import Page from "./layouts/Page";
import Home from "./pages/Home";
import SeatReservation from "./pages/Reservation";
import Mint from "./pages/Mint";
import CheckIn from "./pages/CheckIn";
import Tickets from "./pages/Tickets";
import Admin from "./pages/Admin";
import About from "./pages/About";
import StakeborgNFTTicket from "./contracts/StakeborgNFTTicket.json";
import Connect from "./components/Connect";
import logo from "./images/the-stakeborg-talks.jpg";
import "./pages/reservation.css";
import { Flex, Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton } from "@chakra-ui/react";

function App() {
  const navigate = useNavigate();

  const [msgSenderAddress, setMsgSenderAddress] = useState(null);
  const [connectedSmartContract, setConnectedSmartContract] = useState(null);
  const [isSmartContractOwner, setIsSmartContractOwner] = useState(false);

  console.log("App.js DEBUG_LOGG --> msgSenderAddress: ", msgSenderAddress);
  console.log("App.js DEBUG_LOGG --> connectedSmartContract: ", connectedSmartContract);
  console.log("App.js DEBUG_LOGG --> isSmartContractOwner: ", isSmartContractOwner);

  useEffect(() => {
    getConnectedSmartContract();
  }, []);
  // }); Without [], runs on every render.
  // With empty [] runs only on the first render
  // With props or state values [prop, state], runs on every render any time and any dependency value changes

  const getConnectedSmartContract = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const _connectedSmartContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ID, StakeborgNFTTicket.abi, signer);
    setConnectedSmartContract(_connectedSmartContract);
  };

  useEffect(() => {
    const checkIfIsSmartContractOwner = async () => {
      if (!msgSenderAddress || !connectedSmartContract) return;
      try {
        const _isAdmin = await connectedSmartContract.isAdmin(msgSenderAddress);
        if (_isAdmin) {
          setIsSmartContractOwner(true);
        } else {
          setIsSmartContractOwner(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkIfIsSmartContractOwner();
  }, [msgSenderAddress, connectedSmartContract]);

  return (
    <>
      {/* <> and </> is just a syntactic sugar for <React.Fragment></React.Fragment> */}
      <Connect
        msgSenderAddress={msgSenderAddress}
        onConnect={(msgSenderAddress) => {
          setMsgSenderAddress(msgSenderAddress);
        }}
      />
      <Page>
        <Menu
          left='0'
          _hover={{
            bg: "purple.500",
            fontWeight: "bold",
          }}
        >
          {({ isOpen }) => (
            <>
              <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} position='absolute' top='40px' right='16px' colorScheme='messenger'></MenuButton>

              <MenuList>
                <MenuItem onClick={() => navigate("/")}>
                  <Flex alignItems='center' flexDirection='row' width='100%' justifyContent='space-between'>
                    Home
                    <div>🏚️</div>
                  </Flex>
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  //  isDisabled={!msgSenderAddress}
                  onClick={() => navigate("/reservation")}
                >
                  <Flex alignItems='center' flexDirection='row' width='100%' justifyContent='space-between'>
                    Seat Reservation
                    <div>🪑</div>
                  </Flex>
                </MenuItem>
                <MenuDivider />

                <MenuItem
                  // isDisabled={!msgSenderAddress}
                  onClick={() => navigate("/mint")}
                >
                  <Flex alignItems='center' flexDirection='row' width='100%' justifyContent='space-between'>
                    Mint Ticket
                    <div>🎫</div>
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  //  isDisabled={!msgSenderAddress}
                  onClick={() => navigate("/tickets")}
                >
                  <Flex alignItems='center' flexDirection='row' width='100%' justifyContent='space-between'>
                    Your Tickets
                    <div>🎟️</div>
                  </Flex>
                </MenuItem>
                <MenuDivider />

                <MenuItem onClick={() => navigate("/about")}>
                  <Flex alignItems='center' flexDirection='row' width='100%' justifyContent='space-between'>
                    About
                    <div>ℹ️</div>
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuDivider />
                <MenuItem
                  // isDisabled={!isSmartContractOwner}
                  onClick={() => navigate("/check-in")}
                >
                  <Flex alignItems='center' flexDirection='row' width='100%' justifyContent='space-between'>
                    Check-In {"(restricted area)"}
                    {/* <FontAwesomeIcon
                                            icon={faCheck}
                                            size="lg"
                                        /> */}
                    <div>✔️</div>
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  //   isDisabled={!isSmartContractOwner}
                  onClick={() => navigate("/admin")}
                >
                  <Flex alignItems='center' flexDirection='row' width='100%' justifyContent='space-between'>
                    Admin {"(restricted area)"}
                    <FontAwesomeIcon icon={faTools} size='lg' />
                  </Flex>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Flex alignItems='flex-start' flex='1 1 auto' flexDirection='column' justifyContent='center' width='100%'>
          <Image src={logo} alt='Stakeborg Talks logo' margin='36px auto 12px' width='15%' />
          <Routes>
            <Route path='/' element={<Home connectedSmartContract={connectedSmartContract} />} />
            <Route path='/reservation' element={<SeatReservation connectedSmartContract={connectedSmartContract} />} />
            <Route path='/mint' element={<Mint connectedSmartContract={connectedSmartContract} />} />
            <Route path='/tickets' element={<Tickets msgSenderAddress={msgSenderAddress} />} />
            <Route path='/check-in' element={<CheckIn isSmartContractOwner={isSmartContractOwner} connectedSmartContract={connectedSmartContract} />} />
            <Route path='/admin' element={<Admin isSmartContractOwner={isSmartContractOwner} connectedSmartContract={connectedSmartContract} />} />
            <Route path='/about' element={<About isSmartContractOwner={isSmartContractOwner} connectedSmartContract={connectedSmartContract} />} />
          </Routes>
        </Flex>
      </Page>
    </>
  );
}

export default App;
