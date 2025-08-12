'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios, { Axios } from 'axios'
import { Loader, Send } from 'lucide-react'
import React, { useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import SelectDays from './SelectDays'
import FinalUi from './FinalUi'

type Message = {
  role:string,
  content: string,
  ui?: string 
}

function ChatBox () {
   
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>();
    const [loading, setLoading] = useState(false);

    const onSend = async() => {
      if(!userInput?.trim()) 
      {
        return;
      }
      setLoading(true);
      setUserInput('');
      const newMsg:Message= {
        role: 'user',
        content: userInput,
      }

      setMessages((prev:Message[]) => [...prev, newMsg]);

        const result = await axios.post('/api/aimodel',{
          messages:[...messages,newMsg]
        }
        );

        setMessages((prev:Message[]) => [...prev, {
          role: 'assistant',
          content: result?.data?.resp,
          ui: result?.data?.ui
        }]);
   
      // console.log(result.data);
      setLoading(false);
    }

    const RenderGenerativeUi = (ui:string ) => {
      if(ui == 'budget'){
        //Budget UI Components
        return <BudgetUi onSelectOption = {(v:string) => {setUserInput(v); onSend()}}/>
      }
      else if(ui == 'groupSize'){
        //groupSize ui component
        return <GroupSizeUi onSelectOption = {(v:string) => {setUserInput(v); onSend()}}/> 
      }
      else if(ui == 'tripDuration'){
        // triDuration Ui components
         return <SelectDays onSelectOption = {(v:string) => {setUserInput(v); onSend()}}/> 
        
      }
      else if(ui == 'final'){
        // final Ui components
        return <FinalUi viewTrip ={() => console.log()} />
      }
      return null;
    }

  return (
    <div className='h-[83vh] flex flex-col'>

      {messages?.length == 0 && 
      <EmptyBoxState  onSelectOption = {(v:string) => {setUserInput(v); onSend()}}/>
      }
        {/* Display Message */}
      <section className='flex-1 overflow-y-auto p-4'>
        {messages.map((msg: Message, index) => (
            msg.role == 'user'?
             <div className="flex justify-end mt-2" key={index}>
         <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                  {msg.content}
         </div>
       </div>:

        <div className="flex justify-start mt-2" key={index}>
         <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                  {  msg.content}
                  {RenderGenerativeUi(msg.ui??'')}
         </div>
       </div>
        ))}

        {loading && <div className="flex justify-start mt-2" >
         <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                  <Loader className='animate-spin'/>
         </div>
       </div>}
      
      </section>
       
       {/* user Input */}
      <section>
        <div className='border-rounded-2xl p-4 relative'>
                    <Textarea placeholder='Create plan here....'
                      className='w-full h-28 bg-transparent border-2 focus-visible:ring-0 shadow-none '
                      onChange={(event) => setUserInput(event.target.value?? '')}
                      value={userInput}
                     /> 

                     <Button size={'icon'} className='absolute  bottom-6 right-6' onClick={()=> onSend()}>
                       <Send className='h-4 w-4'/>
                    </Button> 
                </div>
      </section>
    </div>
  )
}

export default ChatBox
