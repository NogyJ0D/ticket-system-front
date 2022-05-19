import HeaderNav from '../components/HeaderNav'
import { Outlet } from 'react-router-dom'
import FootNav from '../components/FootNav'

const HomeLayout = () => {
  return (
    <>
      <header className='hidden sm:flex px-2 bg-blue-500'>
        <HeaderNav />
      </header>

      <main className='flex flex-col items-center pt-4 pb-16'>
        <Outlet />
      </main>

      <footer className='fixed bottom-0 w-full sm:hidden'>
        <FootNav />
      </footer>
    </>
  )
}

export default HomeLayout
