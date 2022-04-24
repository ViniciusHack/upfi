import {
  Box,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal autoFocus={false} isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg="pGray.800" w="auto" maxW="900px">
        <ModalBody p={0}>
          <Image src={imgUrl} maxW="900px" maxH="600px" />
          <Box w="100%" py="2" px="10px">
            <Link isExternal href={imgUrl}>
              {imgUrl}
            </Link>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
