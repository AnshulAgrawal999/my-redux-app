import React, { useState } from "react";

import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";


function RollNumGen() {
    const [startingNumber, setStartingNumber] = useState(1);
    const [count, setCount] = useState(0);
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
      for (let i = 0; i < count; i++) {
        dispatch(addRollNumber(startingNumber + i));
      }
    };
  
    const resetHandler = () => {
      setStartingNumber(1);
      setCount(0);
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
          <HStack>
            <Input
              type="number"
              placeholder="Starting Number"
              value={startingNumber}
              onChange={(e) => setStartingNumber(Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="Count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </HStack>
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

export default RollNumGen  ;




