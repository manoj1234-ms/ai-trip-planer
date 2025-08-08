import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const menuOptions = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Pricing',
        href: '/pricing'
    },
    {
        name: 'Contact Us',
        href: '/contact'
    }
 
]

function Header() {
    return (
        <div className="flex justify-between items-center p-4">
            {/* {Logo} */}
            <div className="flex gap-2  items-center">
               <Image src = {'/logo.svg'} alt= 'logo' width = {30} height = {30} />
               <h2 className="font-bold  text-2xl">TRIP WITH AI</h2>
            </div> 


            {/* Menu Options */}
            <div className="flex gap-8 items-center">
                {
                    menuOptions.map((item, index) => (
                        <Link key={index} href={item.href}>
                          <h2 className="text-lg hover:scale-105 transition-all hover:text-primary ">{item.name}</h2>
                        </Link>
                    ))
                }
            </div>
            {/* Get started button */}
            <div>
                <Button>Get's Started</Button>
            </div>
        </div>
    )
}

export default Header