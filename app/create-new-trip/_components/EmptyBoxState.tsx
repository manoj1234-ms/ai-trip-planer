import { suggestions } from '@/app/components/Hero'
import React from 'react'

const EmptyBoxState = ({onSelectOption}: any) => {
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-3xl text-center'>Start Planning new <strong className='text-primary'>Trip</strong> using AI </h2>
      <p className='text-center mt-2 ml-5 text-gray-400'>Experience a personalized journey crafted by AI, tailored to your preferences, budget, and style. From hidden gems to iconic landmarks, enjoy
         seamless itineraries, smart travel tips, and real-time updates—making your trip unforgettable, stress-free, and uniquely yours.
      </p>
    
    <div className='flex flex-col gap-5 mt-6'>
                {suggestions.map((suggestions,index) => (
                    <div key = {index}
                    onClick={() => onSelectOption(suggestions.title)}
                     className='flex items-center gap-2 border rounded-xl
                    p-3 cursor-pointer hover:border-primary hover:text-primary transition-all'>
                        {suggestions.icon}
                        <h2 className='text-lg'>{suggestions.title}</h2>
                    </div>
                ))}
            </div>

    </div>
  )
}

export default EmptyBoxState
