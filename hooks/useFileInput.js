import isEqual from "lodash/isEqual";
import uniqWith from "lodash/uniqWith";
import { useState } from "react";
import DocumentPicker, { types } from "react-native-document-picker";
import { showMessage } from "react-native-flash-message";
// import { AppContext } from "../../context/app.context";

const useFileInput = () => {
  const [file, updateFile] = useState([]);
  // const { baseUrl } = useContext(AppContext);

  const handleClick = async () => {
    try {
      const documentFile = await DocumentPicker.pick({
        allowMultiSelection: true,
        presentationStyle: "formSheet",
        type: [types.images, types.pdf],
      });

      updateFile((x) => uniqWith([...x, ...documentFile], isEqual));
    } catch (err) {
      showMessage({
        message: "Something went wrong on picking file",
        type: "info",
      });
    }
  };

  const handleUpload = async () => {
    const fd = new FormData();

    // const parsedUrl = urlParser.parse(baseUrl);
    // const apiUrl = parsedUrl.protocol + "//" + parsedUrl.host;

    // fd.append("id", 1);

    // file?.map((x) =>
    //   fd.append("Uplodedfiles", { uri: x.uri, name: x.name, type: x.type })
    // );

    let obj = { isSuccess: false, fileName: "" };

    await fetch(`http://c2p.amitaujas.com/Home/SoleAndTripExpenseUploadfiles`, {
      method: "POST",
      body: fd,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        obj = { isSuccess: true, fileName: result };
      })
      .catch((error) => {
        obj = { isSuccess: false, fileName: "" };
      });

    return obj;
  };

  return { handleClick, file, updateFile, handleUpload };
};

export { useFileInput };
