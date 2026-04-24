import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'

import ClerkProvider from '../integrations/clerk/provider'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Disability Dialogues, Beyond Accommodations',
      },
      {
        name: 'description',
        content:
          'Moving beyond accommodation frameworks and addressing the cultural elements facing disabled, sick, and neurodivergent graduate students/scholars in academia.',
      },
      {
        property: 'og:title',
        content: 'Disability Dialogues, Beyond Accommodation',
      },
      {
        property: 'og:description',
        content:
          'Moving beyond accommodation frameworks and addressing the cultural elements facing disabled, sick, and neurodivergent graduate students/scholars in academia.',
      },
      {
        property: 'og:image',
        content: `${import.meta.env.VITE_SITE_URL}/01_beyond_accommodations/og-image.jpg`,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap:anywhere max-h-screen  bg-[url(/01_beyond_accommodations/front.jpg),url(/01_beyond_accommodations/back.jpg)]">
        <ClerkProvider>
          {children}

          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </ClerkProvider>
        <Scripts />
      </body>
    </html>
  )
}
