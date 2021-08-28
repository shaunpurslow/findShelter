import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import '../../styles/dashboard/Dashboard.scss';


function Dashboard() {
  return (
    <>
      <div className='dashboard-view'>
        <Sidebar />
        <section className='dashboard'>
          <Header />
          <Main />
        </section>
      </div>
    </>
  )
}

export default Dashboard;