import {
    Flex,
    Text,
    Button,
    ButtonGroup,
    FormLabel,
    FormControl,
    Switch,
} from "@chakra-ui/react";
import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import "./reservation.css";

export default class Reservation extends Component {
    state = {
        loading: false,
    };

    addSeatCallback = ({ row, number, id }, addCb) => {
        this.setState(
            {
                loading: true,
            },
            async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                console.log(
                    `You reserved Seat: ${number}, Row: ${row}, (Ticket #${id})`
                );
                const newTooltip = `You reserved Seat: ${number}, Row: ${row}, (Ticket #${id})`;
                addCb(row, number, id, newTooltip);
                this.setState({ loading: false });
            }
        );
    };

    removeSeatCallback = ({ row, number, id }, removeCb) => {
        this.setState(
            {
                loading: true,
            },
            async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                console.log(
                    `You removed Seat: ${number}, Row: ${row}, (Ticket #${id})`
                );
                // A value of null will reset the tooltip to the original while '' will hide the tooltip
                const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
                removeCb(row, number, newTooltip);
                this.setState({ loading: false });
            }
        );
    };

    render() {
        const rows = [
            //1
            [
                {
                    id: 1,
                    number: 13,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 2,
                    number: 12,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 3,
                    number: 11,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 4,
                    number: 10,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 5,
                    number: 9,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 6,
                    number: 8,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 7,
                    number: 7,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 8,
                    number: 6,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 9,
                    number: 5,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 10,
                    number: 4,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 11,
                    number: 3,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 12,
                    number: 2,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
                {
                    id: 13,
                    number: 1,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Reserved for StakeborgDAO members",
                },
            ],
            // 2
            [
                {
                    id: 14,
                    number: 12,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "VIP",
                },
                {
                    id: 15,
                    number: 11,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "VIP",
                },
                {
                    id: 16,
                    number: 10,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "kain.eth",
                },
                {
                    id: 17,
                    number: 9,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "cryptomatics.eth",
                },
                {
                    id: 18,
                    number: 8,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "NooNe0x.eth",
                },
                {
                    id: 19,
                    number: 7,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "eric.eth",
                },
                {
                    id: 20,
                    number: 6,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "vitalik.eth",
                },
                {
                    id: 21,
                    number: 5,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "endi.eth",
                },
                {
                    id: 22,
                    number: 4,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "eruiluvatar.eth",
                },
                {
                    id: 23,
                    number: 3,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: " prbrody.eth",
                },
                {
                    id: 24,
                    number: 2,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "richerd.eth",
                },
                {
                    id: 25,
                    number: 1,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "DCinvestor.eth",
                },
            ],
            // 3
            [
                {
                    id: 26,
                    number: 13,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "kasik.eth",
                },
                {
                    id: 27,
                    number: 12,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "ioand.eth",
                },
                {
                    id: 28,
                    number: 11,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "Teo-web3.eth",
                },
                {
                    id: 29,
                    number: 10,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "andreiv.eth",
                },
                {
                    id: 30,
                    number: 9,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "károly.eth",
                },
                {
                    id: 31,
                    number: 8,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "raluw.eth",
                },
                {
                    id: 32,
                    number: 7,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "bodyionita.eth",
                },
                {
                    id: 33,
                    number: 6,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "iugin.eth",
                },
                {
                    id: 34,
                    number: 5,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "iorguletz.eth",
                },
                {
                    id: 35,
                    number: 4,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "VIP",
                },
                {
                    id: 36,
                    number: 3,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "VIP",
                },
                {
                    id: 37,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "VIP",
                },
                {
                    id: 38,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "VIP",
                },
            ],
            // 4
            [
                {
                    id: 39,
                    number: 12,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "eugenptr.eth",
                },
                {
                    id: 40,
                    number: 11,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "danielcocris.eth",
                },
                {
                    id: 41,
                    number: 10,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "mcristy.eth",
                },
                {
                    id: 42,
                    number: 9,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "rrazvan.eth",
                },
                {
                    id: 43,
                    number: 8,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "1johnnyvault.eth",
                },
                {
                    id: 44,
                    number: 7,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "freefly.eth",
                },
                {
                    id: 45,
                    number: 6,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "188812.eth",
                },
                {
                    id: 46,
                    number: 5,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "voletarium.eth",
                },
                {
                    id: 47,
                    number: 4,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 48,
                    number: 3,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 49,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 50,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
            ],
            // 5
            [
                {
                    id: 51,
                    number: 13,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 52,
                    number: 12,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 53,
                    number: 11,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 54,
                    number: 10,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 55,
                    number: 9,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 56,
                    number: 8,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 57,
                    number: 7,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 58,
                    number: 6,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 59,
                    number: 5,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 60,
                    number: 4,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "mache.eth",
                },
                {
                    id: 61,
                    number: 3,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "oprisor.eth",
                },
                {
                    id: 62,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 63,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
            ],
            // 6
            [
                {
                    id: 64,
                    number: 12,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 65,
                    number: 11,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 66,
                    number: 10,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 67,
                    number: 9,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 68,
                    number: 8,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 69,
                    number: 7,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 70,
                    number: 6,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 71,
                    number: 5,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 72,
                    number: 4,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 73,
                    number: 3,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 74,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 75,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
            ],
            // 7
            [
                {
                    id: 76,
                    number: 13,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 77,
                    number: 12,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 78,
                    number: 11,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 79,
                    number: 10,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 80,
                    number: 9,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 81,
                    number: 8,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 82,
                    number: 7,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 83,
                    number: 6,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 84,
                    number: 5,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 85,
                    number: 4,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 86,
                    number: 3,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 87,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 88,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
            ],
            // 8
            [
                {
                    id: 89,
                    number: 12,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 90,
                    number: 11,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 91,
                    number: 10,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 92,
                    number: 9,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 93,
                    number: 8,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 94,
                    number: 7,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 95,
                    number: 6,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 96,
                    number: 5,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 97,
                    number: 4,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 98,
                    number: 3,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 99,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 100,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
            ],
            // 9
            [
                {
                    id: 101,
                    number: 9,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "radum.eth",
                },
                {
                    id: 102,
                    number: 8,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "ostanescu.eth",
                },
                {
                    id: 103,
                    number: 7,
                    isSelected: false,
                    isReserved: true,
                    orientation: "north",
                    tooltip: "sergiuilis.eth",
                },
                {
                    id: 104,
                    number: 6,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 105,
                    number: 5,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 106,
                    number: 4,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 107,
                    number: 3,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 108,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 109,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
            ],
            // 10
            [
                {
                    id: 110,
                    number: 9,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 111,
                    number: 8,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 112,
                    number: 7,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 113,
                    number: 6,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 114,
                    number: 5,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 115,
                    number: 4,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 116,
                    number: 3,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 117,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 118,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
            ],
            // 11
            [
                {
                    id: 119,
                    number: 9,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 120,
                    number: 8,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 121,
                    number: 7,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 122,
                    number: 6,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 123,
                    number: 5,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 124,
                    number: 4,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 125,
                    number: 3,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 126,
                    number: 2,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
                {
                    id: 127,
                    number: 1,
                    isSelected: false,
                    isReserved: false,
                    orientation: "north",
                    tooltip: "",
                },
            ],
        ];
        const { loading } = this.state;

        return (
            <>
                <div className="div-reservation">
                    <Flex width="100%" justifyContent="center" paddingLeft={2}>
                        <Text fontSize="26px" fontWeight="thin">
                            Stakeborg Talks on Stage
                        </Text>
                    </Flex>

                    <Flex width="100%" justifyContent="center" mt={1} mb={5}>
                        <Text fontSize="xs">
                            Please select your seats (max. 10 per Wallet)
                        </Text>
                    </Flex>

                    {/*<Flex width="100%" justifyContent="center" onClick={info}>*/}
                    <Flex width="100%" justifyContent="center" mt={2} mb={5}>
                        <SeatPicker
                            addSeatCallback={this.addSeatCallback}
                            removeSeatCallback={this.removeSeatCallback}
                            rows={rows}
                            maxReservableSeats={10}
                            // alpha // Enumerate rows using letters or numbers
                            visible // Shows the row numbers
                            selectedByDefault // Allow to have already selected seats (true), otherwise (false) they aren't going to be checked by their isSelected property.
                            // loading={loading}
                            tooltipProps={{ multiline: true }}
                        />
                    </Flex>
                    <Flex
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        margin="0 auto"
                        maxW="380px"
                    >
                        <Flex
                            width="100%"
                            justifyContent="center"
                            paddingLeft={2}
                        >
                            <FormControl display="flex" alignItems="center">
                                <FormLabel mb="1" mt="1" fontSize="xs">
                                    I want my wallet address to be displayed on
                                    my seat:
                                </FormLabel>
                                <Switch id="is-visible" />
                            </FormControl>
                        </Flex>

                        <ButtonGroup mt={4} mb={10}>
                            <Button
                                onClick={() => {
                                    window.location.href = "mint";
                                }}
                                loadingText="Pending..."
                                size="lg"
                                colorScheme="blue"
                            >
                                &nbsp; Next &nbsp;
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </div>
            </>
        );
    }
}
