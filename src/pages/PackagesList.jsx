import React, { useState , useEffect } from 'react';
import {
    Box, Text, Spacer, HStack, Input, InputGroup, InputLeftElement, Table, Tbody, Tr, Td, Thead, Th, Button,
    Editable, EditableInput, EditablePreview
} from '@chakra-ui/react';

import { AddIcon, DeleteIcon, SearchIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addPackage, deletePackage, updatePackage , fetchPackagesFromAPI } from '../redux/packagesListSlice'; // Add updatePackage action

import _ from 'lodash'  ;

const PackagesList = () => {
    const [sortConfig, setSortConfig] = useState({ field: 'packageName', order: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');

    const { packages, status, error } = useSelector(state => state.packages)  ;

    const dispatch = useDispatch();

    const getSortedAndFilteredPackages = () => {
        let filtered = packages;
        if (searchQuery) {
            filtered = filtered.filter(pkg =>
                pkg.packageName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return _.orderBy(filtered, [sortConfig.field], [sortConfig.order]);
    };

    const sortedPackages = getSortedAndFilteredPackages();

    const handleSortChange = (field) => {
        setSortConfig(prevConfig => ({
            field,
            order: prevConfig.field === field && prevConfig.order === 'asc' ? 'desc' : 'asc',
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
            price: 1000,
            createdAt: new Date().toISOString(),
        };
        dispatch(addPackage(newPackage));
    };

    const handleUpdatePackage = (id, field, value) => {
        dispatch(updatePackage({ id, field, value }));
    };


    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchPackagesFromAPI()); // Dispatch the fetch action on initial load
        }
      }, [dispatch, status]);
    
      if (status === 'loading') {
        return <div>Loading...</div>;
      }
    
      if (status === 'failed') {
        return <div>Error: {error}</div>;
      }

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

            <Table variant='simple' mt="2rem">
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
                            <Td>
                                <Editable
                                    defaultValue={pkg.packageName}
                                    onSubmit={(value) => handleUpdatePackage(pkg.id, 'packageName', value)}
                                >
                                    <EditablePreview />
                                    <EditableInput />
                                </Editable>
                            </Td>
                            <Td>
                                <Editable
                                    defaultValue={pkg.price.toString()}
                                    onSubmit={(value) => handleUpdatePackage(pkg.id, 'price', parseFloat(value))}
                                >
                                    <EditablePreview />
                                    <EditableInput />
                                </Editable>
                            </Td>
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

            <Box my='10px'>
                <HStack>
                    <Button leftIcon={<AddIcon />} colorScheme="teal" size="sm" variant="outline" onClick={handleAddPackage}>
                        Add Package
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
};

export default PackagesList;
