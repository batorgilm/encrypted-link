import * as XLSX from "xlsx";

export const excelParser = (file: any) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: any) => {
      const bufferArray = e?.target?.result;
      const wb = XLSX.read(bufferArray, {
        type: "buffer",
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
  return promise.then((d: any) => {
    return d;
  });
};
