import { useState, useEffect } from "react";
import SideBar from "@/components/sidebar";
import Image from "next/image";
import _booking from "@/services/booking.service";
import _users from "@/services/users.service";
import _lib from "@/lib/index";
import { io } from "socket.io-client";
import CookiesDTO from "@/interfaces/cookiesDTO";

import { useRouter } from "next/router";

interface Mahasiswa {
    id: number;
    nama: string;
    bukti_identitas: string;
    npm: string;
}

interface Dosen {
    id: number;
    nama: string;
    bukti_identitas: string;
    NIP: string;
}

interface Umum {
    id: number;
    nama: string;
    bukti_identitas: string;
    NIK: string;
}

interface Fasilitas {
    nama: string;
}

interface Role {
    nama_role: string;
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
    bukti_pembayaran: string;
    SIK: string;
    status: string;
    createdAt: string;
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("mahasiswa");
    const [totalSum, setTotalSum] = useState(0); // Initialize with 0 as an integer
    const [dataPemesanan, setDataPemesanan] = useState<Pemesanan[]>([]);
    const [dataUsers, setDataUsers] = useState<Account[]>([]);
    const [buktiIdentitas, setBuktiIdentitas] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [allData, setAllData] = useState<Pemesanan[]>([]);
    const [isLogin, setIsLogin] = useState(false);
    const libCookies = new _lib();
    const router = useRouter();
    const [cookiesCert, setCookiesCert] = useState("");

    const [buktiToShow, setBuktiToShow] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [realTimeMessage, setRealTimeMessage] = useState<string>("");
    const [accountRealTimeMessage, setAccountRealTimeMessage] =
        useState<string>("");

    const playNotif = () => {
        const audio = document.getElementById(
            "notif-sound"
        ) as HTMLAudioElement;
        audio.play();
    };

