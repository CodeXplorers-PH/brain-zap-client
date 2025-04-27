import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export const CustomToast = ({
  photoURL,
  displayName,
  title,
  description,
  type = "success",
}) =>
  toast.custom((t) => (
    <div
      className={`${
        (t.visible ? "animate-enter" : "animate-leave",
        type === "error" ? "bg-red-800/90" : "bg-violet-800/90")
      } max-w-md shadow-lg rounded-lg pointer-events-auto flex`}
    >
      <div className="flex items-center p-4 gap-2">
        {photoURL && (
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={photoURL}
              alt={`Photo of ${displayName}`}
              className="rounded-full"
            />
            <AvatarFallback>
              {displayName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-sm text-gray-200">{description}</p>
        </div>
      </div>
      <div
        className={`flex border-l ${
          type === "error" ? "border-red-900" : "border-violet-900"
        } `}
      >
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-violet-200 hover:text-violet-100"
        >
          Close
        </button>
      </div>
    </div>
  ));
