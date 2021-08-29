import '../../styles/dashboard/Header.scss';

interface Props {
  currentMenu: string;
  first_name: string;
  last_name: string;
  thumbnail_url: string;
}

const Header = (props: Props) => {
  return (
    <header className='dashboard-header'>
      <h1>{props.currentMenu}</h1>
      <span className='dashboard-right-header'>
        <img src='/img/search.svg' alt='search' />
        <img src='/img/divider.svg' alt='divider' />
        <h3>{props.first_name + ' ' + props.last_name}</h3>
        <img src={props.thumbnail_url} alt='logo' />
      </span>

    </header>
  );
};

export default Header;
