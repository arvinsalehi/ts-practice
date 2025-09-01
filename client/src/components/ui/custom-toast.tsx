import { useState, useEffect, useCallback, useRef } from 'react';

import { formatTime } from "@/utils";
import {
    Alert,
    AlertIcon,
    Badge,
    Box,
    Button,
    HStack,
    Icon,
    Text,
    VStack,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import { FaCheck, FaClock, FaTimes } from "react-icons/fa";

interface CustomToastProps {
    onClose: () => void;
    onYes: () => void;
    onNo: () => void;
    onAutoSubmit: () => void;
}

const TIMER_DURATION = 600; // 10 minutes in seconds


export const CustomToast: React.FC<CustomToastProps> = ({
    onClose,
    onYes,
    onNo,
    onAutoSubmit
}) => {
    const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes = 600 seconds

    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "white");

    useEffect(() => {
        if (secondsLeft <= 0) {
            onAutoSubmit();
            onClose(); // Auto-close when timer reaches 0
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, TIMER_DURATION);

        return () => clearInterval(interval);
    }, [secondsLeft, onClose, onAutoSubmit]);

    const handleYes = () => {
        onYes();
        onClose();
    };

    const handleNo = () => {
        onNo();
        onClose();
    };

    return (
        <Box
            bg={bgColor}
            p={4}
            borderRadius="lg"
            boxShadow="lg"
            border="1px"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            minW="350px"
        >
            <VStack spacing={4}>
                {/* Header */}
                <Alert status="success" borderRadius="md">
                    <AlertIcon />
                    <Text fontWeight="semibold">Production Time Complete!</Text>
                </Alert>

                {/* Countdown Display */}
                <VStack spacing={2}>
                    <HStack align="center">
                        <Icon as={FaClock} color="blue.500" />
                        <Text fontSize="sm" color="gray.500">
                            Time remaining to respond:
                        </Text>
                    </HStack>
                    <Badge
                        colorScheme={secondsLeft <= 60 ? "red" : "blue"}
                        fontSize="xl"
                        p={3}
                        borderRadius="lg"
                    >
                        {formatTime(secondsLeft)}
                    </Badge>
                </VStack>

                {/* Question */}
                <Text textAlign="center" fontWeight="medium" color={textColor}>
                    Do you want to start another production cycle?
                </Text>

                {/* Action Buttons */}
                <HStack spacing={4} w="100%">
                    <Button
                        leftIcon={<FaCheck />}
                        colorScheme="green"
                        size="lg"
                        flex={1}
                        onClick={handleYes}
                    >
                        Yes
                    </Button>
                    <Button
                        leftIcon={<FaTimes />}
                        colorScheme="red"
                        variant="outline"
                        size="lg"
                        flex={1}
                        onClick={handleNo}
                    >
                        No
                    </Button>
                </HStack>

                {/* Auto-close warning */}
                <Text fontSize="xs" color="gray.500" textAlign="center">
                    This dialog will auto-close when timer reaches 00:00
                </Text>
            </VStack>
        </Box>
    );
};

