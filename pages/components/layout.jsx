import { Rubik } from 'next/font/google'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from './navbar'
import Footer from './footer';

const rubik = Rubik({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Check if the current route is the login page
    const isLoginPage = router.pathname === '/login';
    const isregisterPage = router.pathname === '/register';
    const iscompleteprofilePage = router.pathname === '/complete_profile';
    const isindexPage = router.pathname === '/';

    setShowNavbar((!isLoginPage) && (!isregisterPage) && (!iscompleteprofilePage));
    setShowFooter(isindexPage);

  }, [router.pathname]);


  return (
    <>
      <div className={rubik.className}>
        {showNavbar && <Navbar />}
        {children}
        {showFooter && <Footer />}
      </div>
    </>
  )
}