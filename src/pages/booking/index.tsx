import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";

interface Booking {
    id_pemesanan: number;
    id_fasilitas: fasilitas;
    id_harga: harga;
    id_account: account;
    tanggal_pemesanan: number;
    jam_checkin: string;
    jam_checkout: string;
    durasi: number;
    total_harga: harga;
    status: string;
    bukti_pembayaran: string;
}

interface fasilitas {
    id_fasilitas: number;
    nama: string;
}

interface harga {
    id_harga: number;
    nama: string;
    harga: number;
}

interface account {
    id_account: number;
}

export default function Booking() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("Booking");
    const [dataBooking, setDataBooking] = useState<Booking[]>([]);
    const [dataHarga, setDataHarga] = useState<harga[]>([]);
    const [dataFasilitas, setDataFasilitas] = useState<fasilitas[]>([]);
    const [dataAccount, setDataAccount] = useState<account[]>([]);

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const handlePage = (link: string) => {
        router.push(link);
    };

    async function getDataharga() {
        try {
            const res = await fetch("https://api.ricogann.com/api/harga");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getDataBooking() {
        try {
            const res = await fetch("https://api.ricogann.com/api/booking");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getDataFasilitas() {
        try {
            const res = await fetch("https://api.ricogann.com/api/fasilitas");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getDataAccount() {
        try {
            const res = await fetch("https://api.ricogann.com/api/account");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const dataBooking = await getDataBooking();
                const dataHarga = await getDataharga();
                const dataAccount = await getDataAccount();
                const dataFasilitas = await getDataFasilitas();

                setDataBooking(dataBooking.data);
                setDataHarga(dataHarga.data);
                setDataAccount(dataAccount.data);
                setDataFasilitas(dataFasilitas.data);
            } catch (error) {
                console.error("error fetching data Booking ", error);
            }
        }

        fetchData();
    }, []);

    // const handleDeleteBooking = async (id: number) => {
    //     try {
    //         const res = await fetch(
    //             `https://api.ricogann.com/api/Booking/delete/${Number(id)}`,
    //             {
    //                 method: "DELETE",
    //             }
    //         );

    //         const data = await res.json();

    //         if (data.status === true) {
    //             window.location.reload();
    //         } else {
    //             alert("Gagal menghapus data Booking");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleDeleteHarga = async (id: number) => {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/Harga/delete/${Number(id)}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.status === true) {
                window.location.reload();
            } else {
                alert("Gagal menghapus data Booking");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex">
            <div className="">
                <SideBar />
            </div>

            <div className="h-screen w-full p-10 flex bg-[#F7F8FA]">
                <div className="p-5">
                    {activeTab === "Booking" && (
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex flex-row items-start">
                                <h1 className="text-[45px] font-bold mr-14">
                                    Booking
                                </h1>
                            </div>
                            <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                                Tabel Data Booking
                            </h4>
                        </div>
                    )}
                    {activeTab === "harga" && (
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex flex-row items-start">
                                <h1 className="text-[45px] font-bold mr-14">
                                    Booking
                                </h1>
                            </div>
                            <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                                Tabel Data Booking
                            </h4>
                        </div>
                    )}

                    <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                        <a href="#" onClick={() => toggleTab("Booking")}>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 ${
                                    activeTab === "Booking"
                                        ? "border-b-2 border-[#FFA101] font-bold"
                                        : ""
                                }`}
                            >
                                Booking
                            </h2>
                        </a>
                    </div>
                    {/* {activeTab === "Booking" && (           
                    <div className="bg-[#000000]flex flex-row relative rounded-full overflow-hidden mb-5">
                        <input
                            className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                            type="text"
                            placeholder="Cari Data Booking"
                        />

                        <button
                            className="bg-blue-500 h-[40px] md:h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8"
                            onClick={() => handlePage("/Booking/create")}
                        >
                            Add Data
                        </button>
                    </div>
                    )} */}
                    {activeTab === "Booking" && (
                        <div className="bg-[#000000]flex flex-row relative rounded-full overflow-hidden mb-5">
                            <input
                                className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                type="text"
                                placeholder="Cari Data Harga"
                            />

                            {/* <button
                            className="bg-blue-500 h-[40px] md:h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8"
                            onClick={() => handlePage("/harga/create")}
                        >
                            Add Data
                        </button> */}
                        </div>
                    )}
                    {activeTab === "Booking" && (
                        <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                            <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                <div className="flex">
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                        NO
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Nama Fasilitas
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Nama Specific Fasilitas
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        ID_Account
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Tanggal Pemesanan
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Durasi
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Jam CheckIn
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Jam CheckOut
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Status
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Bukti Pembayaran
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Total Harga
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Action
                                    </h1>
                                </div>

                                <div className="bg-white divide-y divide-gray-200">
                                    <div className="">
                                        {dataBooking.map((data, index) => (
                                            <div className="flex" key={index}>
                                                <div className="px-6 py-4 whitespace-no-wrap">
                                                    {index + 1}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                                    {data.id_fasilitas.nama}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.id_harga.nama}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.id_account.id_account}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.tanggal_pemesanan}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.durasi}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.jam_checkin}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.jam_checkout}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.status}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.bukti_pembayaran}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.total_harga.harga *
                                                        data.durasi}
                                                </div>
                                                {/* <div className="px-6 py-4 whitespace-no-wrap w-[130px]">
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
                                                                src={`https://api.ricogann.com/assets/${foto}`}
                                                                alt="foto"
                                                                width={100}
                                                                height={100}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div> */}
                                                <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                        Edit
                                                    </button>
                                                    {/* <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() =>
                                                        handleDeleteBooking(
                                                            data.id_pemesanan
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
