import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircle } from 'lucide-react'

const TrailerSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            
            <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>
                Trailer
            </p>

            <div className='relative mt-6'>
                <BlurCircle top='-100px' right='-100px' />

                <div className="mx-auto max-w-[960px] aspect-video">
                    <ReactPlayer
                        url={currentTrailer.videoUrl}
                        controls
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>

            <div className='grid grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mt-8'>
                {dummyTrailers.map((trailer) => (
                    <div
                        key={trailer.image}
                        className="relative hover:-translate-y-1 transition duration-300 max-md:h-60 md:h-60 cursor-pointer"
                        onClick={() => setCurrentTrailer(trailer)}
                    >
                        <img
                            src={trailer.image}
                            alt="trailer"
                            className='rounded-lg w-full h-full object-cover brightness-75 hover:brightness-100 transition'
                        />

                        <PlayCircle
                            strokeWidth={1.6}
                            className="absolute top-1/2 left-1/2 w-6 md:w-10 h-6 md:h-10 transform -translate-x-1/2 -translate-y-1/2 text-white"
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TrailerSection