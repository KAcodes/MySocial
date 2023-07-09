import React from 'react'

const CreatePostInfo = ({ img, caption, title, name }) => {
  return (
    
      <div className="flex justify-center items-center">
        <div className="container bg-white rounded-xl shadow-lg hover:shadow-xl space-y-4">
          <div>
            <p className="text-lg mt-2 ml-4 font-bold text-gray-800">
              {name}
            </p>
            <p className="text-2xl mt-2 ml-4 font-bold text-gray-800">
              {title}
            </p>
          </div>
          <img
            className="object-contain max-h-[500px] cursor-pointer mx-auto "
            src={img ? URL.createObjectURL(img) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
            alt=""
          />
          <div className="p-4 justify-between items-center space-x-2 max-w-max">
            <p>{caption}</p>
          </div>
        </div>
      </div>
    
  )
}

export default CreatePostInfo