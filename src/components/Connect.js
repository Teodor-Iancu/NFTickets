import React from "react";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";
import { Button, Box, Flex, Icon } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { RINKEBY_CHAIN_NAME, RINKEBY_CHAIN_ID, RINKEBY_CHAIN_ID_INT } from "./rpcs";

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect Wallet";
const CONNECTED_TEXT = "Connected";

function Connect({ msgSenderAddress, onConnect }) {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);

  const [accounts, setAccounts] = useState([]);
  console.log("Connect.js DEBUG_LOGG --> accounts: ", accounts);

  const [chainId, setChainId] = useState(null);
  console.log("Connect.js DEBUG_LOGG --> chainId: ", chainId);

  const [isActualNetwork, setIsActualNetwork] = useState(false);
  console.log("Connect.js DEBUG_LOGG --> isActualNetwork: ", isActualNetwork);

  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      getChainId();
      if (accounts.length > 0) {
        try {
          onConnect(accounts[0]);
        } catch (e) {
          console.log(e);
        }
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts, onConnect]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      window.ethereum.on("chainChanged", () => window.location.reload());
      //window.ethereum.on("chainChanged", handleNewAccounts);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  async function getChainId() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    setChainId(chainId);
    setIsActualNetwork(chainId === RINKEBY_CHAIN_ID_INT);
  }

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" }).then((newAccounts) => setAccounts(newAccounts));
      } catch (e) {
        console.log(e);
      }
    } else {
      onboarding.current.startOnboarding();
    }
  };

  const switchChain = () => {
    try {
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [RINKEBY_CHAIN_ID],
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Flex fontWeight='nomal' color='DarkSlateGray' position='absolute' top='8px' right='8px' zIndex='10'>
        {/* //Click here to install MetaMask! */}
        {!MetaMaskOnboarding.isMetaMaskInstalled() && (
          <div>
            <Box bg='blue.200' minW='120px' p='8px 16px' borderRadius='20px' textAlign='center'>
              <Icon as={InfoIcon} w={5} h={5} color='tomato' />
              &nbsp;&nbsp;
              <Button disabled={isDisabled} onClick={onClick} variant='link' fontSize='md' color='DarkSlateGray' fontWeight='nomal'>
                {buttonText}
              </Button>
            </Box>
          </div>
        )}
        {/* Please switch your wallet to... */}
        {msgSenderAddress && (
          <div>
            {!isActualNetwork && (
              <div>
                <Box bg='blue.200' minW='120px' p='8px 16px' borderRadius='20px' textAlign='center'>
                  <Button onClick={switchChain} variant='link' fontSize='md' color='DarkSlateGray' fontWeight='nomal'>
                    <Icon as={InfoIcon} w={5} h={5} color='tomato' />
                    &nbsp;Please switch your wallet to {RINKEBY_CHAIN_NAME}
                  </Button>
                </Box>
              </div>
            )}
          </div>
        )}
        {MetaMaskOnboarding.isMetaMaskInstalled() && !isActualNetwork && (
          <div>
            {/* Connect Wallet, !isActualNetwork*/}
            {!msgSenderAddress && (
              <Box bg='blue.200' minW='120px' p='8px 16px' borderRadius='20px' textAlign='center'>
                <Button disabled={isDisabled} onClick={onClick} variant='link' color='DarkSlateGray' size='md' fontWeight='semibold'>
                  <div>
                    <Icon as={InfoIcon} w={5} h={5} color='red.500' />
                    &nbsp;
                    {buttonText}
                  </div>
                </Button>
              </Box>
            )}
          </div>
        )}
        {/* Connect Wallet, isActualNetwork*/}
        {isActualNetwork && (
          <div>
            {!msgSenderAddress && (
              <Box bg='blue.200' minW='120px' p='8px 16px' borderRadius='20px' textAlign='center'>
                <Button disabled={isDisabled} onClick={onClick} variant='link' color='DarkSlateGray' size='md' fontWeight='semibold'>
                  <div>
                    <Icon as={InfoIcon} w={5} h={5} color='red.500' />
                    &nbsp;
                    {buttonText}
                  </div>
                </Button>
              </Box>
            )}

            {/* display chainName + address[0] */}
            {msgSenderAddress && (
              <div>
                <Box bg='gray.200' minW='120px' p='6px 12px' borderRadius='10px' textAlign='center' fontWeight={"light"} color='gray.700'>
                  ✔️ {RINKEBY_CHAIN_NAME}: &nbsp;
                  {msgSenderAddress.slice(0, 6)}...
                  {msgSenderAddress.slice(-4)}
                </Box>
              </div>
            )}
          </div>
        )}
      </Flex>
    </>
  );
}

export default Connect;
