import React, { useEffect, useState } from 'react';
import { Box, FlatList, useToast } from 'native-base';
import { api } from '../../api/connection';
import { Game, GameProps } from '@components/Game/Game.comp';
import { Loader } from '@components/Loader';
import { EmptyMyPoolList } from '@components/EmptyMyPoolList/EmptyMyPoolLis.comp';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const toast = useToast();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  console.log(poolId, code);

  useEffect(() => {
    getGames();
  }, [poolId]);

  async function getGames() {
    try {
      setLoading(true);
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    }catch(err) {
      setLoading(false);
      toast.show({
        title: "Não foi possível carregar os jogos",
        placement: 'top',
        bgColor: "red.900"
      });
    }finally {
      setLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Você precisa enviar um palpite para o jogo",
          placement: 'top',
          bgColor: "red.900"
        });
      }
      
      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite realizado com sucesso",
        placement: 'top',
        bgColor: "green.900"
      });

      getGames().then();
    }catch(err) {
      console.log(err);
      setLoading(false);
      toast.show({
        title: "Não foi possível enviar um palpite neste jogo",
        placement: 'top',
        bgColor: "red.900"
      });
    }
  }

  if(loading) {
    return (
      <Loader />
    )
  }

  return (
    <FlatList 
      data={games}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Game
          data={item}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          setFirstTeamPoints={setFirstTeamPoints} 
          setSecondTeamPoints={setSecondTeamPoints} 
        />
      )}
      ListEmptyComponent={() => (
        <EmptyMyPoolList code={code} />
      )}
      _contentContainerStyle={{ pb: 10 }}
    />
  );
}
