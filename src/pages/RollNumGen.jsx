import React , { useState } from 'react';
import { 
  Box, 
  Button, 
  Input, 
  Text, 
  VStack, 
  FormControl, 
  FormLabel, 
  Radio, 
  RadioGroup, 
  Select, 
  IconButton, 
  Tooltip, 
  useToast, 
  Heading, 
  HStack, 
  Grid,
  Button as ChakraButton,
} from "@chakra-ui/react";

import { 
  AddIcon, 
  CopyIcon, 
} from "@chakra-ui/icons";

import ClassSelecterModal from "components/ClassSelecterModal";

import { useDispatch, useSelector } from "react-redux";

import { genAction } from "redux/actions";

import { EVENTS } from "common/Constants";

import intersectionWith from 'lodash/intersectionWith';



const CopyAbleText = ( { text } ) => {
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `Copied "${text}" to clipboard.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (

    <Box>
       <Text as="code" bg="gray.100" p={1} borderRadius="md">
        {text}

      </Text>

      <Tooltip label="Copy to clipboard" aria-label="Copy tooltip">
      <IconButton
        size="sm"
        icon={<CopyIcon />}
        onClick={handleCopy}
        aria-label="Copy button"
      />
      </Tooltip>
    </Box>
     
  );
};



const SampleFormatRollNumber = ( {data} ) => {

  const copyableTexts = [
    { key: "{#session#}", ex: "2023-24" },
    { key: "{#class#}", ex: "12" },
    { key: "{#section#}", ex: "B" },
  ];

  const formattedIndex = String(data.startingIndex).padStart(data.numberOfDigits, '0');
  const sampleRollNumberFormat = copyableTexts.reduce(
    (format, { key, ex }) => format.replace(new RegExp(key, 'g'), ex),
    data.rollNumberFormat
  );
  return <td>{sampleRollNumberFormat}{formattedIndex}</td>  ;
};



const ClassWiseTableRow = ({ standard, data, onUpdate }) => {
 
  return (
    <tr>
      <td> {standard.name}</td>
      
      <td>
        <Input
          type="number"
          placeholder="Enter Starting Index"
          value={data.startingIndex}
          onChange={(e) => onUpdate("startingIndex", Number(e.target.value))}
        />
      </td>
      <td>
        <Input
          type="number"
          placeholder="Enter Number of Digits"
          value={data.numberOfDigits}
          onChange={(e) => onUpdate("numberOfDigits", Number(e.target.value))}
        />
      </td>

      <SampleFormatRollNumber data={data}/>

    </tr>
  );
};



const ClassWise = ( { selectedSections } ) => {

  const result = {};
  
  // Populate the `result` object with section data mapped by name
  selectedSections.forEach((section) => {
    const id = section?.standard?.data?.id;
    const name = section?.standard?.data?.name;
    if (id && name) {
      result[name] = id; // Create key-value pairs: name -> id
    }
  });
  
  // Convert the `result` object to an array of class data
  const classData = Object.keys(result).map((name) => ({
    name,
    id: result[name], // Retrieve the id from the result object
  }));

  const copyableTexts = [
    { id: 1, key: "{#session#}", ex: "2023-24" },
    { id: 2, key: "{#class#}", ex: "12" },
    { id: 3, key: "{#section#}", ex: "B" },
  ];

  const [allStandards] = useState(classData);

  const [rowData, setRowData] = useState(
    classData.map((el) => ({
      startingIndex: 1,
      numberOfDigits: "",
      id: el.id,
    }))
  );

  const [rollNumberFormat, setRollNumberFormat] = useState(""); // State for the common rollNumberFormat

  const updateRowData = (index, key, value) => {
    setRowData((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: value } : row
      )
    );
  };

  const handleSaveAll = () => {
    console.log( { formula : rollNumberFormat , data : rowData , all : false } )  ;
  };

  return (
    <Box
      maxWidth="800px"
      margin="20px auto"
      padding="20px"
      border="1px solid #CBD5E0"
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <FormControl>
        <FormLabel>Roll Number Format</FormLabel>
        <Input
          placeholder="Enter Roll Number Format"
          value={rollNumberFormat}
          onChange={(e) => setRollNumberFormat(e.target.value)}
        />
      </FormControl>

      <Grid marginTop={4}>
        <Box display="flex" gap={4}>
          Variables -
          {copyableTexts.map((el) => (
            <CopyAbleText key={el.id} text={el.key} />
          ))}
        </Box>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Class</th>
              <th style={{ textAlign: "center" }}>Starting Index</th>
              <th style={{ textAlign: "center" }}>Number of Digits</th>
              <th style={{ textAlign: "center" }}>Sample Roll No</th>
            </tr>
          </thead>

          <tbody>
            {allStandards.map((standard, index) => (
              <ClassWiseTableRow
                key={standard.name}
                standard={standard}
                data={{
                  ...rowData[index],
                  rollNumberFormat:
                    rowData[index].rollNumberFormat || rollNumberFormat,
                }} // Pass the common rollNumberFormat if row-specific one is not set
                onUpdate={(key, value) => updateRowData(index, key, value)}
              />
            ))}
          </tbody>
        </table>

        <HStack mt={4} justify="flex-end">
          <ChakraButton size="sm" colorScheme="green" onClick={handleSaveAll}>
            Save All
          </ChakraButton>
        </HStack>
      </Grid>
    </Box>
  );
};




const SectionWiseTableRow = ({ standard, data, onUpdate }) => {
 
  return (
    <tr>
      <td> {standard.name}</td>
      <td> {standard.section}</td>
      <td>
        <Input
          type="number"
          placeholder="Enter Starting Index"
          value={data.startingIndex}
          onChange={(e) => onUpdate("startingIndex", Number(e.target.value))}
        />
      </td>
      <td>
        <Input
          type="number"
          placeholder="Enter Number of Digits"
          value={data.numberOfDigits}
          onChange={(e) => onUpdate("numberOfDigits", Number(e.target.value))}
        />
      </td>

      <SampleFormatRollNumber data={data}/>

    </tr>
  );
};



const SectionWise = ( { selectedSections } ) => {


  const copyableTexts = [
    { id: 1, key: "{#session#}", ex: "2023-24" },
    { id: 2, key: "{#class#}", ex: "12" },
    { id: 3, key: "{#section#}", ex: "B" },
  ];

  const [rollNumberFormat, setRollNumberFormat] = useState(""); // State for the common rollNumberFormat


  const [rowData, setRowData] = useState(
    selectedSections.map((el) => ({
      startingIndex: 1,
      numberOfDigits: '',
      id: el.id,
    }))
  );

  

  const updateRowData = (index, key, value) => {
    setRowData((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: value } : row
      )
    );
  };

  const handleSaveAll = () => {

    console.log( { formula : rollNumberFormat , data : rowData , all : false} )  ;
  };

  return (
    <Box
      maxWidth="800px"
      margin="20px auto"
      padding="20px"
      border="1px solid #CBD5E0"
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <FormControl>
        <FormLabel>Roll Number Format</FormLabel>
        <Input
          placeholder="Enter Roll Number Format"
          value={rollNumberFormat}
          onChange={(e) => setRollNumberFormat(e.target.value)}
        />
      </FormControl>

      <Grid marginTop={4}>
        <Box display="flex" gap={4}>
          Variables -
          {copyableTexts.map((el) => (
            <CopyAbleText key={el.id} text={el.key} />
          ))}
        </Box>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Class</th>
              <th style={{ textAlign: "center" }}> Section </th>
              <th style={{ textAlign: "center" }}>Starting Index</th>
              <th style={{ textAlign: "center" }}>Number of Digits</th>
              <th style={{ textAlign: "center" }}>Sample Roll No</th>
            </tr>
          </thead>

          <tbody>
            { selectedSections.map((standard, index) => (
              <SectionWiseTableRow
                key={standard.id}
                standard={standard}
                data={{
                  ...rowData[index],
                  rollNumberFormat:
                    rowData[index].rollNumberFormat || rollNumberFormat,
                }} // Pass the common rollNumberFormat if row-specific one is not set
                onUpdate={(key, value) => updateRowData(index, key, value)}
              />
            ))}
          </tbody>
        </table>

        <HStack mt={4} justify="flex-end">
          <ChakraButton size="sm" colorScheme="green" onClick={handleSaveAll}>
            Save All
          </ChakraButton>
        </HStack>
      </Grid>
    </Box>
  );
};


const OverallWise = (  ) => {

  const [startingIndex, setStartingIndex] = useState( 1 )  ;

  const [numberOfDigits, setNumberOfDigits] = useState( '' )  ; 

  const [rollNumberFormat, setRollNumberFormat] = useState(""); 

  const copyableTexts = [
    { id: 1, key: "{#session#}", ex: "2023-24" },
    { id: 2, key: "{#class#}", ex: "12" },
    { id: 3, key: "{#section#}", ex: "B" },
  ];

  
  
  // Function to show the sample format of roll number
  const sampleFormatRollNumber = () => {

    const formattedIndex = String(startingIndex).padStart(numberOfDigits, '0')  ;

    const sampleRollNumberFormat = copyableTexts.reduce((format, { key, ex }) => {
      return format.replace(new RegExp(key, 'g'), ex)  ;
    }, rollNumberFormat)  ;
    
    return `${sampleRollNumberFormat}${formattedIndex}`  ;
  };

  
  const handleSave = () => {

    console.log( { formula : rollNumberFormat , startingIndex , numberOfDigits , data : [] , all : true } )  ;
  };

  return ( 
    <Box
      maxWidth="800px"
      margin="20px auto"
      padding="20px"
      border="1px solid #CBD5E0"
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <FormControl>
        <FormLabel>Roll Number Format</FormLabel>
        <Input
          placeholder="Enter Roll Number Format"
          value={rollNumberFormat}
          onChange={(e) => setRollNumberFormat(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}  > 
        <FormLabel display="flex" gap={4}>
            Variables -
            {copyableTexts.map((el) => (
              <CopyAbleText key={el.id} text={el.key} />
            ))}
        </FormLabel>
      </FormControl>

      <FormControl>
        <FormLabel>Starting Index</FormLabel>
        <Input
          type="number"
          placeholder="Enter Starting Index"
          value={startingIndex}
          onChange={(e) => setStartingIndex(Number(e.target.value))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Number of Digits for Index</FormLabel>
        <Input
          type="number"
          placeholder="Enter Number of Digits (e.g.- 3)"
          value={numberOfDigits}
          onChange={(e) => setNumberOfDigits(Number(e.target.value))}
        />
      </FormControl>

      <Text mt={4}>Sample Roll No: {sampleFormatRollNumber()}</Text>

      <ChakraButton size="sm" colorScheme="green" onClick={handleSave}>
            Save
      </ChakraButton> 

    </Box>
  );
}


function RollNumberGenerator() {

  const dispatch = useDispatch()  ;

  const [boxes, setBoxes] = useState( [ { id: Date.now() , key: "" }] )  ;

  const [sortOptions, setSortOptions] = useState( {} ) ;
  

  // const [isSectionModalOpened, setIsSectionModalOpened] = useState( false )  ;

  const [selectedSections, setSelectedSections] = useState( [] )  ;

  const student = useSelector( s => s.AddStudentReducer )  ;

  const school = useSelector(s => s.SchoolProfile);

  const [isOverAllVisible, setOverAllIsVisible] = useState( false )  ;

  const [isSectionWiseVisible, setSectionWiseIsVisible] = useState( false )  ;

  const [isClassWiseVisible, setClassWiseIsVisible] = useState( false )  ;

  const [ formulaData , setFormulaData ] = useState( {  formula: '' , data: [] , all : false } )  ;

  const allOptions = [
    { key: "studentName", label: "Student Name" },
    { key: "fatherName", label: "Father Name" },
    { key: "motherName", label: "Mother Name" },
    { key: "admissionNumber", label: "Admission Number" },
    { key: "dateOfJoining", label: "Date of Joining" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "gender", label: "Gender" },
  ];
  

  const handleSelectChange = ( id , selectedValue ) => {
    setBoxes( prevBoxes => 
      prevBoxes.map( box => 
        box.id === id ? { ...box, key: selectedValue } : box
      )
    );
  };
  

  const handleSortChange = ( id , value ) => {
    setSortOptions( ( prev ) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addBox = () => {
    if ( boxes.length < allOptions.length ) {
      setBoxes((prev) => [ ...prev, { id: Date.now(), key: "" } ] )  ;
    }
  };

  const resetHandler = () => {

    setBoxes( [ { id: Date.now(), key: "" } ] )  ;

    setSortOptions( {} )  ;
  };



  const toggleClassSelecterModal = () => {

      dispatch( genAction( EVENTS.TOGGLE_CLASS_SELECTOR_MODAL ) )  ;

      // setIsSectionModalOpened(true);
  };

  const handleAddBatchBtnClick = () => {

      toggleClassSelecterModal()  ;

  };

  const onSelectSection = ( sectionData ) => {

      const selectedSections = intersectionWith(school?.data.data.sectionsList.data, sectionData, (a, b) => a.id == b);

      setSelectedSections(selectedSections);

      console.log( { 'applyOnSectionIds' : selectedSections , formulaData } )  ;
  }


  const handleClassesChange = (event) => {

   
    const selectedValue = event.target.value  ;

    console.log( "Selected Value-" , selectedValue )  ;

    if (selectedValue === "section") {

      setSectionWiseIsVisible( true )  ;

      setClassWiseIsVisible( false )  ;

      setOverAllIsVisible( false )  ;

    }
    else if (selectedValue === "class") 
    {
      setClassWiseIsVisible( true )  ;

      setSectionWiseIsVisible( false )  ;

      setOverAllIsVisible( false )  ;
    }
    else if (selectedValue === "overall" )
    {
      setOverAllIsVisible( true )  ;

      setClassWiseIsVisible( false )  ;

      setSectionWiseIsVisible( false )  ;
    }
    else
    {
      setOverAllIsVisible( false )  ;

      setClassWiseIsVisible( false )  ;

      setSectionWiseIsVisible( false )  ;
    }
  };

return (
  <Box p={5} maxW="800px" mx="auto">

    <Heading size="lg" color="white" bg="green.500" mb={5} p={3}>
      Roll Number Format
    </Heading>

    <VStack spacing={6}>

    <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">

      <Select placeholder="Select an option" onChange={handleClassesChange}>

        <option value="class"> Classwise </option>
        <option value="section"> Sectionwise </option>
        <option value="overall"> Overall </option>

      </Select>

      { 
        !isOverAllVisible && ( isClassWiseVisible || isSectionWiseVisible ) ? <Button size="sm" colorScheme="green" leftIcon={<AddIcon />} onClick={handleAddBatchBtnClick}>
          Add Section To Apply On
        </Button> : null
      }

      {student && student.classSelectorModal ? (
        <ClassSelecterModal
          classArray={selectedSections}
          handleSectionsSelect={(sections) => onSelectSection(sections)}
        />
      ) : null}

      {
        isOverAllVisible ? <OverallWise  /> : null  
      }

      {
        isSectionWiseVisible ? <SectionWise selectedSections={selectedSections} /> : null  
      }

      {
        isClassWiseVisible ? <ClassWise selectedSections={selectedSections} /> : null  
      }

    </Box>

    </VStack>


    <Heading size="lg" color="white" bg="green.500" mt={8} mb={4} p={3}>
      Sort Students
    </Heading>

    <VStack spacing={6}>

      {boxes.map(({ id, key }) => {
        const selectedOption = allOptions.find((opt) => opt.key === key);
        return (
          <Box key={id} borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
            <Select
              placeholder="Select an option"
              value={key}
              onChange={(e) => handleSelectChange(id, e.target.value)}
            >
              {allOptions
                .filter(
                  (option) =>
                    !boxes.some((box) => box.key === option.key) || option.key === key
                )
                .map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
            </Select>

            {selectedOption && (
              <FormControl mt={4}>
                <FormLabel>Sort by {selectedOption.label}</FormLabel>
                <RadioGroup
                  onChange={(value) => handleSortChange(id, value)}
                  value={sortOptions[id] || ""}
                >
                  <HStack spacing={5}>
                    <Radio value="asc">Ascending</Radio>
                    <Radio value="desc">Descending</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            )}
          </Box>
        );
      })}

      <Button
        colorScheme="blue"
        onClick={addBox}
        isDisabled={boxes.length >= allOptions.length}
        variant="outline"
      >
        Add Field
      </Button>

      <Button variant="outline" colorScheme="yellow" onClick={resetHandler} >
        Reset
      </Button>
    </VStack>

  </Box>
);


}

export default RollNumberGenerator;
