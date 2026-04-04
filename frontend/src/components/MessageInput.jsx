import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-slate-900/40 border-t border-slate-800/80 backdrop-blur-md">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border-2 border-indigo-500/50 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110"
              type="button"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2 relative bg-slate-950/50 border border-slate-800 rounded-2xl p-2 shadow-inner focus-within:border-indigo-500/50 transition-colors">
          <button
            type="button"
            className={`p-2 rounded-xl transition-colors shrink-0
                     ${imagePreview ? "text-indigo-400 bg-indigo-500/10" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={22} />
          </button>
          <input
            type="text"
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none px-2 font-light"
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        <button
          type="submit"
          className="p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} className="ml-1" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
