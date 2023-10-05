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

    async updateStatus(id: number, status: string) {
        try {
            console.log(id, status);
            const res = await fetch(
                `${this.baseUrl}/api/booking/verifikasi/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
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
}

export default _booking;
