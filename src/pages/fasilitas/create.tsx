import { useState, ChangeEvent, useEffect } from "react";
import SideBar from "@/components/sidebar";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { InputFiles } from "@/components/input-files";
import { Submit } from "@/components/submit-button";
import { useRouter } from "next/router";
import _lib from "@/lib/index";
import CookiesDTO from "@/interfaces/cookiesDTO";
import _fasilitas from "@/services/fasilitas.service";

export default function Create() {
    const router = useRouter();

    const [namaFasilitas, setNamaFasilitas] = useState("");
    const [alamatFasilitas, setAlamatFasilitas] = useState("");
    const [deskripsiFasilitas, setDeskripsiFasilitas] = useState("");
    const [fotoFasilitas, setFotoFasilitas] = useState<File[]>([]);
    const [jamBuka, setJamBuka] = useState("");
    const [jamTutup, setJamTutup] = useState("");
    const [durasi, setDurasi] = useState(0);
    const [bukaHari, setBukaHari] = useState("");
    const [noVa, setNoVa] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [cookies, setCookies] = useState("");
    const libCookies = new _lib();
    const fasilitas = new _fasilitas();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "nama_fasilitas") {
            setNamaFasilitas(event.target.value);
        } else if (event.target.name === "alamat_fasilitas") {
            setAlamatFasilitas(event.target.value);
        } else if (event.target.name === "buka_hari") {
            setBukaHari(event.target.value);
        } else if (event.target.name === "deskripsi_fasilitas") {
            setDeskripsiFasilitas(event.target.value);
        } else if (event.target.name === "jam_masuk") {
            setJamBuka(event.target.value);
        } else if (event.target.name === "jam_keluar") {
            setJamTutup(event.target.value);
        } else if (event.target.name === "durasi") {
            setDurasi(Number(event.target.value));
        } else if (event.target.name === "no_va") {
            setNoVa(event.target.value);
        }
    };

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
            bukaHari === "" ||
            deskripsiFasilitas === "" ||
            jamBuka === "" ||
            jamTutup === "" ||
            fotoFasilitas.length === 0
        ) {
            alert("Mohon isi semua field!");
            return;
        } else {
            const data = new FormData();
            data.append("nama", namaFasilitas);
            data.append("alamat", alamatFasilitas);
            data.append("deskripsi", deskripsiFasilitas);
            data.append("jam_buka", jamBuka);
            data.append("jam_tutup", jamTutup);
            fotoFasilitas.forEach((foto) => {
                data.append("foto", foto);
            });
            data.append("buka_hari", bukaHari);
            data.append("durasi", String(1));
            data.append("no_va", noVa);

            const res = await fasilitas.addFasilitas(data, cookies);

            if (res.status === true) {
                alert(res.message);
                router.push("/fasilitas");
            } else {
                alert(res.message);
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const dataCookies: CookiesDTO = await libCookies.getCookies();
                setCookies(dataCookies.CERT);

                if (dataCookies.CERT !== undefined) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                    router.push("/auth/login");
                }
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex">
            <div className="bg-[#FFFFFF]">
                <SideBar />
            </div>
            <div className="w-full p-10 flex bg-[#F7F8FA]">
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
                        <button>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 font-bold border-b-2 border-[#FFA101]`}
                            >
                                Form Tambah Fasilitas
                            </h2>
                        </button>
                    </div>

                    <div className=" overflow-hidden rounded-lg shadow-lg">
                        <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
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
                                        name="buka_hari"
                                        type="text"
                                        className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Buka Hari..."
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

                                <div className="p-4 flex justify-between gap-5">
                                    <div className="w-full">
                                        <h1>Nomor Virtual Account</h1>
                                        <Input
                                            name="no_va"
                                            type="string"
                                            placeholder="Nomor Virtual Account..."
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
