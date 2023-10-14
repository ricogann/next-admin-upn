import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";
import _misc from "@/services/misc.service";
import _lib from "@/lib";

import CookiesDTO from "@/interfaces/cookiesDTO";

interface misc {
    id_misc: number;
    nama_instansi: string;
    logo_instansi: number;
    no_hp: string;
    email: number;
    instagram: string;
    laman_web: string;
    nama_pic: string;
    nip_pic: string;
    tanda_tangan: string;
}

export default function Miscellaneous() {
    const router = useRouter();
    const misc = new _misc();
    const [isLogin, setIsLogin] = useState(false);
    const libCookies = new _lib()
    const [dataMisc, setDataMisc] = useState<misc>();

    useEffect(() => {
        async function fetchData() {
            try {
                const dataMisc = await misc.getDataMisc();

                setDataMisc(dataMisc.data);
                                const dataCookies: CookiesDTO = await libCookies.getCookies();
        if (dataCookies.CERT !== undefined) {
                setIsLogin(true);
            } else 
            {
                setIsLogin(false);
                router.push("/auth/login");
            }
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }
        fetchData();
    });

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
                                Miscellaneous
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-row items-start mb-5 mt-8 border-b border-[#E2E7EE]"></div>

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
                                    <div className="flex flex-col p-5 gap-3 bg-[#B9B9B9] rounded-lg">
                                        <h1 className="text-center text-md font-medium text-black uppercase">
                                            Logo BPU
                                        </h1>
                                        <Image
                                            src={`https://api.ricogann.com/assets/${dataMisc?.logo_instansi}`}
                                            width={100}
                                            height={100}
                                            className="h-[100px] w-full bg-[#FFFFFF]"
                                            alt="test"
                                        />
                                    </div>
                                    <div className="flex flex-col p-5 gap-3 bg-[#B9B9B9] rounded-lg">
                                        <h1 className="text-center text-md font-medium text-black uppercase">
                                            Tanda Tangan Pimpinan
                                        </h1>
                                        <Image
                                            src={`https://api.ricogann.com/assets/${dataMisc?.tanda_tangan}`}
                                            width={100}
                                            height={100}
                                            className="h-[100px] w-full bg-[#FFFFFF]"
                                            alt="test"
                                        />
                                    </div>
                                </div>

                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                                    onClick={() =>
                                        router.push(`/miscellaneous/edit`)
                                    }
                                >
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
