import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown } from 'lucide-react'

export default function Header() {
    return (
        <header className='flex justify-between items-center'>
            <Link className='text-4xl font-["Archivo"] font-black' to='/'>TilaTikki</Link>
            <nav className='flex gap-2 items-center'>
                <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" />
                    <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <p>Arto Aitta</p>
                <ChevronDown />
            </nav>
        </header>
    )
}
