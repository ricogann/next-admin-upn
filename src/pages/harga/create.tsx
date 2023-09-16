import { useState, ChangeEvent } from "react";
import SideBar from "@/components/sidebar";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { InputFiles } from "@/components/input-files";
import { Submit } from "@/components/submit-button";
import { useRouter } from "next/router";

export default function Create() {
    const router = useRouter();

    const [nama, setnama] = useState("");
    const [harga, setharga] = useState("");


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "nama") {
            setnama(event.target.value);
        } else if (event.target.name === "harga") {
            setharga(event.target.value);
        }
    };

    // const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //     setDeskripsiFasilitas(event.target.value);
    // };

    // const handleFotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const files = Array.from(event.target.files || []);

    //     setFotoFasilitas([...fotoFasilitas, ...files]);
    // };

    const sendData = async () => {
        if (
            nama === "" ||
            harga === "" 
        ) {
            alert("Mohon isi semua field!");
            return;
        } else {
            const data = new FormData();
            data.append("nama", nama);
            data.append("alamat", harga);
            const res = await addHarga(data);
        }
    };

    async function addHarga(data: FormData) {
        try {
            console.log(data);
            const res = await fetch("http://localhost:5000/api/harga/add", {
                method: "POST",
                body: data,
            });

            const resData = await res.json();

            if (resData.status === true) {
                router.push("/harga");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(
    //     nama,
    //     harga,
    //     deskripsiFasilitas,
    //     fotoFasilitas,
    //     jamBuka,
    //     jamTutup,
    //     durasi,
    //     bukaHari
    // );
    return (
        <div className="flex">
            <div className="">
                <SideBar />
            </div>
            <div className="h-screen w-full p-10 flex bg-[#F7F8FA]">
                <div className="p-5">
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex flex-row items-start">
                            <h1 className="text-[40px] font-bold mr-14">
                                Form Add Harga Fasilitas
                            </h1>
                        </div>
                        <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                            Form Tambah Harga Fasilitas By Admin
                        </h4>
                    </div>

                    <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                        <button>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 font-bold border-b-2 border-[#FFA101]`}
                            >
                                Form Tambah Harga Fasilitas
                            </h2>
                        </button>
                    </div>

                    <div className=" overflow-hidden rounded-lg shadow-lg">
                        <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                            <div className="flex flex-col p-4">
                                <h1 className="px-4">Data Fasilitas</h1>
                                <div className="flex flex-row p-4 gap-5">
                                <select
  name="id_fasilitas"
  className="px-5 py-2 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
>
  <option value="" disabled selected>
    Type Fasilitas
  </option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</select>

                                    <Input
                                        name="nama"
                                        type="text"
                                        className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Nama..."
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="harga"
                                        type="number"
                                        className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Harga..."
                                        onChange={handleInputChange}
                                    />
                                </div>


                                <Submit
                                    message="SUBMIT"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mx-4"
                                    onClick={sendData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
