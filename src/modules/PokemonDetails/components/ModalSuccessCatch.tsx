/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormErrorMessage,
  FormLabel,
  FormControl,
  useToast,
} from '@chakra-ui/react';

import PokemonContext from '../../../context/PokemonContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  pokemonId: string;
  onSubmit: (nickName: string) => void;
};

type FormData = {
  [key: string]: string;
};

const ModalSuccessCatch = ({
  isOpen, onClose, pokemonId, onSubmit,
}: Props) => {
  const { isNickNameExists } = useContext(PokemonContext)!;
  const toast = useToast();
  const {
    handleSubmit, register, formState: { errors }, setError, reset,
  } = useForm();

  const handleFormSubmit = (data: FormData) => {
    if (isNickNameExists(pokemonId, data.nickName)) {
      setError('nickName', { message: 'Nickname Already Exists' });
    } else {
      onSubmit(data.nickName);
      onClose();
      toast({
        title: 'Success',
        description: `"${data.nickName}" is saved`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ModalContent>
          <ModalHeader>Successfully Catch Pokemon</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={errors.nickName || errors}>
              <FormLabel htmlFor="nickName">Nick Name</FormLabel>
              <Input
                id="nickName"
                placeholder="Enter Nickname"
                {...register('nickName', { required: 'This is required' })}
              />
              <FormErrorMessage>
                {errors.nickName && errors.nickName.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ModalSuccessCatch;
