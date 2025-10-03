import { calculateTimeUnits } from "@/utils";
import { Box, Grid, VStack, Text, useColorModeValue } from "@chakra-ui/react";

export const TimerUI = (time: number) => {
    const { days, hours, minutes, seconds, isNegative } = calculateTimeUnits(time);

    const bgColor = useColorModeValue(
        isNegative ? "red.500" : "white",
        isNegative ? "red.600" : "white"
    );
    const textColor = "black";
    const labelColor = useColorModeValue(
        isNegative ? "red.100" : "blue.600",
        isNegative ? "red.200" : "blue.200"
    );

    // Helper function to format time with negative sign
    const formatTimeValue = (value: number, showNegative: boolean = false) => {
        const padded = value.toString().padStart(2, "0");
        return (showNegative && isNegative) ? `-${padded}` : padded;
    };

    const timeBoxProps = {
        bg: bgColor,
        color: textColor,
        borderRadius: "lg",
        p: 4,
        textAlign: "center" as const,
        minH: "80px",
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        border: isNegative ? "2px solid" : "none",
        borderColor: isNegative ? "red.700" : "transparent",
        boxShadow: isNegative ? "0 0 15px rgba(220, 38, 38, 0.5)" : "md"
    };

    return (
        <VStack spacing={2} w="100%">
            {/* Negative Time Warning */}
            {isNegative && (
                <Text
                    fontSize="sm"
                    color="red.500"
                    fontWeight="semibold"
                    textAlign="center"
                >
                    ⚠️ Timer Exceeded - Overtime Mode
                </Text>
            )}

            <Grid templateColumns="repeat(4, 1fr)" gap={4} w="100%">
                <VStack>
                    <Box {...timeBoxProps}>
                        <Text fontSize="2xl" fontWeight="bold">
                            {formatTimeValue(days, true)}
                        </Text>
                        <Text fontSize="xs" color={labelColor}>
                            DAYS
                        </Text>
                    </Box>
                </VStack>

                <VStack>
                    <Box {...timeBoxProps}>
                        <Text fontSize="2xl" fontWeight="bold">
                            {formatTimeValue(hours)}
                        </Text>
                        <Text fontSize="xs" color={labelColor}>
                            HOURS
                        </Text>
                    </Box>
                </VStack>

                <VStack>
                    <Box {...timeBoxProps}>
                        <Text fontSize="2xl" fontWeight="bold">
                            {formatTimeValue(minutes)}
                        </Text>
                        <Text fontSize="xs" color={labelColor}>
                            MINUTES
                        </Text>
                    </Box>
                </VStack>

                <VStack>
                    <Box {...timeBoxProps}>
                        <Text fontSize="2xl" fontWeight="bold">
                            {formatTimeValue(seconds)}
                        </Text>
                        <Text fontSize="xs" color={labelColor}>
                            SECONDS
                        </Text>
                    </Box>
                </VStack>
            </Grid>
        </VStack>
    );
};
