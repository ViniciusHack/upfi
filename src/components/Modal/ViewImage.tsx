import {
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
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Image src={imgUrl} />
          <Link href={imgUrl} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
