import axios from "axios";

const useSubmitFile = () => {
  const upload = async (file) => {
    const fd = new FormData();
    fd.append("img", file);

    try {
      const data = await axios.post("/api/image", fd);

      return data.data.fileName;
    } catch (err) {
      console.log(err.message);
    }
  };

  return { upload };
};

export default useSubmitFile;
