import { useRouter } from "next/router";
import { useState } from "react";
import { connectContract, getAccount } from "../../Utils/ether";
import { encrypt } from "../../Utils/lit";
import { addFile } from "../../Utils/ipfs";
const SignUp = () => {
const router = useRouter();
const [userReg, setUserReg] = useState({
  name: "",
  wallet:"",
  dob: "",
  address: "",
  gender: "",
  emergencyContact: ""
});
const checkUserExist  = async() =>{
  try{
    const patient = await connectContract();
  let patientId = await patient.getPatientId(userReg.wallet);
  let patientIdNum = parseInt(patientId._hex)
  console.log(patientIdNum);
  if (patientIdNum > 0) {
    console.log(patientId);

    router.push({
      pathname: "component/dashboard",
      query: { id: patientIdNum },
    });
  }

  }
  catch(err){
    console.log(err);

  }
}
const addUser = async() =>{
  checkUserExist();
  await getAccount();
  const patient = await connectContract();
  
    //encrypt your data
     const patientId = await patient.getCurrentTokenId();
      let patientIdNum = parseInt(patientId._hex);
    const { encryptedString, encryptedSymmetricKey } = await encrypt(
      JSON.stringify(userReg),
      patientIdNum
    );
    let contentJson = {
      encryptedSymmetricKey,
      message: await addFile(encryptedString),
    };
    console.log(contentJson);
    let patientRecords = await addFile(JSON.stringify(contentJson));
    let trans = await patient.createPatientAccount(patientRecords,userReg.wallet);
    await trans.wait();
    router.push({
      pathname: "/components/dashboard",
      query: { id: patientIdNum },
    });

  

} 
  return (
    <div className="container">
      <div className="flex flex-row">
        <div className="basis-1/2 text-center p-6 m-auto">
          <div className="w-full max-w-xl">
            <p className="text-white-500 text-4xl">Add your Personal details</p>
            <p className="text-gray-500">
              Currently only supports Polygon Mumbai testnet
            </p>
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* user name is added */}
              <div className="mb-4">
                <input
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                  id="age"
                  type="text"
                  placeholder="Your Name"
                  onChange={(event) => {
                    setUserReg({ ...userReg, name: event.target.value });
                  }}
                />
              </div>
              {/* wallet address is added */}
              <div className="mb-4">
                <input
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                  id="wallet"
                  type="text"
                  placeholder="Your Wallet Address"
                  onChange={(event) => {
                    setUserReg({ ...userReg, wallet: event.target.value });
                  }}
                />
              </div>
              {/* user age is added */}
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                  id="dob"
                  type="date"
                  placeholder="Your Date of Birth"
                  onChange={(event) => {
                    setUserReg({ ...userReg, dob: event.target.value });
                  }}
                />
              </div>
              {/* address is added */}
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                  id="address"
                  type="text"
                  placeholder="Your Address"
                  onChange={(event) => {
                    setUserReg({ ...userReg, address: event.target.value });
                  }}
                />
              </div>
              {/* user gender is added */}
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                  id="gender"
                  type="text"
                  placeholder="Your Gender"
                  onChange={(event) => {
                    setUserReg({ ...userReg, gender: event.target.value });
                  }}
                />
              </div>
              {/* emergency contact */}
              <div className="mb-4">
                <textarea
                  className=" 
                          shadow 
                          appearance-none
                          w-full
                          px-3
                          py-2
                          border 
                          rounded
                          text-white-700 
                          focus:border-blue-500 focus:outline-none
                          "
                  placeholder="Your Emergency Contact"
                  onChange={(event) => {
                    setUserReg({
                      ...userReg,
                      emergencyContact: event.target.value,
                    });
                  }}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={addUser}
                >
                  Create Your Profile
                </button>
                <a
                  className="inline-block align-baseline font-bold text-m text-blue-500 hover:text-blue-800"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  Need a wallet?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
