import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// to create our own custom image for uploading we need useUploadThing
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

// connect your custom UI compenent to an UploadThing upload endpoint
