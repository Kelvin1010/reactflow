import { Flex, Image, Button, Link, Text } from "@chakra-ui/react";
import { useAuth } from "./auth-container";

export function Header() {
  const { clearUser } = useAuth();

  function handleLogout() {
    clearUser();
  }

  return (
    <Flex height="60px" px="50px" justify="space-between" alignItems="center">
      <Link href="https://aiacademy.edu.vn/home" isExternal>
        <Image src="/logo.png" height="70px" />
      </Link>
      <Text fontSize="3xl" fontWeight="bold">
        Nền tảng phân tích dữ liệu (Pro)
      </Text>
      <Button onClick={handleLogout} variant="outline" colorScheme="red">
        Đăng xuất
      </Button>
    </Flex>
  );
}
