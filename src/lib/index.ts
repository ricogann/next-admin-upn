import * as crypto from "crypto-js";

class _lib {
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
