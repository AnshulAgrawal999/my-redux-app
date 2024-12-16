import React, { useState, useEffect } from 'react'  ;

import {
    Box, Text, Spacer, HStack, Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, MenuDivider, Button,
    Input, InputGroup, InputLeftElement, Table, Tbody, Tr, Td, Thead, Th
} from '@chakra-ui/react'  ;

import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'  ;

import _ from 'lodash'  ;

import { useDispatch, useSelector } from 'react-redux'  ;

import { addPackage, deletePackage, setPackages } from '../redux/packagesListSlice'  ; // actions from respective slice

const PackagesList = () => {

    const [sortConfig, setSortConfig] = useState({ field: 'packageName', order: 'asc' })  ;

    const [searchQuery, setSearchQuery] = useState('')  ;

    const [sortedPackages, setSortedPackages] = useState([])  ;

    const packages = useSelector(state => state.packages);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAndProcessPackages = async () => {
            try {
                // Fetch packages from the API
                // const response = await fetch( 'http://localhost:4000/packages' )  ;
                // const data = await response.json();

                // Example initial state
                const data = [
                    { id: 1, packageName: 'Jee Mains Crash Course', price: 18000, createdAt: '2024-12-01T10:00:00Z' },
                    { id: 2, packageName: 'Full Stack Web Development(MERN)', price: 40000, createdAt: '2024-12-05T12:00:00Z' },
                    { id: 3, packageName: 'Java Spring Boot', price: 30000, createdAt: '2024-12-10T15:00:00Z' },
                    { id: 4, packageName: 'Python Django', price: 20000, createdAt: '2024-12-05T11:00:00Z' },
                    { id: 5, packageName: 'C++ ASP.NET', price: 30000, createdAt: '2024-12-10T14:00:00Z' },
                    { id: 6, packageName: 'Jee Mains+Advance Crash Course', price: 27000, createdAt: '2024-12-01T13:00:00Z' },
                  ] ;


                // Update Redux store with fetched packages
                dispatch(setPackages(data));

                // Apply filtering and sorting on the fetched packages
                let filtered = data;
                if (searchQuery) {
                    filtered = filtered.filter(pkg =>
                        pkg.packageName.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }

                const sorted = _.orderBy(filtered, [sortConfig.field], [sortConfig.order]);
                setSortedPackages(sorted);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchAndProcessPackages();
    }, [dispatch, searchQuery, sortConfig]); // Dependencies include dispatch, searchQuery, and sortConfig

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
        dispatch(deletePackage(packageId));
    };

    const handleAddPackage = () => {
        const newPackage = {
            id: Date.now(), // Unique ID
            packageName: 'New Package',
            price: 150,
            createdAt: new Date().toISOString(),
        };
        dispatch(addPackage(newPackage));
    };

    return (
        <Box sx={{ backgroundColor: 'white', p: '10px', minH: '70vh', borderRadius: '10px' }}>
            <HStack>
                <Text my='0' color='gray.600' fontWeight='bold' fontSize='2rem' ml="1rem">List Packages</Text>
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
                    <MenuButton size='xs' variant='ghost' width={'9em'}>
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
                                <Td>{new Date(pkg.createdAt).toLocaleString() }</Td>
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
                    <Button leftIcon={<AddIcon />} colorScheme="teal" size="sm" variant="outline" onClick={handleAddPackage}>
                        Add Package
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
};

export default PackagesList;
