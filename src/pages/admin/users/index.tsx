import { useState, useEffect } from "react";
import SideBar from "@/components/sidebar";
import Image from "next/image";
import { useRouter } from "next/router";
import _users from "@/services/users.service";
import _lib from "@/lib/index";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface CookiesDTO {
    ADMIN: string;
}

interface Umum {
    id: number;
    id_account: number;
    NIK: string;
    nama: string;
    email: string;
    password: string;
    no_telp: string;
    status: boolean;
    bukti_identitas: string;
}

interface UKM {
    id: number;
    id_account: number;
    nama_ukm: string;
    email: string;
    password: string;
    no_telp: string;
    status: boolean;
    bukti_identitas: string;
    nama_pj: string;
}

interface Organisasi {
    id: number;
    id_account: number;
    nama_organisasi: string;
    email: string;
    password: string;
    no_telp: string;
    status: boolean;
    bukti_identitas: string;
    nama_pj: string;
}

interface Mahasiswa {
    id: number;
    id_account: number;
    npm: string;
    password: string;
    nama: string;
    email: string;
    bukti_identitas: string;
    no_telp: number;
    status: boolean;
    Fakultas: Fakultas;
    Prodi: Prodi;
}

interface Dosen {
    id: number;
    id_account: number;
    NIP: string;
    nama: string;
    no_telp: string;
    bukti_identitas: string;
    status: boolean;
    email: string;
    password: string;
}

interface Prodi {
    id_prodi: number;
    nama_prodi: string;
}

interface Fakultas {
    id_fakultas: number;
    nama_fakultas: string;
}

interface TahunAjaran {
    id_tahun_ajaran: number;
    tahun_ajaran: string;
}

