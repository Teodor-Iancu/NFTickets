import { useEffect, useState } from "react";
import { Button, ButtonGroup, Text, Flex, useToast, Divider, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function Mint({ connectedSmartContract }) {
  const toast = useToast();
  const [totalTicketCount, setTotalTicketCount] = useState(null);
  const [availableTicketCount, setAvailableTicketCount] = useState(null);
  const [mintTxnPending, setMintTxnPending] = useState(false);
  const [saleIsOpen, setSaleIsOpen] = useState(false);
  const notConnectedMessage = "You need to have Metamask installed and be connected to the right network to interact with this dApp";

  const toastCheckIfConnected = () => {
    if (!connectedSmartContract) {
      toast({
        title: "Failed.",
        description: notConnectedMessage,
        status: "error",
        variant: "subtle",
      });
    }
  };

  useEffect(() => {
    if (!connectedSmartContract) return;
    getAvailableTicketCount();
    getTotalTicketCount();
    getSaleIsOpen();
  });

  const mintTicket = async () => {
    toastCheckIfConnected();
    try {
      if (!connectedSmartContract) return;

      setMintTxnPending(true);
      const mintTxn = await connectedSmartContract.mint({
        value: `${0.0001 * 10 ** 18}`,
      });

      await mintTxn.wait();
      setMintTxnPending(false);
      toast({
        title: "Success!",
        description: (
          <a href={`https://rinkeby.etherscan.io/tx/${mintTxn.hash}`} target='_blank' rel='nofollow noreferrer'>
            View transaction on Etherscan block explorer
          </a>
        ),
        status: "success",
        variant: "subtle",
      });
    } catch (err) {
      console.log(err);
      setMintTxnPending(false);
      toast({
        title: "Failed.",
        description: err,
        status: "error",
        variant: "subtle",
      });
    }
  };

  const getAvailableTicketCount = async () => {
    try {
      const count = await connectedSmartContract.availableTicketCount();
      setAvailableTicketCount(count.toNumber());
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalTicketCount = async () => {
    try {
      const count = await connectedSmartContract.totalTicketCount();
      setTotalTicketCount(count.toNumber());
    } catch (err) {
      console.log(err);
    }
  };

  const getSaleIsOpen = async () => {
    try {
      const isOpen = await connectedSmartContract.ticketSaleIsActive();
      setSaleIsOpen(isOpen);
      console.log("Mint.js DEBUG_LOGG --> saleIsOpen: ", saleIsOpen);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' margin='0 auto' maxW='140px'>
        <Text fontSize='45px' fontWeight='bold' color='black'>
          The
        </Text>
        <Text fontSize='45px' fontWeight='bold' color='#1181DD'>
          Stake
        </Text>
        <Text fontSize='45px' fontWeight='bold' color='black'>
          borg
        </Text>
      </Flex>

      <Flex flexDirection='row' alignItems='center' justifyContent='center' margin='0 auto' maxW='140px'>
        <Text fontSize='24px' fontWeight='bold' color='black'>
          T A L K S
        </Text>
      </Flex>
      <Flex flexDirection='column' alignItems='center' justifyContent='center' margin='0 auto'>
        <Text fontSize='lg' mb={6} mt={10} align='center'>
          {!connectedSmartContract
            ? "Please connect your wallet to Rinkeby network"
            : connectedSmartContract && !saleIsOpen
             // ? "Minting tickets, currently not started" // TODO: add connect state to this logic
             ? "Please connect your wallet to Rinkeby network"
            : connectedSmartContract && saleIsOpen && "Minting is open"}
        </Text>
      </Flex>
      <Flex flexDirection='column' alignItems='center' justifyContent='center' margin='0 auto'>
        <ButtonGroup mb={2}>
          <Button isDisabled={!saleIsOpen} isLoading={mintTxnPending} loadingText='Pending...' size='lg' colorScheme='blue' onClick={mintTicket}>
            Mint Ticket
          </Button>
        </ButtonGroup>
        {availableTicketCount && totalTicketCount && (
          <Text mb={20} fontSize='xs'>
            Only {availableTicketCount} tickets available
          </Text>
        )}
      </Flex>
      <Divider orientation='horizontal' />
      <Flex flexDirection='row' alignItems='center' justifyContent='center' margin='0 auto'>
        <Text fontSize='11px' color='red' mt={4} align='center'>
          ⚠️ THIS DAPP IS FOR TESTING PURPOSES ONLY
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' margin='0 auto'>
        <Link href='/about'>
          <Text as='i' fontSize='xs'>
            About this dApp
          </Text>

          <ExternalLinkIcon mx='2px' />
        </Link>
      </Flex>
    </>
  );
}

export default Mint;
