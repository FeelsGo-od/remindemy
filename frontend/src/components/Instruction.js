import React, { useState } from "react";

export default function Navbar() {
    const [showInstruction, setShowInstruction] = useState(false)

    return (
        <div className='instruction'>
            <div className={`instruction-content ${showInstruction ? 'active' : ''}`}>
                <button className={showInstruction ? 'active' : ''} onClick={() => setShowInstruction(!showInstruction)}>{showInstruction ? 'Hide' : 'Show'} Instruction</button>
                <div className={`hidden-block ${showInstruction ? 'active' : ''}`}>
                    <h3 className='align-left pt-43'>How this app works: </h3>
                    <p className='align-left pt-23'>1. <a href='register'>Create new account</a> or <a href='/login'>login</a></p>
                    <p className='align-left pt-23'>2. Add new topic(s) on profile page</p>
                    <p className='align-left pt-23'>3. You can add text, images, or link to the topic you want this app to remind you.</p>
                    <p className='align-left pt-23'>
                    4. You will get email messages at specific time with 7-3-2-1 method for long-term memory.  
                    <a href='https://bettermarketing.pub/use-the-7-3-2-1-method-to-improve-your-long-term-memory-829a43a040f7?gi=4af9ba595253'>Read about it</a>
                    </p>
                </div>
            </div>
        </div>
    )
}