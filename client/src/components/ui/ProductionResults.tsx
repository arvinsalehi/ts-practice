// src/components/ProductionResults.tsx
import {
    Box,
    VStack,
    HStack,
    Text,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stat,
    StatLabel,
    StatNumber,
    StatGroup,
    Badge,
    Button,
    useColorModeValue,
    Divider,
    Icon,
    Flex
} from "@chakra-ui/react";
import { AiOutlineClockCircle, AiOutlineTool } from 'react-icons/ai';
import { IoArrowBack } from "react-icons/io5";
import type { ProductionData } from '@/db/productionDb';
import { FaGears } from "react-icons/fa6";

interface ProductionResultsProps {
    data: ProductionData;
    onBack: () => void;
    onNext?: () => void;
}

export const ProductionResults = ({ data, onBack, onNext }: ProductionResultsProps) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const totalTime = data.numberOfParts * data.timePerPart;
    const hoursAndMinutes = {
        hours: Math.floor(totalTime / 60),
        minutes: totalTime % 60
    };

    return (
        <Card
            w="100%"
            maxW="500px"
            bg={cardBg}
            shadow="xl"
            borderRadius="xl"
            border="1px"
            borderColor={borderColor}
        >
            <CardHeader
                bg={useColorModeValue('green.500', 'green.600')}
                color="white"
                textAlign="center"
                py={6}
            >
                <VStack spacing={2}>
                    <Icon as={AiOutlineTool} boxSize={8} />
                    <Heading size="lg" fontWeight="bold">
                        Production Data Found
                    </Heading>
                    <Text fontSize="sm" opacity={0.9}>
                        Build #{data.buildNumber}
                    </Text>
                </VStack>
            </CardHeader>

            <CardBody p={6}>
                <VStack spacing={6}>
                    <Divider />

                    {/* Production Stats */}
                    <StatGroup w="100%">
                        <Stat textAlign="center">
                            <StatLabel>
                                <Flex align="center" justify="center" gap={2}>
                                    <Icon as={AiOutlineTool} boxSize={4} />
                                    Parts Count
                                </Flex>
                            </StatLabel>
                            <StatNumber color="blue.500" fontSize="3xl">
                                {data.numberOfParts}
                            </StatNumber>
                        </Stat>

                        <Stat textAlign="center">
                            <StatLabel>
                                <Flex align="center" justify="center" gap={2}>
                                    <Icon as={AiOutlineClockCircle} boxSize={4} />
                                    Time/Part
                                </Flex>
                            </StatLabel>
                            <StatNumber color="orange.500" fontSize="3xl">
                                {data.timePerPart}
                                <Text as="span" fontSize="lg" color="gray.500" ml={1}>
                                    min
                                </Text>
                            </StatNumber>
                        </Stat>
                    </StatGroup>

                    <Divider />

                    {/* Total Time Calculation */}
                    <Box w="100%" textAlign="center">
                        <Text fontSize="sm" color="gray.500" mb={2}>Total Production Time</Text>
                        <Badge
                            colorScheme="purple"
                            fontSize="lg"
                            p={3}
                            borderRadius="lg"
                        >
                            {hoursAndMinutes.hours > 0 && `${hoursAndMinutes.hours}h `}
                            {hoursAndMinutes.minutes}min
                        </Badge>
                        <Text fontSize="xs" color="gray.500" mt={2}>
                            ({totalTime} minutes total)
                        </Text>
                    </Box>

                    <HStack w={"100%"} justify="space-between">
                        <Button
                            onClick={onBack}
                            leftIcon={<IoArrowBack />}
                            variant="outline"
                            colorScheme="blue"
                            mt={4}
                            flex={1}
                        >
                            Search Another 
                        </Button>
                        <Button
                            onClick={onNext}
                            rightIcon={<FaGears />}
                            variant="outline"
                            colorScheme="green"
                            mt={4}
                            flexShrink={1}
                        >
                            Start
                        </Button>
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
};
