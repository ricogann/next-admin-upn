import _core from "./index.service";

class _misc extends _core {
    private baseUrl: string = this.getBaseUrl();

    async getDataMisc() {
        try {
            const res = await fetch(`${this.baseUrl}/api/misc`);
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateDataMisc(id: number, data: FormData) {
        try {
            const res = await fetch(`${this.baseUrl}/api/misc/${id}`, {
                method: "PUT",
                body: data,
            });

            const resData = await res.json();

            return resData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default _misc;
