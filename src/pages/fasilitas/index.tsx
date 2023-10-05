import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";

interface Fasilitas {
    id_fasilitas: number;
    nama: string;
    deskripsi: string;
    alamat: string;
    biaya: number;
    foto: string;
}

interface harga {
    id: number;
    id_fasilitas: number;
    nama: string;
    harga: number;
}

export default function Fasilitas() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("fasilitas");
    const [currentPage, setCurrentPage] = useState(1);
    const [dataFasilitas, setDataFasilitas] = useState<Fasilitas[]>([]);
    const [dataHarga, setDataharga] = useState<harga[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [filteredHarga, setfilteredHarga] = useState<harga[]>([]);
    const [filteredFasilitas, setfilteredFasilitas] = useState<Fasilitas[]>([]);

    console.log(dataFasilitas);

    //SearchForHarga
    useEffect(() => {
        // Filter the umum array based on whether any field contains the searchText
        const filteredData = dataHarga.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        setfilteredHarga(filteredData);
    }, [dataHarga, searchText]);

    // Function to handle input change
    const handleInputHargaChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchText(event.target.value);
    };

    //SearchForFasilitas
    useEffect(() => {
        // Filter the umum array based on whether any field contains the searchText
        const filteredData = dataFasilitas.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        setfilteredFasilitas(filteredData);
    }, [dataFasilitas, searchText]);

    // Function to handle input change
    const handleInputFasilitasChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchText(event.target.value);
    };

    const ItemsHargaPerPage = 5;
    const ItemsFasilitasPerPage = 3;

    const dataHargaToShow = filteredHarga.slice(
        (currentPage - 1) * ItemsHargaPerPage,
        currentPage * ItemsHargaPerPage
    );

    const dataFasilitasToShow = filteredFasilitas.slice(
        (currentPage - 1) * ItemsFasilitasPerPage,
        currentPage * ItemsFasilitasPerPage
    );

    const totalPageFasilitas = Math.ceil(
        filteredFasilitas.length / ItemsFasilitasPerPage
    );
    const totalPageHarga = Math.ceil(filteredHarga.length / ItemsHargaPerPage);

    const pagesFasilitasToDisplay = calculatePagesToDisplay(
        currentPage,
        totalPageFasilitas
    );
    const pagesHargaToDisplay = calculatePagesToDisplay(
        currentPage,
        totalPageHarga
    );

    function calculatePagesToDisplay(currentPage: number, totalPages: number) {
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

            return Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => i + startPage
            );
        }
    }

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const handlePage = (link: string) => {
        router.push(link);
    };

    async function getDataharga() {
        try {
            const res = await fetch("http://localhost:5000/api/harga");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getDataFasilitas() {
        try {
            const res = await fetch("http://localhost:5000/api/fasilitas");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const dataFasilitas = await getDataFasilitas();
                const dataHarga = await getDataharga();

                console.log(dataFasilitas.data);

                setDataFasilitas(dataFasilitas.data);
                setDataharga(dataHarga.data);
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        fetchData();
    }, []);

    console.log(dataFasilitas);

    const handleDeleteFasilitas = async (id: number) => {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/fasilitas/delete/${Number(id)}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.status === true) {
                window.location.reload();
            } else {
                alert("Gagal menghapus data fasilitas");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                alert("Gagal menghapus data fasilitas");
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(dataFasilitas);

    return (
        <div className="flex bg-[#FFFFFF] overflow-x-hidden">
            <div className="">
                <SideBar />
            </div>

            <div className="w-full p-10 flex bg-[#F7F8FA]">
                <div className="p-5">
                    {activeTab === "fasilitas" && (
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex flex-row items-start">
                                <h1 className="text-[45px] font-bold mr-14">
                                    Fasilitas
                                </h1>
                            </div>
                            <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                                Tabel Data Fasilitas
                            </h4>
                        </div>
                    )}
                    {activeTab === "harga" && (
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex flex-row items-start">
                                <h1 className="text-[45px] font-bold mr-14">
                                    Harga
                                </h1>
                            </div>
                            <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                                Tabel Data Harga Fasilitas
                            </h4>
                        </div>
                    )}

                    <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                        <a href="#" onClick={() => toggleTab("fasilitas")}>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 ${
                                    activeTab === "fasilitas"
                                        ? "border-b-2 border-[#FFA101] font-bold"
                                        : ""
                                }`}
                            >
                                Fasilitas
                            </h2>
                        </a>
                        <a href="#" onClick={() => toggleTab("harga")}>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 ${
                                    activeTab === "harga"
                                        ? "border-b-2 border-[#FFA101] font-bold"
                                        : ""
                                }`}
                            >
                                Harga
                            </h2>
                        </a>
                    </div>
                    {activeTab === "fasilitas" && (
                        <div className="bg-[#000000]flex flex-row relative rounded-full overflow-hidden mb-5">
                            <input
                                className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                type="text"
                                placeholder="Cari Data Fasilitas"
                                value={searchText}
                                onChange={handleInputFasilitasChange}
                            />

                            <button
                                className="bg-blue-500 h-[40px] md:h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8"
                                onClick={() => handlePage("/fasilitas/create")}
                            >
                                Add Data
                            </button>
                        </div>
                    )}
                    {activeTab === "harga" && (
                        <div className="bg-[#000000]flex flex-row relative rounded-full overflow-hidden mb-5">
                            <input
                                className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                type="text"
                                placeholder="Cari Data Harga"
                                value={searchText}
                                onChange={handleInputHargaChange}
                            />

                            <button
                                className="bg-blue-500 h-[40px] md:h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8"
                                onClick={() => handlePage("/harga/create")}
                            >
                                Add Data
                            </button>
                        </div>
                    )}
                    {activeTab === "fasilitas" && (
                        <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                            <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                <div className="flex">
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                        ID
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Nama Fasilitas
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Deskripsi
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Alamat
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Foto
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Action
                                    </h1>
                                </div>

                                <div className="bg-white divide-y divide-gray-200">
                                    <div className="">
                                        {dataFasilitasToShow.map(
                                            (data, index) => (
                                                <div
                                                    className="flex"
                                                    key={index}
                                                >
                                                    <div className="px-6 py-4 whitespace-no-wrap">
                                                        {data.id_fasilitas}
                                                    </div>
                                                    <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                                        {data.nama}
                                                    </div>
                                                    <div className="px-6 py-4 break-all w-[200px]">
                                                        {data.deskripsi}
                                                    </div>
                                                    <div className="px-6 py-4 break-all w-[200px]">
                                                        {data.alamat}
                                                    </div>
                                                    <div className="px-6 py-4 whitespace-no-wrap w-[130px]">
                                                        {JSON.parse(
                                                            data.foto
                                                        ).map(
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
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            100
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                                        <button
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                                                            onClick={() =>
                                                                router.push(
                                                                    `/fasilitas/detail/${data.id_fasilitas}`
                                                                )
                                                            }
                                                        >
                                                            Detail
                                                        </button>
                                                        <button
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                            onClick={() =>
                                                                handleDeleteFasilitas(
                                                                    data.id_fasilitas
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="flex items-center justify-center p-3">
                                        <div className="join">
                                            {pagesFasilitasToDisplay.map(
                                                (page) => (
                                                    <button
                                                        key={page}
                                                        className={`join-item btn ${
                                                            currentPage === page
                                                                ? "btn-active"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            setCurrentPage(page)
                                                        }
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "harga" && (
                        <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                            <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                                    <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                        <div className="flex">
                                            <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                                ID
                                            </h1>
                                            <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                                ID_Fasilitas
                                            </h1>
                                            <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                                Nama
                                            </h1>
                                            <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                                Harga
                                            </h1>
                                            <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                                Action
                                            </h1>
                                        </div>

                                        <div className="bg-white divide-y divide-gray-200">
                                            <div className="">
                                                {dataHargaToShow.map(
                                                    (data, index) => (
                                                        <div
                                                            className="flex"
                                                            key={index}
                                                        >
                                                            <div className="px-6 py-4 whitespace-no-wrap">
                                                                {data.id}
                                                            </div>
                                                            <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                                                {
                                                                    data.id_fasilitas
                                                                }
                                                            </div>
                                                            <div className="px-6 py-4 break-all w-[200px]">
                                                                {data.nama}
                                                            </div>
                                                            <div className="px-6 py-4 break-all w-[200px]">
                                                                {data.harga}
                                                            </div>
                                                            <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                                    onClick={() =>
                                                                        handleDeleteHarga(
                                                                            data.id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <div className="flex items-center justify-center p-3">
                                                <div className="join">
                                                    {pagesHargaToDisplay.map(
                                                        (page) => (
                                                            <button
                                                                key={page}
                                                                className={`join-item btn ${
                                                                    currentPage ===
                                                                    page
                                                                        ? "btn-active"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    setCurrentPage(
                                                                        page
                                                                    )
                                                                }
                                                            >
                                                                {page}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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
