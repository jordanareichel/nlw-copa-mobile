import { Center, Spinner } from 'native-base';
import React from 'react';


export const Loader = () => {
  return (
    <Center flex={1} bgColor={"gray.900"}>
      <Spinner color={"yellow.500"} />
    </Center>
  )
}