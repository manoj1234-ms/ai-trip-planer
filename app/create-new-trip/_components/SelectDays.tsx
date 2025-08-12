'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'

function SelectDays({ onSelectOption }: any) {
  const [days, setDays] = useState(1)

  const incrementDays = () => {
    setDays(prev => prev + 1)
  }

  const decrementDays = () => {
    setDays(prev => Math.max(1, prev - 1))
  }

  const handleConfirm = () => {
    onSelectOption(`${days} days`)
  }

  return (
    <div className='w-full mt-4'>
      <h2 className='font-bold text-center text-lg mb-6'>How many days do you want to travel?</h2>
      
      <div className='flex flex-col items-center gap-6'>
        {/* Days Counter */}
        <div className='flex items-center gap-4'>
          <Button
            variant="outline"
            size="icon"
            onClick={decrementDays}
            className='h-12 w-12 rounded-full'
          >
            <Minus className='h-5 w-5' />
          </Button>
          
          <div className='text-4xl font-bold text-primary min-w-[80px] text-center'>
            {days} Days
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={incrementDays}
            className='h-12 w-12 rounded-full'
          >
            <Plus className='h-5 w-5' />
          </Button>
        </div>

        {/* Days Label
        <div className='text-gray-600'>
          {days === 1 ? 'day' : 'days'}
        </div> */}

        {/* Confirm Button */}
        <Button
          onClick={handleConfirm}
          className='px-8 py-2 rounded-full'
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default SelectDays
