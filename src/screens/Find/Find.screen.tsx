import React, { useState } from "react";
import { Header } from "@components/Header/Header.comp";
import { Heading, useToast, VStack } from "native-base";
import { Input } from "@components/Input/Input.comp";
import { Button } from "@components/Button";
import { api } from "../../api/connection/index";
import { useNavigation } from "@react-navigation/native";

export const Find = () => {
  const {navigate} = useNavigation();
  const toast = useToast();
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleFindPool() {
    if(!code.trim()) {
      return toast.show({
        title: 'Digite o código do bolão',
        placement: 'top',
        bgColor: 'red.900'
      });
    }
    try {
      setLoading(true);
      await api.post("/pools/join", {code});

      toast.show({
        title: 'Você entrou no bolão!',
        placement: 'top',
        bgColor: 'green.900'
      });

      setCode("");
      navigate("pools");
    }catch(error: any) {
      setLoading(false);
      if(error.response?.data?.message === 'Bolão não encontrado') {
        return toast.show({
          title: 'Bolão não encontrado',
          placement:'top',
          bgColor: 'red.900',
        })
      }

      if(error.response?.data?.message === 'Você já faz parte deste Bolão') {
        return toast.show({
          title: 'Você já faz parte deste Bolão',
          placement:'top',
          bgColor: 'red.900',
        })
      }
     
    }
  }

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title={"Buscar por código"} showBackButton />
      <VStack mt={8} mx={5} alignItems={"center"}>
        <Heading fontFamily={"heading"} color={"white"} fontSize={"xl"} mb={8} textAlign={"center"}>
        Encontre um bolão através de seu código único
        </Heading>
        <Input 
          mb={2}
          placeholder={"Qual o código do bolão?"}
          onChangeText={setCode}
          value={code}
          autoCapitalize={'characters'}
        />
        <Button 
          title="BUSCAR BOLÃO" 
          onPress={handleFindPool} 
          isLoading={false}
          _loading={{_spinner: {color: 'white'}}}
        />
      </VStack>
    </VStack>
  )
}