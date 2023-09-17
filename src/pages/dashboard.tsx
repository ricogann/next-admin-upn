import { useState, useEffect } from "react";
import SideBar from "@/components/sidebar";
import Image from "next/image";
import { useRouter } from "next/router";

interface Mahasiswa {
    id: number;
    nama: string;
    bukti_identitas: string;
}

interface Dosen {
    id: number;
    nama: string;
    bukti_identitas: string;
}

interface Umum {
    id: number;
    nama: string;
    bukti_identitas: string;
}

interface Fasilitas {
    nama: string;
}

interface Role {
    nama: string;
}

interface Account {
    Dosen: Dosen[];
    Mahasiswa: Mahasiswa[];
    Umum: Umum[];
    Role: Role;

    id_account: number;
    status_account: boolean;
}

interface Pemesanan {
    Account: Account;
    Fasilitas: Fasilitas;
    id_pemesanan: number;
    jam_checkin: string;
    jam_checkout: string;
    total_harga: number;
    tanggal_pemesanan: string;
    bukti_identitas: string;
    status: string;
    createdAt: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("mahasiswa");
    const [totalSum, setTotalSum] = useState(0); // Initialize with 0 as an integer
    const [dataPemesanan, setDataPemesanan] = useState<Pemesanan[]>([]);
    const [dataUsers, setDataUsers] = useState<Account[]>([]);
    const [buktiIdentitas, setBuktiIdentitas] = useState<string[]>([]);
    const [allData, setAllData] = useState<Pemesanan[]>([]);

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    async function getUsers() {
        try {
            const res = await fetch(
                "https://api.ricogann.com/api/users/account"
            );
            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getPemesanan() {
        try {
            const res = await fetch("https://api.ricogann.com/api/booking");
            const data = await res.json();

            return data.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function updateStatus(id: number, status: string) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/booking/verifikasi/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: status,
                    }),
                }
            );

