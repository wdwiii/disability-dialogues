import { createFileRoute } from '@tanstack/react-router'
import HTMLFlipBook from 'react-pageflip'
import React from 'react'
import { beyondAccommodationsPages } from '#/lib/pages'

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
    {/* {number !== undefined && (
      <div className="text-center text-sm text-gray-400">{number}</div>
    )} */}
  </div>
))

function App() {
  return (
    <main className=" flex flex-col items-center justify-center gap-5  h-svh overflow-hidden bg-[url(/public/01_beyond_accommodations/front.jpg),url(/public/01_beyond_accommodations/back.jpg)] bg-contain relative px-5">
      <div className="bg-linear-to-br from-black/95 via-purple-950/95 to-black/95 h-full w-full absolute left-0 top-0 "></div>
      <h1 className="text-purple-50 text-3xl lg:text-6xl text-center text-balance font-medium z-10 font-display3">
        Disability Dialogues: Beyond Accommodations
      </h1>
      <div className="max-w-5xl w-full">
        <HTMLFlipBook
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
          className="shadow-lg bg-purple-200"
        >
          {beyondAccommodationsPages.map((page, index) => (
            <Page number={index + 1} key={index}>
              <img className="h-full w-full" src={page.src} />
            </Page>
          ))}
        </HTMLFlipBook>
      </div>
    </main>
  )
}
