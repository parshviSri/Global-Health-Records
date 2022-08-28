import { useState } from "react";
import { addFile } from "../../Utils/ipfs";
import { connectContract, getAccount } from "../../Utils/ether";
import { encrypt } from "../../Utils/lit";
import { useRouter } from "next/router";

const Medical =(props) =>{
      const router = useRouter();
      const {id} = router.query;
    const [basic, setBasic] = useState({
      bloodgroup: "",
      allergies: "",
      medications: "",
      familyHistory: "",
      report: ""
    });
    const addReports = async(e) =>{
        let reports = await addFile(e.target.files[0]);
        setBasic({ ...basic, report: reports });

    }
    const addBasic = async() =>{
        await getAccount();
        const patient = await connectContract();
         const { encryptedString, encryptedSymmetricKey } = await encrypt(
           JSON.stringify({ basic: basic }),
           id
         );
         let contentJson = {
           encryptedSymmetricKey,
           message: await addFile(encryptedString),
         };
         console.log(contentJson);
         let patientRecords = await addFile(JSON.stringify(contentJson));
         let trans = await patient.addMedicalDetails(
           patientRecords,
           props.wallet
         );
         await trans.wait();
        
    }
    return (
      <div className="container">
        <div className="flex flex-row">
          <div className="basis-1/2 text-center p-6 m-auto">
            <div className="w-full max-w-xl">
              <p className="text-white-500 text-4xl">
                Add  medical details
              </p>
              
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* blood group is added */}
                <div className="mb-4">
                  <input
                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                    id="bloodgroup"
                    type="text"
                    placeholder="Your BloodGroup"
                    onChange={(event) => {
                      setBasic({
                        ...basic,
                        bloodgroup: event.target.value,
                      });
                    }}
                  />
                </div>
                {/* wallet address is added */}
                <div className="mb-4">
                  <input
                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                    id="allergies"
                    type="text"
                    placeholder="Your Allegies"
                    onChange={(event) => {
                      setBasic({ ...basic, allergies: event.target.value });
                    }}
                  />
                </div>
                {/* reports is added */}
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                    id="reports"
                    type="file"
                    placeholder="Your Previous reports"
                    onChange={addReports}
                  />
                </div>
                {/* medications is added */}
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                    id="medications"
                    type="text"
                    placeholder="Your Medications"
                    onChange={(event) => {
                      setBasic({
                        ...basic,
                        medications: event.target.value,
                      });
                    }}
                  />
                </div>
                {/* user gender is added */}
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                    id="familyHistory"
                    type="text"
                    placeholder="Your familyHistory"
                    onChange={(event) => {
                      setBasic({
                        ...basic,
                        familyHistory: event.target.value,
                      });
                    }}
                  />
                </div>
                {/* emergency contact */}

                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={addBasic}
                  >
                    Add Your Info
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    
}
export default Medical;