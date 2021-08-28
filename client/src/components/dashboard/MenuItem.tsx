import '../../styles/dashboard/MenuItem.scss';
import classNames from "classnames";

const MenuStatus = 'classes'
// classNames('day-list__item', {
//   'day-list__item--full': !props.spots,
//   'day-list__item--selected': props.selected
// })

const MenuItem = () => {
  return (
    <li
      onClick={() => console.log('Clicked!!!')}
      className={MenuStatus}
    >
      <img src='/img/guests.svg' alt='guests' />
      <h2>Overview</h2>
    </li>
  );
};

export default MenuItem;