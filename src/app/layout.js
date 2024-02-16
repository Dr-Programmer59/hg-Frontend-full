import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StoreProvider from '@/components/StoreProvider'
import UserProvider from '@/components/UserProvider'
import ProtectedRoute from '@/components/ProtectedRoute'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MessageProvider from '@/components/MessageProvider'
import { SocketProvider } from '@/Context/socketProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HG Live',
  description: 'HG Live is for streaming',
}

export default function RootLayout({ children }) {
  return (
    <SocketProvider>
        <StoreProvider>
          <UserProvider>
            <ProtectedRoute>
              <MessageProvider>
                <html lang="en">
                  <body className={inter.className}>
                      <Header/>
                        {children}
                      <Footer/>
                      <ToastContainer
                          position="top-center"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="colored"
                      />
                  </body>
                </html>
              </MessageProvider>
            </ProtectedRoute>
          </UserProvider>
        </StoreProvider>
        </SocketProvider>
  )
}
