import { createFileRoute } from '@tanstack/react-router'
import HTMLFlipBook from 'react-pageflip'
import React, { useRef, useState } from 'react'
import { beyondAccommodationsPages } from '#/lib/pages'
import { Separator } from '#/components/ui/separator'
import { Button } from '#/components/ui/button'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

const PageCover = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <div
    ref={ref}
    className="bg-purple-300 text-purple-950 flex items-center justify-center h-full p-8"
  >
    {children}
  </div>
))

const Page = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; number?: number }
>(({ children, number }, ref) => (
  <div
    ref={ref}
    className="bg-white flex flex-col h-full p-1 relative overflow-hidden"
  >
    <div className="flex-1">{children}</div>
  </div>
))

function App() {
  const flipBookRef = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = beyondAccommodationsPages.length

  const handlePrev = () => flipBookRef.current?.pageFlip().flipPrev()
  const handleNext = () => flipBookRef.current?.pageFlip().flipNext()
  const handleReset = () => flipBookRef.current?.pageFlip().turnToPage(0)

  return (
    <main className="flex flex-col items-center justify-center gap-5 h-svh overflow-hidden bg-[url(/public/01_beyond_accommodations/front.jpg),url(/public/01_beyond_accommodations/back.jpg)] bg-contain relative p-5">
      <div className="bg-linear-to-br from-black/95 via-purple-950/95 to-black/95 h-full w-full absolute left-0 top-0"></div>
      <h1 className="text-purple-50 text-2xl md:text-3xl lg:text-6xl text-center text-balance font-medium z-10 font-display3">
        Disability Dialogues, Beyond Accommodation
      </h1>
      <div className="max-w-5xl w-full flex flex-col md:grid grid-cols-5">
        <div className="text-purple-50 text-xl hidden md:block z-10 px-2 ">
          <h2 className="text-2xl font-display3 ">The people who made this</h2>
          <Separator />
          <ul className="mt-5 space-y-2 text-xl">
            <li>Caroline Atwood</li>
            <li>Philip Bonanno</li>
            <li>Kristina Bowers</li>
            <li>Cora Butcher-Spellman</li>
            <li>Talia Kibsey</li>
            <li>Becca Ruger</li>
            <li>Dana Walden</li>
          </ul>
        </div>

        <HTMLFlipBook
          ref={flipBookRef}
          width={550}
          height={733}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          autoSize={true}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{}}
          className="shadow-lg book-cover col-start-2 col-span-5"
          onFlip={(e) => setCurrentPage(e.data)}
        >
          {beyondAccommodationsPages.map((page, index) => (
            <Page number={index + 1} key={index}>
              <img className="h-full w-full" src={page.src} />
            </Page>
          ))}
        </HTMLFlipBook>
      </div>
      <div className="z-10  grid grid-cols-3 items-center gap-x-4 gap-y-2">
        <span className="text-purple-200 text-sm text-center col-span-full">
          {currentPage + 1} / {totalPages}
        </span>
        <Button onClick={handlePrev} disabled={currentPage === 0}>
          <ArrowLeft /> Prev
        </Button>

        <Button onClick={handleReset}>
          Start Over <RotateCcw />
        </Button>
        <Button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          Next <ArrowRight />
        </Button>
      </div>
      <div className="z-10 text-purple-100 flex  item-center justify-center text-sm md:text-lg gap-5 w-full">
        <a
          target="_blank"
          href="https://drive.google.com/file/d/1ihTxrP9KWmk-u2QSRKHlgTpPFMrdwgSG/view?usp=drive_link"
          className="hover:underline text-center "
        >
          Download PDF
        </a>
        <Separator orientation="vertical" />
        <a
          target="_blank"
          href="https://drive.google.com/file/d/1CkLrSppq0qnEsjU_jkXr5jCZQu3UyLuu/view?usp=drive_linkk"
          className="hover:underline text-center "
        >
          Download Fold-Your-Own Printable
        </a>
      </div>
    </main>
  )
}
