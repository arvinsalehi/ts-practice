import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
    Button,
    HStack,
    useColorModeValue,
    Box,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TimerUI } from './timer-ui';
import { FaPlay } from 'react-icons/fa6';
import { msToMinutes } from '@/utils';
import { useSharedCountdown } from '@/context/CountdownContext';
import { useToastHook } from '@/hooks/useToast';
import { setSessionInteraction, submitSessionData } from '@/services/session';
import type { SessionInteraction } from '@/types/session';

interface CountdownPopupProps {
    isOpen: boolean;
    onClose: () => void;
    countdownTime?: number; // in milliseconds
}

export const CountdownPopup: React.FC<CountdownPopupProps> = ({
    isOpen,
    onClose,
    countdownTime = 0,
}) => {

    // Global countdown state
    const {
        timeRemaining,
        isActive,
        isPaused,
        start,
        pause,
        resume,
        onCompleteCallback,
    } = useSharedCountdown();

    const { showToast, closeToast, scheduleNextToast } = useToastHook();

    // UI state (defects count is local to this component)
    const [defectsCount, setDefectsCount] = useState<number>(0);

    // Style
    const cardBg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');

    const handleStartTimer = () => start(countdownTime);

    const handlePauseTimer = () => {
        pause();
        const interaction: SessionInteraction = {
            type: 'pause',
            timestamp: Date.now(),
        }
        setSessionInteraction(interaction);
    } // Trigger the global pause state.

    const handleResumeTimer = () => {
        resume();
        const interaction: SessionInteraction = {
            type: 'resume',
            timestamp: Date.now(),
        }
        setSessionInteraction(interaction);
    } // Trigger the global resume state.

    const handleClose = () => {
        onClose();
    }

    const onNo = () => {
        localStorage.clear();
        scheduleNextToast(onYes, onNo, 10 * 60 * 1000);
    }

    const onYes = () => {
        scheduleNextToast(onYes, onNo, 10 * 60 * 1000);
        submitSessionData()

    }

    onCompleteCallback.current = () => showToast(onYes, onNo)


    const handleDefectsChange = (_: string, valueAsNumber: number) => {
        const value = isNaN(valueAsNumber) ? 0 : valueAsNumber;
        const safeValue = Math.max(0, value);
        localStorage.defectsCount = safeValue;
        setDefectsCount(safeValue);


        const interaction: SessionInteraction = {
            type: 'defect_update',
            timestamp: Date.now(),
        }
        setSessionInteraction(interaction);
    };

    const getStatusText = () => {
        if (!isActive) return 'Ready to Start';
        if (isPaused) return '⏸️ Paused';
        return '⏰ Running';
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent bg={cardBg} mx={4}>
                    <ModalHeader textAlign="center" color={textColor}>
                        <VStack spacing={2}>
                            <Text fontSize="xl" fontWeight="bold">
                                Production Timer | {localStorage.buildNumber}
                            </Text>
                            {/* 3. Use global state for UI feedback */}
                            <Text fontSize="sm" color="gray.500">
                                {getStatusText()}
                            </Text>
                        </VStack>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <VStack spacing={6}>
                            {/* Production Info */}
                            <Box textAlign="center" w="100%">
                                <Text fontSize="sm" color="gray.500" mb={2}>
                                    Total Production Time Required
                                </Text>
                                <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                    {msToMinutes(countdownTime)} min
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                    ({localStorage.numberOfParts} parts × {localStorage.timePerPart} min each)
                                </Text>
                                {/* 4. Show timer UI only when the countdown is active */}
                                {isActive ? (
                                    <Box mt={4}>{TimerUI(timeRemaining)}</Box>
                                ) : (
                                    <Text fontSize="xs" color="blue.500" mt={1}>
                                        Session will start when you click "Start"
                                    </Text>
                                )}
                            </Box>

                            {/* Show placeholder only when timer is not active */}
                            {!isActive && (
                                <Flex
                                    justify="center"
                                    align="center"
                                    h="120px"
                                    w="100%"
                                    borderRadius="lg"
                                    border="2px dashed"
                                    borderColor="blue.200"
                                >
                                    <Text color="blue.600" fontSize="lg" textAlign="center" fontWeight="semibold">
                                        Press Start to begin
                                    </Text>
                                </Flex>
                            )}

                            {/* Control Buttons */}
                            <HStack spacing={3} w="100%">
                                {/* 5. Conditionally render buttons based on global state */}
                                {!isActive ? (
                                    <Button
                                        colorScheme="green"
                                        size="lg"
                                        flex={1}
                                        onClick={handleStartTimer}
                                    >
                                        Start
                                    </Button>
                                ) : (
                                    <Button
                                        colorScheme="red"
                                        size="lg"
                                        flex={1}
                                        onClick={handlePauseTimer}
                                    >
                                        Pause Timer
                                    </Button>
                                )}

                                <NumberInput
                                    width="200px"
                                    min={0}
                                    value={defectsCount}
                                    isDisabled={!isActive || isPaused}
                                    onChange={handleDefectsChange}
                                >
                                    <NumberInputField placeholder='Number of defects' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Pause Overlay Modal */}
            <Modal
                // 6. Tie the overlay's visibility directly to the global `isPaused` state.
                isOpen={isPaused}
                onClose={() => { }} // Prevent closing except by resuming
                closeOnOverlayClick={false}
                closeOnEsc={false}
                isCentered
                size="lg"
            >
                <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
                <ModalContent bg="transparent" boxShadow="none">
                    <ModalBody p={0}>
                        <VStack spacing={6} textAlign="center">
                            <Box bg={cardBg} borderRadius="xl" p={8} boxShadow="2xl">
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                                        Timer Paused
                                    </Text>
                                    <Text fontSize="lg" color="orange.500" fontWeight="bold">
                                        {TimerUI(timeRemaining)}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        remaining when you resume
                                    </Text>
                                    <IconButton
                                        aria-label="Resume timer"
                                        colorScheme="green"
                                        size="lg"
                                        borderRadius="full"
                                        icon={<FaPlay />}
                                        onClick={handleResumeTimer}
                                    />
                                </VStack>
                            </Box>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};