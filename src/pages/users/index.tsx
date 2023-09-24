import { useState, useEffect } from "react";
import SideBar from "@/components/sidebar";
import Image from "next/image";
import { useRouter } from "next/router";

interface Umum {
    id: number;
    id_account: number;
    NIK: string;
    nama: string;
    email: string;
    no_telp: string;
    status: boolean;
    bukti_identitas: string;
}

interface Mahasiswa {
    id: number;
    id_account: number;
    npm: string;
    nama: string;
    email: string;
    bukti_identitas: string;
    no_telp: number;
    status: boolean;
    id_fakultas: Fakultas;
    id_prodi: Prodi;
    id_tahun_ajaran: TahunAjaran;
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
    const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
    const [dosen, setDosen] = useState<Dosen[]>([]);
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 5;

    // Umum
    const dataUmumToShow = umum.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Dosen
    const dataDosenToShow = dosen.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Dosen
    const dataMahasiswaToShow = mahasiswa.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const totalPagesUmum = Math.ceil(umum.length / itemsPerPage);
    const totalPagesDosen = Math.ceil(dosen.length / itemsPerPage);
    const totalPagesMahasiswa = Math.ceil(mahasiswa.length / itemsPerPage);

    const pagesUmumToDisplay = calculatePagesToDisplay(currentPage, totalPagesUmum);
    const pagesDosenToDisplay = calculatePagesToDisplay(currentPage, totalPagesDosen);
    const pagesMahasiswaToDisplay = calculatePagesToDisplay(currentPage, totalPagesMahasiswa);

