import { gql } from '@apollo/client';

export const REFRESH_ATLAS = gql`
  query refreshAtlas($which: String, $masterkey: String!) {
    refreshAtlas(which: $which, masterkey: $masterkey)
  }
`;