import * as crypto from "crypto-js";

interface CookiesDTO {
    CERT: string;
}

class _lib {
    async getCookies(): Promise<CookiesDTO> {
        try {
            const cookies = document.cookie.split(";").reduce((res, c) => {
                const [key, val] = c.trim().split("=");
                try {
                    return Object.assign(res, { [key]: JSON.parse(val) });
                } catch (e) {
                    return Object.assign(res, { [key]: val });
                }
            }, {} as CookiesDTO);

            return cookies;
        } catch (error) {
            console.error("get cookies error", error);
            throw error;
        }
    }

    async setCookie(name: string, value: string, days: number) {
        try {
            const expires = new Date();
            expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
            const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/`;
            document.cookie = cookieString;

            return true;
        } catch (error) {
            console.error("set cookies error", error);
            throw error;
        }
    }

    calculatePagesToDisplay(currentPage: number, totalPages: number) {
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

    dataToShow(data: any[], currentPage: number, itemsPerPage: number) {
        return data.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }

    decrypt(password: string) {
        const bytes = crypto.AES.decrypt(password, "secretkeyforupnreservasi");

        return bytes.toString(crypto.enc.Utf8);
    }
}

export default _lib;
