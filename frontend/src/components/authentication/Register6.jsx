'use client'
import Image from "next/image";
import React from "react";
import { useId } from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Button } from "../ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { XIcon } from "lucide-react";

const Register6 = () => {
  const id = useId();
       const [{ files }, { removeFile, openFileDialog, getInputProps }] =
      useFileUpload({
        accept: "image/*",
      })
    const previewUrl = files[0]?.preview || null
    const fileName = files[0]?.file.name || null
  

  return (
    <div>
      <div className="lg:w-[803px] lg:h-[516px] mx-auto mt-14 lg:shadow-2xl relative">
        <div className="lg:w-[820px] h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            objectFit="cover"
            priority
            alt="header_Image"
          />
        </div>
        <h1 className="font-bold common-text text-4xl mt-12 montserrat-text text-center">
          Upload ID For Verification
        </h1>
        <h3 className="text-center text-lg mt-2 montserrat-text">
          Please complete the following to start saving
        </h3>
        {/*NID Card*/}
        <div className="mt-6 flex justify-center text-lg montserrat-text ">
          <Image
            src={"/NID.png"}
            width={200}
            height={200}
            alt="NID"
            objectFit="cover"
            priority
          />
        </div>

        {/*Upload Button*/}
      <div className="flex flex-col items-center gap-2 mt-8">
      <div className="relative inline-flex">
        <Button
          variant="outline"
          className='lg:w-xl h-12 p-6 border-1 border-[#00308F] text-[#564848]  flex justify-start items-center'
          onClick={openFileDialog}
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
            <span className="font-bold border-2 border-gray-300 px-4 rounded-sm cursor-pointer">Choose File</span>
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



        <div className="lg:absolute justify-center mt-4 lg:right-20  flex items-center mb-8 lg:mb-0">
          <Link
            href={"/register7"}
            className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-11 flex items-center justify-center gap-1"
          >
            {/* Icon first, then text */}
            <span className="text-lg font-semibold">Next</span>
            <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
          </Link>
        </div>
      </div>
      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto " />
    </div>
  );
};

export default Register6;
