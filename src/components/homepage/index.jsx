import { useNavigate } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import { BlobServiceClient } from "@azure/storage-blob"
import ClipLoader from "react-spinners/ClipLoader"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"

export const Homepage = () => {
  const navigate = useNavigate()
  const inputList = useRef([""])
  const [uploadingImage, setUploadingImage] = useState("NOTHING")
  const [notInputtingCustom, setNotInputtingCustom] = useState(true);
  const [formData, setFormData] = useState({
    key: '',
    genre: '',
    tempo: '',
    duration: '',
    otherFeatures: ''
  });

  const [fileUrl, setFileUrl] = useState()
  const blobSasUrl = `https://${process.env.REACT_APP_ACCOUNT_NAME}.blob.core.windows.net/hackthesix?${process.env.REACT_APP_SAS_TOKEN}`

  const onNext = async (e) => {
    e.preventDefault()
    setInputtingCustom(false);
  }

  const handleSubmit = async (e) => {
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
      inputList.current = [response.data.description.captions[0].text]
      e.preventDefault()
      navigate("/results", { state: { inputList: inputList.current, formData: formData } })
    } catch (error) {
      console.log("there is an error with describing the image: ", error)
    }
  }

  const onDrop = async (files) => {
    setUploadingImage("LOADING")
    const file = files[0]
    const blobServiceClient = new BlobServiceClient(blobSasUrl)
    const containerClient = blobServiceClient.getContainerClient(
      process.env.REACT_APP_CONTAINER_NAME
    )
    const blockBlobClient = containerClient.getBlockBlobClient(file.name)

    await blockBlobClient.uploadData(file)

    const url = blockBlobClient.url
    setFileUrl(url)
    setUploadingImage("DONE")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png", ".jpeg", ".jpg"],
    },
    onDrop,
  })

  return (
    inputtingCustom ? 
    <div>
      <div
        className={`w-screen h-screen bg-[#DBBB9E] ${
          isDragActive && "brightness-50"
        }`}
      >
        <div class="h-screen flex items-center ml-20">
          <div className="w-[600px] h-[600px] flex rounded-3xl items-center justify-center bg-[#E5DDD0]">
            {uploadingImage == "DONE" ? (
              <img
                src={fileUrl}
                className="w-[500px] h-[500px] rounded-3xl"
              ></img>
            ) : (
              <img
                src="Main_Logo.jpg"
                className="w-[500px] h-[500px] rounded-3xl"
              ></img>
            )}
          </div>
          <div class="flex flex-col ml-20 h-full mt-80 items-center">
            <p className="text-7xl font-semibold font-serif text-white-800">
              Audiolux.AI
            </p>
            <p className="text-5xl font-serif text-white-800">
              Upload image for soundtrack
            </p>

            <div {...getRootProps()} className="dropzone-container mt-20">
              <input {...getInputProps()} multiple={false}></input>
              <div
                className="w-[300px] h-[100px] flex rounded-3xl items-center justify-center "
                style={{ backgroundColor: "#E5DDD0" }}
              >
                <div
                  className="w-[286px] h-[80px] flex items-center justify-center rounded-3x1"
                  style={{ backgroundColor: "#E5DDD0" }}
                >
                  {uploadingImage === "NOTHING" ? (
                    <img
                      src="file_logo.png"
                      className="w-[80px] h-[80px] rounded-3xl"
                    ></img>
                  ) : uploadingImage === "LOADING" ? (
                    <ClipLoader
                      color="#ffffff"
                      loading={true}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                      size={50}
                    />
                  ) : (
                    <IoIosCheckmarkCircleOutline className="text-lime-500 w-20 h-20" />
                  )}
                </div>
              </div>
            </div>

            {fileUrl && (
              <div className="w-[120px] h-[60px] flex items-center justify-center rounded-3x1 mt-10 rounded-3xl hover:cursor-pointer bg-black border-black hover:border-solid hover:border-4 hover:bg-transparent">
                <button
                  onClick={onNext}
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

      {isDragActive && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-100 text-5xl">
          Drop to add image!
        </div>
      )}
    </div>
    :
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Additional Optional Fields</h2>
        <div className="mb-4">
          <label htmlFor="key" className="block text-gray-700 font-bold mb-2">Key</label>
          <input
            type="text"
            id="key"
            name="key"
            value={formData.key}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 font-bold mb-2">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tempo" className="block text-gray-700 font-bold mb-2">Tempo (BPM)</label>
          <input
            type="number"
            id="tempo"
            name="tempo"
            value={formData.tempo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tempo" className="block text-gray-700 font-bold mb-2">Duration (in seconds)</label>
          <input
            type="number"
            id="tempo"
            name="tempo"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="otherFeatures" className="block text-gray-700 font-bold mb-2">Other Features</label>
          <textarea
            id="otherFeatures"
            name="otherFeatures"
            value={formData.otherFeatures}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" onSubmit={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  )
}
export default Homepage
