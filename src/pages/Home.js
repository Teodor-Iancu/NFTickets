import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Button,
    ButtonGroup,
    Text,
    Flex,
    Divider,
    Link,
    Avatar,
} from "@chakra-ui/react";

// ToDo: if not conenected: warning message on site
function Home({ connectedSmartContract }) {
    const navigate = useNavigate();
    const [totalTicketCount, setTotalTicketCount] = useState(null);
    const [availableTicketCount, setAvailableTicketCount] = useState(null);

    useEffect(() => {
        if (!connectedSmartContract) return;
        getAvailableTicketCount();
        getTotalTicketCount();
    });

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

    return (
        <>
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                margin="0 auto"
                maxW="140px"
            >
                <Text fontSize="45px" fontWeight="bold" color="black">
                    The
                </Text>
                <Text fontSize="45px" fontWeight="bold" color="#1181DD">
                    Stake
                </Text>
                <Text fontSize="45px" fontWeight="bold" color="black">
                    borg
                </Text>
            </Flex>

            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                margin="0 auto"
                maxW="140px"
                mb={1}
            >
                <Text fontSize="24px" fontWeight="bold" color="black">
                    T A L K S
                </Text>
            </Flex>
            <Divider orientation="horizontal" />
            {/*             <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                margin="0 auto"
            >
                <Text fontSize="14px" mt={5}>
                    The Four Basic Steps:
                </Text>
            </Flex> */}

            <Flex
                margin="9px auto 1px"
                flexDirection="row"
                width="290px"
                gap={4}
                mt={7}
            >
                <Avatar size="sm" bg="red.400" name="1" />
                <Link href="/reservation">
                <Text fontSize="18px" color="DarkSlateGray">
                    Seat reservation
                </Text>
                </Link>
            </Flex>
            <Flex
                margin="9px auto 1px"
                flexDirection="row"
                width="290px"
                gap={4}
                mt={4}
            >
                <Avatar size="sm" bg="yellow.400" name="2" />
                <Link href="/mint">
                <Text fontSize="18px" color="DarkSlateGray">
                    Mint your NFT-Ticket
                </Text>
                </Link>
            </Flex>
            <Flex
                margin="9px auto 1px"
                flexDirection="row"
                width="290px"
                gap={4}
                mt={4}
            >
                <Avatar size="sm" bg="blue.400" name="3" />
                <Link href="/tickets">
                    <Text fontSize="18px" color="DarkSlateGray">
                        Preview your NFT-Ticket
                    </Text>
                </Link>
            </Flex>
            <Flex
                margin="9px auto 1px"
                flexDirection="row"
                width="290px"
                gap={4}
                mt={4}
                mb={8}
            >
                <Avatar size="sm" bg="purple.400" name="4" />
                <Link href="/check-in">
                    <Text fontSize="18px" color="DarkSlateGray">
                        Check In
                    </Text>
                </Link>
                <Text fontSize="xs">*with QR-Code at entrance</Text>
            </Flex>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0 auto"
                maxW="180px"
            >
                <ButtonGroup mb={1}>
                    <Button
                        onClick={() => navigate("/reservation")}
                        loadingText="Pending..."
                        size="lg"
                        colorScheme="blue"
                    >
                        Reserve your seat
                    </Button>
                </ButtonGroup>
                {availableTicketCount && totalTicketCount && (
                    <Text mb={1} fontSize="12">
                        Only {availableTicketCount} tickets available!
                    </Text>
                )}
            </Flex>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0 auto"
                mt={8}
            >
                <Text fontSize="11px" color="red" align="center" >
                    ⚠️ THIS DAPP IS FOR TESTING PURPOSES ONLY
                </Text>

                <Link href="/about">
                    <Text as="i" fontSize="xs">
                        About this dApp
                    </Text>
                    <ExternalLinkIcon mx="2px" />
                </Link>
            </Flex>
        </>
    );
}

export default Home;
