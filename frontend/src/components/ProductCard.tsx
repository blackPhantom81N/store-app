import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";

interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  id?: number;
  product?: Product;
}

const ProductCard = ({ id, product }: ProductCardProps) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  console.log("Products in card ", product);

  const { deleteProducts } = useProductStore();
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
    </Box>
  );
};

export default ProductCard;
