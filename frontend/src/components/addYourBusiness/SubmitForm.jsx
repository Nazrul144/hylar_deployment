'use client'
import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useId } from "react"
import { Textarea } from "@/components/ui/textarea"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from '../ui/button'
import { XIcon } from 'lucide-react'

const SubmitForm = () => {
    const id = useId()
     const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    })
  const previewUrl = files[0]?.preview || null
  const fileName = files[0]?.file.name || null

  {/*Handle Submit Form*/}
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
 
    
  return (
    <div>
        <div className="w-full relative " >
      <Image
        src="/addBusiness/header.png"
        alt="header"
        width={1920}   // original image width
        height={300}   // desired header height
        className="object-cover w-full"
        priority
      />

      {/* Optional overlay text */}
      <div className="absolute inset-0 top-4 lg:top-28">
        <h1 className="text-white text-xl md:text-4xl lg:text-5xl font-bold text-center drop-shadow-lg inter-text">
          Welcome To Exclusive Discounts & Savings
        </h1>
        <h3 className='text-center text-sm lg:text-xl lg:mt-2 montserrat-text text-white'>Get access to curated deals across various categories</h3>
      </div>
        </div>
        {/*Submit Form*/}
        <div className='w-full  md:h-96 lg:w-[886px] lg:h-[1616px]  mx-auto lg:shadow-2xl rounded-sm'>
            <h1 className='text-center font-bold text-inter text-4xl pt-16 pb-12 common-text'>Submit A Request</h1>
                <form onSubmit={handleSubmit} className=' px-4 lg:px-16'>
                    <div className='mb-4'>
                    <Label htmlFor="email">Business Name</Label>
                    <Input className='mt-2 text-[#BFB4B4] border-1 border-[#00308F] h-14 text-xl' type="text" placeholder="Your business or brand name" />
                    </div>
                    <div className='mb-4'>
                    <Label htmlFor="email">Business Secto</Label>
                    <Input className='mt-2 text-[#BFB4B4] border-1 border-[#00308F] h-14 text-xl' type="text" placeholder="Drop Down Menu" />
                    </div>
                    <div className='mb-4'>
                    <Label htmlFor="email">Website Link</Label>
                    <Input className='mt-2 text-[#BFB4B4] border-1 border-[#00308F] h-14 text-xl' type="text" placeholder="https://example.com" />
                    </div>
                    <div className='mb-4'>
                    <Label htmlFor="email">Contact Person Name</Label>
                    <Input className='mt-2 text-[#BFB4B4] border-1 border-[#00308F] h-14 text-xl' type="text" placeholder="Full name" />
                    </div>
                    <div className='mb-4'>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input className='mt-2 text-[#BFB4B4] border-1 border-[#00308F] h-14 text-xl' type="email" placeholder="name@company.com" />
                    </div>
                    <div className='mb-4'>
                    <Label htmlFor="email">Contact Phone</Label>
                    <Input className='mt-2 text-[#BFB4B4] border-1 border-[#00308F] h-14 text-xl' type="number" placeholder="+44 20 1234 5678" />
                    </div>
                    <div className='mb-4 '>
                    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Write something</Label>
      <Textarea
        id={id}
        className="[resize:none] h-72"
        placeholder="Tell us about your products, audience and why you want to join.."
      />
      <p className='common-text text-sm'>*Please enter any further details relating to your request and provide relevant attachments below. A member of the team will follow up with you soon.</p>
    </div>
    <div className='mt-4'>
        <h3 className='font-bold text-xl montserrat-text mb-3'>Attachments(Optional)</h3>
   
        
    
    </div>
    </div>

     {/*Upload file button*/}
      <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <Button
          variant="outline"
          className='lg:w-3xl h-16 p-6 border-1 border-[#00308F] text-[#564848]'
          onClick={openFileDialog}
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
            Add file or Drop file here
        </Button>
        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
      {fileName && <p className="text-muted-foreground text-xs">{fileName}</p>}
        </div>


        <div className='flex justify-center mt-4 lg:mt-16'>
        <Button className='common-bg text-white px-5 py-2.5 lg:w-56 h-12 cursor-pointer montserrat-text' type='submit'>Submit Your Application</Button>
         </div>
        </form>
        </div>
    </div>
  )
}

export default SubmitForm
