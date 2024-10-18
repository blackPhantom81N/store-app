import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";
import TextInput from "./TextInput";
import { useState } from "react";

interface Product {
  _id?: string;
  name: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  id?: number;
  product?: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("Products in card ", product);

  const { deleteProducts, updatedProducts } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (pid: string) => {
    const result = await deleteProducts(pid);

    if (result) {
      const { success, message } = result;

      toast({
        title: message,
        status: success ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        status: "error",
      });
    }
  };

  const handleUpdateProduct = async (pid: string, updatedProduct: Product) => {
    const result = await updatedProducts(pid, updatedProduct);

    if (result) {
      const { success, message } = result;

      onClose();

      if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Product updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bgColor={bgColor}
      width={"auto"}
    >
      <Image
        src={product?.image}
        alt={product?.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2} textColor={textColor}>
          {product?.name}
        </Heading>
        <Text fontWeight={"bold"} color={textColor} fontSize={"xl"} mb={4}>
          ${product?.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            aria-label="edit-btn"
            icon={<FaRegEdit />}
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            aria-label="delete-btn"
            icon={<MdDelete />}
            colorScheme="red"
            onClick={() => {
              if (product?._id) {
                handleDeleteProduct(product._id);
              }
            }}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <TextInput
                placeholder="Product Name"
                name="name"
                value={updatedProduct?.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (updatedProduct) {
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    });
                  }
                }}
              />
              <TextInput
                placeholder="Price"
                name="price"
                value={updatedProduct?.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (updatedProduct) {
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    });
                  }
                }}
              />
              <TextInput
                placeholder="Image URL"
                name="image"
                value={updatedProduct?.image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (updatedProduct) {
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    });
                  }
                }}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (product?._id && updatedProduct) {
                  handleUpdateProduct(product._id, updatedProduct);
                }
              }}
            >
              Update Product
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
