import React, { useState, useEffect } from 'react';
import {
    Box, Text, Spacer, HStack, Input, InputGroup, InputLeftElement, Table, Tbody, Tr, Td, Thead, Th, Button,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
    FormControl, FormLabel, Input as ChakraInput
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, SearchIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addPackage, deletePackage, updatePackage, fetchPackagesFromAPI } from '../redux/packagesListSlice';
import _ from 'lodash';

const PackagesList = () => {
    const [filterConfig, setFilterConfig] = useState(() => {
        const savedConfig = sessionStorage.getItem('filterConfig');
        return savedConfig
            ? JSON.parse(savedConfig)
            : { sort: { field: 'packageName', order: 'asc' }, searchQuery: '' };
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add Package modal state
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [newPackage, setNewPackage] = useState({ packageName: '', price: '' }); // New package state

    const { packages, status, error } = useSelector(state => state.packages);
    const dispatch = useDispatch();

    useEffect(() => {
        sessionStorage.setItem('filterConfig', JSON.stringify(filterConfig));
    }, [filterConfig]);

    const getSortedAndFilteredPackages = () => {
        let filtered = packages;
        if (filterConfig.searchQuery) {
            filtered = filtered.filter(pkg =>
                pkg.packageName.toLowerCase().includes(filterConfig.searchQuery.toLowerCase())
            );
        }
        return _.orderBy(filtered, [filterConfig.sort.field], [filterConfig.sort.order]);
    };

    const sortedPackages = getSortedAndFilteredPackages();

    const handleSortChange = (field) => {
        setFilterConfig(prevConfig => ({
            ...prevConfig,
            sort: {
                field,
                order: prevConfig.sort.field === field && prevConfig.sort.order === 'asc' ? 'desc' : 'asc'
            }
        }));
    };

    const handleSearchChange = (event) => {
        setFilterConfig(prevConfig => ({
            ...prevConfig,
            searchQuery: event.target.value
        }));
    };

    const resetFiltersAndSort = () => {
        setFilterConfig({
            sort: { field: 'packageName', order: 'asc' },
            searchQuery: ''
        });
    };

    const handleDelete = (packageId) => {
        dispatch(deletePackage(packageId));
    };

    const handleOpenAddModal = () => {
        setNewPackage({ packageName: '', price: '' }); // Reset form
        setIsAddModalOpen(true);
    };

    const handleAddPackageSave = () => {
        const packageToAdd = {
            id: Date.now(),
            packageName: newPackage.packageName,
            price: parseFloat(newPackage.price),
            createdAt: new Date().toISOString(),
        };
        dispatch(addPackage(packageToAdd));
        setIsAddModalOpen(false);
    };

    const handleUpdatePackage = () => {
        if (selectedPackage) {
            dispatch(updatePackage(selectedPackage));
            setIsModalOpen(false);
            setSelectedPackage(null);
        }
    };

    const handleOpenModal = (pkg) => {
        setSelectedPackage({ ...pkg });
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPackagesFromAPI());
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
                        value={filterConfig.searchQuery}
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
                        <Th cursor="pointer" onClick={() => handleSortChange('packageName')}>
                            Name {filterConfig.sort.field === 'packageName' && (filterConfig.sort.order === 'asc' ? '↑↑' : '↓↓')}
                        </Th>
                        <Th cursor="pointer" onClick={() => handleSortChange('price')}>
                            Price {filterConfig.sort.field === 'price' && (filterConfig.sort.order === 'asc' ? '↑↑' : '↓↓')}
                        </Th>
                        <Th cursor="pointer" onClick={() => handleSortChange('createdAt')}>
                            Added Date {filterConfig.sort.field === 'createdAt' && (filterConfig.sort.order === 'asc' ? '↑↑' : '↓↓')}
                        </Th>
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
                                <Button size="sm" bg="blue.600" color="white" _hover={{ bg: "blue.900" }} variant="solid" onClick={() => handleOpenModal(pkg)} leftIcon={<EditIcon />}>
                                    Update
                                </Button>
                                <Button size="sm" colorScheme="red" onClick={() => handleDelete(pkg.id)} leftIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Box my='10px'>
                <HStack>
                    <Button leftIcon={<AddIcon />} colorScheme="teal" size="sm" variant="outline" onClick={handleOpenAddModal}>
                        Add Package
                    </Button>
                </HStack>
            </Box>

            {/* Modal for Adding Package */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Package</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Package Name</FormLabel>
                            <ChakraInput
                                value={newPackage.packageName}
                                onChange={(e) => setNewPackage({ ...newPackage, packageName: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mt="1rem">
                            <FormLabel>Price</FormLabel>
                            <ChakraInput
                                value={newPackage.price}
                                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                                type="number"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleAddPackageSave}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal for updating package */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Package</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Package Name</FormLabel>
                            <ChakraInput
                                value={selectedPackage?.packageName || ''}
                                onChange={(e) => setSelectedPackage({ ...selectedPackage, packageName: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mt="1rem">
                            <FormLabel>Price</FormLabel>
                            <ChakraInput
                                value={selectedPackage?.price || ''}
                                onChange={(e) => setSelectedPackage({ ...selectedPackage, price: parseFloat(e.target.value) })}
                                type="number"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleUpdatePackage}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default PackagesList;
