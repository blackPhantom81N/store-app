import {
  Box,
  Button,
  Container,
  Heading,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";

interface Product {
  name: string;
  price: string;
  image: string;
}

const CreatePage = () => {
  const { createProduct } = useProductStore();
  const toast = useToast();
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: "",
    image: "",
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }

    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create new Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <TextInput
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <TextInput
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <TextInput
              placeholder="Image"
              name="image"
              value={newProduct.image}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
