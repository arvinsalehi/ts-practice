import React, { useState } from 'react';
import {
    Box,
    CloseButton,
    Flex,
    Text,
    useColorModeValue,
    HStack,
    Icon,
    VStack
} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import { CountdownPopup } from './countdown';
import { calculateTimeUnits } from '@/utils';
import { useSharedCountdown } from '@/context/CountdownContext';

interface BuildStatusBarProps {
    onOpenPopup?: () => void;
}

export const BuildStatusBar: React.FC<BuildStatusBarProps> = ({
    onOpenPopup,
}) => {
    const { timeRemaining, isActive, stop, totalDuration } = useSharedCountdown();
    const [showCountdownPopup, setShowCountdownPopup] = useState(false);
    const [isBarVisible, setIsBarVisible] = useState(true);

    const barBg = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');
    const fillBg = useColorModeValue('blue.500', 'blue.600');

    const handleOpenPopup = () => {
        setShowCountdownPopup(true);
        onOpenPopup?.();
    };

    const handleCloseSession = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsBarVisible(false);
    };

    const createTimeDisplay = () => {
        if (timeRemaining <= 0) {
            return "Session Complete";
        }

        const { days, hours, minutes, seconds } = calculateTimeUnits(timeRemaining);
        const parts = [];

        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);

        if (days === 0 && hours === 0 && minutes === 0) {
            parts.push(`${seconds}s`);
        }

        return `${parts.slice(0, 2).join(' ')} remaining`;
    };

    if (!isActive || !isBarVisible) {
        return null;
    }

    const progressPercent = totalDuration > 0
        ? ((totalDuration - timeRemaining) / totalDuration) * 100
        : 0;

    return (
        <>
            <Box
                position="fixed"
                top={0}
                left={0}
                right={0}
                bg={barBg}
                zIndex={1}
                boxShadow="md"
                overflow="hidden"
            >
                <Box
                    h="100%"
                    width={`${progressPercent}%`}
                    bg={fillBg}
                    position="absolute"
                    top={0}
                    left={0}
                    transition="width 0.5s ease-in-out"
                />

                <Flex
                    align="center"
                    justify="space-between"
                    position="relative"
                    zIndex={1}
                    py={3}
                    px={4}
                    color="white"
                >
                    <HStack
                        flex={1}
                        spacing={4}
                        cursor="pointer"
                        onClick={handleOpenPopup}
                        _hover={{ bg: 'blackAlpha.300', px: 2, py: 1, borderRadius: 'md' }}
                        transition="all 0.2s"
                    >
                        <Icon as={FaClock} boxSize={4} />
                        <VStack align="start" spacing={0}>
                            <Text fontSize="sm" fontWeight="bold">
                                Build #{localStorage.buildNumber} • {localStorage.loginId}
                            </Text>
                            <Text fontSize="xs" opacity={0.9}>
                                {createTimeDisplay()}
                            </Text>
                        </VStack>
                    </HStack>

                    <CloseButton
                        onClick={handleCloseSession}
                        size="sm"
                        _hover={{ bg: 'whiteAlpha.300' }}
                    />
                </Flex>
            </Box>

            <CountdownPopup
                isOpen={showCountdownPopup}
                onClose={() => setShowCountdownPopup(false)}
            />

            <Box height="60px" />
        </>
    );
};