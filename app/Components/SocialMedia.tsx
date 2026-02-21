import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

const SocialMedia: React.FC = () => {
    return (
        <div className='hidden lg:flex flex-col top-[35%] left-0 fixed'>
            <ul>
                <li className='flex justify-between items-center w-36 h-12 px-4 bg-white -ml-23.75 hover:-ml-2.5'>
                    <a
                        className='flex justify-between w-full font-bold z-50 text-black'
                        href="https://www.linkedin.com/in/lorensius-bernard-gani"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                        <FaLinkedin size={25} className='text-black'/>
                    </a>
                </li>
                <li className='flex justify-between items-center w-36 h-12 px-4 bg-white -ml-23.75 hover:-ml-2.5'>
                    <a
                        className='flex justify-between w-full font-bold z-50 text-black'
                        href="https://github.com/LorensiusGani"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <span>Github</span>
                        <FaGithub size={25} className='text-black'/>
                    </a>
                </li>
                <li className='flex justify-between items-center w-36 h-12 px-4 bg-white -ml-23.75 hover:-ml-2.5'>
                    <a
                        className='flex justify-between w-full font-bold z-50 text-black'
                        href="https://www.instagram.com/lorensius.gani/"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                       <span>Instagram</span>
                       <FaInstagram size={25} className='text-black'/>
                    </a>
                </li>
                <li>

                </li>
            </ul>
        </div>
    )
}

export default SocialMedia