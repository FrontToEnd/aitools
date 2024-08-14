import { handleSearch } from '@/app/actions'
import { Search } from '@/components/search'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
      <div className="min-h-screen">
        <header className="flex items-center pl-10 h-20 shadow-md cursor-pointer">
          <Image
            src="/logo.png"
            alt="AI Tools Logo"
            width={40}
            height={40}
            priority
            className={'rounded-full'}
          />
          <span className={'select-none font-bold ml-4 text-2xl'}>Top AI Tools</span>
        </header>
        <main className="relative flex flex-col items-center justify-center" style={{ 'height': 'calc(100vh - 80px)' }}>
          <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            Search Your AI Tools
          </h1>
          <div className="bg-white/30 p-6 lg:p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-4xl mx-auto w-full">
            <div className="divide-y divide-gray-900/5 w-full">
              <Search searchPokedex={handleSearch} />
            </div>
          </div>
          <div className="mt-12 w-full flex items-center justify-between px-6 ">
            <Link
              href="https://github.com/FrontToEnd/aitools"
              className="lg:absolute bottom-12 right-12 flex items-center space-x-2"
            >
              <Image
                src="/github.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
                priority
              />
              <span className="font-light">Source</span>
            </Link>
          </div>
        </main>
      </div>
  )
}
