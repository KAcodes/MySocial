import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTrash, faFilePen, faHeart, faMessageDots 
} from "@fortawesome/free-solid-svg-icons";

const UserPost = ({ img, caption, title, name, del }) => {
  return (
    <>
      <div className="my-8 bg-yellow-500 bg-transparent flex justify-center items-center">
        <div className="w-3/5 max-h-fit container bg-white rounded-xl shadow-lg ">
          <h2 className="text-gray-800 font-bold cursor-pointer ml-4 mt-3">
                {name}
              </h2>
          <div className="flex place-items-center justify-between">
            <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
              {title}
            </h1>
            <div className=" mt-2 mr-4 space-x-5 p-1 text-lg">
            <FontAwesomeIcon icon={faFilePen} className="cursor-pointer hover:scale-150 transformation duration-300"/>
            <FontAwesomeIcon icon={faTrash} onClick={del} className="cursor-pointer hover:scale-150 transformation duration-300"/>
            </div>
          </div>
          <img
            className="w-full object-contain cursor-pointer max-h-[500px] transform transition duration-500 hover:scale-105 my-3"
            src={img}
            alt=""
          />
          <div className="flex p-4 justify-between">
            <div className="flex items-center space-x-2">
              <p>{caption}</p>
            </div>
            <div className="flex space-x-1 items-center">
                <FontAwesomeIcon icon={faHeart} className="cursor-pointer hover:scale-150 transformation duration-300"/>
                <span>20</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default UserPost;
