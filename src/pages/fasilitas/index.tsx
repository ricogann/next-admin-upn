import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import _lib from "@/lib";
import _fasilitas from "@/services/fasilitas.service";
import _harga from "@/services/harga.service";
import CookiesDTO from "@/interfaces/cookiesDTO";

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
    Fasilitas: Fasilitas;
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
    const [isLogin, setIsLogin] = useState(false);
    const [cookies, setCookies] = useState("");
    const libCookies = new _lib();
    const lib = new _lib();
    const fasilitas = new _fasilitas();
    const harga = new _harga();

    useEffect(() => {
        const filteredData = dataHarga.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        setfilteredHarga(filteredData);
    }, [dataHarga, searchText]);

    const handleInputHargaChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        const filteredData = dataFasilitas.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        setfilteredFasilitas(filteredData);
    }, [dataFasilitas, searchText]);

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

    const pagesFasilitasToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPageFasilitas
    );
    const pagesHargaToDisplay = lib.calculatePagesToDisplay(
        currentPage,
        totalPageHarga
    );

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const handlePage = (link: string) => {
        router.push(link);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const dataCookies: CookiesDTO = await libCookies.getCookies();
                setCookies(dataCookies.CERT);
                const dataFasilitas = await fasilitas.getFasilitas();
                const dataHarga = await harga.getDataharga();

                setDataFasilitas(dataFasilitas);
                setDataharga(dataHarga.data);
                if (dataCookies.CERT !== undefined) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                    router.push("/auth/login");
                }
            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteFasilitas = async (id: number) => {
        try {
            await fasilitas.deleteFasilitas(id, cookies);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteHarga = async (id: number) => {
        try {
            const data = await harga.deleteHarga(id, cookies);

            if (data.status === true) {
                window.location.reload();
            } else {
                alert("Gagal menghapus data fasilitas");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="">
            {isLogin ? (
                <div className="flex bg-[#FFFFFF] overflow-x-hidden">
                    <div className="">
                        <SideBar />
                    </div>

                    <div className="w-full p-5 flex bg-[#F7F8FA] text-black">
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
                                <a
                                    href="#"
                                    onClick={() => toggleTab("fasilitas")}
                                >
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
                                        onClick={() =>
                                            handlePage("/fasilitas/create")
                                        }
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
                                        onClick={() =>
                                            handlePage("/harga/create")
                                        }
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
                                            <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[400px]">
                                                Deskripsi
                                            </h1>
                                            <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[350px]">
                                                Alamat
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
                                                            className="flex justify-between"
                                                            key={index}
                                                        >
                                                            <div className="px-6 py-4 whitespace-no-wrap">
                                                                {
                                                                    data.id_fasilitas
                                                                }
                                                            </div>
                                                            <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                                                {data.nama}
                                                            </div>
                                                            <div className="px-6 py-4 break-all w-[400px]">
                                                                {data.deskripsi}
                                                            </div>
                                                            <div className="px-6 py-4 break-all w-[300px]">
                                                                {data.alamat}
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
                                                        Nama Fasilitas
                                                    </h1>
                                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                                        Nama Harga
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
                                                                        {
                                                                            data.id
                                                                        }
                                                                    </div>
                                                                    <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                                                        {
                                                                            data
                                                                                .Fasilitas
                                                                                .nama
                                                                        }
                                                                    </div>
                                                                    <div className="px-6 py-4 break-all w-[200px]">
                                                                        {
                                                                            data.nama
                                                                        }
                                                                    </div>
                                                                    <div className="px-6 py-4 break-all w-[200px]">
                                                                        {
                                                                            data.harga
                                                                        }
                                                                    </div>
                                                                    <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                                                        <button
                                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                                                                            onClick={() =>
                                                                                router.push(
                                                                                    `/harga/edit/${data.id}`
                                                                                )
                                                                            }
                                                                        >
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
                                                                        key={
                                                                            page
                                                                        }
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
            ) : (
                <div className="h-screen w-screen bg-white flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )}
        </div>
    );
}
