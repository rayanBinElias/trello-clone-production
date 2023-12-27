import Board from '@/components/Board'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main>
      {/* Header */}
      <Header/>

      {/* Body */}
      <Board/>

      {/* Footer */}
      <footer className='flex items-center justify-center px-5 py-2 md:py5'>Trello Clone made by Ray</footer>
    </main>
  )
}