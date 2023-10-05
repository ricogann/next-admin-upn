import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsFillPinMapFill } from "react-icons/bs";
import { MdOutlineWatchLater, MdPayment } from "react-icons/md";
import { BiCalendar, BiBookmark } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";


interface Fasilitas {
    id_fasilitas: number;
    nama: string;
    deskripsi: string;
    alamat: string;
    biaya: number;
    foto: string;
    no_va : string;
    jam_buka : string;
    jam_tutup : string;
    buka_hari : string;
}

interface Kamar {
    id_asrama: number;
    no_kamar: number;
    id : number;
    npm_bed1_a: string;
    npm_bed2_b: string;
    npm_bed3_c: string;
    status_kamar: boolean;
}

export default function Fasilitas() {
    const router = useRouter();
    const [dataFasilitas, setDataFasilitas] = useState<Fasilitas>();
    const [dataKamar, setDataKamar] = useState<Kamar>();
    const [id, setId] = useState(``);
    

    async function getdataKamar() {
        try {
            // const res = await fetch(`https://api.ricogann.com/api/kamar`);
            const res = await fetch("http://localhost:5000/api/kamar");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getDataFasilitasById(id: number) {
        try {
            // const res = await fetch(`https://api.ricogann.com/api/fasilitas/${id}`);
            const res = await fetch(`http://localhost:5000/api/fasilitas/${id}`);
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
            
    if (router.isReady) {
        setId(router.query.id as string);
    }

    },[router.isReady])

    useEffect(() => {
        async function fetchData(id: number) {
            try {
                const dataFasilitas = await getDataFasilitasById(Number(id));

                setDataFasilitas(dataFasilitas.data);


            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        async function fetchDataKamar() {
            try {
                const dataKamar = await getdataKamar();

                setDataKamar(dataKamar.data);

            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }
        fetchDataKamar()
        fetchData(Number(id))
        
    });
                    console.log(id);
                    console.log(dataFasilitas);
                    console.log(dataKamar);
    return (
        <div className="flex bg-[#FFFFFF] overflow-x-hidden">
            <div className="">
                <SideBar />
            </div>

            <div className="w-full p-5 flex bg-[#F7F8FA]">
                <div className="p-5 w-full">
                    <div className="flex flex-col items-start justify-center ">
                        <h1 className="text-[45px] font-bold ">

                            Fasilitas
                        </h1>
                        <h4 className="text-[12] font-regular mb-8 text-dark-whiteText">
                            Detail Fasilitas
                        </h4>
                    </div>
                     
                    <div  className="flex flex-row bg-[#FFFFFF] gap-5 p-5 rounded-lg">
                    <img src="" alt="" className="w-[300px] h-[300px] bg-[#ffffff]" />
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row">
                            <div className="text-[24px] font-bold">{dataFasilitas?.nama}</div>
                        </div>
                        <div className="flex flex-row gap-10">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-3">
                            <BsFillPinMapFill className="text-black font-bold text-3xl" />
                            <div className="text-[12px] font-bold">{dataFasilitas?.alamat}</div>
                        </div>
                        <div className="flex flex-row gap-3">
                             <BiBookmark className="text-black font-bold text-3xl" />
                            <div className="text-[12px] font-bold">{dataFasilitas?.deskripsi}</div>
                        </div>
                        
                        <div className="flex flex-row gap-3">
                            <MdPayment className="text-black font-bold text-3xl" />
                            <div className="text-[12px] font-bold">{dataFasilitas?.no_va}</div>
                        </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                 <div className="flex flex-row gap-3">
                            <MdOutlineWatchLater className="text-black font-bold text-3xl" />
                            <div className="text-[12px] font-bold">{dataFasilitas?.jam_buka}</div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <MdOutlineWatchLater className="text-black font-bold text-3xl" />
                            <div className="text-[12px] font-bold">{dataFasilitas?.jam_tutup}</div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <MdOutlineWatchLater className="text-black font-bold text-3xl" />
                            <div className="text-[12px] font-bold">{dataFasilitas?.buka_hari}</div>
                        </div>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[10px]">
                                Edit Fasilitas
                            </button>
                        </div>
                    </div>
                    </div>
                    
                    {/* if Asrama maka ini muncul */}
                    <div className="flex flex-col bg-[#FFFFFF] gap-5 p-5 rounded-lg mt-3 ">
                         <div className="text-[24px] font-bold">Tabel Kamar Asrama </div>
                        <div className="flex flex-grow bg-[#898989] w-fit gap-10 ">
                                <div className="px-6 py-3  text-xs leading-4 font-medium text-black uppercase w-[50px]">
                                    ID
                                </div>
                                <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Lantai Asrama
                                </div>
                                <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Nomer Kamar
                                </div>
                                <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Penyewa 1
                                </div>
                                <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Penyewa 2
                                </div>
                                <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Penyewa 3
                                </div>
                                <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Status
                                </div>
                                <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Action
                                </div>
                        </div>
                                                        <div className="bg-white divide-y divide-gray-200">
                                    <div className="">
                                       
                                        {/* {dataKamar.map((data, index) => (
                                            <div className="flex" key={index}>
                                                <div className="px-6 py-4 whitespace-no-wrap">
                                                    {data.id}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                                    {data.id_asrama}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.npm_bed1_a}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.npm_bed1_b}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.npm_bed1_c}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.status_kamar}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                                    <button 
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                                                    onClick={() => 
                                                        router.push(`/fasilitas/detail/kamar/${data.id}`)}
                                                    >
                                                        Detail
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                        // onClick={() =>
                                                        //     handleDeleteFasilitas(
                                                        //         data.id_fasilitas
                                                        //     )
                                                        // }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))} */}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center p-3"></div>
                        
                    </div>


                </div>
            </div>
        </div>
    );
}
