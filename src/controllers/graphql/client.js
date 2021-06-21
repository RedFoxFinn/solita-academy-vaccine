import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://sda-vaccines.herokuapp.com/api',
  cache: new InMemoryCache()
});

export default client;