import { Text, Flex, Heading, Link, Divider } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function About() {
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
            >
                <Text fontSize="24px" fontWeight="bold" color="black">
                    T A L K S
                </Text>
            </Flex>

            <Flex flexDirection="row" mt={8}>
                <Heading as="h5" size="sm">
                    About StakeBorg NFT-Tickets:
                </Heading>
            </Flex>
            <Flex flexDirection="row">
                <Text mt={3}>
                    At the moment this dApp is just a fictitious Web3
                    application that aims for Proof of Concept
                    purposes only.
                </Text>
            </Flex>

            <Flex flexDirection="row" mt={6}>
                <Heading as="h5" size="sm">
                    ⚠️ Disclaimer:
                </Heading>
            </Flex>
            <Flex flexDirection="row">
                <Text mt={3} mb={6}>
                    This experimental Web3 dApp is created by a Stakeborg DAO
                    community developer and have nothing in common with
                    STAKEBORG SRL.
                </Text>
            </Flex>
            <Flex flexDirection="row">
                <Heading as="h5" size="sm">
                💬 Contact:
                </Heading>
            </Flex>
            <Flex flexDirection="row">
                <Text mt={3} mb={3}>
                    <Link
                        href="https://discord.com/invite/stakeborgdao"
                        isExternal
                    >
                        To find more about our community, please enjoy us on
                        Discord <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
            </Flex>
            <Divider orientation="horizontal" />
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                margin="0 auto"
            >
                <Text fontSize="11px" color="red" mt={4} align="center">
                    ⚠️ THIS DAPP IS FOR TESTING PURPOSES ONLY
                </Text>
            </Flex>
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                margin="0 auto"
            >
                <Text fontSize="xs" mt={4} align="center">
                    <Link
                        href={`https://rinkeby.etherscan.io/address/${process.env.REACT_APP_CONTRACT_ID}`}
                        isExternal
                    >
                        SmartContract Address:{" "}
                        {process.env.REACT_APP_CONTRACT_ID}
                    </Link>
                </Text>
            </Flex>
        </>
    );
}

export default About;
