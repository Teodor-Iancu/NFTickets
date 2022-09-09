import { useEffect, useState } from "react";
import { Button, Flex, Heading, Text, useToast, Input, Stack, Textarea, Accordion, Box, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";

function Admin({ isSmartContractOwner, connectedSmartContract }) {
  const toast = useToast();
  const [openSaleTxnPending, setOpenSaleTxnPending] = useState(false);
  const [closeSaleTxnPending, setCloseSaleTxnPending] = useState(false);
  const [volunteer, setVolunteer] = useState("");
  const [revokeVolunteer, setRevokeVolunteer] = useState("");
  
  // TODO: change to const
  let [DEFAULT_ADMIN_ROLE_Count, setDEFAULT_ADMIN_ROLE_Count] = useState(1);
  let [EVENT_ADMIN_ROLE_Count, setEVENT_ADMIN_ROLE_Count] = useState(1);
  let [VOLUNTEER_ROLE_Count, setVOLUNTEER_ROLE_Count] = useState(1);

  const setVolunteerHandleChange = (e) => setVolunteer(e.target.value);
  const setRevokeVolunteerHandleChange = (e) => setRevokeVolunteer(e.target.value);

  console.log("Admin.js DEBUG_LOGG --> isSmartContractOwner: ", isSmartContractOwner);
  console.log("Admin.js DEBUG_LOGG --> volunteer: ", volunteer);
  console.log("Admin.js DEBUG_LOGG --> revokeVolunteer: ", revokeVolunteer);
  console.log("Admin.js DEBUG_LOGG --> DEFAULT_ADMIN_ROLE_Count: ", DEFAULT_ADMIN_ROLE_Count);
  console.log("Admin.js DEBUG_LOGG --> EVENT_ADMIN_ROLE_Count: ", EVENT_ADMIN_ROLE_Count);
  console.log("Admin.js DEBUG_LOGG --> VOLUNTEER_ROLE_Count: ", VOLUNTEER_ROLE_Count);

  useEffect(() => {
    // TODO: restrict access // if (!connectedSmartContract && !isSmartContractOwner) return;
    if (!connectedSmartContract) return;
    syncRoles();
  });

  const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000"; //bytes32
  const EVENT_ADMIN_ROLE = "0xb5b47644c905f9c9f971bbb9c430fe3b99fe3674e04e8312af23bbb168c5deb0";
  const VOLUNTEER_ROLE = "0x5a22d7548cd852c1b683d22507a2d14bc541da2a210a50aeb9e980957642e696";
  const members_VOLUNTEER_ROLE = [];
  const members_EVENT_ADMIN_ROLE = [];
  const members_DEFAULT_ADMIN_ROLE = [];

  const syncRoles = async () => {
    try {
      const _setDEFAULT_ADMIN_ROLE_Count = await connectedSmartContract.getRoleMemberCount(DEFAULT_ADMIN_ROLE);
      const _setEVENT_ADMIN_ROLE_Count = await connectedSmartContract.getRoleMemberCount(EVENT_ADMIN_ROLE);
      const _setVOLUNTEER_ROLE_Count = await connectedSmartContract.getRoleMemberCount(VOLUNTEER_ROLE);

      setDEFAULT_ADMIN_ROLE_Count = _setEVENT_ADMIN_ROLE_Count;
      setEVENT_ADMIN_ROLE_Count = _setEVENT_ADMIN_ROLE_Count;
      setVOLUNTEER_ROLE_Count = _setVOLUNTEER_ROLE_Count;

      for (let i = 0; i < DEFAULT_ADMIN_ROLE_Count; ++i) {
        members_DEFAULT_ADMIN_ROLE.push(await connectedSmartContract.getRoleMember(DEFAULT_ADMIN_ROLE, i));
      }

      for (let i = 0; i < EVENT_ADMIN_ROLE_Count; ++i) {
        members_EVENT_ADMIN_ROLE.push(await connectedSmartContract.getRoleMember(EVENT_ADMIN_ROLE, i));
      }

      for (let i = 0; i < VOLUNTEER_ROLE_Count; ++i) {
        members_VOLUNTEER_ROLE.push(await connectedSmartContract.getRoleMember(VOLUNTEER_ROLE, i));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addVolunteer = async () => {
    toast({
      description: "Volunteer successfully added!",
      status: "success",
      variant: "subtle",
    });
    try {
      //const addVolunteer = await connectedSmartContract.addVolunteer(volunteer);
    } catch (err) {
      console.log(err);
    }
  };

  const revokeThisVolunteer = async () => {
    toast({
      status: "success",
      description: "Volunteer successfully revoked!",
      variant: "subtle",
    });
    try {
      //const isOpen = await connectedSmartContract.revoke(revokeVolunteer);
    } catch (err) {
      console.log(err);
    }
  };

  const closeSale = async () => {
    try {
      if (!connectedSmartContract) return;

      setCloseSaleTxnPending(true);
      let closeSaleTxn = await connectedSmartContract.closeSale();

      await closeSaleTxn.wait();
      setCloseSaleTxnPending(false);

      toast({
        status: "success",
        title: "Sale is closed!",
        variant: "subtle",
        description: (
          <a href={`https://rinkeby.etherscan.io/tx/${closeSaleTxn.hash}`} target='_blank' rel='nofollow noreferrer'>
            View transaction on Etherscan block explorer
          </a>
        ),
      });
    } catch (error) {
      console.log(error);
      setCloseSaleTxnPending(true);
      toast({
        title: "Failure",
        description: error,
        status: "error",
        variant: "subtle",
      });
    }
  };

  const openSale = async () => {
    try {
      if (!connectedSmartContract) return;

      setOpenSaleTxnPending(true);
      let openSaleTxn = await connectedSmartContract.openSale();

      await openSaleTxn.wait();
      setOpenSaleTxnPending(false);

      toast({
        status: "success",
        title: "Sale is open!",
        variant: "subtle",
        description: (
          <a href={`https://rinkeby.etherscan.io/tx/${openSaleTxn.hash}`} target='_blank' rel='nofollow noreferrer'>
            View transaction on Etherscan block explorer
          </a>
        ),
      });
    } catch (error) {
      console.log(error);
      setOpenSaleTxnPending(false);
      toast({
        title: "Failure",
        description: error,
        status: "error",
        variant: "subtle",
      });
    }
  };

  const checkInput = () => {
    toast({
      title: "Failed.",
      description: "Empty data! Please check your input",
      status: "error",
      variant: "subtle",
    });
  };

  const addOrRevoke = () => {
    toast({
      title: "Failed.",
      description: "Please add OR revoke a volunteer! Both operations are not posible.",
      status: "error",
      variant: "subtle",
    });
  };

  return (
    <>
      <Heading>Admin panel</Heading>
      <Text fontSize='xs' mb={12} mt={1}>
        Restricted area. SmartContract admins only
      </Text>

      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "gray.100", color: "black" }}>
              <Box flex='1' textAlign='left' fontWeight='bold'>
                Close / Open Sale
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={2} bg='gray.100'>
            <Flex mb={6} mt={4}>
              <Button isDisabled={!isSmartContractOwner || closeSaleTxnPending} isLoading={openSaleTxnPending} size='md' colorScheme='green' onClick={openSale}>
                Open Sale
              </Button>
              <Button
                isDisabled={!isSmartContractOwner || openSaleTxnPending}
                isLoading={closeSaleTxnPending}
                size='md'
                colorScheme='red'
                variant='solid'
                marginLeft='24px'
                onClick={closeSale}
              >
                Close Sale
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "gray.100", color: "black" }}>
              <Box flex='1' textAlign='left' fontWeight='bold'>
                Create new Event
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg='gray.100'>
            <Flex mb={8} mt={1} bg='white'>
              <Stack spacing={3} m={3}>
                <Input variant='outline' placeholder='Set event Name: string' />
                <Input variant='outline' placeholder='Set Date: YYYY-MM-DD' />
                <Input variant='outline' placeholder='Set image URI:' />
                <Input variant='outline' placeholder='Set total ticketsNr' />
              </Stack>
            </Flex>
            <Flex width='100%' justifyContent='center' mt={7}>
              <Button
                isDisabled={!isSmartContractOwner || closeSaleTxnPending}
                isLoading={openSaleTxnPending}
                size='md'
                colorScheme='purple'
                mb={4}
                // onClick={setOperations}
              >
                Write on blockchain
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "gray.100", color: "black" }}>
              <Box flex='1' textAlign='left' fontWeight='bold'>
                View all Roles &nbsp; &nbsp;
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg='gray.100'>
            <Flex mb={8} mt={1} bg='white'>
              <Flex mb={6} mt={4}>
                <Stack spacing={3}>
                  <Text fontSize='sm'>Total DEFAULT_ADMIN_ROLE: {DEFAULT_ADMIN_ROLE_Count}</Text>
                  <Text fontSize='sm'>All ADMINs: {members_DEFAULT_ADMIN_ROLE}</Text>

                  <Text fontSize='sm'>Total EVENT_ADMIN_ROLE: {EVENT_ADMIN_ROLE_Count}</Text>
                  <Text fontSize='sm'>All EVENT_ADMINs: {members_EVENT_ADMIN_ROLE}</Text>

                  <Text fontSize='sm'>Total VOLUNTEER_ROLE: {VOLUNTEER_ROLE_Count}</Text>
                  <Text fontSize='sm'>All VOLUNTEERs: {members_VOLUNTEER_ROLE}</Text>
                </Stack>
              </Flex>
            </Flex>
            <Flex width='100%' justifyContent='center' mt={7}></Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "gray.100", color: "black" }}>
              <Box flex='1' textAlign='left' fontWeight='bold'>
                Add / Revoke Event-Admin &nbsp; &nbsp;
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg='gray.100'>
            <Flex mb={8} mt={1} bg='white'>
              <Stack spacing={3} m={3}>
                <Input value={volunteer} onChange={setVolunteerHandleChange} placeholder='Add volunteer address' variant='outline' />
                <Input value={revokeVolunteer} onChange={setRevokeVolunteerHandleChange} placeholder='Revoke volunteer address ' variant='outline' />
              </Stack>
            </Flex>
            <Flex width='100%' justifyContent='center' mt={7}>
              <Button
                isDisabled={!isSmartContractOwner || closeSaleTxnPending}
                isLoading={openSaleTxnPending}
                size='md'
                colorScheme='purple'
                mb={4}
                onClick={volunteer !== "" ? (revokeVolunteer === "" ? addVolunteer : addOrRevoke) : revokeVolunteer !== "" ? revokeThisVolunteer : checkInput}
                /*      condition1        ? (condition2             ? "true true"  : "true false") : (condition2           ? "false true"        : "false false"); */
              >
                Write on blockchain
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "gray.100", color: "black" }}>
              <Box flex='1' textAlign='left' fontWeight='bold'>
                Add / Revoke Volunteer &nbsp; &nbsp;
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg='gray.100'>
            <Flex mb={8} mt={1} bg='white'>
              <Stack spacing={3} m={3}>
                <Input value={volunteer} onChange={setVolunteerHandleChange} placeholder='Add volunteer address' variant='outline' />
                <Input value={revokeVolunteer} onChange={setRevokeVolunteerHandleChange} placeholder='Revoke volunteer address ' variant='outline' />
              </Stack>
            </Flex>
            <Flex width='100%' justifyContent='center' mt={7}>
              <Button
                isDisabled={!isSmartContractOwner || closeSaleTxnPending}
                isLoading={openSaleTxnPending}
                size='md'
                colorScheme='purple'
                mb={4}
                onClick={volunteer !== "" ? (revokeVolunteer === "" ? addVolunteer : addOrRevoke) : revokeVolunteer !== "" ? revokeThisVolunteer : checkInput}
                /*      condition1        ? (condition2             ? "true true"  : "true false") : (condition2           ? "false true"        : "false false"); */
              >
                Write on blockchain
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "gray.100", color: "black" }}>
              <Box flex='1' textAlign='left' fontWeight='bold'>
                Presale settings
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg='gray.100'>
            <Flex mb={8} mt={1} bg='white'>
              <Stack spacing={3} m={3}>
                <Input variant='outline' placeholder='Start at YYYY-MM-DD' />
                <Input variant='outline' placeholder='Close at YYYY-MM-DD' />
              </Stack>
            </Flex>
            <Flex width='100%' justifyContent='center' mt={7}>
              <Button
                isDisabled={!isSmartContractOwner || closeSaleTxnPending}
                isLoading={openSaleTxnPending}
                size='md'
                colorScheme='purple'
                mb={4}
                // onClick={setOperations}
              >
                Write on blockchain
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "gray.100", color: "black" }}>
              <Box flex='1' textAlign='left' fontWeight='bold'>
                Presale whitelisting
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg='gray.100'>
            <Flex mb={8} mt={1} bg='white'>
              <Stack spacing={3} m={3}>
                <Textarea placeholder='Add addresses (csv)' />
              </Stack>
            </Flex>
            <Flex width='100%' justifyContent='center' mt={7}>
              <Button
                isDisabled={!isSmartContractOwner || closeSaleTxnPending}
                isLoading={openSaleTxnPending}
                size='md'
                colorScheme='purple'
                mb={4}
                // onClick={setOperations}
              >
                Write on blockchain
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default Admin;
