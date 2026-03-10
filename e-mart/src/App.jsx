import React from 'react'
import './App.css'
import { useRoutes, Navigate } from 'react-router-dom'
import { useUser } from './stores/context/UserContext'
import LandingPage from './stores/pages/LandingPage'
import MobilePage from './stores/pages/MobilePage'
import CompPage from './stores/pages/CompPage'
import WatchPage from './stores/pages/WatchPage'
import MenPage from './stores/pages/MenPage'
import WomanPage from './stores/pages/WomanPage'
import FurniturePage from './stores/pages/FurniturePage'
import AcPage from './stores/pages/AcPage'
import MobileSingle from './stores/singles/MobileSingle'
import UserCart from './stores/UserCart'
import FridgePage from './stores/pages/FridgePage'
import ComputerSingle from './stores/singles/ComputerSingle'
import FurnitureSingle from './stores/singles/FurnitureSingle'
import AcSingle from './stores/singles/AcSingle'
import MenSingle from './stores/singles/MenSingle'
import WatchSingle from './stores/singles/WatchSingle'
import WomanSingle from './stores/singles/WomanSingle'
import FridgeSingle from './stores/singles/FridgeSingle'
import RiceCookerPage from './stores/pages/RiceCookerPage'
import RiceCookerSingle from './stores/singles/RiceCookerSingle'
import SneakerPage from './stores/pages/SneakerPage'
import SneakerSingle from './stores/singles/SneakerSingle'
import Login from './stores/pages/Login'
import SearchPage from './stores/pages/SearchPage'
import PlaceholderPage from './stores/pages/PlaceholderPage'
import FanPage from './stores/pages/FanPage'
import FanSingle from './stores/singles/FanSingle'
import BooksPage from './stores/pages/BooksPage'
import BookSingle from './stores/singles/BookSingle'
import TvPage from './stores/pages/TvPage'
import TvSingle from './stores/singles/TvSingle'
import SpeakerPage from './stores/pages/SpeakerPage'
import SpeakerSingle from './stores/singles/SpeakerSingle'
import KitchenPage from './stores/pages/KitchenPage'
import KitchenSingle from './stores/singles/KitchenSingle'

const ProtectedRoute = ({ children }) => {
  const { user } = useUser()
  if (!user.isLogin) {
    return <Navigate to="/login" replace />
  }
  return children
}

const App = () => {
  const routes = [
    { path: '/', element: <ProtectedRoute><LandingPage /></ProtectedRoute> },
    { path: '/login', element: <Login /> },
    { path: '/mobiles', element: <ProtectedRoute><MobilePage /></ProtectedRoute> },
    { path: '/computers', element: <ProtectedRoute><CompPage /></ProtectedRoute> },
    { path: '/watch', element: <ProtectedRoute><WatchPage /></ProtectedRoute> },
    { path: '/fridge', element: <ProtectedRoute><FridgePage /></ProtectedRoute> },
    { path: '/men', element: <ProtectedRoute><MenPage /></ProtectedRoute> },
    { path: '/woman', element: <ProtectedRoute><WomanPage /></ProtectedRoute> },
    { path: '/furniture', element: <ProtectedRoute><FurniturePage /></ProtectedRoute> },
    { path: '/ac', element: <ProtectedRoute><AcPage /></ProtectedRoute> },
    { path: '/rice-cookers', element: <ProtectedRoute><RiceCookerPage /></ProtectedRoute> },
    { path: '/sneakers', element: <ProtectedRoute><SneakerPage /></ProtectedRoute> },
    { path: '/fans', element: <ProtectedRoute><FanPage /></ProtectedRoute> },
    { path: '/mobiles/:id', element: <ProtectedRoute><MobileSingle /></ProtectedRoute> },
    { path: '/cart', element: <ProtectedRoute><UserCart /></ProtectedRoute> },
    { path: '/ac/:id', element: <ProtectedRoute><AcSingle /></ProtectedRoute> },
    { path: '/computers/:id', element: <ProtectedRoute><ComputerSingle /></ProtectedRoute> },
    { path: '/furniture/:id', element: <ProtectedRoute><FurnitureSingle /></ProtectedRoute> },
    { path: '/men/:id', element: <ProtectedRoute><MenSingle /></ProtectedRoute> },
    { path: '/watch/:id', element: <ProtectedRoute><WatchSingle /></ProtectedRoute> },
    { path: '/woman/:id', element: <ProtectedRoute><WomanSingle /></ProtectedRoute> },
    { path: '/fridge/:id', element: <ProtectedRoute><FridgeSingle /></ProtectedRoute> },
    { path: '/rice-cookers/:id', element: <ProtectedRoute><RiceCookerSingle /></ProtectedRoute> },
    { path: '/sneakers/:id', element: <ProtectedRoute><SneakerSingle /></ProtectedRoute> },
    { path: '/fans/:id', element: <ProtectedRoute><FanSingle /></ProtectedRoute> },
    { path: '/books', element: <ProtectedRoute><BooksPage /></ProtectedRoute> },
    { path: '/books/:id', element: <ProtectedRoute><BookSingle /></ProtectedRoute> },
    { path: '/tv', element: <ProtectedRoute><TvPage /></ProtectedRoute> },
    { path: '/tv/:id', element: <ProtectedRoute><TvSingle /></ProtectedRoute> },
    { path: '/speakers', element: <ProtectedRoute><SpeakerPage /></ProtectedRoute> },
    { path: '/speakers/:id', element: <ProtectedRoute><SpeakerSingle /></ProtectedRoute> },
    { path: '/kitchen', element: <ProtectedRoute><KitchenPage /></ProtectedRoute> },
    { path: '/kitchen/:id', element: <ProtectedRoute><KitchenSingle /></ProtectedRoute> },
    { path: '/search/:term', element: <ProtectedRoute><SearchPage /></ProtectedRoute> },
    { path: '/profile', element: <ProtectedRoute><PlaceholderPage title="My Profile" /></ProtectedRoute> },
    { path: '/settings', element: <ProtectedRoute><PlaceholderPage title="Settings" /></ProtectedRoute> },
    { path: '/orders', element: <ProtectedRoute><PlaceholderPage title="My Orders" /></ProtectedRoute> },
    { path: '/wishlist', element: <ProtectedRoute><PlaceholderPage title="Wishlist" /></ProtectedRoute> },
  ]

  const element = useRoutes(routes)
  return element
}

export default App