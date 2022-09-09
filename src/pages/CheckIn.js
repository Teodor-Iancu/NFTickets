import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QrReader from "react-qr-scanner";

// ToDo: NotAllowedError: Permission denied by system (camera)
function CheckIn({ isSmartContractOwner, connectedSmartContract }) {
  const toast = useToast();
  const [showScanner, setShowScanner] = useState(false);
  const [scannedAddress, setScannedAddress] = useState(null);
  const [hasTicket, setHasTicket] = useState(false);
  const [checkInTxnPending, setCheckInTxnPending] = useState(false);

  const checkIn = async () => {
    try {
      if (!connectedSmartContract) return;

      setCheckInTxnPending(true);
      const checkInTxn = await connectedSmartContract.checkIn(scannedAddress);

      await checkInTxn.wait();
      setCheckInTxnPending(false);

      toast({
        title: "Success!",
        description: (
          <a href={`https://rinkeby.etherscan.io/tx/${checkInTxn.hash}`} target='_blank' rel='nofollow noreferrer'>
            View transaction on Etherscan block explorer
          </a>
        ),
        status: "success",
        variant: "subtle",
      });
    } catch (err) {
      console.log(err);
      setCheckInTxnPending(false);
      toast({
        title: "Failed.",
        description: err,
        status: "error",
        variant: "subtle",
      });
    }
  };

  useEffect(() => {
    const confirmOwnership = async () => {
      try {
        if (!connectedSmartContract) return;

        const res = await connectedSmartContract.confirmOwnership(scannedAddress);

        setHasTicket(res);

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (scannedAddress) {
      confirmOwnership();
    }
  }, [connectedSmartContract, scannedAddress]);

  return (
    <>
      <Heading>Check-In</Heading>
      <Text fontSize='xs' mb={4}>
        Restricted area. Accredited event volunteers only.
      </Text>
      {!showScanner && scannedAddress && hasTicket && (
        <>
          <Text fontSize='xl' mb={8}>
            ✅ Welcome and enjoy the show!
          </Text>
          <Flex width='100%' justifyContent='center'>
            <Button isDisabled={!isSmartContractOwner || checkInTxnPending} isLoading={checkInTxnPending} size='lg' colorScheme='blue' onClick={checkIn}>
              Check In
            </Button>
          </Flex>
        </>
      )}
      {!showScanner && (
        <>
          {!scannedAddress && (
            <Text fontSize='xl' mb={8}>
              Scan visitor QR-Address to verify ticket ownership.
            </Text>
          )}
          {scannedAddress && !hasTicket && (
            <Text fontSize='xl' mb={8}>
              ⛔ This wallet does not own a Ticket. Please try again.
            </Text>
          )}
          {!hasTicket && (
            <Flex width='100%' justifyContent='center'>
              <Button isDisabled={!isSmartContractOwner || checkInTxnPending} size='lg' colorScheme='blue' onClick={() => setShowScanner(true)}>
                Scan address QR Code
              </Button>
            </Flex>
          )}
        </>
      )}
      {showScanner && (
        <>
          <Box margin='16px auto 8px auto' padding='0 16px' width='360px'>
            <QrReader
              delay={3000}
              style={{
                maxWidth: "100%",
                margin: "0 auto",
              }}
              onError={(error) => {
                console.log(error);
                toast({
                  title: "Failure",
                  description: error,
                  status: "error",
                  variant: "subtle",
                });
                setShowScanner(false);
              }}
              onScan={(data) => {
                if (!data) return;
                console.log(data);
                const address = data.text.split("ethereum:");
                setScannedAddress(address[1]);
                setShowScanner(false);
                toast({
                  title: "Captured address!",
                  description: `${address[1].slice(0, 6)}
                    ...${address[1].slice(-4)}`,
                  status: "success",
                  variant: "subtle",
                });
              }}
            />
          </Box>
          <Flex width='100%' justifyContent='center'>
            <Button isDisabled={!isSmartContractOwner || checkInTxnPending} size='lg' colorScheme='red' onClick={() => setShowScanner(false)}>
              Cancel
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}

export default CheckIn;
