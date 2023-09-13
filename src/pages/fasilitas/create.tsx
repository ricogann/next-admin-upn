import { useState, ChangeEvent } from "react";
import SideBar from "@/components/sidebar";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { InputFiles } from "@/components/input-files";
import { Submit } from "@/components/submit-button";
import { useRouter } from "next/router";

export default function Create() {
    const router = useRouter();

    const [namaFasilitas, setNamaFasilitas] = useState("");
    const [alamatFasilitas, setAlamatFasilitas] = useState("");
    const [biayaFasilitas, setBiayaFasilitas] = useState(0);
    const [deskripsiFasilitas, setDeskripsiFasilitas] = useState("");
    const [fotoFasilitas, setFotoFasilitas] = useState<File[]>([]);
    const [jamMasuk, setJamMasuk] = useState("");
    const [jamKeluar, setJamKeluar] = useState("");

    const [noKamar, setNoKamar] = useState(0);
    const [lantai, setLantai] = useState(0);
    const [statusKamar, setStatusKamar] = useState(true);

    const [activeTab, setActiveTab] = useState("fasilitas");

    const [kapasitas, setKapasitas] = useState(0);
    const [inputKapasitas, setInputKapasitas] = useState(Array<string>());

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const handleKapasitasChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedKapasitas = Number(event.target.value);
        setKapasitas(selectedKapasitas);

        // Generate array of input fields based on selected kapasitas
        const inputFields = [];
        for (let i = 0; i < selectedKapasitas; i++) {
            inputFields.push("");
        }
        setInputKapasitas(inputFields);
    };

    const handleLantaiChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setLantai(Number(event.target.value));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "nama_fasilitas") {
            setNamaFasilitas(event.target.value);
        } else if (event.target.name === "alamat_fasilitas") {
            setAlamatFasilitas(event.target.value);
        } else if (event.target.name === "biaya_fasilitas") {
            setBiayaFasilitas(Number(event.target.value));
        } else if (event.target.name === "deskripsi_fasilitas") {
            setDeskripsiFasilitas(event.target.value);
        } else if (event.target.name === "no_kamar") {
            setNoKamar(Number(event.target.value));
        } else if (event.target.name === "lantai") {
            setLantai(Number(event.target.value));
        } else if (event.target.name === "jam_masuk") {
            setJamMasuk(event.target.value);
        } else if (event.target.name === "jam_keluar") {
            setJamKeluar(event.target.value);
        }
    };

    console.log(jamMasuk, jamKeluar);

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDeskripsiFasilitas(event.target.value);
    };

    const handleFotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        setFotoFasilitas([...fotoFasilitas, ...files]);
    };

    const sendData = async () => {
        if (
            namaFasilitas === "" ||
            alamatFasilitas === "" ||
            biayaFasilitas === 0 ||
            deskripsiFasilitas === "" ||
            fotoFasilitas.length === 0
        ) {
            alert("Mohon isi semua field!");
            return;
        } else {
            const data = new FormData();
            data.append("nama_fasilitas", namaFasilitas);
            data.append("alamat_fasilitas", alamatFasilitas);
            data.append("biaya_fasilitas", String(biayaFasilitas));
            data.append("deskripsi_fasilitas", deskripsiFasilitas);
            data.append("jam_masuk", jamMasuk);
            data.append("jam_keluar", jamKeluar);
            fotoFasilitas.forEach((foto) => {
                data.append("foto_fasilitas", foto);
            });
            data.append("status_fasilitas", String(true));
            data.append("id_jenis_fasilitas", String(1));

            const res = await addFasilitas(data);
        }
    };

    async function addFasilitas(data: FormData) {
        try {
            console.log(data);
            const res = await fetch("http://localhost:5000/api/fasilitas/add", {
                method: "POST",
                body: data,
            });

            const resData = await res.json();

            if (resData.status === true) {
                router.push("/fasilitas");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const sendDataKamar = async () => {
        if (noKamar === 0 || lantai === 0) {
            alert("Mohon isi semua field!");
            return;
        } else {
            const data = {
                no_kamar: noKamar,
                lantai: lantai,
                status_kamar: statusKamar,
            };

            const res = await addKamarAsrama(data);
        }
    };

    async function addKamarAsrama(data: Object) {
        try {
            const res = await fetch("http://localhost:5000/api/kamar/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const resData = await res.json();

            if (resData.status === true) {
                router.push("/fasilitas");
            }
        } catch (error) {
            console.log(error);
        }
    }
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
                                Form Fasilitas
                            </h1>
                        </div>
                        <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                            Form Tambah Fasilitas By Admin
                        </h4>
                    </div>

                    <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                        <a href="#" onClick={() => toggleTab("fasilitas")}>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 ${
                                    activeTab === "fasilitas"
                                        ? "font-bold border-b-2 border-[#FFA101]"
                                        : ""
                                }`}
                            >
                                Form Tambah Fasilitas
                            </h2>
                        </a>
                        <a href="#" onClick={() => toggleTab("Kamar Asrama")}>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 ${
                                    activeTab === "Kamar Asrama"
                                        ? "font-bold border-b-2 border-[#FFA101]"
                                        : ""
                                }`}
                            >
                                Form Tambah Kamar Asrama
                            </h2>
                        </a>
                    </div>

                    <div className=" overflow-hidden rounded-lg shadow-lg">
                        {activeTab === "fasilitas" && (
                            <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                                {activeTab === "fasilitas" && (
                                    <div className="flex flex-col p-4">
                                        <h1 className="px-4">Data Fasilitas</h1>
                                        <div className="flex flex-row p-4 gap-5">
                                            <Input
                                                name="nama_fasilitas"
                                                type="text"
                                                className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                placeholder="Nama Fasilitas..."
                                                onChange={handleInputChange}
                                            />
                                            <Input
                                                name="alamat_fasilitas"
                                                type="text"
                                                className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                placeholder="Alamat..."
                                                onChange={handleInputChange}
                                            />
                                            <Input
                                                name="biaya_fasilitas"
                                                type="number"
                                                className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                placeholder="Biaya..."
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="p-4">
                                            <Textarea
                                                name="deskripsi_fasilitas"
                                                placeholder="Deskripsi..."
                                                className="w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                onChange={handleTextAreaChange}
                                            />
                                        </div>

                                        <div className="p-4 flex justify-between gap-5">
                                            <div className="w-full">
                                                <h1>Jam Buka</h1>
                                                <Input
                                                    name="jam_masuk"
                                                    type="time"
                                                    placeholder="Jam Masuk..."
                                                    className="w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h1>Jam Tutup</h1>
                                                <Input
                                                    name="jam_keluar"
                                                    type="time"
                                                    placeholder="Jam Keluar..."
                                                    className="w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <h1 className="px-4">Foto Fasilitas</h1>
                                        <div className="flex flex-col px-4 py-4">
                                            <InputFiles
                                                name="foto_fasilitas"
                                                type="file"
                                                placeholder="Input Files..."
                                                className="mb-5 w-full px-5 py-4 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={handleFotoChange}
                                            />
                                        </div>

                                        <Submit
                                            message="SUBMIT"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mx-4"
                                            onClick={sendData}
                                        />
                                    </div>
                                )}
                                {/* Rest of your code */}
                            </div>
                        )}

                        {activeTab === "Kamar Asrama" && (
                            <div className="flex justify-center overflow-hidden rounded-lg shadow-lg">
                                {activeTab === "Kamar Asrama" && (
                                    <div className="flex flex-col px-4 py-4">
                                        <div className="flex gap-8 px-4 py-4">
                                            <Input
                                                name={`no_kamar`}
                                                type="number"
                                                placeholder="Nomor Kamar..."
                                                className="w-[230px] px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                onChange={handleInputChange}
                                            />

                                            <select
                                                name={`lantai`}
                                                className="w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                onChange={handleLantaiChange}
                                            >
                                                <option value="">Lantai</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>

                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mx-4 "
                                            onClick={sendDataKamar}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                )}
                                {/* Rest of your code */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
