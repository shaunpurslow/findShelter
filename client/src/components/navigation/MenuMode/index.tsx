import { useState } from 'react';
import { SearchMap } from '../SearchMap';
import Search from '../Search';
import { Menu, Wrapper, DivMode, SearchBar } from './styles';

const MODES = {
  LIST: 'LIST',
  MAP: 'MAP',
};

export const MenuMode = () => {
  const [mode, setMode] = useState(MODES.LIST);

  const switchToListSearchMode = () => {
    setMode(MODES.LIST);
  }

  const switchToMapSearchMode = () => {
    setMode(MODES.MAP);
  }

  return (
    <Wrapper>
      <Menu>
        <DivMode
          mode={mode === MODES.LIST}
          onClick={switchToListSearchMode}>
          search
        </DivMode>
        <DivMode
          mode={mode === MODES.MAP}
          onClick={switchToMapSearchMode}>
          map
        </DivMode>
      </Menu>
      <SearchBar>
        {
          mode === MODES.LIST ?
            <Search /> :
            <SearchMap />
        }
      </SearchBar>
    </Wrapper>
  )
};