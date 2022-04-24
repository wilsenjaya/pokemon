/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
import {
  Box,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

type Props = {
  abilities?: Array<{
    ability: {
      name: string;
    };
  }>;
  moves?: Array<{
    move: {
      name: string;
    };
  }>;
};

const PokemonDetailData = ({ abilities, moves }: Props) => (
  <Box
    p={4}
    boxShadow="xl"
    textAlign="center"
    borderWidth="1px"
    borderRadius="2xl"
    height="fit-content"
  >
    <Tabs>
      <TabList>
        <Tab>Moves</Tab>
        <Tab>Abilities</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {moves?.map((item, index) => (
            <Badge key={index} px={2} py={1} m={1} fontWeight="400">
              {item.move.name}
            </Badge>
          ))}
        </TabPanel>
        <TabPanel>
          {abilities?.map((item, index) => (
            <Badge key={index} px={2} py={1} m={1} fontWeight="400">
              {item.ability.name}
            </Badge>
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default PokemonDetailData;
