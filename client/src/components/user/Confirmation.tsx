import '../../styles/user/Confirmation.scss'
import Footer from './Footer'
import Header from './Header'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const Confirmation = () => {
  return (
    <main className='confirmation__container'>
      <Header />
      <div className='confirmation__section'>
        <div className='header__section'>
          <CheckCircleIcon className='check__icon' />
          <h1 className='title'>Reservation Request Sent</h1>
        </div>
        <p className='message'>
          We have received your reservation request. You will be contacted once your reservation is booked. 
        </p>
      </div>
    <Footer />
  </main>
  )
}

export default Confirmation
