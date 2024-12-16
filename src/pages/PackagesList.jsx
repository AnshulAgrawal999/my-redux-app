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


function PackagesList() {
    return (
        <div>
            <h1>Packages List Page</h1>
            <p></p>
        </div>
    );
}

export default PackagesList  ;
