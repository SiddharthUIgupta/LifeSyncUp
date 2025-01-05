import SmartPlanner from './components/SmartPlanner'
import StudyBuddy from './components/StudyBuddy'
import HobbyTracker from './components/HobbyTracker'
import FriendConnect from './components/FriendConnect'
import MoodJournal from './components/MoodJournal'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">LifeSync</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SmartPlanner />
          <StudyBuddy />
          <HobbyTracker />
          <FriendConnect />
          <MoodJournal />
        </div>
      </main>
      <Footer />
    </div>
  )
}

