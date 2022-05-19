import TicketForm from '../components/TicketForm'

const Home = () => {
  document.title = 'Tickets - Home'

  return (
    <div className='flex flex-col items-center w-full gap-8 py-4'>
      <TicketForm />
    </div>
  )
}

export default Home
