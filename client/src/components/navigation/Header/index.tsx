import { Head, Logo, Button } from './styles';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Head>
      <div>
        <Link to='/'>
          <Logo src='/img/find-shelter.svg' alt='logo' />
        </Link>
      </div>

      <span>
        <Link to='/login'>
          <Button>Sign in</Button>
        </Link>
        <Link to='/register'>
          <Button>Sign up</Button>
        </Link>
      </span>
    </Head>
  );
};
