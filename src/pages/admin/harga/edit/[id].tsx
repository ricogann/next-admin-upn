import { useState, ChangeEvent, useEffect } from "react";
import SideBar from "@/components/sidebar";
import { Input } from "@/components/input";
import { Submit } from "@/components/submit-button";
import { useRouter } from "next/router";
import _lib from "@/lib/index";

import _harga from "@/services/harga.service";

interface Fasilitas {
    id_fasilitas: number;
    nama: string;
    deskripsi: string;
    alamat: string;
    biaya: number;
    foto: string;
}

interface CookiesDTO {
    ADMIN: string;
}

interface harga {
    id: number;
    id_fasilitas: number;
    nama: string;
    harga: number;
    Fasilitas: Fasilitas;
}

export default function Edit() {
    const router = useRouter();
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState(0);
    const [fasilitas, setFasilitas] = useState("");
    const [id, setId] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [cookies, setCookies] = useState("");
    const libCookies = new _lib();

    useEffect(() => {
        if (router.isReady) {
            setId(router.query.id as string);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const hargaService = new _harga();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "nama") {
            setNama(event.target.value);
        } else if (event.target.name === "harga") {
            setHarga(Number(event.target.value));
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const dataCookies: CookiesDTO = await libCookies.getCookies();
                setCookies(dataCookies.ADMIN);
                const response: harga = await hargaService.getDatahargaById(
                    Number(id)
                );

                setFasilitas(response.Fasilitas.nama);
                setNama(response.nama);
                setHarga(response.harga);

                if (dataCookies.ADMIN !== undefined) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                    router.push("/admin/auth/login");
                }
            } catch (error) {
                console.error("error fetching data harga ", error);
                throw error;
            }
        }

        if (id !== "") {
            fetchData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const sendData = async () => {
        if (nama === "" || harga === 0) {
            alert("Mohon isi semua field!");
            return;
        }

        try {
            const data = {
                nama: nama,
                harga: harga,
            };

            const response = await hargaService.updateHarga(
                Number(id),
                data,
                cookies
            );

            if (response.status === true) {
                alert("Data berhasil diubah!");
                router.push("/admin/fasilitas");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            {isLogin ? (
                <div className="flex">
                    <div className="bg-[#FFFFFF]">
                        <SideBar />
                    </div>
                    <div className="h-screen w-full p-10 flex bg-[#F7F8FA] text-black">
                        <div className="p-5">
                            <div className="flex flex-col items-start justify-center">
                                <div className="flex flex-row items-start">
                                    <h1 className="text-[40px] font-bold mr-14">
                                        Form Edit Harga Fasilitas
                                    </h1>
                                </div>
                                <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                                    Form Edit Harga Fasilitas By Admin
                                </h4>
                            </div>

                            <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                                <button>
                                    <h2
                                        className={`text-[18] font-regular mb-3 mr-14 font-bold border-b-2 border-[#FFA101]`}
                                    >
                                        Form Edit Harga Fasilitas
                                    </h2>
                                </button>
                            </div>

                            <div className=" overflow-hidden rounded-lg shadow-lg">
                                <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                                    <div className="flex flex-col p-4">
                                        <h1 className="px-4">Data Fasilitas</h1>
                                        <div className="flex flex-row p-4 gap-5">
                                            <h1 className="px-5 py-2 text-gray-700 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200">
                                                {fasilitas}
                                            </h1>
                                            <input
                                                name="nama"
                                                value={nama}
                                                type="text"
                                                className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                placeholder="Nama..."
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                name="harga"
                                                value={harga}
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
            ) : (
                <div className="h-screen w-screen bg-white flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )}
        </div>
    );
}
