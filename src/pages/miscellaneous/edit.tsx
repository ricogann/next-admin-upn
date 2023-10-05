import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";

interface misc {
    id_misc : number;
    nama_instansi: string;
    logo_instansi: string;
    no_hp : string;
    email: string;
    instagram: string;
    laman_web: string;
    nama_pic: string;
    nip_pic:string;
    tanda_tangan:string;
}

export default function Miscellaneous() {
    const router = useRouter();

    const [dataMisc, setDataMisc] = useState<misc>();
    //data input Misc
    const [id_misc, setId_Misc] = useState<number>();
    const [nama_instansi, setNama_Instansi] = useState<string>("");
    const [no_hp, setNo_Hp] = useState<string>("");
    const [logo_instansi, setLogo_Instansi] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [instagram, setInstagram] = useState<string>("");
    const [laman_web, setLaman_Web] = useState<string>("");
    const [nama_pic, setNama_Pic] = useState<string>("");
    const [nip_pic, setNip_Pic] = useState<string>("");
    const [tanda_tangan, setTanda_Tangan] = useState<string>("");

    async function getDataMisc() {
        try {
            const res = await fetch("https://api.ricogann.com/api/misc");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function updateDataMisc
    (
        nama_instansi : string,
        no_hp : string,
        email : string,
        instagram : string,
        laman_web : string,
        nama_pic : string,
        nip_pic : string,
        tanda_tangan : string,
        logo_instansi : string
    ) 
    {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/misc/${id_misc}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nama_instansi:  nama_instansi,
                        no_hp : no_hp,
                        email : email,
                        instagram : instagram,
                        laman_web : laman_web,
                        nama_pic : nama_pic,
                        nip_pic : nip_pic,
                        tanda_tangan : tanda_tangan,
                        logo_instansi : logo_instansi
                    }),
                }
            );

            const data = await res.json();
            router.reload();
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleDataMisc = (
    ) => {
        updateDataMisc(nama_instansi, no_hp, email, instagram, laman_web, nama_pic, nip_pic, tanda_tangan, logo_instansi );
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "Nama_Instansi") {
            setNama_Instansi(e.target.value);
        } else if (e.target.name === "Email") {
            setEmail(e.target.value);
        } else if (e.target.name === "Instagram") {
            setInstagram(e.target.value);
        } else if (e.target.name === "No_Hp") {
            setNo_Hp(e.target.value);
        } else if (e.target.name === "Laman_Web") {
            setLaman_Web(e.target.value);
        } else if (e.target.name === "Nama_Pic") {
            setNama_Pic(e.target.value);
        } else if (e.target.name === "Nip_Pic") {
            setNip_Pic(e.target.value);
        } else if (e.target.name === "Tanda_Tangan") {
            setTanda_Tangan(e.target.value);
        } else if (e.target.name === "Logo_Instansi") {
            setLogo_Instansi(e.target.value);
        } 
        
    };


    useEffect(() => {
        async function fetchData() {
            try {
                const dataMisc = await getDataMisc();

                setNama_Instansi(dataMisc.data.nama_instansi);
                setEmail(dataMisc.data.email);
                setInstagram(dataMisc.data.instagram);
                setLaman_Web(dataMisc.data.laman_web);
                setLogo_Instansi(dataMisc.data.logo_instansi);
                setNama_Pic(dataMisc.data.nama_pic);
                setNip_Pic(dataMisc.data.nip_pic);
                setNo_Hp(dataMisc.data.no_hp);
                setTanda_Tangan(dataMisc.data.tanda_tangan)

            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }
        fetchData()
    },[]);
    
    console.log(dataMisc);
    console.log(nama_instansi);

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
                                <input 
                                type="string" 
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg "
                                name="Nama_Instansi"
                                value={nama_instansi}
                                onChange={handleInput}
                                >
                                    
                                </input>
                                </div>
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    No HP BPU
                                </h1>
<input 
                                type="string" 
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg "
                                name="No_Hp"
                                value={no_hp}
                                onChange={handleInput}
                                >
                                    
                                </input>
                                </div>
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    NIP
                                </h1>
<input 
                                type="string" 
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg "
                                name="Nip_Pic"
                                value={nip_pic}
                                onChange={handleInput}
                                >
                                    
                                </input>
                                </div>
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Nama Pimpinan BPU
                                </h1>
<input 
                                type="string" 
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg "
                                name="Nama_Pic"
                                value={nama_pic}
                                onChange={handleInput}
                                >
                                    
                                </input>
                                </div>
                                                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Instagram
                                </h1>
<input 
                                type="string" 
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg "
                                name="Instagram"
                                value={instagram}
                                onChange={handleInput}
                                >
                                    
                                </input>
                                </div>
                                                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Website
                                </h1>
<input 
                                type="string" 
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg "
                                name="Laman_Web"
                                value={laman_web}
                                onChange={handleInput}
                                >
                                    
                                </input>
                                </div>
                                <div className="flex flex-fit gap-3 bg-[#B9B9B9] rounded-lg">
                                <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black uppercase tracking-wider ">
                                    Email
                                </h1>
<input 
                                type="string" 
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg "
                                name="Email"
                                value={email}
                                onChange={handleInput}
                                >
                                    
                                </input>
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
                               <input 
                                type="string" 
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg hidden"
                                placeholder={dataMisc?.id_misc+"......"}
                                ></input>

                                 <button 
                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                                 onClick={ 
                                            handleDataMisc 
                                        }
                                 >
                                    Submit
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