            const data = await res.json();
            router.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function updateStatusAcoount(
        id: number,
        id_account: number,
        status: boolean
    ) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/account/verifikasi/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id_account,
                        status_account: status,
                    }),
                }
            );

            const data = await res.json();
            router.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const dataUsers = await getUsers();
                const dataBooking = await getPemesanan();

                const filter = dataBooking.filter(
                    (item: Pemesanan) => item.status === "Menunggu Konfirmasi"
                );

                const dataUsersFilter = dataUsers.filter(
                    (item: Account) => item.status_account === false
                );

                const accountBukti: string[] = [];
                const buktiPembayaranFilter = dataUsers.filter(
                    (item: Account) => {
                        if (item.Mahasiswa.length > 0) {
                            item.Mahasiswa.map((item: Mahasiswa) => {
                                accountBukti.push(item.bukti_identitas);
                            });
                        } else if (item.Dosen.length > 0) {
                            item.Dosen.map((item: Dosen) => {
                                accountBukti.push(item.bukti_identitas);
                            });
                        } else if (item.Umum.length > 0) {
                            item.Umum.map((item: Umum) => {
                                accountBukti.push(item.bukti_identitas);
                            });
                        }
                    }
                );

                console.log(dataBooking);
                setAllData(dataBooking);
                setBuktiIdentitas(accountBukti);
                setDataUsers(dataUsersFilter);
                setDataPemesanan(filter);
                setTotalSum(dataUsers.length);
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        fetchData();
    }, []);

    console.log(dataUsers);

    const isTabActive = (tab: string) => activeTab === tab;

    const handleStatus = (id: number, status: string) => {
        updateStatus(id, status);
    };

    const handleStatusAccount = (
        id: number,
        id_account: number,
        status: boolean
    ) => {
        updateStatusAcoount(id, id_account, status);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "bookings":
                return (
                    <div className="grid grid-cols-3">
                        {dataPemesanan.map((item: Pemesanan, index: number) => (
                            <div
                                className="bg-white rounded-lg shadow-lg p-5 mr-5 mb-5"
                                key={index}
                            >
                                {/* Booking content */}
                                <p className="text-[14] font-bold mb-1">{}</p>
                                <p className="text-[12] font-regular text-[#7F8FA4]">
                                    Nama Penyewa
                                </p>
                                <p className="text-[14] font-regular mb-5 ">
                                    {item.Account.Mahasiswa[0].nama.length > 0
                                        ? item.Account.Mahasiswa[0].nama
                                        : item.Account.Dosen[0].nama.length > 0
                                        ? item.Account.Dosen[0].nama
                                        : item.Account.Umum[0].nama}
                                </p>
                                <p className="text-[12] font-regular text-[#7F8FA4]">
                                    Fasilitas
                                </p>
                                <p className="text-[14] font-regular mb-5 ">
                                    {item.Fasilitas.nama}
                                </p>
                                <div className="flex flex-row ">
                                    <div className="flex-col">
                                        <p className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                            Bukti Pembayaran
                                        </p>
                                        <Image
                                            src={`https://api.ricogann.com/assets/${item.bukti_identitas}`}
                                            alt="bukti-pembayaran"
                                            width={100}
                                            height={100}
                                            className="m-2 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <p className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                            Biaya
                                        </p>
                                        <p className="text-[14] font-regular mr-10 ">
                                            Rp
                                            {item.total_harga
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    "."
                                                )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row border-t mt-2">
                                    <button
                                        onClick={() =>
                                            handleStatus(
                                                item.id_pemesanan,
                                                "Dikonfirmasi"
                                            )
                                        }
                                    >
                                        <p className="text-[14] font-Bold mr-14 text-[#69519E]">
                                            Accept Booking
                                        </p>
                                    </button>
                                    {/* <a href="https://">
                                            <p className="text-[14] font-Bold mr-10 text-[#69519E]">
                                                Decline
                                            </p>
                                        </a> */}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case "mahasiswa":
                return (
                    <div className="grid grid-cols-3">
                        {dataUsers.map((item: Account, index: number) => (
                            <div
                                className="bg-white rounded-lg shadow-lg p-5 mr-5 mb-5"
                                key={index}
                            >
                                {/* Mahasiswa content */}
                                <div className="text-[14] font-bold mb-1">
                                    {item.Mahasiswa.length > 0
                                        ? item.Mahasiswa.map(
                                              (
                                                  item: Mahasiswa,
                                                  index: number
                                              ) => (
                                                  <p key={index}>{item.nama}</p>
                                              )
                                          )
                                        : item.Dosen.length > 0
                                        ? item.Dosen.map(
                                              (item: Dosen, index: number) => (
                                                  <p key={index}>{item.nama}</p>
                                              )
                                          )
                                        : item.Umum.map(
                                              (item: Umum, index: number) => (
                                                  <p key={index}>{item.nama}</p>
                                              )
                                          )}
                                </div>
                                <div className="flex flex-row ">
                                    <div className="flex-col">
                                        <div className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                            Bukti Registrasi
                                        </div>
                                        <Image
                                            src={`https://api.ricogann.com/assets/${buktiIdentitas[index]}`}
                                            alt="bukti-pembayaran"
                                            width={100}
                                            height={100}
                                            className="m-2 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <div className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                            Tahun Ajaran
                                        </div>
                                        <p className="text-[14] font-regular mr-10 ">
                                            2022/2023
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row border-t mt-2">
                                    <button
                                        onClick={() =>
                                            handleStatusAccount(
                                                item.id_account,
                                                item.Mahasiswa.length > 0
                                                    ? item.Mahasiswa[0].id
                                                    : item.Dosen.length > 0
                                                    ? item.Dosen[0].id
                                                    : item.Umum[0].id,
                                                true
                                            )
                                        }
                                    >
                                        <p className="text-[14] font-Bold mr-14 text-[#69519E]">
                                            Approve
                                        </p>
                                    </button>
                                    <a href="https://">
                                        <p className="text-[14] font-Bold ml-8 text-[#69519E]">
                                            Decline
                                        </p>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div className="flex">
            <div className="">
                <SideBar />
            </div>
            <div className="w-full">
                <div className="flex-1 bg-[#F7F8FA]">
                    <div className="p-10">
                        <div className="flex flex-col items-start justify-center">
                            <h1 className="text-[45px] font-bold">Dashboard</h1>
                            <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                Welcome Back!
                            </h4>
                            <h4 className="text-[20px] font-semibold mb-3">
                                Quick Stats
                            </h4>
                        </div>

                        <div className="flex flex-row items-start mb-10">
                            <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                                <h1 className="font-regular mb-3">
                                    Total Bookings
                                </h1>
                                <h1 className="text-[28px] font-bold ">
                                    {allData.length}
                                </h1>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                                <h1 className="font-regular mb-3">
                                    Pending Booking
                                </h1>
                                <h1 className="text-[28px] font-bold text-red-500">
                                    {dataPemesanan.length}
                                </h1>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                                <h1 className="font-regular mb-3">
                                    Total Users
                                </h1>
                                <h1 className="text-[28px] font-bold ">
                                    {totalSum}
                                </h1>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                                <h1 className="font-regular mb-3">
                                    Pending Mahasiswa
                                </h1>
                                <h1 className="text-[28px] font-bold text-red-500">
                                    {dataUsers.length}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                            <a
                                href="#"
                                onClick={() => toggleTab("bookings")}
                                className={`text-[18] ${
                                    isTabActive("bookings")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                }`}
                            >
                                Bookings Fasilitas
                            </a>
                            <a
                                href="#"
                                onClick={() => toggleTab("mahasiswa")}
                                className={`text-[18] ${
                                    isTabActive("mahasiswa")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                }`}
                            >
                                Request Account
                            </a>
                        </div>
                        <div className="flex flex-wrap items-start mb-5">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
