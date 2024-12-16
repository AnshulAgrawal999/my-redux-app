import React, { useState, useEffect } from 'react';

import {
    Box, Text, Spacer, HStack, Menu,
    MenuButton, MenuList, MenuItem, Button, Spinner, Input, InputGroup, InputLeftElement, Table,
    Tbody, Tr, Td, Thead, Th, MenuOptionGroup, MenuItemOption, MenuDivider
} from '@chakra-ui/react';

import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';

import _ from 'lodash';  

import { useDispatch, useSelector } from 'react-redux';

const PackagesList = () => {

    const [sortConfig, setSortConfig] = useState({ field: 'packageName', order: 'asc' });


    const [searchQuery, setSearchQuery] = useState('');


    const [sortedPackages, setSortedPackages] = useState([]);


    const packages = useSelector( state => state.packages )  ;

    const dispatch = useDispatch()  ;

    // Filter and sort the packages when packages or searchQuery change
    useEffect(() => {
        // Filter packages based on the search query
        let filtered = packages;
        if (searchQuery) {
            filtered = packages.filter(pkg => pkg.packageName.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Sort filtered packages based on the sortConfig
        const sorted = _.orderBy(filtered, [sortConfig.field], [sortConfig.order]);
        setSortedPackages(sorted);
    }, [searchQuery, packages, sortConfig]); // Dependency array updated to include `packages`, `searchQuery`, and `sortConfig`

    const handleSortChange = (field) => {
        setSortConfig(prevConfig => ({
            field,
            order: prevConfig.field === field && prevConfig.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = (packageId) => {
        // Dispatch delete action here
    };

    return (
        <Box sx={{ backgroundColor: 'white', p: '10px', minH: '70vh', borderRadius: '10px' }} >

            <HStack>
                <Text my='0' color='gray.600' fontWeight='bold' fontSize='2rem' ml="1rem" >List Packages</Text>
                <Spacer />
                <InputGroup width="20em">
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.400" />
                    </InputLeftElement>
                    <Input 
                        placeholder="Search by package name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </InputGroup>
            </HStack>

            <HStack px='1em' my='2rem' pos='sticky' top='90px' zIndex='9' bg='#ffffffa6'>
                <Menu closeOnSelect={false}>
                    <MenuButton size='xs' variant='ghost' width={'9em'} >
                        Sort By
                    </MenuButton>
                    <MenuList maxWidth='240px'>
                        <MenuOptionGroup color='gray.800' maxHeight='5vh' overflowY='auto' title='Field' type='radio'>
                            <MenuItemOption color='gray.600' value='packageName' onClick={() => handleSortChange('packageName')}>Name</MenuItemOption>
                            <MenuItemOption color='gray.600' value='price' onClick={() => handleSortChange('price')}>Price</MenuItemOption>
                            <MenuItemOption color='gray.600' value='createdAt' onClick={() => handleSortChange('createdAt')}>Added Date</MenuItemOption>
                        </MenuOptionGroup>
                        <MenuDivider />
                        <MenuOptionGroup color='gray.800' title='Order' type='radio'>
                            <MenuItemOption color='gray.600' value='asc' onClick={() => setSortConfig(prev => ({ ...prev, order: 'asc' }))}>Ascending</MenuItemOption>
                            <MenuItemOption color='gray.600' value='desc' onClick={() => setSortConfig(prev => ({ ...prev, order: 'desc' }))}>Descending</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </HStack>

            <Box my='10px'>
               
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Price</Th>
                                <Th>Added Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sortedPackages.map(pkg => (
                                <Tr key={pkg.id}>
                                    <Td>{pkg.packageName}</Td>
                                    <Td>{pkg.price}</Td>
                                    <Td>{new Date(pkg.createdAt).toLocaleDateString()}</Td>
                                    <Td>
                                        <Button size='sm' colorScheme='red' onClick={() => handleDelete(pkg.id)}>
                                            <DeleteIcon />
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                
            </Box>

            <Box my='10px'>
                <HStack flexWrap='wrap'>
                    <Button leftIcon={<AddIcon />} colorScheme="teal" size="sm" variant="outline">
                        Add Package
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
};

export default PackagesList;
