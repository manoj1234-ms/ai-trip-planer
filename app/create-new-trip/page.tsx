import React from 'react'
import Chatbox from './_components/Chatbox'

function CreateNewTrip ()  {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-'>
      <div>
        <Chatbox/>
      </div>

      <div>
        Map And trip planto display
      </div>
    </div>
  )
}

export default CreateNewTrip 
