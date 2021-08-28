import '.././styles/Footer.scss';
// import HomeIcon from '@material-ui/icons/Home';
const Footer = () => {
  return (
    <footer>
      <div className='copyright'>
        <p>&copy; 2021 |</p>
        <div className='footer__logo'>
          {/* <HomeIcon />
          <p>findShelter</p> */}
          <img src="/img/find-shelter.png" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
