import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";

interface Fasilitas {
    id_fasilitas: number;
    nama_fasilitas: string;
    deskripsi_fasilitas: string;
    alamat_fasilitas: string;
    biaya_fasilitas: number;
    foto_fasilitas: string;
}

interface Kamar {
    id_asrama: number;
    no_kamar: number;
    id_lantai: number;
    npm_bed1_a?: string;
    npm_bed2_b?: string;
    npm_bed3_c?: string;
    status_kamar: boolean;
    LantaiAsrama: Object;
}

export default function Fasilitas() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("Fasilitas");
    const [dataFasilitas, setDataFasilitas] = useState<Fasilitas[]>([]);
    const [dataKamar, setDataKamar] = useState<Kamar[]>([]);

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const handlePage = (link: string) => {
        router.push(link);
    };

    async function getDataFasilitas() {
        try {
            const res = await fetch("http://localhost:5000/api/fasilitas");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getDataKamar() {
        try {
            const res = await fetch("http://localhost:5000/api/kamar");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getDataFasilitas();
                const dataKamar = await getDataKamar();

                setDataKamar(dataKamar.data);
                setDataFasilitas(data.data);
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/fasilitas/delete/${Number(id)}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.status === true) {
                window.location.reload();
            } else {
                alert("Gagal menghapus data fasilitas");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteKamar = async (id: number) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/kamar/delete/${Number(id)}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.status === true) {
                window.location.reload();
            } else {
                alert("Gagal menghapus data kamar");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex overflow-x-hidden">
            <div className="">
                <SideBar />
            </div>
            <div className="h-screen w-full p-10 flex bg-[#F7F8FA]">
                <div className="p-5">
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex flex-row items-start">
                            <h1 className="text-[45px] font-bold mr-14">
                                Fasilitas
                            </h1>
                        </div>
                        <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                            Tabel Data Fasilitas
                        </h4>
                    </div>

                    <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                        <a href="#" onClick={() => toggleTab("Fasilitas")}>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 ${
                                    activeTab === "Fasilitas"
                                        ? "border-b-2 border-[#FFA101] font-bold"
                                        : ""
                                }`}
                            >
                                Fasilitas
                            </h2>
                        </a>
                        <a href="#" onClick={() => toggleTab("Kamar Asrama")}>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 ${
                                    activeTab === "Kamar Asrama"
                                        ? "border-b-2 border-[#FFA101] font-bold"
                                        : ""
                                }`}
                            >
                                Kamar Asrama
                            </h2>
                        </a>
                    </div>

                    <div className="bg-[#000000]flex flex-row relative rounded-full overflow-hidden mb-5">
                        <input
                            className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                            type="text"
                            placeholder="Cari User"
                        />

                        <button
                            className="bg-blue-500 h-[40px] md:h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8"
                            onClick={() => handlePage("/fasilitas/create")}
                        >
                            Add Data
                        </button>
                    </div>

                    <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                        {activeTab === "Fasilitas" && (
                            <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                <div className="flex">
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                        ID
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Nama Fasilitas
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Deskripsi
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Alamat
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Biaya
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Foto
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Action
                                    </h1>
                                </div>

                                <div className="bg-white divide-y divide-gray-200">
                                    <div className="">
                                        {dataFasilitas.map((data, index) => (
                                            <div className="flex" key={index}>
                                                <div className="px-6 py-4 whitespace-no-wrap">
                                                    {index + 1}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                                    {data.nama_fasilitas}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.deskripsi_fasilitas}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.alamat_fasilitas}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[130px]">
                                                    Rp{data.biaya_fasilitas}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[130px]">
                                                    {JSON.parse(
                                                        data.foto_fasilitas
                                                    ).map(
                                                        (
                                                            foto: string,
                                                            index: number
                                                        ) => (
                                                            <div
                                                                className=""
                                                                key={index}
                                                            >
                                                                <Image
                                                                    alt="foto"
                                                                    src={`http://localhost:5000/assets/${foto}`}
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                        onClick={() =>
                                                            handleDelete(
                                                                data.id_fasilitas
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "Kamar Asrama" && (
                            <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                <div className="flex">
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[80px]">
                                        NO
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[150px]">
                                        No Kamar
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[150px]">
                                        Bed A
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[150px]">
                                        Bed B
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[150px]">
                                        Bed C
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[150px]">
                                        Status Kamar
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[250px]">
                                        Action
                                    </h1>
                                </div>

                                <div className="bg-white divide-y divide-gray-200">
                                    <div className="">
                                        {dataKamar.map((data, index) => (
                                            <div className="flex" key={index}>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[80px] text-center">
                                                    {index + 1}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[150px] text-center">
                                                    {data.no_kamar}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[150px] text-center">
                                                    {data.npm_bed1_a ===
                                                    null ? (
                                                        <div className="">
                                                            Kosong
                                                        </div>
                                                    ) : (
                                                        <div className="">
                                                            {data.npm_bed1_a}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[150px] text-center">
                                                    {data.npm_bed2_b ===
                                                    null ? (
                                                        <div className="">
                                                            Kosong
                                                        </div>
                                                    ) : (
                                                        <div className="">
                                                            {data.npm_bed2_b}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[150px] text-center">
                                                    {data.npm_bed3_c ===
                                                    null ? (
                                                        <div className="">
                                                            Kosong
                                                        </div>
                                                    ) : (
                                                        <div className="">
                                                            {data.npm_bed3_c}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[150px] text-center">
                                                    {data.status_kamar ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Tersedia
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Tidak Tersedia
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[250px]">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                        onClick={() =>
                                                            handleDeleteKamar(
                                                                data.id_asrama
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
