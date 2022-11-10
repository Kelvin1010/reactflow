import { Flex, Image, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth-container";

export function Header() {
  const { clearUser } = useAuth();

  function handleLogout() {
    clearUser();
  }

  return (
    <Flex height="60px" px="50px" justify="space-between" alignItems="center" backgroundImage={'.//sumo-landing-bg.png'}>
      <Link to={'/'}>
        <Image src="/logo.png" height="70px" />
      </Link>
      <Text fontSize="3xl" fontWeight="bold" color={'white'}>
        Data Analysis 
      </Text>
      <Button onClick={handleLogout} variant="outline" colorScheme="red">
        Đăng xuất
      </Button>
    </Flex>
  );
}