    useEffect(() => {
        const socket = io("https://api.ricogann.com");

        socket.on("connect", () => {
            console.log("connected");
        });

        socket.on("newBooking", (message: string) => {
            playNotif();
            setRealTimeMessage(message);
        });

        socket.on("newUser", (message: string) => {
            playNotif();
            setAccountRealTimeMessage(message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const booking = new _booking();
    const users = new _users();
    const lib = new _lib();

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const itemsPerPage = 6;

    const dataPemesananToShow = lib.dataToShow(
        dataPemesanan,
        currentPage,
        itemsPerPage
    );

    const dataUsersToShow = lib.dataToShow(
        dataUsers,
        currentPage,
        itemsPerPage
    );

    const totalPagesBookingFasilitas = Math.ceil(
        dataPemesanan.length / itemsPerPage
    );
    const totalPagesRequestAccount = Math.ceil(dataUsers.length / itemsPerPage);

    const pagesBookingToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPagesBookingFasilitas
    );
    const pagesRequestAccountToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPagesRequestAccount
    );

    useEffect(() => {
        async function fetchData() {
            try {
                const dataCookies: CookiesDTO = await libCookies.getCookies();
                setCookiesCert(dataCookies.CERT);
                const dataUsers = await users.getUsers(dataCookies.CERT);

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

                setBuktiIdentitas(accountBukti);
                setDataUsers(dataUsersFilter);
                setTotalSum(dataUsers.length);

                if (dataCookies.CERT !== undefined) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                    router.push("/auth/login");
                }
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
                throw error;
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountRealTimeMessage]);

    useEffect(() => {
        async function fetchData() {
            try {
                const dataBooking = await booking.getPemesanan();

                const filter = dataBooking.filter(
                    (item: Pemesanan) => item.status === "Menunggu Konfirmasi"
                );

                setAllData(dataBooking);
                setDataPemesanan(filter);
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
                throw error;
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realTimeMessage]);

    const isTabActive = (tab: string) => activeTab === tab;

    const handleStatus = (id: number, status: string) => {
        booking.updateStatus(id, status, cookiesCert);
    };

    const handleStatusAccount = (
        id: number,
        id_account: number,
        status: boolean
    ) => {
        users.updateStatusAccount(id, id_account, status, cookiesCert);
    };

    const imageCheck = (bukti_identitas: string, sik: string) => {
        if (bukti_identitas !== null) {
            return bukti_identitas;
        } else {
            return sik;
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "bookings":
                return (
                    <div className="flex flex-col text-black">
                        <div className="grid grid-cols-3">
                            {dataPemesananToShow.map(
                                (item: Pemesanan, index: number) => (
                                    <div
                                        className="bg-white rounded-lg shadow-xl h-[320px] p-5 mr-5 mb-5 flex flex-col justify-between"
                                        key={index}
                                    >
                                        <div className="">
                                            <p className="text-[12] font-bold">
                                                Nama Penyewa
                                            </p>
                                            <p className="text-[14] font-regular mb-5 xl:mb-2">
                                                {item.Account.Mahasiswa[0].nama
                                                    .length > 0
                                                    ? item.Account.Mahasiswa[0]
                                                          .nama
                                                    : item.Account.Dosen[0].nama
                                                          .length > 0
                                                    ? item.Account.Dosen[0].nama
                                                    : item.Account.Umum[0].nama}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <div className="">
                                                    <p className="text-[12] font-bold">
                                                        Fasilitas
                                                    </p>
                                                    <p className="text-[14] font-regular mb-5 ">
                                                        {item.Fasilitas.nama}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col justify-end items-end">
                                                    <p className="text-[12] font-bold">
                                                        Tanggal Pemesanan
                                                    </p>
                                                    <p className="text-[14] font-regular mb-5 ">
                                                        {
                                                            item.tanggal_pemesanan.split(
                                                                "T"
                                                            )[0]
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <div className="flex-col">
                                                    <p className="text-[14px] font-bold text-center">
                                                        {item.bukti_pembayaran !==
                                                        null
                                                            ? "Bukti Pembayaran"
                                                            : "SIK"}
                                                    </p>
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            toggleModal(
                                                                imageCheck(
                                                                    item.bukti_pembayaran,
                                                                    item.SIK
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            src={`https://api.ricogann.com/assets/${imageCheck(
                                                                item.bukti_pembayaran,
                                                                item.SIK
                                                            )}`}
                                                            alt="bukti-pembayaran"
                                                            width={100}
                                                            height={100}
                                                            className="m-2 rounded-lg"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-col text-[14px] text-center mr-12">
                                                    <p className="font-bold">
                                                        Biaya
                                                    </p>
                                                    <p className="font-regular">
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
                                            <button
                                                onClick={() =>
                                                    handleStatus(
                                                        item.id_pemesanan,
                                                        "Dibatalkan"
                                                    )
                                                }
                                            >
                                                <p className="text-[14] font-Bold mr-10 text-[#69519E]">
                                                    Decline
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="flex items-center justify-center p-3">
                            <div className="join">
                                {pagesBookingToDisplay.map((page) => (
                                    <button
                                        key={page}
                                        className={`join-item btn ${
                                            currentPage === page
                                                ? "btn-active"
                                                : ""
                                        }`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "mahasiswa":
                return (
                    <div className="flex flex-col text-black">
                        <div className="grid grid-cols-3">
                            {dataUsersToShow.map(
                                (item: Account, index: number) => (
                                    <div
                                        className="bg-white rounded-lg shadow-lg p-5 mr-5 mb-5"
                                        key={index}
                                    >
                                        {/* Mahasiswa content */}
                                        <div className="text-[14] font-regular mb-1">
                                            {item.Mahasiswa.length > 0
                                                ? item.Mahasiswa.map(
                                                      (
                                                          item: Mahasiswa,
                                                          index: number
                                                      ) => (
                                                          <div key={index}>
                                                              <h1 className="font-bold">
                                                                  Nama
                                                              </h1>
                                                              <h1>
                                                                  {item.nama}
                                                              </h1>
                                                          </div>
                                                      )
                                                  )
                                                : item.Dosen.length > 0
                                                ? item.Dosen.map(
                                                      (
                                                          item: Dosen,
                                                          index: number
                                                      ) => (
                                                          <div key={index}>
                                                              <h1 className="font-bold">
                                                                  Nama
                                                              </h1>
                                                              <h1>
                                                                  {item.nama}
                                                              </h1>
                                                          </div>
                                                      )
                                                  )
                                                : item.Umum.map(
                                                      (
                                                          item: Umum,
                                                          index: number
                                                      ) => (
                                                          <div key={index}>
                                                              <h1 className="font-bold">
                                                                  Nama
                                                              </h1>
                                                              <h1>
                                                                  {item.nama}
                                                              </h1>
                                                          </div>
                                                      )
                                                  )}
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-[14] font-regular">
                                                <h1 className="font-bold">
                                                    Role
                                                </h1>
                                                {item.Role.nama_role
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    item.Role.nama_role.slice(
                                                        1
                                                    )}
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <h1 className="font-bold">
                                                    Nomor Identitas
                                                </h1>
                                                {item.Mahasiswa.length > 0
                                                    ? item.Mahasiswa.map(
                                                          (
                                                              item: Mahasiswa,
                                                              index: number
                                                          ) => (
                                                              <h1 key={index}>
                                                                  {item.npm}
                                                              </h1>
                                                          )
                                                      )
                                                    : item.Dosen.length > 0
                                                    ? item.Dosen.map(
                                                          (
                                                              item: Dosen,
                                                              index: number
                                                          ) => (
                                                              <h1 key={index}>
                                                                  {item.NIP}
                                                              </h1>
                                                          )
                                                      )
                                                    : item.Umum.map(
                                                          (
                                                              item: Umum,
                                                              index: number
                                                          ) => (
                                                              <h1 key={index}>
                                                                  {item.NIK}
                                                              </h1>
                                                          )
                                                      )}
                                            </div>
                                        </div>
                                        <div className="flex flex-row mt-4">
                                            <div className="flex-col">
                                                <div className="text-[14] font-bold">
                                                    Bukti Registrasi
                                                </div>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        toggleModal(
                                                            buktiIdentitas[
                                                                index
                                                            ]
                                                        )
                                                    }
                                                >
                                                    <Image
                                                        src={`https://api.ricogann.com/assets/${buktiIdentitas[index]}`}
                                                        alt="bukti-pembayaran"
                                                        width={120}
                                                        height={120}
                                                        className="my-2 rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row border-t mt-2">
                                            <button
                                                onClick={() =>
                                                    handleStatusAccount(
                                                        item.id_account,
                                                        item.Mahasiswa.length >
                                                            0
                                                            ? item.Mahasiswa[0]
                                                                  .id
                                                            : item.Dosen
                                                                  .length > 0
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
                                            <button
                                                onClick={() =>
                                                    handleStatusAccount(
                                                        item.id_account,
                                                        item.Mahasiswa.length >
                                                            0
                                                            ? item.Mahasiswa[0]
                                                                  .id
                                                            : item.Dosen
                                                                  .length > 0
                                                            ? item.Dosen[0].id
                                                            : item.Umum[0].id,
                                                        false
                                                    )
                                                }
                                            >
                                                <p className="text-[14] font-Bold mr-14 text-[#69519E]">
                                                    Decline
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="flex items-center justify-center p-3">
                            <div className="join">
                                {pagesRequestAccountToDisplay.map((page) => (
                                    <button
                                        key={page}
                                        className={`join-item btn ${
                                            currentPage === page
                                                ? "btn-active"
                                                : ""
                                        }`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const toggleModal = (bukti: string) => {
        setBuktiToShow(bukti);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="">
            {isLogin ? (
                <div className="flex bg-[#FFFFFF] text-black relative">
                    <audio
                        controls
                        src="/notification-sound.mp3"
                        className="hidden"
                        id="notif-sound"
                    />
                    {isModalOpen && (
                        <div className="w-full h-full fixed flex justify-center items-center z-50 backdrop-blur-sm">
                            <div className="rounded-lg p-10 flex flex-col justify-center items-center">
                                <div className="flex flex-row justify-end w-full mb-5">
                                    <button
                                        className="text-[20px] font-bold text-[#F0EDEE] bg-[#07393C] px-5 py-2 rounded-xl"
                                        onClick={() => toggleModal("")}
                                    >
                                        Close
                                    </button>
                                </div>
                                <Image
                                    src={`https://api.ricogann.com/assets/${buktiToShow}`}
                                    width={500}
                                    height={500}
                                    alt="bukti-upload"
                                />
                            </div>
                        </div>
                    )}
                    <div className="">
                        <SideBar />
                    </div>
                    <div className="flex w-full">
                        <div className="flex-1 bg-[#F7F8FA]">
                            <div className="p-10">
                                <div className="flex flex-col items-start justify-center">
                                    <h1 className="text-[45px] font-bold">
                                        Dashboard
                                    </h1>
                                    <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                        Welcome Back!
                                    </h4>
                                    <h4 className="text-[20px] font-bold mb-3">
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
            ) : (
                <div className="h-screen w-screen bg-white flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )}
        </div>
    );
}
