import { Box, CircularProgress, Flex, Image, Heading, Link, Icon, Divider, Badge } from "@chakra-ui/react";
import { ExternalLinkIcon, CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

function Tickets({ msgSenderAddress }) {
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [lastAddedTicket, setLastTicketInArray] = useState(null); // last ticket in array
  const [ticketID, setTicketID] = useState(null); // tiket ID
  const [totalTickets, setTotalTickets] = useState(null); // Total numbers of tickets in array
  const [enumerateAllTickets, setEnumerateAllTickets] = useState([]); //enumerate all tickets
  const [isChecked, setIsChecked] = useState(false);
  const [isDoer, setIsDoer] = useState(true);
  const [isDiamond_hands, setIsDiamond_hands] = useState(true);
  const [isStacker, setIsStacker] = useState(true);
  const [isHolder, setIsHolder] = useState(true);

  const ticketCard = () => {
    const ticketView = {
      _permalink: `https://testnets.opensea.io/assets/rinkeby/${process.env.REACT_APP_CONTRACT_ID}/${ticketID}/`,
      _imageUrl: "https://gateway.pinata.cloud/ipfs/Qmahy2EgtjdsxNfPzo75QjbpgjANRdmyApr3qY5QTLodcK",
      _imageAlt: `The StakeBorg Talks Season 2 NFT-Ticket #${ticketID}`,
      _name: `StakeBorg Talks NFT-Ticket #${ticketID}`,
      _description: `15 December 2022, 17:00`,

      baths: 2,
      reviewCount: 34,
      rating: 4,

      _ticketID: ticketID,
      _enumereateAllTickets: enumerateAllTickets,
      _nrOfTickets: totalTickets,

      _isDoer: isDoer,
      _isDiamond_hands: isDiamond_hands,
      _isStacker: isStacker,
      _isHolder: isHolder,
      _row: 2,
      _seat: 6,
    };

    return (
      <>
        {!loadingTicket && lastAddedTicket && (
          <Flex flexDirection='column' alignItems='center' margin='0 auto' width='99%' padding='1px'>
            <Box maxW='340px' borderWidth='1px' borderRadius='xl' overflow='hidden' padding='1px' border='1px solid gray.500'>
              <Link href={ticketView._permalink} key={ticketView._ticketID} isExternal>
                <Image src={ticketView._imageUrl} alt={ticketView._imageAlt} borderRadius='xl' padding='6px' />
              </Link>
              <Box p='5'>
                <Box display='flex' alignItems='baseline' justifyContent='center'>
                  <Badge borderRadius='full' px='2' colorScheme='gray'>
                    {isHolder && (
                      <Box color='gray.500' fontWeight='semibold' letterSpacing='' fontSize='xs' textTransform='uppercase' ml='2'>
                        {ticketView._isStacker} Holder💰
                      </Box>
                    )}
                  </Badge>
                  &nbsp;
                  <Badge borderRadius='full' px='2' colorScheme='red'>
                    {isStacker && (
                      <Box color='gray.500' fontWeight='semibold' letterSpacing='' fontSize='xs' textTransform='uppercase' ml='2'>
                        {ticketView._isStacker} Stacker🛢️
                      </Box>
                    )}
                  </Badge>
                  &nbsp;
                  <Badge borderRadius='full' px='2' colorScheme='green'>
                    {isDoer && (
                      <Box color='gray.500' fontWeight='semibold' letterSpacing='' fontSize='xs' textTransform='uppercase' ml='2'>
                        {ticketView._isStacker} Doer🚀
                      </Box>
                    )}
                  </Badge>
                  &nbsp;
                  <Badge borderRadius='full' px='2' colorScheme='purple'>
                    {isDiamond_hands && (
                      <Box color='gray.500' fontWeight='semibold' letterSpacing='' fontSize='xs' textTransform='uppercase' ml='2'>
                        {ticketView._isDiamond_hands} Diamond💎
                      </Box>
                    )}
                  </Badge>
                  
                </Box>
                <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                  <Link href={ticketView._permalink} key={ticketView._ticketID} isExternal>
                    {ticketView._name}
                  </Link>
                </Box>
                <Box as='span' color='gray.600' fontSize='sm' noOfLines={1}>
                  <Icon as={CalendarIcon} w={4} h={4} color='gray.600' />
                  &nbsp;
                  {ticketView._description}
                </Box>
                <Box as='span' color='gray.600' fontSize='sm' noOfLines={1}>
                  <Icon as={CheckIcon} w={4} h={4} color='gray.600' />
                  &nbsp; Reserved Seat {ticketView._seat}, Row {ticketView._row}
                </Box>
                <Divider orientation='horizontal' mt={3} />
                <Box paddingLeft='4px' paddingTop='6px' mt={2} mb={0}>
                  <Box fontSize='sm' fontWeight='bold'>
                    &bull; You own {ticketView._nrOfTickets} {!totalTickets > 0 ? "Ticket" : "Tickets"}
                  </Box>
                  <Box fontSize='sm' fontWeight='semibold'>
                    &bull; {!totalTickets > 0 ? `Ticket ID: ${ticketView._ticketID}` : `Your Tickets-ID's: ${ticketView._enumereateAllTickets}`}
                  </Box>
                  <Box fontSize='sm' fontWeight='semibold'>
                    &bull; Status: {!isChecked ? "Checked" : "Unchecked"}
                  </Box>
                  <Box as='i' color='blue.300' fontSize='sm' noOfLines={1} mt={2} mb={2}>
                    <Link href={ticketView._permalink} key={ticketView._ticketID} isExternal>
                      {"see more on OpenSea"} <ExternalLinkIcon mx='2px' />
                    </Link>
                  </Box>
                </Box>
                {/* <Box display='flex' mt='2' alignItems='center'>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon key={i} color={i < ticketView.rating ? "teal.500" : "gray.300"} />
                    ))}
                  <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                    {ticketView.reviewCount} reviews
                  </Box>
                </Box> */}
              </Box>
            </Box>
          </Flex>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!msgSenderAddress) return;
    axios
      .get(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${msgSenderAddress}&asset_contract_address=${process.env.REACT_APP_CONTRACT_ID}`)
      .then((axiosResponse) => {
        setLoadingTicket(true);
        console.log(axiosResponse);
        console.log("Tickets.js DEBUG_LOGG --> axiosResponse: ", axiosResponse);
        if (axiosResponse.status === 200 && axiosResponse?.data?.assets && axiosResponse?.data?.assets.length) {
          setLastTicketInArray(axiosResponse.data.assets[0]);
          setTicketID(axiosResponse.data.assets[0].token_id);
          setIsChecked(axiosResponse.data.assets[0].traits[0].value);
          setTotalTickets(axiosResponse.data.assets.length);
          setEnumerateAllTickets(
            axiosResponse.data.assets
              .map((token_id) => token_id.token_id)
              .sort(function (a, b) {
                return a - b;
              })
              .join(", ")
          );
        }
        setLoadingTicket(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingTicket(false);
      });
  }, [msgSenderAddress]);

  return (
    <>
      <Box>
        <Heading mt={10} mb={2} color='DarkSlateGray' fontWeight='hairline'>
          Your NFT-Ticket
        </Heading>
      </Box>
      <Flex flexDirection='column' alignItems='center' margin='0 auto' width='100%'>
        {loadingTicket && <CircularProgress capIsRound isIndeterminate color='green.300' size='120px' />}
        {!loadingTicket && ticketCard()}
        {!loadingTicket && !lastAddedTicket && (
          <Box fontSize='md' mt={12} mb={300} width='100%'>
            ❌ This wallet don't own any tickets
          </Box>
        )}
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' margin='0 auto' mt={12}>
        <Link href='/about'>
          <Box as='i' fontSize='xs' color='gray.500'>
            About this dApp
          </Box>
          <ExternalLinkIcon mx='2px' color='gray.300' fontSize='xs' />
        </Link>
      </Flex>
    </>
  );
}

export default Tickets;
