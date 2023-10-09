import _core from "./index.service";

class _fasilitas extends _core {
    private baseUrl: string = this.getBaseUrl();
    // private baseUrl: string = "http://localhost:5000";

    async getFasilitasById(id: number) {
        try {
            const response = await fetch(`${this.baseUrl}/api/fasilitas/${id}`);
            const data = await response.json();

            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getFasilitas() {
        try {
            const response = await fetch(`${this.baseUrl}/api/fasilitas`);
            const data = await response.json();

            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateFasilitas(id: number, data: FormData) {
        try {
            const res = await fetch(
                `${this.baseUrl}/api/fasilitas/update/${id}`,
                {
                    method: "PUT",
                    body: data,
                }
            );

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

export default _fasilitas;