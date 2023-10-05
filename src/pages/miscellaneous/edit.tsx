import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";

interface misc {
    nama_instansi: string;
    logo_instansi: number;
    no_hp : string;
    email: number;
    instagram: string;
    laman_web: string;
    nama_pic: string;
    nip_pic:string;
    tanda_tangan:string;
}

export default function Miscellaneous() {
    const router = useRouter();

    const [dataMisc, setDataMisc] = useState<misc>();

    async function getDataMisc() {
        try {
            const res = await fetch("https://api.ricogann.com/api/misc");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const dataMisc = await getDataMisc();

                setDataMisc(dataMisc.data);


            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }
        fetchData()
    });
    
    console.log(dataMisc);

    return (
        <div className="flex  bg-[#FFFFFF] overflow-x-hidden">
            <div className="">
                <SideBar />
            </div>
            <div className="h-screen w-full p-10 flex bg-[#F7F8FA]">
                <div className="p-5">
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex flex-row items-start">
                            <h1 className="text-[45px] font-bold mr-14">
                                Edit Miscellaneous
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-row items-start mb-5 mt-8 border-b border-[#E2E7EE]">


                        

                       
                    </div>

                    <div className="flex flex-full w-[900px] overflow-hidden rounded-lg shadow-lg">
                        <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                            <div className="flex flex-col gap-5 ">
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Nama Instansi
                                </h1>
                                <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                    {dataMisc?.nama_instansi}
                                </h1>
                                </div>
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    No HP BPU
                                </h1>
                                <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                    {dataMisc?.no_hp}
                                </h1>
                                </div>
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    NIP
                                </h1>
                                <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                    {dataMisc?.nip_pic}
                                </h1>
                                </div>
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Nama Pimpinan BPU
                                </h1>
                                <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                    {dataMisc?.nama_pic}
                                </h1>
                                </div>
                                                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Instagram
                                </h1>
                                <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                    {dataMisc?.instagram}
                                </h1>
                                </div>
                                                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Website
                                </h1>
                                <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                    {dataMisc?.laman_web}
                                </h1>
                                </div>
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Email
                                </h1>
                                <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                    {dataMisc?.email}
                                </h1>
                                </div>
                                <div className="flex flex-row gap-3 rounded-lg">
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Logo BPU
                                </h1>
                                <img className="h-[100px] bg-[#FFFFFF]" src="" alt="" />
                                </div>
                                                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Tanda Tangan Pimpinan
                                </h1>
                                <img className="h-[100px] bg-[#FFFFFF]" src="" alt="" />
                                </div>
                                    </div>
                               

                                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                                    Edit Miscellaneous
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
