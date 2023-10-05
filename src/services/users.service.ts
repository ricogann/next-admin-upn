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

    async getUmum() {
        try {
            const res = await fetch(`${this.baseUrl}/api/users/umum`);
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getMahasiswa() {
        try {
            const res = await fetch(`${this.baseUrl}/api/users/mahasiswa`);
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getDosen() {
        try {
            const res = await fetch(`${this.baseUrl}/api/users/dosen`);
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteUsers(id: number) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/umum/delete/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteDosen(id: number) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/dosen/delete/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteMahasiswa(id: number) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/mahasiswa/delete/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAccountById(id: number) {
        try {
            const res = await fetch(
                `https://api.ricogann.com/api/users/account/${id}`
            );
            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default _users;
