import _core from "./index.service";

class _booking extends _core {
    private baseUrl: string = this.getBaseUrl();

    async getPemesanan() {
        try {
            const response = await fetch(`${this.baseUrl}/api/booking`);
            const data = await response.json();

            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateStatus(id: number, status: string, cookie: string) {
        try {
            const res = await fetch(
                `${this.baseUrl}/api/booking/verifikasi/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookie}`,
                    },
                    body: JSON.stringify({
                        status: status,
                    }),
                }
            );

            const data = await res.json();
            if (data.status === true) {
                window.location.reload();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateKamar(id: number, body: Object, cookie: string) {
        try {
            const res = await fetch(`${this.baseUrl}/api/kamar/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`,
                },
                body: JSON.stringify(body),
            });
            const resData = await res.json();

            if (resData.status === true) {
                window.location.reload();
            } else {
                alert(resData.message);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default _booking;
