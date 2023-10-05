import _core from "./index.service";

class _users extends _core {
    private baseUrl: string = this.getBaseUrl();

    async getUsers() {
        try {
            const response = await fetch(`${this.baseUrl}/api/users/account`);
            const data = await response.json();

            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateStatusAccount(id: number, id_account: number, status: boolean) {
        try {
            const res = await fetch(
                `${this.baseUrl}/api/users/account/verifikasi/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id_account,
                        status_account: status,
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

export default _users;
