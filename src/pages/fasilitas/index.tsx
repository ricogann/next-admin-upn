import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";

interface Fasilitas {
    id_fasilitas: number;
    nama: string;
    deskripsi: string;
    alamat: string;
    biaya: number;
    foto: string;
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

    const [dataFasilitas, setDataFasilitas] = useState<Fasilitas[]>([]);

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

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getDataFasilitas();

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
                        <button>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 border-b-2 border-[#FFA101] font-bold`}
                            >
                                Fasilitas
                            </h2>
                        </button>
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
                                                {data.nama}
                                            </div>
                                            <div className="px-6 py-4 break-all w-[200px]">
                                                {data.deskripsi}
                                            </div>
                                            <div className="px-6 py-4 break-all w-[200px]">
                                                {data.alamat}
                                            </div>
                                            <div className="px-6 py-4 whitespace-no-wrap w-[130px]">
                                                {JSON.parse(data.foto).map(
                                                    (
                                                        foto: string,
                                                        index: number
                                                    ) => (
                                                        <div
                                                            className=""
                                                            key={index}
                                                        >
                                                            <Image
                                                                src={`http://localhost:5000/assets/${foto}`}
                                                                alt="foto"
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
                    </div>
                </div>
            </div>
        </div>
    );
}
