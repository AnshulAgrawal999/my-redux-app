import React, { useState, useEffect, useReducer } from 'react'
import {
    Box, Text, Spacer, HStack, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Spinner, Tag, Input, InputGroup, InputRightElement, InputLeftElement, Table,
    Tbody,
    Tr,
    Td,
    Select,
    MenuItemOption, MenuOptionGroup, MenuDivider, Tooltip, Thead, Th
} from '@chakra-ui/react';

import { AddIcon, ChevronDownIcon, SearchIcon, DeleteIcon, CloseIcon, ArrowUpDownIcon } from '@chakra-ui/icons'

import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';


const PackagesList = () => {

    const mainDispatch = useDispatch()  ;


    return (

        <Box sx={{ backgroundColor: 'white', p: '10px', minH: '70vh', borderRadius: '10px' }} >

            <HStack>
                <Text my='0' color='gray.600' fontWeight='bold' fontSize='2rem' ml="1rem" >List Packages</Text>
                <Spacer />

            </HStack>
            
                    <HStack px='1em' my='2rem' pos='sticky' top='90px' zIndex='9' bg='#ffffffa6'>


                        <Menu closeOnSelect={false}>
                            <MenuButton size='xs' variant='ghost' width={'9em'}  >
                                Sort By
                            </MenuButton>
                            <MenuList maxWidth='240px'  >
                                <MenuOptionGroup color='gray.800' maxHeight='5vh' overflowY='auto' title='Field' type='radio'>
                                    <MenuItemOption color='gray.600' value='packageName'>Name</MenuItemOption>
                                    <MenuItemOption color='gray.600' value='price'>Price</MenuItemOption>
                                    <MenuItemOption color='gray.600' value='createdAt'>Added date</MenuItemOption>
                                    {/* <MenuItemOption color='gray.600' value='cDate'>Created Date</MenuItemOption> */}
                                </MenuOptionGroup>
                                <MenuDivider />

                                <MenuOptionGroup color='gray.800' title='Order' type='radio'>
                                    <MenuItemOption  color='gray.600' value='asc'>Ascending</MenuItemOption>
                                    <MenuItemOption  color='gray.600' value='desc'>Descending</MenuItemOption>
                                </MenuOptionGroup>

                            </MenuList>
                        </Menu>

        
                        <Menu>
                            <MenuButton size='xs' variant='ghost' >
                            </MenuButton>
                            <MenuList>
                                <MenuItem >List View</MenuItem>
                                <MenuItem >Grid View</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
            

                            <Box my='10px'>

                                <Table variant='simple'>
                                    <Tbody>
    
                                    </Tbody>

                                </Table>

                            </Box>

                            
                            <Box my='10px'>

                                <HStack flexWrap='wrap'>
                                    
                                </HStack>

                            </Box>
        </Box>
    )

}

export default PackagesList  ;
