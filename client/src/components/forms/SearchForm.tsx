import {
  Button,
  Input,
  InputGroup,
  NumberInput,
  FormControl,
  FormLabel,
  VStack,
  FormErrorMessage,
  InputLeftElement,
  NumberInputField,
  Box,
  Container,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  Icon,
  Flex,
  Alert,
  AlertIcon,
  AlertDescription
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AiOutlineNumber, AiOutlineSearch } from 'react-icons/ai';
import { IoPerson } from "react-icons/io5";
import { fetchProductionData, type ProductionData } from "@/db/productionDb";
import { ProductionResults } from "@/components/ui/ProductionResults";
import { useState } from "react";
import { CountdownPopup } from "../ui/countdown";

interface IFormInput {
  user: string
  build_n: number
}

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  // States & Hooks
  const [data, setData] = useState<ProductionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCountdownPopup, setShowCountdownPopup] = useState<boolean>(false);

  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, gray.800)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const shadowColor = useColorModeValue('xl', 'dark-lg');

  // handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    try {
      const result = await fetchProductionData(data.build_n);
      if (!result) {
        setError("No data found for the provided build number.");
        setData(null);
        return;
      }
      // Store build number in localStorage
      localStorage.setItem("buildNumber", data.build_n.toString());
      localStorage.setItem("loginId", data.user);
      localStorage.setItem("numberOfParts", result.numberOfParts.toString());
      localStorage.setItem("timePerPart", result.timePerPart.toString());
      // Set Data
      setData(result);

    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data. Please try again.");
    }
  };
  const onNext = () => {
    setShowCountdownPopup(true);
  };

  // Render
  return (
    <Box minH="100vh" bg={bgGradient} py={8}>
      <Container maxW="md" centerContent>
        <Card
          w="100%"
          maxW="450px"
          bg={cardBg}
          shadow={shadowColor}
          borderRadius="xl"
          border="1px"
          borderColor={borderColor}
          overflow="hidden"
        >
          {/* Header Section */}
          <CardHeader
            bg={useColorModeValue('blue.500', 'blue.600')}
            color="white"
            textAlign="center"
            py={6}
          >
            <VStack spacing={2}>
              <Icon as={AiOutlineSearch} boxSize={8} />
              <Heading size="lg" fontWeight="bold">
                Build Search Portal
              </Heading>
              <Text fontSize="sm" opacity={0.9}>
                Enter your details to search build information
              </Text>
            </VStack>
          </CardHeader>

          <CardBody p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={6}>
                {/* User Name Field */}
                <FormControl isInvalid={!!errors.user}>
                  <FormLabel
                    htmlFor='username'
                    fontWeight="semibold"
                    color={useColorModeValue('gray.700', 'gray.200')}
                    mb={2}
                  >
                    <Flex align="center" gap={2}>
                      First name
                    </Flex>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <IoPerson />
                    </InputLeftElement>
                    <Input
                      id="username"
                      placeholder="John Doe"
                      size="lg"
                      pl={12}
                      bg={useColorModeValue('gray.50', 'gray.700')}
                      border="1px"
                      borderColor={useColorModeValue('gray.300', 'gray.600')}
                      _hover={{
                        borderColor: useColorModeValue('blue.300', 'blue.400'),
                        bg: useColorModeValue('white', 'gray.600')
                      }}
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px #3182CE',
                        bg: useColorModeValue('white', 'gray.600')
                      }}
                      _invalid={{
                        borderColor: 'red.500',
                        boxShadow: '0 0 0 1px #E53E3E'
                      }}
                      {...register('user', {
                        required: 'This is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters'
                        }
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage color="red.500" fontSize="sm">
                    {errors.user?.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Divider */}
                <Divider />

                {/* Build Number Field */}
                <FormControl isInvalid={!!errors.build_n}>
                  <FormLabel
                    htmlFor='build_number'
                    fontWeight="semibold"
                    color={useColorModeValue('gray.700', 'gray.200')}
                    mb={2}
                  >
                    <Flex align="center" gap={2}>
                      Build Number
                    </Flex>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <AiOutlineNumber color={useColorModeValue('gray.400', 'gray.500')} />
                    </InputLeftElement>
                    <NumberInput width="100%">
                      <NumberInputField
                        pl={12}
                        placeholder="e.g., 20250129001"
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        border="1px"
                        borderColor={useColorModeValue('gray.300', 'gray.600')}
                        _hover={{
                          borderColor: useColorModeValue('blue.300', 'blue.400'),
                          bg: useColorModeValue('white', 'gray.600')
                        }}
                        _focus={{
                          borderColor: 'blue.500',
                          boxShadow: '0 0 0 1px #3182CE',
                          bg: useColorModeValue('white', 'gray.600')
                        }}
                        _invalid={{
                          borderColor: 'red.500',
                          boxShadow: '0 0 0 1px #E53E3E'
                        }}
                        {...register('build_n', {
                          required: 'Build number is required',
                          valueAsNumber: true,
                          validate: value =>
                            !isNaN(value) || 'Build number must be a valid number'
                        })}
                      />
                    </NumberInput>
                  </InputGroup>
                  <FormErrorMessage color="red.500" fontSize="sm">
                    {errors.build_n?.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  w="100%"
                  size="lg"
                  colorScheme="blue"
                  bgGradient="linear(to-r, blue.500, blue.600)"
                  _hover={{
                    bgGradient: "linear(to-r, blue.600, blue.700)",
                    transform: 'translateY(-1px)',
                    boxShadow: 'lg'
                  }}
                  _active={{
                    transform: 'translateY(0)',
                    boxShadow: 'md'
                  }}
                  isLoading={isSubmitting}
                  loadingText="Searching..."
                  leftIcon={<AiOutlineSearch />}
                  transition="all 0.2s"
                  fontWeight="semibold"
                  mt={2}
                >
                  Search
                </Button>

                {/* Display Results */}
                {data && (
                  <ProductionResults
                    data={data}
                    onBack={() => { setData(null) }}
                    onNext={onNext}
                  />
                )}
                {error && (
                  <Alert status="error" mt={4} borderRadius="md">
                    <AlertIcon />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Help Text */}
                <Text
                  fontSize="xs"
                  color="gray.500"
                  textAlign="center"
                  mt={4}
                >
                  The reason that I don't like frontend is that I spent 3 hours fixing chakra lib version compatibility issues w/ different Reacts 😑
                </Text>
              </VStack>
            </form>
          </CardBody>
        </Card>
        {data && (
          <CountdownPopup
            isOpen={showCountdownPopup}
            onClose={() => setShowCountdownPopup(false)}
            countdownTime={data.numberOfParts * data.timePerPart * 60 * 1000} // in milliseconds
          />
        )}
      </Container>
    </Box>
  );
}