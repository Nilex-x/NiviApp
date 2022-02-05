import GQLClient from './src/Graphql/GraphqlConfig';
import { ApolloProvider } from '@apollo/client';
import "./src/config/i18nConfig";
import Navigation from './src/screen/Navigation';


const client = GQLClient.getIntance()?.getClient()

export default function App() {

  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}
