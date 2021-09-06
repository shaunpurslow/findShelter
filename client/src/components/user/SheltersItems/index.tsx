import Shelter from '../../newDashboard/Shelter';

const SheltersItems = ({ shelters }) => {
  const sheltersArray = shelters.map((shelter) => (
    <Shelter
      id={shelter.id}
      key={shelter.id}
      name={shelter.name}
      street_address={shelter.street_address}
      city={shelter.city}
      province={shelter.province}
      postal_code={shelter.postal_code}
      country={shelter.country}
      phone={shelter.phone}
      email={shelter.email}
      thumbnail_url={shelter.thumbnail_url}
      website_url={shelter.website_url}
      capacity={shelter.capacity}
      couples={shelter.couples}
      female_only={shelter.female_only}
      male_only={shelter.male_only}
      family={shelter.family}
      pets={shelter.pets}
      confirmedReservations={shelter.confirmed_reservations}
      unconfirmedReservations={shelter.not_confirmed_reservations}
    />
  ));
  return (
    <>
      {sheltersArray}
    </>
  );
};

export default SheltersItems;
