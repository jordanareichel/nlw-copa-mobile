
import React, { useCallback, useState } from 'react';
import { Button } from '@components/Button';
import { Header } from '@components/Header/Header.comp';
import { VStack, Icon, useToast, FlatList } from 'native-base';
import {Octicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { api } from '../../api/connection';
import { PoolCard } from '@components/PoolCard/PoolCard.comp';
import { Loader } from '@components/Loader';
import { Pools as PoolsInterface } from '../../api/models/Pools';
import { EmptyPoolList } from '@components/EmptyPoolList/EmptyPoolList.comp';
import { useFocusEffect } from '@react-navigation/native';

export const Pools = () => {
  const {navigate} = useNavigation();
  const toast = useToast();

  const [pools, setPools] = useState<PoolsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useFocusEffect(useCallback(() => {
    listPools();
  }, []));


  async function listPools() {
    try {
      setLoading(true);
      const response = await api.get("/pools");
      setPools(response.data.pools);
    }catch (err) {
      setLoading(false);
      toast.show({
        title: "Você não possui bolões criados!",
        placement: 'top',
        bgColor: "red.900"
      })
    }finally {
      setLoading(false);
    }
  }


  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title={"Meus bolões"}/>
      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor={"gray.600"} pb={4} mb={4}>
        <Button 
          title={"BUSCAR BOLÃO POR CÓDIGO"}
          leftIcon={<Icon as={Octicons} 
            name={"search"} 
            color={"black"} 
            size={"md"}
          />}
          onPress={() => navigate("find")}
        />
      </VStack>
     {loading ? (
      <Loader />
     ): (
        <FlatList 
        data={pools}
        keyExtractor={item  => item.id}
        renderItem={({item}) => (
          <PoolCard 
            data={item}
            onPress={() => navigate("details", {id: item.id})}
          />
        )}
        px={5}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ pb: 10 }}
        ListEmptyComponent={() => (
          <EmptyPoolList />
        )}
      />
     )}
    </VStack>
  )
}