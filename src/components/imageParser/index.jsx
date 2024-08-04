import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import { BlobServiceClient } from "@azure/storage-blob"

const ImageParser = () => {
  const [fileUrl, setFileUrl] = useState()
  const blobSasUrl = `https://${process.env.REACT_APP_ACCOUNT_NAME}.blob.core.windows.net/hackthesix?${process.env.REACT_APP_SAS_TOKEN}`

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://ht6.cognitiveservices.azure.com//vision/v3.2/describe",
        {
          url: fileUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AUTH_KEY}`,
            "Ocp-Apim-Subscription-Key": process.env.REACT_APP_SUB_KEY,
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response.data.description.captions[0].text)
    } catch (error) {
      console.log("there is an error with describing the image: ", error)
    }
  }

  const onDrop = async (files) => {
    const file = files[0]
    const blobServiceClient = new BlobServiceClient(blobSasUrl)
    const containerClient = blobServiceClient.getContainerClient(
      process.env.REACT_APP_CONTAINER_NAME
    )
    const blockBlobClient = containerClient.getBlockBlobClient(file.name)
    await blockBlobClient.uploadData(file)
    const url = blockBlobClient.url
    setFileUrl(url)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": ["png", "jpeg"],
    },
    onDrop,
  })

  return (
    <>
      <div
        {...getRootProps()}
        className="dropzone-container bg-blue-300 w-20 h-20"
      >
        <input {...getInputProps()} multiple={false}></input>
      </div>
      {fileUrl && (
        <div
          className="bg-red-300 rounded-lg w-fit h-fit px-4 py-2 mt-5"
          onClick={onSubmit}
        >
          Submit!
        </div>
      )}
    </>
  )
}

export default ImageParser
