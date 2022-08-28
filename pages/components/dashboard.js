import { useEffect } from "react"
import { connectContract } from "../../Utils/ether";
import { useRouter } from "next/router";
import axios from 'axios';
import { decrypt } from "../../Utils/lit";
import { useState } from "react";
import Medical from "./medical";
const Dashboard = () =>{

    const router = useRouter();
    const {id} = router.query;
    const[personal,setPersonal] = useState();
    const[showmedical,setshowmedical] = useState();
    const [medical, setmedical] = useState();

    useEffect(()=>{
        getPatientData()
    },[id]);
    const getPatientData = async() =>{
        try{
            const patient = await connectContract();
            console.log(id);
            // const patientAdd = await patient.getPatientId(id);
            // console.log(patientAdd);
            const patientRecords = await patient.getPatientRecords(id);
            console.log(patientRecords);

            const decryptPatientPersonalRecord = await getEncrptedData(
              patientRecords.personal
            );
            if(patientRecords.medical){
              const decryptPatientMedicalRecord = await getEncrptedData(
                patientRecords.medical
              );
              setmedical(decryptPatientMedicalRecord);
            }
            console.log(decryptPatientPersonalRecord);
            setPersonal(decryptPatientPersonalRecord);
        }
        catch(err){
            console.log(err);
        }
        

    }
    const getEncrptedData = async(data) => {
            let _data = await axios.get(data);
            let message = await axios.get(_data.data.message);
            let jsonData = {
              encryptedString: message.data,
              encryptedSymmetricKey: _data?.data?.encryptedSymmetricKey,
            };
            let encryptedString = jsonData?.encryptedString;
            let encryptedSymmetricKey = jsonData?.encryptedSymmetricKey;
            let encryptData = await decrypt(
              encryptedString,
              encryptedSymmetricKey,
              id
            );
            let _encryptData = JSON.parse(encryptData.decryptedString);
            return _encryptData;
    }
    return (
      <div>
        {/* Personal record */}
        <div>
          <div>Name:{personal?.name}</div>
          <div>DOB:{personal?.dob}</div>
          <div>Wallet:{personal?.wallet.split(0, 6)}</div>
          <div>Address:{personal?.address}</div>
          <div>Emergenct Contact:{personal?.emergencyContact}</div>
        </div>
        {/* Medical Records */}
        {medical?.basic && (
          <div>
            <div>Blood Group:{medical.basic.bloodgroup}</div>
            <div>Allergies:{medical.basic.allergies}</div>
            <div>Medications:{medical.basic.medications}</div>
            <div>Family History:{medical.basic.familyHistory}</div>
            <div>Reports:</div>
            <img src={medical?.basic?.report} />
          </div>
        )}
        <div>
          {showmedical || (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setshowmedical(true);
              }}
            >
              Add your medical History
            </button>
          )}
          {showmedical && <Medical wallet={personal?.wallet} />}
        </div>
      </div>
    );
}

export default Dashboard