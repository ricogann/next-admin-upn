import { useState, useEffect, ChangeEvent } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsFillPinMapFill } from "react-icons/bs";
import { MdOutlineWatchLater, MdPayment } from "react-icons/md";
import { BiCalendar, BiBookmark } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";

import { Textarea } from "@/components/textarea";
import { InputFiles } from "@/components/input-files";
import { Submit } from "@/components/submit-button";
import { Input } from "@/components/input";
import _fasilitas from "@/services/fasilitas.service";
import _booking from "@/services/booking.service";
import CookiesDTO from "@/interfaces/cookiesDTO";
import _lib from "@/lib/index";

interface Fasilitas {
    id_fasilitas: number;
    nama: string;
    deskripsi: string;
    alamat: string;
    biaya: number;
    foto: string;
    no_va: string;
    jam_buka: string;
    jam_tutup: string;
    buka_hari: string;
}

interface Harga {
    nama: string;
}

interface Kamar {
    id_asrama: number;
    no_kamar: number;
    id: number;
    npm_bed1_a: string;
    npm_bed2_b: string;
    npm_bed3_c: string;
    status_kamar: boolean;
    Harga: Harga;
}

export default function Fasilitas() {
    const router = useRouter();
    const [dataFasilitas, setDataFasilitas] = useState<Fasilitas>();
    const [dataKamar, setDataKamar] = useState<Kamar[]>();
    const [fotoFasilitas, setFotoFasilitas] = useState<string[]>([]);
    const [id, setId] = useState("");
    const [editStatus, setEditStatus] = useState(false);
    const [editKamarStatus, setEditKamarStatus] = useState(false);
    const [indexEditKamar, setIndexEditKamar] = useState(0);
    const [npmBed1, setNpmBed1] = useState("");
    const [npmBed2, setNpmBed2] = useState("");
    const [npmBed3, setNpmBed3] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [cookies, setCookies] = useState("");
    const libCookies = new _lib();
    const fasilitas = new _fasilitas();
    const booking = new _booking();

    const [namaFasilitas, setNamaFasilitas] = useState("");
    const [alamatFasilitas, setAlamatFasilitas] = useState("");
    const [deskripsiFasilitas, setDeskripsiFasilitas] = useState("");
    const [foto_fasilitas, setFoto_Fasilitas] = useState<File[]>([]);
    const [jamBuka, setJamBuka] = useState("");
    const [jamTutup, setJamTutup] = useState("");
    const [durasi, setDurasi] = useState(0);
    const [bukaHari, setBukaHari] = useState("");
    const [noVa, setNoVa] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "nama_fasilitas") {
            setNamaFasilitas(event.target.value);
        } else if (event.target.name === "alamat_fasilitas") {
            setAlamatFasilitas(event.target.value);
        } else if (event.target.name === "buka_hari") {
            setBukaHari(event.target.value);
        } else if (event.target.name === "deskripsi_fasilitas") {
            setDeskripsiFasilitas(event.target.value);
        } else if (event.target.name === "jam_masuk") {
            setJamBuka(event.target.value);
        } else if (event.target.name === "jam_keluar") {
            setJamTutup(event.target.value);
        } else if (event.target.name === "durasi") {
            setDurasi(Number(event.target.value));
        } else if (event.target.name === "no_va") {
            setNoVa(event.target.value);
        } else if (event.target.name === "npm_bed1_a") {
            setNpmBed1(event.target.value);
        } else if (event.target.name === "npm_bed2_b") {
            setNpmBed2(event.target.value);
        } else if (event.target.name === "npm_bed3_c") {
            setNpmBed3(event.target.value);
        }
    };

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDeskripsiFasilitas(event.target.value);
    };

    const handleFotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        setFoto_Fasilitas([...foto_fasilitas, ...files]);
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append("nama", namaFasilitas);
        data.append("alamat", alamatFasilitas);
        data.append("deskripsi", deskripsiFasilitas);
        data.append("jam_buka", jamBuka);
        data.append("jam_tutup", jamTutup);
        foto_fasilitas.forEach((foto) => {
            data.append("foto_fasilitas", foto);
        });
        data.append("buka_hari", bukaHari);
        data.append("no_va", noVa);
        data.append("name_foto_old", JSON.stringify(fotoFasilitas));

        const res = await fasilitas.updateFasilitas(Number(id), data, cookies);
    };

    async function getdataKamar() {
        try {
            const res = await fetch(`https://api.ricogann.com/api/kamar`);
            const data = await res.json();

            return data.data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (router.isReady) {
            setId(router.query.id as string);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    useEffect(() => {
        async function fetchData(id: number) {
            try {
                const dataCookies: CookiesDTO = await libCookies.getCookies();
                setCookies(dataCookies.CERT);
                const dataFasilitas = await fasilitas.getFasilitasById(
                    Number(id)
                );
                const dataKamar = await getdataKamar();

                setNamaFasilitas(dataFasilitas.nama);
                setAlamatFasilitas(dataFasilitas.alamat);
                setDeskripsiFasilitas(dataFasilitas.deskripsi);
                setJamBuka(dataFasilitas.jam_buka);
                setJamTutup(dataFasilitas.jam_tutup);
                setBukaHari(dataFasilitas.buka_hari);
                setNoVa(dataFasilitas.no_va);

                setDataKamar(dataKamar);
                setDataFasilitas(dataFasilitas);
                setFotoFasilitas(JSON.parse(dataFasilitas.foto));

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

        if (id) {
            fetchData(Number(id));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const editKamarHandle = (
        npmBed1: string,
        npmBed2: string,
        npmBed3: string,
        index: number
    ) => {
        if (npmBed1 === null) {
            setNpmBed1("");
        } else {
            setNpmBed1(npmBed1);
        }
        if (npmBed2 === null) {
            setNpmBed2("");
        } else {
            setNpmBed2(npmBed2);
        }
        if (npmBed3 === null) {
            setNpmBed3("");
        } else {
            setNpmBed3(npmBed3);
        }
        setIndexEditKamar(index);
        setEditKamarStatus(true);
    };

    const saveEditKamar = async (id: number) => {
        if (npmBed1 === "" || npmBed2 === "" || npmBed3 === "") {
            const updateKamar = await booking.updateKamar(
                id,
                {
                    npm_bed1_a: npmBed1,
                    npm_bed2_b: npmBed2,
                    npm_bed3_c: npmBed3,
                    status_kamar: true,
                },
                cookies
            );
        } else {
            const updateKamar = await booking.updateKamar(
                id,
                {
                    npm_bed1_a: npmBed1,
                    npm_bed2_b: npmBed2,
                    npm_bed3_c: npmBed3,
                    status_kamar: false,
                },
                cookies
            );
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
                        <div className="p-5 w-full">
                            <div className="flex flex-col items-start justify-center ">
                                <h1 className="text-[45px] font-bold ">
                                    Fasilitas
                                </h1>
                                <h4 className="text-[12] font-regular mb-8 text-dark-whiteText">
                                    Detail Fasilitas
                                </h4>
                            </div>

                            <div className="flex flex-row bg-[#FFFFFF] gap-5 p-5 rounded-lg">
                                <div
                                    className={`carousel w-[400px] ${
                                        editStatus ? "hidden" : ""
                                    }`}
                                >
                                    {fotoFasilitas.map((foto, index) => (
                                        <div
                                            id={`slide${index + 1}`}
                                            className="carousel-item relative w-full"
                                            key={index}
                                        >
                                            <Image
                                                src={`https://api.ricogann.com/assets/${foto}`}
                                                width={400}
                                                height={400}
                                                className="rounded-lg"
                                                alt="detail-fasilitas"
                                            />
                                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                                <a
                                                    href={
                                                        index === 0
                                                            ? "#slide3"
                                                            : `#slide${index}`
                                                    }
                                                    className="btn btn-circle"
                                                >
                                                    ❮
                                                </a>
                                                <a
                                                    href={
                                                        index === 2
                                                            ? "#slide1"
                                                            : `#slide${
                                                                  index + 2
                                                              }`
                                                    }
                                                    className="btn btn-circle"
                                                >
                                                    ❯
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className={`flex flex-col gap-5 p-5 ${
                                        editStatus ? "w-full" : ""
                                    }`}
                                >
                                    <div
                                        className={`flex flex-row ${
                                            editStatus ? "hidden" : "block"
                                        }`}
                                    >
                                        <div className="text-[30px] font-bold">
                                            {dataFasilitas?.nama}
                                        </div>
                                    </div>
                                    <input
                                        name="nama_fasilitas"
                                        value={namaFasilitas}
                                        type="text"
                                        className={`${
                                            editStatus ? "block" : "hidden"
                                        } px-5 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                        placeholder="Nama Fasilitas..."
                                        onChange={handleInputChange}
                                    />
                                    <div
                                        className={`flex flex-row gap-10 ${
                                            editStatus ? "justify-between" : ""
                                        }`}
                                    >
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <BsFillPinMapFill className="text-black font-medium text-3xl" />
                                                <div
                                                    className={`text-[12px] font-medium ${
                                                        editStatus
                                                            ? "hidden"
                                                            : "block"
                                                    }`}
                                                >
                                                    {dataFasilitas?.alamat}
                                                </div>
                                                <input
                                                    name="alamat_fasilitas"
                                                    value={alamatFasilitas}
                                                    type="text"
                                                    className={`${
                                                        editStatus
                                                            ? "block"
                                                            : "hidden"
                                                    } px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200 w-[500px]`}
                                                    placeholder="Alamat..."
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <BiBookmark className="text-black font-medium text-3xl" />
                                                <div
                                                    className={`text-[12px] font-medium ${
                                                        editStatus
                                                            ? "hidden"
                                                            : "block"
                                                    }`}
                                                >
                                                    {dataFasilitas?.deskripsi}
                                                </div>
                                                <textarea
                                                    name="deskripsi_fasilitas"
                                                    value={deskripsiFasilitas}
                                                    placeholder="Deskripsi..."
                                                    className={`${
                                                        editStatus
                                                            ? "block"
                                                            : "hidden"
                                                    } w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                                    onChange={
                                                        handleTextAreaChange
                                                    }
                                                />
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <MdPayment className="text-black font-medium text-3xl" />
                                                <div
                                                    className={`text-[12px] font-medium ${
                                                        editStatus
                                                            ? "hidden"
                                                            : "block"
                                                    }`}
                                                >
                                                    {dataFasilitas?.no_va}
                                                </div>
                                                <input
                                                    name="no_va"
                                                    value={noVa}
                                                    type="string"
                                                    placeholder="Nomor Virtual Account..."
                                                    className={`${
                                                        editStatus
                                                            ? "block"
                                                            : "hidden"
                                                    } w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <MdOutlineWatchLater className="text-black font-medium text-3xl" />
                                                <div
                                                    className={`text-[12px] font-medium ${
                                                        editStatus
                                                            ? "hidden"
                                                            : "block"
                                                    }`}
                                                >
                                                    {dataFasilitas?.jam_buka}
                                                </div>
                                                <input
                                                    name="jam_masuk"
                                                    value={jamBuka}
                                                    type="time"
                                                    placeholder="Jam Masuk..."
                                                    className={`${
                                                        editStatus
                                                            ? "block"
                                                            : "hidden"
                                                    } w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MdOutlineWatchLater className="text-black font-medium text-3xl" />
                                                <div
                                                    className={`text-[12px] font-medium ${
                                                        editStatus
                                                            ? "hidden"
                                                            : "block"
                                                    }`}
                                                >
                                                    {dataFasilitas?.jam_tutup}
                                                </div>
                                                <input
                                                    name="jam_keluar"
                                                    value={jamTutup}
                                                    type="time"
                                                    placeholder="Jam Keluar..."
                                                    className={`${
                                                        editStatus
                                                            ? "block w-[500px]"
                                                            : "hidden"
                                                    } w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MdOutlineWatchLater className="text-black font-medium text-3xl" />
                                                <div
                                                    className={`text-[12px] font-medium ${
                                                        editStatus
                                                            ? "hidden"
                                                            : "block"
                                                    }`}
                                                >
                                                    {dataFasilitas?.buka_hari}
                                                </div>
                                                <input
                                                    name="buka_hari"
                                                    value={bukaHari}
                                                    type="text"
                                                    className={`${
                                                        editStatus
                                                            ? "block w-[500px]"
                                                            : "hidden"
                                                    } px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                                    placeholder="Buka Hari..."
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <InputFiles
                                        name="foto_fasilitas"
                                        type="file"
                                        placeholder="Input Files..."
                                        className={`${
                                            editStatus ? "block" : "hidden"
                                        } mb-5 w-full px-5 py-4 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handleFotoChange}
                                    />

                                    <div className="flex flex-row">
                                        <button
                                            className={`${
                                                editStatus ? "hidden" : "block"
                                            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[15px]`}
                                            onClick={() => setEditStatus(true)}
                                        >
                                            Edit Fasilitas
                                        </button>
                                        <button
                                            className={`${
                                                editStatus ? "block" : "hidden"
                                            } bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[15px]`}
                                            onClick={() => setEditStatus(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className={`${
                                                editStatus ? "block" : "hidden"
                                            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[15px]`}
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* if Asrama maka ini muncul */}
                            {dataFasilitas?.nama === "Asrama" && (
                                <div className="flex flex-col bg-[#FFFFFF] gap-5 p-5 rounded-lg mt-3 ">
                                    <div className="text-[24px] font-bold">
                                        Tabel Kamar Asrama{" "}
                                    </div>
                                    <div className="flex bg-[#898989] gap-9 rounded-t-lg">
                                        <div className="px-6 py-3  text-xs leading-4 font-medium text-black uppercase w-[50px]">
                                            NO
                                        </div>
                                        <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                            Lantai Asrama
                                        </div>
                                        <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[80px]">
                                            Nomer Kamar
                                        </div>
                                        <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                            Penyewa 1
                                        </div>
                                        <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                            Penyewa 2
                                        </div>
                                        <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[150px]">
                                            Penyewa 3
                                        </div>
                                        <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[110px]">
                                            Status
                                        </div>
                                        <div className="px-6 py-3 text-center text-xs leading-4 font-medium text-black uppercase w-[120px]">
                                            Action
                                        </div>
                                    </div>
                                    <div className="bg-white divide-y divide-gray-200">
                                        <div className="">
                                            {dataKamar?.map((data, index) => (
                                                <div
                                                    className="flex gap-9 text-center my-2"
                                                    key={index}
                                                >
                                                    <div className="px-6 py-3 whitespace-no-wrap w-[50px]">
                                                        {index + 1}
                                                    </div>
                                                    <div className="px-6 py-3 whitespace-no-wrap w-[120px]">
                                                        {data.Harga.nama}
                                                    </div>
                                                    <div className="px-6 py-3 whitespace-no-wrap w-[80px]">
                                                        {data.no_kamar}
                                                    </div>
                                                    <div
                                                        className={`${
                                                            editKamarStatus &&
                                                            index ===
                                                                indexEditKamar
                                                                ? "hidden"
                                                                : "block"
                                                        } px-6 py-3 break-all w-[150px]`}
                                                    >
                                                        {data.npm_bed1_a}
                                                    </div>
                                                    <input
                                                        name="npm_bed1_a"
                                                        value={npmBed1}
                                                        type="text"
                                                        className={`${
                                                            editKamarStatus &&
                                                            index ===
                                                                indexEditKamar
                                                                ? "block"
                                                                : "hidden"
                                                        } w-[150px] h-[40px] px-5 py-2 my-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                                        placeholder="Npm Bed 1"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                    <div
                                                        className={`${
                                                            editKamarStatus &&
                                                            index ===
                                                                indexEditKamar
                                                                ? "hidden"
                                                                : "block"
                                                        } px-6 py-3 break-all w-[150px]`}
                                                    >
                                                        {data.npm_bed2_b}
                                                    </div>
                                                    <input
                                                        name="npm_bed2_b"
                                                        value={npmBed2}
                                                        type="text"
                                                        className={`${
                                                            editKamarStatus &&
                                                            index ===
                                                                indexEditKamar
                                                                ? "block"
                                                                : "hidden"
                                                        } w-[150px] h-[40px] px-5 py-2 my-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                                        placeholder="Npm Bed 2"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                    <div
                                                        className={`${
                                                            editKamarStatus &&
                                                            index ===
                                                                indexEditKamar
                                                                ? "hidden"
                                                                : "block"
                                                        } px-6 py-3 break-all w-[150px]`}
                                                    >
                                                        {data.npm_bed3_c}
                                                    </div>
                                                    <input
                                                        name="npm_bed3_c"
                                                        value={npmBed3}
                                                        type="text"
                                                        className={`${
                                                            editKamarStatus &&
                                                            index ===
                                                                indexEditKamar
                                                                ? "block"
                                                                : "hidden"
                                                        } w-[150px] h-[40px] px-5 py-2 my-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                                        placeholder="Npm Bed 3"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                    <div className="px-6 py-3 break-all w-[110px]">
                                                        {data.status_kamar ===
                                                        false
                                                            ? "Penuh "
                                                            : "Kosong"}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            className={`${
                                                                editKamarStatus &&
                                                                index ===
                                                                    indexEditKamar
                                                                    ? "hidden"
                                                                    : "block"
                                                            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-[15px]`}
                                                            onClick={() =>
                                                                editKamarHandle(
                                                                    data.npm_bed1_a,
                                                                    data.npm_bed2_b,
                                                                    data.npm_bed3_c,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className={`${
                                                                editKamarStatus &&
                                                                index ===
                                                                    indexEditKamar
                                                                    ? "block"
                                                                    : "hidden"
                                                            } bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-[15px]`}
                                                            onClick={() => {
                                                                setEditKamarStatus(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className={`${
                                                                editKamarStatus &&
                                                                index ===
                                                                    indexEditKamar
                                                                    ? "block"
                                                                    : "hidden"
                                                            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-[15px]`}
                                                            onClick={() =>
                                                                saveEditKamar(
                                                                    data.id_asrama
                                                                )
                                                            }
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center p-3"></div>
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
