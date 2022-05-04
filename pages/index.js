import Head from 'next/head'
import About from '../comps/About'
import Featured from '../comps/Featured'
import { featuredData } from '../comps/Homedata'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Featured data={featuredData}/>
        <About />
      </main>
      
    </div>
  )
}
