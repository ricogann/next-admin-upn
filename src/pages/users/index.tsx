import { useState, useEffect } from "react";
import SideBar from "@/components/sidebar";
import Image from "next/image";

interface User {
    id: number;
    NIK?: string;
    NIP?: string;
    nama: string;
    email: string;
    no_telp: string;
    status_account: boolean;
    bukti_regis: string;
    Role: Role;
}

interface Role {
    id_role: number;
    nama_role: string;
}

interface Mahasiswa {
    id_mahasiswa: number;
    npm_mahasiswa: string;
    nama_mahasiswa: string;
    tahun_ajaran_mahasiswa: TahunAjaran;
    no_telp_mahasiswa: string;
    bukti_regis_mahasiswa: string;
    status_mahasiswa: boolean;
    Fakultas: Fakultas;
    Prodi: Prodi;
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
    const [activeTab, setActiveTab] = useState("umum");
    const [users, setUsers] = useState<User[]>([]);
    const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
    const [dosen, setDosen] = useState<User[]>([]);

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    async function getUsers() {
        try {
            const res = await fetch("http://localhost:5000/api/users/account");
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getMahasiswa() {
        try {
            const res = await fetch(
                "http://localhost:5000/api/users/mahasiswa"
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getDosen() {
        try {
            const res = await fetch("http://localhost:5000/api/users/dosen");
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteUsers(id: number) {
        try {
            const res = await fetch(
                `http://localhost:5000/api/users/account/delete/${id}`,
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
                `http://localhost:5000/api/users/account/${id}`
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function updateStatus(id: number, status: boolean) {
        try {
            const res = await fetch(
                `http://localhost:5000/api/users/account/updateStatus/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({ status_account: status }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function updateStatusMahasiswa(id: number, status: boolean) {
        try {
            const res = await fetch(
                `http://localhost:5000/api/users/mahasiswa/updateStatus/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({ status_mahasiswa: status }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
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

    const handleUpdateStatus = async (id: number) => {
        try {
            if (activeTab === "mahasiswa") {
                const data = await updateStatusMahasiswa(id, true);

                if (data.status === true) {
                    window.location.reload();
                }
            } else {
                const data = await updateStatus(id, true);

                if (data.status === true) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUsers();
                const dataMahasiswa = await getMahasiswa();
                const dataDosen = await getDosen();

                setUsers(data.data);
                setMahasiswa(dataMahasiswa.data);
                setDosen(dataDosen.data);
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        fetchData();
    }, []);

    console.log(mahasiswa);

    return (
        <div className="h-screen flex bg-[#F7F8FA]">
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
                                {users.map((user, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4  w-[80px] text-center">
                                            {index + 1}
                                        </div>
                                        <div className="px-6 py-4  w-[150px] text-center">
                                            {user.NIK}
                                        </div>
                                        <div className="px-6 py-4 w-[150px] text-center ">
                                            {user.nama}
                                        </div>
                                        <div className="px-6 py-4  break-all w-[150px] text-center">
                                            {user.email}
                                        </div>
                                        <div className="px-6 py-4  w-[150px] text-center">
                                            {user.no_telp}
                                        </div>
                                        <div className="px-6 py-4  w-[200px]">
                                            <Image
                                                src={`http://localhost:5000/assets/${user.bukti_regis}`}
                                                width={100}
                                                height={100}
                                                alt="bukti registrasi"
                                            />
                                        </div>
                                        {user.status_account ? (
                                            <div className="px-6 py-4  w-[130px] text-center text-green-800">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4  w-[130px] text-center text-red-500">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[150px]">
                                            {user.status_account ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl "
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            user.id
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
                                {dosen.map((user, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4  w-[80px] text-center">
                                            {index + 1}
                                        </div>
                                        <div className="px-6 py-4  w-[120px] text-center">
                                            {user.NIP}
                                        </div>
                                        <div className="px-6 py-4 w-[150px] text-center ">
                                            {user.nama}
                                        </div>
                                        <div className="px-6 py-4  break-all w-[150px] text-center">
                                            {user.email}
                                        </div>
                                        <div className="px-6 py-4  w-[150px] text-center">
                                            {user.no_telp}
                                        </div>
                                        <div className="px-6 py-4  w-[200px] flex items-center justify-center">
                                            <Image
                                                src={`http://localhost:5000/assets/${user.bukti_regis}`}
                                                width={100}
                                                height={100}
                                                alt="bukti registrasi"
                                            />
                                        </div>
                                        {user.status_account ? (
                                            <div className="px-6 py-4  w-[130px] text-center text-green-800">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4  w-[130px] text-center text-red-500">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[150px]">
                                            {user.status_account ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl "
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            user.id
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
                                    Bukti Registrasi
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
                                    mahasiswa.map((user, index) => (
                                        <div className="flex" key={index}>
                                            <div className="px-6 py-4 w-[50px]">
                                                {index + 1}
                                            </div>
                                            <div className="px-6 py-4 w-[120px] text-center text-[15px]">
                                                {user.nama_mahasiswa}
                                            </div>
                                            <div className="px-6 py-4 w-[100px] text-[15px]">
                                                {user.npm_mahasiswa}
                                            </div>
                                            <div className="px-6 py-4 w-[100px] text-[15px]">
                                                {
                                                    user.tahun_ajaran_mahasiswa
                                                        .tahun_ajaran
                                                }
                                            </div>
                                            <div className="px-6 py-4 w-[150px] text-[15px]">
                                                {user.Fakultas.nama_fakultas}
                                            </div>
                                            <div className="px-6 py-4 w-[150px] text-[15px]">
                                                {user.Prodi.nama_prodi}
                                            </div>
                                            <div className="px-6 py-4 text-[15px] w-[150px]">
                                                {user.no_telp_mahasiswa}
                                            </div>
                                            <div className="px-6 py-4 text-[15px] w-[140px]">
                                                <Image
                                                    src={`http://localhost:5000/assets/${user.bukti_regis_mahasiswa}`}
                                                    width={100}
                                                    height={100}
                                                    alt="bukti registrasi"
                                                />
                                            </div>
                                            {user.status_mahasiswa ? (
                                                <div className="px-6 py-4 text-[15px] text-green-800 font-semibold w-[100px]">
                                                    Aktif
                                                </div>
                                            ) : (
                                                <div className="px-6 py-4 text-[15px] text-red-500 font-semibold w-[100px]">
                                                    Tidak Aktif
                                                </div>
                                            )}
                                            <div className="px-6 py-4  flex items-center justify-center w-[100px]">
                                                {user.status_mahasiswa ? (
                                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 text-[15px] rounded-full">
                                                        Delete
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                user.id_mahasiswa
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
