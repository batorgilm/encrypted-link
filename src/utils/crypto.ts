import { AES, enc } from "crypto-js";

const PRIVATE_KEY = "P1neC0ne@*&";

export const encrypt = (salary: any) => {
  const { Email, ...salaryObj } = salary;
  const encryptedData = encryptUrl(Email, salaryObj);
  return encryptedData;
};

const encryptUrl = (email: string, salaryPayload: any) => {
  try {
    const ciphertext = AES.encrypt(
      JSON.stringify(salaryPayload),
      PRIVATE_KEY
    ).toString();
    return {
      email,
      link: `${window.location.href}salary?hash=${encodeURIComponent(
        ciphertext
      )}`,
    };
  } catch (err) {
    console.log(err);
  }
};
export const decrypt = (ciphertext: any) => {
  try {
    const bytes = AES.decrypt(decodeURI(ciphertext), PRIVATE_KEY).toString(
      enc.Utf8
    );

    return JSON.parse(bytes);
  } catch (error) {
    console.log(error);
  }
};
