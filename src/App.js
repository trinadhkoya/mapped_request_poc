import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput
} from "react-native";
import { get } from "./utils/client";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userQuery, setUserQuery] = useState("latest");

  useEffect(() => {
    setIsLoading(true);
    get(`search/movie?language=en-US&query=${userQuery}`)
      .then((res) => {
        console.log(res);

        setData((data) => res);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
    return () => {};
  }, [userQuery]);

  const renderItem = ({ item }) => {
    return <Text>{item.author}</Text>;
  };

  const onChangeText = (value) => {
    console.log(value);

    setUserQuery(value);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message.toString() || error.toString}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput value={userQuery} onChangeText={onChangeText} />
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}
