import { Container, Image, Info, Actions, Filters, Numbers, Details, Card, Wrapper } from './styles';
import { Button } from '../StyledComponents/buttons';

interface Props {
  key: number;
  name: string;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  thumbnail_url: string;
  website_url: string;
  capacity: number;
  couples: boolean;
  female_only: boolean;
  male_only: boolean;
  family: boolean;
  pets: boolean;
}

const filters = (boolean) => (boolean ? '/img/yes.svg' : '/img/no.svg');

export const Shelter = (props: Props) => {
  return (
    <Container>
      <Image>
        <img src={props.thumbnail_url} alt='shelter' />
      </Image>

      <Info>
        <h2>{props.name}</h2>

        <Filters>
          <span>
            <h4>female</h4>
            <img src={filters(props.female_only)} alt='female only' />
          </span>
          <span>
            <h4>male</h4>
            <img src={filters(props.male_only)} alt='male only' />
          </span>
          <span>
            <h4>couples</h4>
            <img src={filters(props.couples)} alt='couples' />
          </span>
          <span>
            <h4>families</h4>
            <img src={filters(props.family)} alt='family' />
          </span>
          <span>
            <h4>pets</h4>
            <img src={filters(props.pets)} alt='pets' />
          </span>
        </Filters>

        <Details>
          <span>
            <img src='/img/location.svg' alt='location' />
            <p>
              {props.street_address}, {props.city}/{props.province},{' '}
              {props.postal_code}
            </p>
          </span>
          <span>
            <img src='/img/phone.svg' alt='phone' />
            <p>{props.phone}</p>
          </span>
          <span>
            <img src='/img/email.svg' alt='email' />
            <p>{props.email}</p>
          </span>
          <span>
            <img src='/img/website.svg' alt='website' />
            <p>{props.website_url}</p>
          </span>
          <strong>3 km away from here!</strong>
        </Details>
      </Info>
      <Wrapper>
        <Numbers>
          <Card>
            <header>QUEUE</header>
            <strong>3</strong>
          </Card>
          <Card>
            <header>CONFIRMED</header>
            <strong>3</strong>
          </Card>
          <Card>
            <header>CAPACITY</header>
            <strong>{props.capacity}</strong>
          </Card>
          <Card>
            <header>BEDS LEFT</header>
            <strong>44</strong>
          </Card>
        </Numbers>

        <Actions>
          <Button>Directions</Button>
          <Button>Reserve</Button>
        </Actions>
      </Wrapper>
    </Container>
  );
};