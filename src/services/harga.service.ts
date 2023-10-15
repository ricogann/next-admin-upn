import _core from "./index.service";

class _harga extends _core {
    private baseUrl: string = this.getBaseUrl();

    async getDataharga() {
        try {
            const res = await fetch(`${this.getBaseUrl()}/api/harga`);
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getDatahargaById(id: number) {
        try {
            const res = await fetch(`${this.getBaseUrl()}/api/harga/${id}`);
            const data = await res.json();

            return data.data;
        } catch (error) {
            console.log(error);
        }
    }

    async addHarga(data: Object, cookie: string) {
        try {
            console.log(data);
            const res = await fetch(`${this.getBaseUrl()}/api/harga/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`,
                },
                body: JSON.stringify(data),
            });

            const resData = await res.json();

            return resData;
        } catch (error) {
            console.log(error);
        }
    }

    async updateHarga(id: number, data: Object, cookie: string) {
        try {
            const res = await fetch(
                `${this.getBaseUrl()}/api/harga/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookie}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            const resData = await res.json();

            return resData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteHarga(id: number, cookie: string) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/Harga/delete/${Number(id)}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                    },
                }
            );

            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default _harga;
