import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addRollNumber, resetRollNumbers } from "../redux/rollNumberSlice";

function RollNumGen() {
  const [startingNumber, setStartingNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [className, setClassName] = useState(""); // For Class
  const [section, setSection] = useState(""); // For Section
  const [separator, setSeparator] = useState("-"); // Default Separator
  const rollNumbers = useSelector((state) => state.rollNumbers.rollNumbers);
  const dispatch = useDispatch();
  const toast = useToast();

  const generateRollNumbers = () => {
    if (count <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a count greater than 0.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!className || !section) {
      toast({
        title: "Missing input",
        description: "Please enter both Class and Section.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    for (let i = 0; i < count; i++) {
      const formattedRollNumber = `${className}${separator}${section}${separator}${startingNumber + i}`;
      dispatch(addRollNumber(formattedRollNumber));
    }

    toast({
      title: "Roll Numbers Generated",
      description: `${count} roll numbers have been added.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const resetHandler = () => {
    setStartingNumber(1);
    setCount(0);
    setClassName("");
    setSection("");
    setSeparator("-");
    dispatch(resetRollNumbers());
    toast({
      title: "Reset Successful",
      description: "Roll numbers have been cleared.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} maxW="600px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Auto Class Roll Number Generator
      </Text>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Class (e.g., 10)</FormLabel>
          <Input
            type="text"
            placeholder="Enter Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Section (e.g., A)</FormLabel>
          <Input
            type="text"
            placeholder="Enter Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Starting Number</FormLabel>
          <Input
            type="number"
            placeholder="Starting Number"
            value={startingNumber}
            onChange={(e) => setStartingNumber(Number(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Count</FormLabel>
          <Input
            type="number"
            placeholder="Count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Separator (e.g., -, /, _)</FormLabel>
          <Input
            type="text"
            placeholder="Enter Separator"
            value={separator}
            onChange={(e) => setSeparator(e.target.value || "-")}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={generateRollNumbers}>
          Generate Roll Numbers
        </Button>
        <Button colorScheme="red" onClick={resetHandler}>
          Reset
        </Button>
        <VStack align="stretch" spacing={2}>
          {rollNumbers.map((num, index) => (
            <Text key={index} p={2} borderWidth="1px" borderRadius="md">
              Roll Number: {num}
            </Text>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

export default RollNumGen;
