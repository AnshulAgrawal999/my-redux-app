import React, { useState, useEffect } from 'react';
import {
    Box, Text, Spacer, HStack, Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, MenuDivider, Button,
    Input, InputGroup, InputLeftElement, Table, Tbody, Tr, Td, Thead, Th
} from '@chakra-ui/react';

import { AddIcon, DeleteIcon, SearchIcon, CloseIcon } from '@chakra-ui/icons';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addPackage, deletePackage, setPackages } from '../redux/packagesListSlice';

const PackagesList = () => {
    const [sortConfig, setSortConfig] = useState({ field: 'packageName', order: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedPackages, setSortedPackages] = useState([]);

    const packages = useSelector(state => state.packages);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAndProcessPackages = async () => {
            try {
                const data = [
                    { id: 1, packageName: 'Jee Mains Crash Course', price: 18000, createdAt: '2024-12-16T10:00:00Z' },
                    { id: 2, packageName: 'Full Stack Web Development(MERN)', price: 40000, createdAt: '2024-12-16T12:00:00Z' },
                    { id: 3, packageName: 'Java Spring Boot', price: 30000, createdAt: '2024-12-16T15:00:00Z' },
                    { id: 4, packageName: 'Python Django', price: 20000, createdAt: '2024-12-16T11:00:00Z' },
                    { id: 5, packageName: 'C++ ASP.NET', price: 30000, createdAt: '2024-12-16T14:00:00Z' },
                    { id: 6, packageName: 'Jee Mains+Advance Crash Course', price: 27000, createdAt: '2024-12-16T13:00:00Z' },
                ];

                dispatch(setPackages(data));

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
    }, [dispatch, searchQuery, sortConfig]);

    const handleSortChange = (field) => {
        setSortConfig(prevConfig => ({
            field,
            order: prevConfig.field === field && prevConfig.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const resetFiltersAndSort = () => {
        setSortConfig({ field: 'packageName', order: 'asc' });
        setSearchQuery('');
    };

    
    const handleDelete = (packageId) => {
        dispatch(deletePackage(packageId));
    };

    const handleAddPackage = () => {
        const newPackage = {
            id: Date.now(),
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
                <Button
                    leftIcon={<CloseIcon />}
                    colorScheme="red"
                    size="sm"
                    variant="outline"
                    onClick={resetFiltersAndSort}
                >
                    Reset
                </Button>
            </HStack>

            <Box my="2rem" px="1em" bg="#f9f9f9" p="10px" borderRadius="md">
                <Text fontWeight="bold" fontSize="lg" mb="2">Applied Filters & Sort:</Text>
                <Text color="gray.700">Search Query: <b>{searchQuery || 'None'}</b></Text>
                <Text color="gray.700">Sort By: <b>{sortConfig.field}</b> ({sortConfig.order})</Text>
            </Box>

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
                                <Td>{new Date(pkg.createdAt).toLocaleString()}</Td>
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

