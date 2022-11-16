import { Box, Button, FormControl, FormErrorMessage, Input, Stack, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form';
import isEqual from "lodash/isEqual";
import { useAuth } from '../components/auth-container';

const initialState = {
    username: "admin@aiacademy.edu.vn",
    password: "123123",
  };

function SignUp() {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
      } = useForm();
      const toast = useToast();
      const { setUser } = useAuth();
    
      function onSubmit(values) {
        if (isEqual(values, initialState)) {
          setUser(values);
        } else {
          toast({
            position: "top",
            description: "Incorrect username or password.",
            status: "error",
          });
        }
      }
    
      return (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          width="100%"
          height="100vh"
          position="relative"
          background="gray.600"
        >
          <Box
            background="url('/sumo-landing-bg.png') center/cover no-repeat"
            height="100vh"
            width="100%"
            filter="brightness(0.4)"
          />
          <Box
            maxWidth="365px"
            width="100%"
            p="1"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack p="4" backgroundColor="white" rounded="md" boxShadow="sm" spacing="4">
                <img src={"./img/logo.png"} className="App-logo" alt="logo"/>
                <FormControl isInvalid={errors.username}>
                  <Input
                    id="username"
                    placeholder="Nhập email"
                    type="email"
                    {...register("username", {
                      required: "Trường email là bắt buộc.",
                    })}
                  />
                  <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    {...register("password", {
                      required: "Trường mật khẩu là bắt buộc.",
                      minLength: {
                        value: 6,
                        message: "Cần ít nhất 6 kí tự",
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                {/* <Link to={'/forgotpassowrd'}> */}
                  <Box textAlign="right">
                    <Text color="teal"  className='input-qmk'>Quên mật khẩu?</Text>
                  </Box>
                {/* </Link> */}
                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  Đăng nhập
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
    );
}

export default SignUp