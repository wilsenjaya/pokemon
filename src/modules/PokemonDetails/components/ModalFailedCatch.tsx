import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalFailedCatch = ({ isOpen, onClose }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Failed To Catch</ModalHeader>
      <ModalBody>Uh Oh! You have failed to catch the pokemon</ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          OK
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ModalFailedCatch;
