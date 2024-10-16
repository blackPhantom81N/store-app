import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NoProductsFound = () => {
  return (
    <>
      <Text
        fontSize={"xl"}
        textAlign={"center"}
        fontWeight={"bold"}
        color={"gray.500"}
      >
        No products found 😥 {""}
        <Link to={"/create"}>
          <Text
            as={"span"}
            color={"blue.500"}
            _hover={{ textDecoration: "underline" }}
          >
            Create a product
          </Text>
        </Link>
      </Text>
    </>
  );
};

export default NoProductsFound;
