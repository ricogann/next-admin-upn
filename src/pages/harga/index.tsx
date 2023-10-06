import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";
import { data } from "autoprefixer";

interface harga {
    id: number;
    id_fasilitas: number;
    nama: string;
    harga: number;
}

export default function Harga() {
    const router = useRouter();

    const [dataharga, setDataharga] = useState<harga[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [filteredHarga, setfilteredHarga] = useState<harga[]>([]);

    //SearchForHarga
    useEffect(() => {
        // Filter the umum array based on whether any field contains the searchText
        const filteredData = dataharga.filter((item) =>
          Object.values(item).some(
            (value) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchText.toLowerCase())
          )
        );
    
        setfilteredHarga(filteredData);
      }, [dataharga, searchText]);
    
    // Function to handle input change
    const handleInputHargaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handlePage = (link: string) => {
        router.push(link);
    };

    async function getDataharga() {
        try {
            const res = await fetch("https://api.ricogann.com/api/harga" );
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getDataharga();

                setDataharga(data.data);
            } catch (error) {
                console.error("error fetching data harga ", error);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/harga/delete/${Number(id)}` ,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.status === true) {
                window.location.reload();
            } else {
                alert("Gagal menghapus data harga");
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(dataharga);

    return (
        <div className="flex overflow-x-hidden">
            <div className="">
                <SideBar />
            </div>
            <div className="h-screen w-full p-10 flex bg-[#F7F8FA]">
                <div className="p-5">
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex flex-row items-start">
                            <h1 className="text-[45px] font-bold mr-14">
                                Harga
                            </h1>
                        </div>
                        <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                            Tabel Data Harga
                        </h4>
                    </div>

                    <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                        <button>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 border-b-2 border-[#FFA101] font-bold`}
                            >
                                Harga
                            </h2>
                        </button>
                    </div>

                    <div className="bg-[#000000]flex flex-row relative rounded-full overflow-hidden mb-5">
                        <input
                            className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                            type="text"
                            placeholder="Cari User"
                        />

                        <button
                            className="bg-blue-500 h-[40px] md:h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8"
                            onClick={() => handlePage("/harga/create")}
                        >
                            Add Data
                        </button>
                    </div>

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
                                    {dataharga.map((data, index) => (
                                        <div className="flex" key={index}>
                                            <div className="px-6 py-4 whitespace-no-wrap">
                                                {data.id}
                                            </div>
                                            <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                                {data.id_fasilitas}
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
                                                        handleDelete(data.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