export default function Users() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("umum");
    const [umum, setUmum] = useState<Umum[]>([]);
    const [ukm, setUkm] = useState<UKM[]>([]);
    const [organisasi, setOrganisasi] = useState<Organisasi[]>([]);
    const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
    const [dosen, setDosen] = useState<Dosen[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState<string>("");
    const [filteredUmum, setFilteredUmum] = useState<Umum[]>([]);
    const [filteredDosen, setFilteredDosen] = useState<Dosen[]>([]);
    const [filteredMahasiswa, setFilteredMahasiswa] = useState<Mahasiswa[]>([]);
    const [filteredUkm, setFilteredUkm] = useState<UKM[]>([]);
    const [filteredOrganisasi, setFilteredOrganisasi] = useState<Organisasi[]>([]);
    const [isLogin, setIsLogin] = useState(false);
    const [cookiesADMIN, setCookiesADMIN] = useState<string>("");
    const libCookies = new _lib();

    const [eyeOpen, setEyeOpen] = useState<boolean>(true);
    const [buktiToShow, setBuktiToShow] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const users = new _users();
    const lib = new _lib();

    useEffect(() => {
        async function fetchData() {
            try {
                const dataCookies: CookiesDTO = await libCookies.getCookies();

                if (dataCookies.ADMIN !== undefined) {
                    setIsLogin(true);
                                    setCookiesADMIN(dataCookies.ADMIN);

                const dataUmum = await users.getUmum(dataCookies.ADMIN);
                const dataMahasiswa = await users.getMahasiswa(
                    dataCookies.ADMIN
                );
                const dataDosen = await users.getDosen(dataCookies.ADMIN);
                const dataUKM = await users.getUkm(dataCookies.ADMIN);
                const dataOrganisasi = await users.getOrganisasi(dataCookies.ADMIN);

                setUmum(dataUmum.data);
                setMahasiswa(dataMahasiswa.data);
                setDosen(dataDosen.data);
                setUkm(dataUKM.data);
                setOrganisasi(dataOrganisasi.data);
                setFilteredMahasiswa(dataMahasiswa.data);
                setFilteredOrganisasi(dataOrganisasi.data);
                setFilteredUkm(dataUKM.data);
                setFilteredUmum(dataUmum.data);
                } else {
                    setIsLogin(false);
                    router.push("/admin/auth/login");
                }
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
                throw error;
            }
        }

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        const filteredDataMahasiswa = mahasiswa.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        const filteredData = umum.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        const filteredDataDosen = dosen.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        const filteredDataUkm = ukm.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        const filteredDataOrganisasi = organisasi.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        if (activeTab === "umum") {
            setFilteredUmum(filteredData);
        } else if (activeTab === "dosen") {
            setFilteredDosen(filteredDataDosen);
        } else if(activeTab === "mahasiswa"){
            setFilteredMahasiswa(filteredDataMahasiswa);
        } else if (activeTab === "organisasi"){
            setFilteredOrganisasi(filteredDataOrganisasi);
        } else if (activeTab === "ukm"){
            setFilteredUkm(filteredDataUkm);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dosen, umum, mahasiswa, organisasi, ukm , searchText]);

    const itemsPerPage = 5;

    const dataUmumToShow = umum.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const dataUkmToShow = ukm.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const dataOrganisasiToShow = organisasi.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const dataDosenToShow = dosen.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const dataMahasiswaToShow = mahasiswa.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const totalPagesUmum = Math.ceil(filteredUmum.length / itemsPerPage);
    const totalPagesDosen = Math.ceil(dosen.length / itemsPerPage);
    const totalPagesMahasiswa = Math.ceil(filteredMahasiswa.length / itemsPerPage);
    const totalPagesUkm = Math.ceil(filteredUkm.length / itemsPerPage);
    const totalPagesOrganisasi = Math.ceil(filteredOrganisasi.length / itemsPerPage);

    const pagesUmumToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPagesUmum
    );
    const pagesDosenToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPagesDosen
    );
    const pagesMahasiswaToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPagesMahasiswa
    );
    const pagesUkmToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPagesUkm
    );
    const pagesOrganisasiToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPagesOrganisasi
    );

    const handleStatusAccount = async (
        id: number,
        id_account: number,
        status: boolean
    ) => {
        await users.updateStatusAccount(id, id_account, status, cookiesADMIN);
    };

    const handleDelete = async (id: number) => {
        try {
            const data = await users.deleteUsers(id, cookiesADMIN);

            if (data.status === true) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteDosen = async (id: number) => {
        try {
            const data = await users.deleteDosen(id, cookiesADMIN);

            if (data.status === true) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteMahasiswa = async (id: number) => {
        try {
            const data = await users.deleteMahasiswa(id, cookiesADMIN);

            if (data.status === true) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const decryptedPassword = (password: string) => {
        return lib.decrypt(password);
    };

    const toggleModal = (bukti: string) => {
        setBuktiToShow(bukti);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className=" flex bg-[#F7F8FA] relative">
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
            <div className="p-10 text-black">
                <div className="flex flex-col items-start justify-center">
                    <div className="flex flex-row items-start">
                        <h1 className="text-[40px] font-bold mr-14">Users</h1>
                    </div>
                    <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                        Tabel Data Users
                    </h4>
                </div>

                <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                    <a href="#" onClick={() => toggleTab("umum")}>
                        <h2
                            className={`text-[18] font-regular mb-3 mr-14 ${
                                activeTab === "umum"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Umum
                        </h2>
                    </a>
                    <a href="#" onClick={() => toggleTab("ukm")}>
                        <h2
                            className={`text-[18] font-regular mb-3 mr-14 ${
                                activeTab === "ukm"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Ukm
                        </h2>
                    </a>
                    <a href="#" onClick={() => toggleTab("organisasi")}>
                        <h2
                            className={`text-[18] font-regular mb-3 mr-14 ${
                                activeTab === "organisasi"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Organisasi
                        </h2>
                    </a>
                    <a href="#" onClick={() => toggleTab("mahasiswa")}>
                        <h2
                            className={`text-[18] font-regular mb-3 mr-14 ${
                                activeTab === "mahasiswa"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Mahasiswa
                        </h2>
                    </a>
                </div>

                <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                    {activeTab === "umum" && (
                        <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                            <div className="relative rounded-full overflow-hidden mb-5">
                                <input
                                    className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    placeholder="Cari Users Umum"
                                />
                            </div>
                            <div className="flex">
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[80px]">
                                    ID
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    NIK
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[130px]">
                                    Nama
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Email
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[200px]">
                                    Password
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[140px]">
                                    No Telepon
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Bukti Identitas
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[80px]">
                                    Status
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Action
                                </div>
                            </div>
                            <div className="bg-white divide-y divide-gray-200">
                                {filteredUmum.map((umum, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4  w-[80px] text-center">
                                            {umum.id_account}
                                        </div>
                                        <div className="px-6 py-4 break-all  w-[120px] text-center">
                                            {umum.NIK}
                                        </div>
                                        <div className="px-6 py-4 w-[130px] text-center ">
                                            {umum.nama}
                                        </div>
                                        <div className="px-6 py-4  break-all w-[150px] text-center">
                                            {umum.email}
                                        </div>
                                        <div className="px-6 py-4 break-all w-[200px] text-center flex items-center justify-between">
                                            <div className="">
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "" : "hidden"
                                                    } text-[15px]`}
                                                >
                                                    {umum.password}
                                                </h1>
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "hidden" : ""
                                                    }`}
                                                >
                                                    {decryptedPassword(
                                                        umum.password
                                                    )}
                                                </h1>
                                            </div>
                                            <div className="">
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "" : "hidden"
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(false)
                                                    }
                                                >
                                                    <AiFillEye />
                                                </div>
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "hidden" : ""
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(true)
                                                    }
                                                >
                                                    <AiFillEyeInvisible />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4  w-[140px] text-center">
                                            <a
                                                href={`https://wa.me/${umum.no_telp}?text=Halo%20${umum.nama},%20Kami%20adalah%20admin%20dari%20BPU%20UPN%20VETERAN%20JAWA%20TIMUR.%20Kami%20senang%20bisa%20berhubungan%20dengan%20Anda%20melalui%20WhatsApp.%20Jangan%20ragu%20untuk%20menghubungi%20kami%20jika%20Anda%20membutuhkan%20bantuan,%20informasi,%20atau%20pertanyaan%20lainnya%20terkait%20dengan%20UPN%20VETERAN%20JAWA%20TIMUR.%20Terima%20kasih!"`}
                                            >
                                                {umum.no_telp}
                                            </a>
                                        </div>
                                        <div className="px-6 py-4  w-[150px] flex items-center justify-center">
                                            <div
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    toggleModal(
                                                        umum.bukti_identitas
                                                    )
                                                }
                                            >
                                                <Image
                                                    src={`https://api.ricogann.com/assets/${umum.bukti_identitas}`}
                                                    width={100}
                                                    height={100}
                                                    alt="bukti registrasi"
                                                />
                                            </div>
                                        </div>
                                        {umum.status ? (
                                            <div className="px-6 py-4  w-[80px] text-center text-green-800">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4  w-[80px] text-center text-red-500">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[150px]">
                                            {umum.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl "
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            umum.id_account,
                                                            umum.id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    DeActive
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            umum.id_account,
                                                            umum.id,
                                                            true
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center p-3">
                                <div className="join">
                                    {pagesUmumToDisplay.map((page) => (
                                        <button
                                            key={page}
                                            className={`join-item btn  ${
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
                                {/* Render pagesDosenToDisplay and pagesMahasiswaToDisplay similarly */}
                            </div>
                        </div>
                    )}

                    {activeTab === "dosen" && (
                        <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                            <div className="relative rounded-full overflow-hidden mb-5">
                                <input
                                    className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    placeholder="Cari Users Dosen"
                                />
                            </div>
                            <div className="flex">
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[60px]">
                                    ID
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    NIP
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Nama
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Email
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[200px]">
                                    Password
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[140px]">
                                    No Telepon
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Bukti Registrasi
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[80px]">
                                    Status
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Action
                                </div>
                            </div>
                            <div className="bg-white divide-y divide-gray-200">
                                {dataDosenToShow.map((dosen, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4  w-[60px] text-center">
                                            {dosen.id_account}
                                        </div>
                                        <div className="px-6 py-4  w-[120px] text-center">
                                            {dosen.NIP}
                                        </div>
                                        <div className="px-6 py-4 w-[150px] text-center ">
                                            {dosen.nama}
                                        </div>
                                        <div className="px-6 py-4  break-all w-[150px] text-center">
                                            {dosen.email}
                                        </div>
                                        <div className="px-6 py-4 break-all w-[200px] text-center flex items-center justify-between">
                                            <div className="">
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "" : "hidden"
                                                    } text-[15px]`}
                                                >
                                                    {dosen.password}
                                                </h1>
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "hidden" : ""
                                                    }`}
                                                >
                                                    {decryptedPassword(
                                                        dosen.password
                                                    )}
                                                </h1>
                                            </div>
                                            <div className="">
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "" : "hidden"
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(false)
                                                    }
                                                >
                                                    <AiFillEye />
                                                </div>
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "hidden" : ""
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(true)
                                                    }
                                                >
                                                    <AiFillEyeInvisible />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4  w-[140px] text-center">
                                            <a
                                                href={`https://wa.me/${dosen.no_telp}?text=Halo%20${dosen.nama}%20Saya%20adalah%20admin%20dari%20BPU%20UPN%20VETERAN%20JAWA%20TIMUR.%20Kami%20senang%20bisa%20berhubungan%20dengan%20Anda%20melalui%20WhatsApp.%20Jangan%20ragu%20untuk%20menghubungi%20kami%20jika%20Anda%20membutuhkan%20bantuan,%20informasi,%20atau%20pertanyaan%20lainnya%20terkait%20dengan%20UPN%20VETERAN%20JAWA%20TIMUR.%20Terima%20kasih!"`}
                                            >
                                                {dosen.no_telp}
                                            </a>
                                        </div>
                                        <div className="px-6 py-4  w-[150px] flex items-center justify-center">
                                            <div
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    toggleModal(
                                                        dosen.bukti_identitas
                                                    )
                                                }
                                            >
                                                <Image
                                                    src={`https://api.ricogann.com/assets/${dosen.bukti_identitas}`}
                                                    width={100}
                                                    height={100}
                                                    alt="bukti registrasi"
                                                />
                                            </div>
                                        </div>
                                        {dosen.status ? (
                                            <div className="px-6 py-4  w-[80px] text-center text-green-800">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4  w-[80px] text-center text-red-500">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[150px]">
                                            {dosen.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl "
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            dosen.id_account,
                                                            dosen.id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    DeActive
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            dosen.id_account,
                                                            dosen.id,
                                                            true
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center p-3">
                                <div className="join">
                                    {pagesDosenToDisplay.map((page) => (
                                        <button
                                            key={page}
                                            className={`join-item btn  ${
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
                    )}

                    {activeTab === "mahasiswa" && (
                        <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                            <div className="relative rounded-full overflow-hidden mb-5">
                                <input
                                    className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    placeholder="Cari Users Mahasiswa"
                                />
                            </div>
                            <div className="flex">
                                <div className="px-6 py-3 bg-[#B9B9B9] text-left text-xs leading-4 font-medium text-black uppercase w-[50px]">
                                    ID
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Nama Mahasiswa
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    NPM
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[220px]">
                                    Password
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Fakultas, Jurusan
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    No Telepon
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[140px]">
                                    Bukti Identitas
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Status
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Action
                                </div>
                            </div>
                            <div className="flex flex-col bg-white divide-y divide-gray-200">
                                {filteredMahasiswa.map((mahasiswa, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4 w-[50px]">
                                            {mahasiswa.id}
                                        </div>
                                        <div className="px-6 py-4 w-[120px] text-center text-[15px]">
                                            {mahasiswa.nama}
                                        </div>
                                        <div className="px-6 py-4 w-[150px] break-all text-[15px]">
                                            {mahasiswa.npm}
                                        </div>
                                        <div className="px-6 py-4 w-[220px] break-all text-[15px] flex items-center justify-between">
                                            <div className="">
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "" : "hidden"
                                                    }`}
                                                >
                                                    {mahasiswa.password}
                                                </h1>
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "hidden" : ""
                                                    }`}
                                                >
                                                    {decryptedPassword(
                                                        mahasiswa.password
                                                    )}
                                                </h1>
                                            </div>
                                            <div className="">
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "" : "hidden"
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(false)
                                                    }
                                                >
                                                    <AiFillEye />
                                                </div>
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "hidden" : ""
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(true)
                                                    }
                                                >
                                                    <AiFillEyeInvisible />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 w-[150px] text-[15px]">
                                            {mahasiswa.Fakultas.nama_fakultas} ,{" "}
                                            {mahasiswa.Prodi.nama_prodi}
                                        </div>
                                        <div className="px-6 py-4 text-[15px] w-[150px] ">
                                            <a
                                                href={`https://wa.me/${mahasiswa.no_telp}?text=Halo%20${mahasiswa.nama}Halo,%20saya%20adalah%20admin%20dari%20BPU%20UPN%20VETERAN%20JAWA%20TIMUR.%20Kami%20senang%20bisa%20berhubungan%20dengan%20Anda%20melalui%20WhatsApp.%20Jangan%20ragu%20untuk%20menghubungi%20kami%20jika%20Anda%20membutuhkan%20bantuan,%20informasi,%20atau%20pertanyaan%20lainnya%20terkait%20dengan%20UPN%20VETERAN%20JAWA%20TIMUR.%20Terima%20kasih!"`}
                                            >
                                                {mahasiswa.no_telp}
                                            </a>
                                        </div>
                                        <div className="px-6 py-4 text-[15px] w-[140px]">
                                            <div
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    toggleModal(
                                                        mahasiswa.bukti_identitas
                                                    )
                                                }
                                            >
                                                <Image
                                                    src={`https://api.ricogann.com/assets/${mahasiswa.bukti_identitas}`}
                                                    width={100}
                                                    height={100}
                                                    alt="bukti registrasi"
                                                />
                                            </div>
                                        </div>
                                        {mahasiswa.status ? (
                                            <div className="px-6 py-4 text-[15px] text-green-800 font-semibold w-[100px]">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4 text-[15px] text-red-500 font-semibold w-[100px]">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[100px]">
                                            {mahasiswa.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            mahasiswa.id_account,
                                                            mahasiswa.id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    DeActive
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            mahasiswa.id_account,
                                                            mahasiswa.id,
                                                            true
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center p-3">
                                <div className="join">
                                    {pagesMahasiswaToDisplay.map((page) => (
                                        <button
                                            key={page}
                                            className={`join-item btn  ${
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
                    )}
                    {activeTab === "ukm" && (
                        <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                            <div className="relative rounded-full overflow-hidden mb-5">
                                <input
                                    className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    placeholder="Cari Users Mahasiswa"
                                />
                            </div>
                            <div className="flex">
                                <div className="px-6 py-3 bg-[#B9B9B9] text-left text-xs leading-4 font-medium text-black uppercase w-[50px]">
                                    ID
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Nama UKM
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Email
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[220px]">
                                    Password
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Nama Penanggung Jawab
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    No Telepon
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[140px]">
                                    Bukti Identitas
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Status
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Action
                                </div>
                            </div>
                            <div className="flex flex-col bg-white divide-y divide-gray-200">
                                {filteredUkm.map((ukm, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4 w-[50px]">
                                            {ukm.id}
                                        </div>
                                        <div className="px-6 py-4 w-[120px] text-center text-[15px]">
                                            {ukm.nama_ukm}
                                        </div>
                                        <div className="px-6 py-4 w-[150px] break-all text-[15px]">
                                            {ukm.email}
                                        </div>
                                        <div className="px-6 py-4 w-[220px] break-all text-[15px] flex items-center justify-between">
                                            <div className="">
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "" : "hidden"
                                                    }`}
                                                >
                                                    {ukm.password}
                                                </h1>
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "hidden" : ""
                                                    }`}
                                                >
                                                    {decryptedPassword(
                                                        ukm.password
                                                    )}
                                                </h1>
                                            </div>
                                            <div className="">
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "" : "hidden"
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(false)
                                                    }
                                                >
                                                    <AiFillEye />
                                                </div>
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "hidden" : ""
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(true)
                                                    }
                                                >
                                                    <AiFillEyeInvisible />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 w-[150px] text-[15px]">
                                            {ukm.nama_pj}
                                        </div>
                                        <div className="px-6 py-4 text-[15px] w-[150px] ">
                                            <a
                                                href={`https://wa.me/${ukm.no_telp}?text=Halo%20${ukm.nama_pj}Halo,%20saya%20adalah%20admin%20dari%20BPU%20UPN%20VETERAN%20JAWA%20TIMUR.%20Kami%20senang%20bisa%20berhubungan%20dengan%20Anda%20melalui%20WhatsApp.%20Jangan%20ragu%20untuk%20menghubungi%20kami%20jika%20Anda%20membutuhkan%20bantuan,%20informasi,%20atau%20pertanyaan%20lainnya%20terkait%20dengan%20UPN%20VETERAN%20JAWA%20TIMUR.%20Terima%20kasih!"`}
                                            >
                                                {ukm.no_telp}
                                            </a>
                                        </div>
                                        <div className="px-6 py-4 text-[15px] w-[140px]">
                                            <div
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    toggleModal(
                                                        ukm.bukti_identitas
                                                    )
                                                }
                                            >
                                                <Image
                                                    src={`https://api.ricogann.com/assets/${ukm.bukti_identitas}`}
                                                    width={100}
                                                    height={100}
                                                    alt="bukti registrasi"
                                                />
                                            </div>
                                        </div>
                                        {ukm.status ? (
                                            <div className="px-6 py-4 text-[15px] text-green-800 font-semibold w-[100px]">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4 text-[15px] text-red-500 font-semibold w-[100px]">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[100px]">
                                            {ukm.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            ukm.id_account,
                                                            ukm.id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    DeActive
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            ukm.id_account,
                                                            ukm.id,
                                                            true
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center p-3">
                                <div className="join">
                                    {pagesUkmToDisplay.map((page) => (
                                        <button
                                            key={page}
                                            className={`join-item btn  ${
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
                    )}
                    {activeTab === "organisasi" && (
                        <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                            <div className="relative rounded-full overflow-hidden mb-5">
                                <input
                                    className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    placeholder="Cari Users Organisasi"
                                />
                            </div>
                            <div className="flex">
                                <div className="px-6 py-3 bg-[#B9B9B9] text-left text-xs leading-4 font-medium text-black uppercase w-[50px]">
                                    ID
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Nama Organisasi
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Email
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[220px]">
                                    Password
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Nama Penanggung Jawab
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    No Telepon
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[140px]">
                                    Bukti Identitas
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Status
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Action
                                </div>
                            </div>
                            <div className="flex flex-col bg-white divide-y divide-gray-200">
                                {filteredOrganisasi.map((organisasi, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4 w-[50px]">
                                            {organisasi.id}
                                        </div>
                                        <div className="px-6 py-4 w-[120px] text-center text-[15px]">
                                            {organisasi.nama_organisasi}
                                        </div>
                                        <div className="px-6 py-4 w-[150px] break-all text-[15px]">
                                            {organisasi.email}
                                        </div>
                                        <div className="px-6 py-4 w-[220px] break-all text-[15px] flex items-center justify-between">
                                            <div className="">
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "" : "hidden"
                                                    }`}
                                                >
                                                    {organisasi.password}
                                                </h1>
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "hidden" : ""
                                                    }`}
                                                >
                                                    {decryptedPassword(
                                                        organisasi.password
                                                    )}
                                                </h1>
                                            </div>
                                            <div className="">
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "" : "hidden"
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(false)
                                                    }
                                                >
                                                    <AiFillEye />
                                                </div>
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "hidden" : ""
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(true)
                                                    }
                                                >
                                                    <AiFillEyeInvisible />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 w-[150px] text-[15px]">
                                            {organisasi.nama_pj}
                                        </div>
                                        <div className="px-6 py-4 text-[15px] w-[150px] ">
                                            <a
                                                href={`https://wa.me/${organisasi.no_telp}?text=Halo%20${organisasi.nama_pj}Halo,%20saya%20adalah%20admin%20dari%20BPU%20UPN%20VETERAN%20JAWA%20TIMUR.%20Kami%20senang%20bisa%20berhubungan%20dengan%20Anda%20melalui%20WhatsApp.%20Jangan%20ragu%20untuk%20menghubungi%20kami%20jika%20Anda%20membutuhkan%20bantuan,%20informasi,%20atau%20pertanyaan%20lainnya%20terkait%20dengan%20UPN%20VETERAN%20JAWA%20TIMUR.%20Terima%20kasih!"`}
                                            >
                                                {organisasi.no_telp}
                                            </a>
                                        </div>
                                        <div className="px-6 py-4 text-[15px] w-[140px]">
                                            <div
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    toggleModal(
                                                        organisasi.bukti_identitas
                                                    )
                                                }
                                            >
                                                <Image
                                                    src={`https://api.ricogann.com/assets/${organisasi.bukti_identitas}`}
                                                    width={100}
                                                    height={100}
                                                    alt="bukti registrasi"
                                                />
                                            </div>
                                        </div>
                                        {organisasi.status ? (
                                            <div className="px-6 py-4 text-[15px] text-green-800 font-semibold w-[100px]">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4 text-[15px] text-red-500 font-semibold w-[100px]">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[100px]">
                                            {organisasi.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            organisasi.id_account,
                                                            organisasi.id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    DeActive
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                    onClick={() =>
                                                        handleStatusAccount(
                                                            organisasi.id_account,
                                                            organisasi.id,
                                                            true
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center p-3">
                                <div className="join">
                                    {pagesOrganisasiToDisplay.map((page) => (
                                        <button
                                            key={page}
                                            className={`join-item btn  ${
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
                    )}
                </div>
            </div>
        </div>
    );
}
