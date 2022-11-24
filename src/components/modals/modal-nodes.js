import { SunIcon } from '@chakra-ui/icons'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import JSONViewer from 'react-json-viewer';
import { JsonPrettyViewer } from 'react-json-friendly-viewer';
import 'react-json-friendly-viewer/style.css';


function ModalNodes({data,...props}) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dataJson, setDataJson] = useState([data?.output])

    const keys = Object.keys(data?.output?.[0] || {})
    console.log(data?.output)
    console.log(keys)
    
    return (
        <>
            <Button onClick={onOpen}><SunIcon /></Button>

            <Modal 
                scrollBehavior={'inside'}
                closeOnOverlayClick={false} 
                isOpen={isOpen} 
                size='6xl'
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Data Node</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <JsonPrettyViewer 
                        json={data?.output || data || null} 
                        
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                    Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalNodes