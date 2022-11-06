import React, { useState } from "react";
import { Header } from "@components/Header/Header.comp";
import { Heading, Text, VStack, useToast } from "native-base";
import Logo from '../../assets/logo.svg';
import { Input } from "@components/Input/Input.comp";
import { Button } from "@components/Button";
import { api } from "../../api/connection/index";
export const New = () => {
  const toast = useToast();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  

  async function handlePoolCreate() {
    if(!value.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão!',
        placement: 'top',
        bgColor: 'red.900'
      });      
    }

    try {
      setLoading(true);

      await api.post("/pools", {
        title: value.toUpperCase()
      });

      setLoading(false);
      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      }); 
      setValue('')
    }catch(err) {
      console.log(err);
      setLoading(false);
      toast.show({
        title: 'Não foi possível criar o bolão!',
        placement: 'top',
        bgColor: 'red.900'
      });    
    }
  }

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title={"Criar novo Bolão"} />
      <VStack mt={8} mx={5} alignItems={"center"}>
        <Logo />
        <Heading fontFamily={"heading"} color={"white"} fontSize={"xl"} my={8} textAlign={"center"}>
          Crie o seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
        </Heading>
        <Input 
          mb={2}
          placeholder={"Qual nome do seu bolão?"}
          value={value}
          onChangeText={setValue}
        />
        <Button 
          title="CRIAR MEU BOLÃO" 
          onPress={handlePoolCreate}
          isLoading={loading}
        />
        <Text color={"gray.200"} fontSize={"sm"} textAlign={"center"} px={10} mt={4}>
          Após criar seu bolão, você receberá um código único 
          que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}