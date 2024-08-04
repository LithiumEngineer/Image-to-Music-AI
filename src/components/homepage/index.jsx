import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import { BlobServiceClient } from "@azure/storage-blob"

export const Homepage = () => {
  const navigate = useNavigate()
  const [inputList, setInputList] = useState([""])
  useEffect(() => {
    console.log(inputList)
  })

  const [fileUrl, setFileUrl] = useState()
  const blobSasUrl = `https://${process.env.REACT_APP_ACCOUNT_NAME}.blob.core.windows.net/hackthesix?${process.env.REACT_APP_SAS_TOKEN}`

  const onSubmit = async (e) => {
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
      setInputList(response.data.description.captions[0].text)
      console.log("submitted")

      e.preventDefault()
      navigate("/results", { state: { inputList } })
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png", "jpeg"],
    },
    onDrop,
  })

  return (
    <div>
      <div
        className={`w-screen h-screen ${
          isDragActive ? "bg-[#968575]" : "bg-[#DBBB9E]"
        }`}
      >
        <div class="h-screen flex items-center ml-20">
          <div className="w-[600px] h-[600px] flex rounded-3xl items-center justify-center bg-[#E5DDD0]">
            <img
              src="Main_Logo.jpg"
              className="w-[500px] h-[500px] rounded-3xl"
            ></img>
          </div>
          <div class="flex flex-col ml-20 h-full mt-80 items-center">
            <p className="text-7xl font-semibold font-serif text-white-800">
              Audiolux.AI
            </p>
            <p className="text-5xl font-serif text-white-800">
              Upload image for soundtrack
            </p>

            <div {...getRootProps()} className="dropzone-container">
              <input {...getInputProps()} multiple={false}></input>
              <div
                className="w-[300px] h-[100px] flex rounded-3xl items-center justify-center mt-20"
                style={{ backgroundColor: "#E5DDD0" }}
              >
                <div
                  className="w-[286px] h-[80px] flex items-center justify-center rounded-3x1"
                  style={{ backgroundColor: "#E5DDD0" }}
                >
                  <img
                    src="file_logo.png"
                    className="w-[80px] h-[80px] rounded-3xl"
                  ></img>
                </div>
              </div>
            </div>

            {fileUrl && (
              <div
                className="w-[120px] h-[60px] flex items-center justify-center rounded-3x1 mt-10 rounded-3xl"
                style={{ backgroundColor: "#262727" }}
              >
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="text-white rounded-3xl"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Homepage
