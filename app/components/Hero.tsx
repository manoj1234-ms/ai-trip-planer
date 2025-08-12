'use client'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown, Globe2, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const suggestions = [
    {
        title: 'Create New Trip ',
        icon:<Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title: 'Inspire me where to go ',
        icon:<Globe2 className='text-green-400 h-5 w-5' />
    },
    {
        title: 'Discover Hidden gems ',
        icon:<Globe2 className='text-orange-400 h-5 w-5' />
    },
    {
        title: 'Adventure Destination ',
        icon:<Globe2 className='text-yellow-400 h-5 w-5' />
    },
]

function Hero () {

    const {user} = useUser();
    const router = useRouter()
    const onSend = () => {
        if(!user){
            router.push('/sign-in')
            return ;
        }
        // navigate to Create trip Planner web page
        router.push('/create-new-trip')
        
    }
return(
    <div className='mt-24 w-full flex justify-center'>
         {/* content */}
        <div className='max-w-3xl w-full text-center space-y-6 '>
           <h1 className='text-xl md:text-5xl font-bold'>Hey, I'm your personal <span className='text-primary'>Trip Planner</span></h1> 
           <p className='text-lg'>Tell me what you want, and I'll handle the rest: Flights, Hotels, trip Planner -- ll in seconds</p>
        
        {/* input box */}
            <div>
                <div className='border-rounded-2xl p-4 relative'>
                    <Textarea placeholder='Create a trip for london from Delhi'
                      className='w-full h-28 bg-transparent border-2 focus-visible:ring-0 shadow-none '
                     /> 

                     <Button size={'icon'} className='absolute  bottom-6 right-6' onClick={()=> onSend()}>
                       <Send className='h-4 w-4'/>
                    </Button> 
                </div>
            </div>

        {/* Suggestion list */}
        <div className='flex gap-5'>
            {suggestions.map((suggestions,index) => (
                <div key = {index} className='flex items-center gap-2 border rounded-full
                p-2 cursor-pointer hover:bg-primary hover:text-white transition-all'>
                    {suggestions.icon}
                    <h2 className='text-sm'>{suggestions.title}</h2>
                </div>
            ))}
        </div>
        
        <div className='flex items-center justify-center flex-col'>
            <h2 className='my-7 mt-14 flex gap-2 text-center'>Not Sure where to start? <strong>See hoe it works</strong> <ArrowDown/> </h2>
            {/* Video section */}
            <HeroVideoDialog
               className="block dark:hidden"
               animationStyle="from-left"
               videoSrc="https://www.youtube.com/embed/0NMIZ-PTt8k"
               thumbnailSrc="https://img.youtube.com/vi/0NMIZ-PTt8k/maxresdefault.jpg"
               thumbnailAlt="Trip Planner Demo Video"
            />
        </div>

        </div>
    </div>
)
}

export default Hero
