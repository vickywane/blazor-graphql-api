const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const typeDefs = gql`
  type Country {
    id: Int
    name: String
    code: String
    dateInserted: String
    states: [State]
  }

  type State {
    id: Int
    name: String
  }

  input StateInput {
	id: Int
    name: String
  }

  input CountryInput {
    id: Int
    name: String
    code: String
	states: [StateInput]
  }

  type Query {
    countries: [Country]
  }

  type Mutation {
    CreateCountry(input: CountryInput): Country
  }
`;

const localData = [
  {
    id: 1,
    name: "America",
    code: "+1",
    dateInserted: new Date(),
    states: [
      { name: "Texas", id: 1 },
      { name: "Arizona", id: 2 },
      { name: "Oregon", id: 3 },
      { name: "Michigan", id: 4 },
    ],
  },
  {
    id: 2,
    name: "Greece",
    code: "+30",
    dateInserted: new Date(),
    states: [
      { name: "Athens", id: 1 },
      { name: "Sparta", id: 2 },
      { name: "Thebes", id: 3 },
      { name: "Eretria", id: 4 },
    ],
  },
];

const resolvers = {
  Query: {
    countries: () => localData,
  },
  Mutation: {
    CreateCountry: (_, { input }) => {
      const { id, name, code, states } = input;

      const data = {
        id : 1,
        name,
        code,
        dateInserted: new Date(),
      };

      localData.push(data);

      return {
        id,
        name,
			code,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen()
  .then(({ url }) => console.log(`Server running at ${url}`))
  .catch((e) => console.log(e));
