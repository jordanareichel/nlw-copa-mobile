import { Header } from "@components/Header/Header.comp";
import { Loader } from "@components/Loader";
import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Pools } from "../../api/models/Pools";
import { api } from "../../api/connection";
import { PoolHeader } from "@components/PoolHeader/PoolHeader.comp";
import { EmptyMyPoolList } from "@components/EmptyMyPoolList/EmptyMyPoolLis.comp";
import { Option } from "@components/Option/Option.comp";
import { Share } from "react-native";
import { Guesses } from "@components/Guesses/Guesses.comp";

interface RouteParams {
  id: string;
}

export const Details = () => {
  const route = useRoute();
  const {id} = route.params as RouteParams;

  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<'guesses' | 'ranking'>('guesses');
  const [poolDetails, setPoolDetails] = useState<Pools>({} as Pools);

  useEffect(() => {
    getFindPoolDetails();
  }, [id]);

  async function getFindPoolDetails() {
    try {
      setLoading(true);

      const response =  await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    }catch(err) {
      setLoading(false);
      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: 'top',
        bgColor: "red.900"
      })
    }finally {
      setLoading(false);
    }
  }

  async function handlePoolShare() {
    await Share.share({
      message: poolDetails.code,
      title: 'Você foi convidado para participar do bolão'
    })
  }

  if(loading) {
    return (
      <Loader />
    )
  }
  

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header 
        title={poolDetails.title} 
        showBackButton 
        showShareButton
        onShare={handlePoolShare} 
      />
      {poolDetails._count?.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor={"gray.800"} p={1} rounded="sm" mb={5}>
            <Option 
              title="Seus palpites" 
              isSelected={selected === 'guesses'} 
              onPress={() => setSelected('guesses')}
            />
            <Option 
              title="Ranking do grupo"  
              isSelected={selected === 'ranking'} 
              onPress={() => setSelected('ranking')}
            />
          </HStack>
          <Guesses poolId={poolDetails.id} code={poolDetails.code} />
        </VStack>
      ): (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  )
}