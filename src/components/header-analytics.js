import { DownOutlined } from '@ant-design/icons'
import { Box, Flex, Image } from '@chakra-ui/react'
import { Dropdown, Space } from 'antd'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const items = [
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Variant
            </a>
        ),
        key: '0',
    }
]

function HeaderAnalytics() {

    return (
        <Box bg='black' h={10} w='100%' display={'flex'} p={0} color='white'>
            <Box h={10} bg={'white'} w='7%' cursor={'pointer'} alignItems={'center'} className='edit-header' fontSize={10} p={4} color='black'>
                <Link to={'/'}>
                    Home
                </Link>
            </Box>
            <Box h={10} bg={'white'} w='7%' cursor={'pointer'} alignItems={'center'} className='edit-header' fontSize={10} p={4} color='black'>
                <Dropdown
                    menu={{
                    items,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Edit
                        <DownOutlined />
                    </Space>
                    </a>
                </Dropdown>
            </Box>
        </Box>
    )
}

export default HeaderAnalytics