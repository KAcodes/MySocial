import React from 'react'

const CreatePostInfo = ({ img, caption, title, name }) => {
  return (
    <>
      <div className=" bg-gray-100 flex justify-center items-center">
        <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <div>
            <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
              {title}
            </h1>
          </div>
          <img
            className="w-full cursor-pointer"
            src={img ? URL.createObjectURL(img) : "https://www.elegantthemes.com/blog/wordpress/the-ultimate-guide-to-common-http-error-codes"}
            alt=""
          />
          <div className="flex p-4 justify-between">
            <div className="flex items-center space-x-2">
              <p>{caption}</p>
              <h2 className="text-gray-800 font-bold cursor-pointer">
                {name}
              </h2>
            </div>
            <div className="flex space-x-2">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePostInfo