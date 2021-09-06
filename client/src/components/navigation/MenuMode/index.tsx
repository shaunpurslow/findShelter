import { useState } from 'react';
import { SearchMap } from '../SearchMap';
import Search from '../Search';
import { Menu, Wrapper, DivMode } from './styles';

const MODES = {
  LIST: 'LIST',
  MAP: 'MAP',
};

export const MenuMode = () => {
  const [mode, setMode] = useState(MODES.LIST);
  const [activeSearch, setActiveSearch] = useState(false);

  const switchToListSearchMode = () => {
    setMode(MODES.LIST);
  };

  const switchToMapSearchMode = () => {
    setMode(MODES.MAP);
  };

  return (
    <Wrapper
      activeSearch={activeSearch}
    >
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
      {
        mode === MODES.LIST ?
          <Search
            activeSearch={activeSearch}
            setActiveSearch={setActiveSearch}
          />
          :
          <SearchMap
            activeSearch={activeSearch}
            setActiveSearch={setActiveSearch}
          />
      }
    </Wrapper>
  )
};