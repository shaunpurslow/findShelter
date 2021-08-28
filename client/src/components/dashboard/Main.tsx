import '../../styles/dashboard/Main.scss';

// Will display items on the dashboard
const Main = () => {
  return (
    <>
      <div>
        <h2>For Overview Component</h2>
        <li>Capacity Card</li>
        <li>Queue Card</li>
        <li>Beds Remaining</li>
      </div>
      <div>
        <h2>For Reservation Component</h2>
        <li>Basic information of guest</li>
        <li>Shelter that did the reservation (if applies)</li>
        <li>Within cards</li>
      </div>
      <div>
        <h2>For Shelters Component</h2>
        <li>Shelters Near Me</li>
        <li>Organized by proximity</li>
        <li>Within cards</li>
      </div>
      <div>
        <h2>For Guests Component</h2>
        <li>List of guests that registered in that shelter and their status/notes</li>
        <li>Within a card</li>
      </div>
      <div>
        <h2>For My Shelter Component</h2>
        <li>Registration form for edit</li>
      </div>
    </>
  );
};

export default Main;
