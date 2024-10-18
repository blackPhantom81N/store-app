import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const isAuthPage: boolean =
    location.pathname == "/login" || location.pathname == "/signup";

  return (
    <Container maxW={"1140px"} paddingX={"4px"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}>Just.Tek</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button disabled={isAuthPage}>
              <FaRegSquarePlus fontSize={"20"} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <IoSunny />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
