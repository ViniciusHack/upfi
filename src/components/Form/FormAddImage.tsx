import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type FormValidations = {
  image: RegisterOptions;
  title: RegisterOptions;
  description: RegisterOptions;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const imageValidation = (image: File): any => {
    const formats = ['png', 'jpeg', 'gif'];
    const lessThan10MB = image.size <= 10000000;
    const acceptedFormats = formats.some(
      extension => `image/${extension}` === image.type,
    ); // ${'jpeg' || 'png' || 'gif'}
    if (!lessThan10MB) {
      return 'O arquivo deve ser menor que 10MB';
    }
    if (!acceptedFormats) {
      return 'Somente são aceitos arquivos PNG, JPEG e GIF';
    }
    return true;
  };

  const formValidations: FormValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: true,
      // validate: files => imageValidation(files),
      validate: files => imageValidation(files[0]),
      // lessThan10MB:
    },
    title: {
      required: {
        value: true,
        message: 'Este campo é obrigatório',
      },
      minLength: {
        value: 2,
        message: 'Muito pequeno',
      },
      maxLength: {
        value: 20,
        message: 'Muito longo',
      },
    },
    description: {
      required: {
        value: true,
        message: 'Este campo é obrigatório',
      },
      maxLength: {
        value: 65,
        message: 'Muito longo',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    {
      // TODO ONSUCCESS MUTATION
    },
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl) {
        toast({
          title: 'URL da imagem não existe',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha ao enviar',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          // TODO SEND IMAGE ERRORS
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          error={errors.title}
          {...register('title', formValidations.title)}
          // TODO SEND TITLE ERRORS
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          error={errors.description}
          {...register('description', formValidations.description)}
          // TODO SEND DESCRIPTION ERRORS
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