    function calculatePagesToDisplay(currentPage : number, totalPages : number) {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            let startPage = currentPage - 2;
            let endPage = currentPage + 2;
    
            if (startPage < 1) {
                startPage = 1;
                endPage = 5;
            } else if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - 4;
            }
    
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
        }
    }

    async function getUmum() {
        try {
            const res = await fetch("https://api.ricogann.com/api/users/umum");
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getMahasiswa() {
        try {
            const res = await fetch(
                "https://api.ricogann.com/api/users/mahasiswa"
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getDosen() {
        try {
            const res = await fetch("https://api.ricogann.com/api/users/dosen");
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteUsers(id: number) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/umum/delete/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteDosen(id: number) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/dosen/delete/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteMahasiswa(id: number) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/mahasiswa/delete/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getAccountById(id: number) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/account/${id}`
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleStatusAccount = (
        id: number,
        id_account: number,
        status: boolean
    ) => {
        updateStatusAcoount(id, id_account, status);
    };

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

    const handleDelete = async (id: number) => {
        try {
            const data = await deleteUsers(id);

            if (data.status === true) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteDosen = async (id: number) => {
        try {
            const data = await deleteDosen(id);

            if (data.status === true) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteMahasiswa = async (id: number) => {
        try {
            const data = await deleteMahasiswa(id);

            if (data.status === true) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const dataUmum = await getUmum();
                const dataMahasiswa = await getMahasiswa();
                const dataDosen = await getDosen();

                setUmum(dataUmum.data);
                setMahasiswa(dataMahasiswa.data);
                setDosen(dataDosen.data);
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className=" flex bg-[#F7F8FA]">
            <div className="">
                <SideBar />
            </div>
            <div className="p-10">
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
                    <a href="#" onClick={() => toggleTab("dosen")}>
                        <h2
                            className={`text-[18] font-regular mb-3 mr-14 ${
                                activeTab === "dosen"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Dosen
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

                <div className="relative rounded-full overflow-hidden mb-5">
                    <input
                        className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                        type="text"
                        placeholder="Cari User"
                    />
                </div>

                <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                    {activeTab === "umum" && (
                        <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                            <div className="flex">
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[80px]">
                                    NO
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    NIK
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Nama
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Email
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    No Telepon
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[200px]">
                                    Bukti Identitas
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[130px]">
                                    Status
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Action
                                </div>
                            </div>
                            <div className="bg-white divide-y divide-gray-200">
                                {dataUmumToShow.map((umum, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4  w-[80px] text-center">
                                            {index + 1}
                                        </div>
                                        <div className="px-6 py-4  w-[150px] text-center">
                                            {umum.NIK}
                                        </div>
                                        <div className="px-6 py-4 w-[150px] text-center ">
                                            {umum.nama}
                                        </div>
                                        <div className="px-6 py-4  break-all w-[150px] text-center">
                                            {umum.email}
                                        </div>
                                        <div className="px-6 py-4  w-[150px] text-center">
                                            {umum.no_telp}
                                        </div>
                                        <div className="px-6 py-4  w-[200px]">
                                            <Image
                                                src={`https://api.ricogann.com/assets/${umum.bukti_identitas}`}
                                                width={100}
                                                height={100}
                                                alt="bukti identitas"
                                            />
                                        </div>
                                        {umum.status ? (
                                            <div className="px-6 py-4  w-[130px] text-center text-green-800">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4  w-[130px] text-center text-red-500">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[150px]">
                                            {umum.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl "
                                                    onClick={() =>
                                                        handleDelete(umum.id)
                                                    }
                                                >
                                                    Delete
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
                            <div className="flex items-center justify-center">
                <div className="join">
                    {pagesUmumToDisplay.map((page) => (
                        <button
                            key={page}
                            className={`join-item btn  ${
                                currentPage === page ? 'btn-active' : ''
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
                            <div className="flex">
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[80px]">
                                    NO
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
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    No Telepon
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[200px]">
                                    Bukti Registrasi
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[130px]">
                                    Status
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Action
                                </div>
                            </div>
                            <div className="bg-white divide-y divide-gray-200">
                                {dataDosenToShow.map((dosen, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4  w-[80px] text-center">
                                            {index + 1}
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
                                        <div className="px-6 py-4  w-[150px] text-center">
                                            {dosen.no_telp}
                                        </div>
                                        <div className="px-6 py-4  w-[200px] flex items-center justify-center">
                                            <Image
                                                src={`https://api.ricogann.com/assets/${dosen.bukti_identitas}`}
                                                width={100}
                                                height={100}
                                                alt="bukti registrasi"
                                            />
                                        </div>
                                        {dosen.status ? (
                                            <div className="px-6 py-4  w-[130px] text-center text-green-800">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4  w-[130px] text-center text-red-500">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[150px]">
                                            {dosen.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl "
                                                    onClick={() =>
                                                        handleDeleteDosen(
                                                            dosen.id
                                                        )
                                                    }
                                                >
                                                    Delete
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
                            <div className="flex items-center justify-center">
                <div className="join">
                {pagesDosenToDisplay.map((page) => (
                        <button
                            key={page}
                            className={`join-item btn  ${
                                currentPage === page ? 'btn-active' : ''
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
                            <div className="flex">
                                <div className="px-6 py-3 bg-[#B9B9B9] text-left text-xs leading-4 font-medium text-black uppercase w-[50px]">
                                    ID
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                    Nama Mahasiswa
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    NPM
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[100px]">
                                    Tahun Ajaran
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Fakultas
                                </div>
                                <div className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                    Jurusan
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
                                {
                                    // @ts-ignore
                                    dataMahasiswaToShow.map((mahasiswa, index) => (
                                        <div className="flex" key={index}>
                                            <div className="px-6 py-4 w-[50px]">
                                                {index + 1}
                                            </div>
                                            <div className="px-6 py-4 w-[120px] text-center text-[15px]">
                                                {mahasiswa.nama}
                                            </div>
                                            <div className="px-6 py-4 w-[100px] text-[15px]">
                                                {mahasiswa.npm}
                                            </div>
                                            <div className="px-6 py-4 w-[100px] text-[15px]">
                                                {
                                                    mahasiswa.id_tahun_ajaran
                                                        .tahun_ajaran
                                                }
                                            </div>
                                            <div className="px-6 py-4 w-[150px] text-[15px]">
                                                {
                                                    mahasiswa.id_fakultas
                                                        .nama_fakultas
                                                }
                                            </div>
                                            <div className="px-6 py-4 w-[150px] text-[15px]">
                                                {mahasiswa.id_prodi.nama_prodi}
                                            </div>
                                            <div className="px-6 py-4 text-[15px] w-[150px]">
                                                {mahasiswa.no_telp}
                                            </div>
                                            <div className="px-6 py-4 text-[15px] w-[140px]">
                                                <Image
                                                    src={`https://api.ricogann.com/assets/${mahasiswa.bukti_identitas}`}
                                                    width={100}
                                                    height={100}
                                                    alt="bukti registrasi"
                                                />
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
                                                            handleDeleteMahasiswa(
                                                                mahasiswa.id
                                                            )
                                                        }
                                                    >
                                                        Delete
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
                                    ))
                                }
                            </div>
                            <div className="flex items-center justify-center">
                <div className="join">
                {pagesMahasiswaToDisplay.map((page) => (
                        <button
                            key={page}
                            className={`join-item btn  ${
                                currentPage === page ? 'btn-active' : ''
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
