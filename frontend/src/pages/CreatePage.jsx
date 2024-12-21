import { useState } from "react";
import React from "react";
import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "@/store/product";
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    price: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("Success:", success);
    console.log("Message:", message);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: 5000,
      });
    }
    setNewProduct({
      name: "",
      image: "",
      price: "",
    });
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}></VStack>
      <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
        Create New Product
      </Heading>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded={"lg"}
        shadow={"md"}
      >
        <VStack spacing={4}>
          <Input
            placeholder="Product Name"
            value={newProduct.name}
            name="name"
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="Product Price"
            value={newProduct.price}
            name="price"
            onChange={(e) => {
              setNewProduct({ ...newProduct, price: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="Product Image"
            value={newProduct.image}
            name="image"
            onChange={(e) => {
              setNewProduct({ ...newProduct, image: e.target.value });
            }}
          ></Input>
          <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
            Add Product
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreatePage;
